document.addEventListener('DOMContentLoaded', () => {
    setupEducationDialog()
    const list = document.getElementById('education-list')
    userData.education.forEach((education, index) => {
        list.appendChild(createEducationItem(education, index))
    })
})

let educationDialogCloseTimer

function createEducationItem(data, index) {
    const item = document.createElement('li')
    item.className = 'education-item-root'

    const date = document.createElement('div')
    date.className = 'education-item-date'
    const dateLabel = document.createElement('span')
    dateLabel.className = 'education-item-date-label'
    dateLabel.textContent = 'GRADUATED'
    const year = document.createElement('time')
    year.className = 'education-item-graduation-year'
    year.dateTime = data.graduationYear
    year.textContent = data.graduationYear
    const period = document.createElement('span')
    period.className = 'education-item-period'
    period.textContent = `${data.startYear} — ${data.endYear}`
    period.setAttribute('aria-label', `Study period: ${data.startYear} to ${data.endYear}`)
    date.append(dateLabel, year, period)

    const card = document.createElement('article')
    card.className = 'education-card'
    card.setAttribute('aria-labelledby', `education-course-${index}`)
    const details = document.createElement('div')
    details.className = 'education-item-details'
    const metadata = document.createElement('div')
    metadata.className = 'education-item-metadata'
    const course = document.createElement('span')
    course.className = 'education-item-course'
    course.textContent = data.course
    const university = document.createElement('span')
    university.className = 'education-item-university'
    university.textContent = data.university
    metadata.append(course, university)

    const subjects = document.createElement('h3')
    subjects.id = `education-course-${index}`
    subjects.className = 'education-item-subjects'
    subjects.textContent = data.subjects
    const institution = document.createElement('p')
    institution.className = 'education-item-institution'
    institution.textContent = data.institutionName
    details.append(metadata, subjects, institution)

    const result = document.createElement('div')
    result.className = 'education-item-result'
    const resultLabel = document.createElement('span')
    resultLabel.className = 'education-item-result-label'
    resultLabel.textContent = 'RESULT'
    const marks = document.createElement('strong')
    marks.className = 'education-item-marks'
    marks.textContent = data.marksWithUnit
    const hint = document.createElement('span')
    hint.className = 'education-item-hint'
    hint.textContent = 'View details ↗'
    hint.setAttribute('aria-hidden', 'true')
    result.append(resultLabel, marks, hint)

    const openButton = document.createElement('button')
    openButton.type = 'button'
    openButton.className = 'education-item-open-button'
    openButton.setAttribute('aria-label', `View education details for ${data.course}`)
    openButton.setAttribute('aria-haspopup', 'dialog')
    openButton.setAttribute('aria-controls', 'education-details-dialog')
    openButton.addEventListener('click', () => openEducationDetails(data))

    card.append(details, result)
    item.append(date, card, openButton)
    return item
}

function setupEducationDialog() {
    const dialog = document.getElementById('education-details-dialog')
    document.getElementById('education-details-close').addEventListener('click', closeEducationDetails)
    dialog.addEventListener('cancel', event => {
        event.preventDefault()
        closeEducationDetails()
    })
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect()
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom)) closeEducationDetails()
    })
    dialog.addEventListener('close', () => {
        window.clearTimeout(educationDialogCloseTimer)
        dialog.classList.remove('is-closing')
        document.body.classList.remove('education-dialog-open')
    })
}

function openEducationDetails(data) {
    const dialog = document.getElementById('education-details-dialog')
    window.clearTimeout(educationDialogCloseTimer)
    dialog.classList.remove('is-closing')
    document.getElementById('education-details-title').textContent = data.subjects
    document.getElementById('education-details-course').textContent = data.course
    document.getElementById('education-details-institution').textContent = data.institutionName
    document.getElementById('education-details-year').textContent = data.graduationYear

    const record = document.getElementById('education-details-record')
    record.replaceChildren()
    const fields = [
        ['Qualification', data.course],
        ['Field of study', data.subjects],
        ['University / board', data.university],
        ['Study period', `${data.startYear} — ${data.endYear}`],
        ['Graduation year', data.graduationYear],
        ['Result', data.marksWithUnit]
    ]
    fields.forEach(([label, value]) => {
        const field = document.createElement('div')
        field.className = 'education-dialog-field'
        const term = document.createElement('dt')
        term.textContent = label
        const detail = document.createElement('dd')
        detail.textContent = value
        field.append(term, detail)
        record.appendChild(field)
    })
    document.querySelector('.education-dialog-scroll').scrollTop = 0
    document.body.classList.add('education-dialog-open')
    if (!dialog.open) dialog.showModal()
}

function closeEducationDetails() {
    const dialog = document.getElementById('education-details-dialog')
    if (!dialog.open || dialog.classList.contains('is-closing')) return
    dialog.classList.add('is-closing')
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220
    educationDialogCloseTimer = window.setTimeout(() => dialog.close(), duration)
}
