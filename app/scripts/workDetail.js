document.addEventListener('DOMContentLoaded', () => {
    setupWorkDialog()
    const list = document.getElementById('work-list')
    workData.forEach((data, index) => list.appendChild(createWorkElement(data, index)))
})

let workDialogCloseTimer

function createWorkElement(data, index) {
    const isCurrent = data.endDate === 'Present'
    const item = document.createElement('li')
    item.className = `work-item${isCurrent ? ' is-current' : ''}`

    const dates = document.createElement('div')
    dates.className = 'work-item-dates'
    const dateLabel = document.createElement('span')
    dateLabel.className = 'work-item-date-label'
    dateLabel.textContent = 'FROM'
    const start = document.createElement('span')
    start.className = 'work-item-start-date'
    start.textContent = data.startDate
    const end = document.createElement('span')
    end.className = 'work-item-end-date'
    end.textContent = `— ${data.endDate}`
    dates.append(dateLabel, start, end)

    const card = document.createElement('article')
    card.className = 'work-card'
    card.setAttribute('aria-labelledby', `work-organization-${index}`)
    const header = document.createElement('header')
    header.className = 'work-item-header'
    const initial = document.createElement('span')
    initial.className = 'work-item-initial'
    initial.textContent = data.organizationName.split(/\s+/)[0].slice(0, 2).toUpperCase()
    initial.setAttribute('aria-hidden', 'true')
    const heading = document.createElement('div')
    heading.className = 'work-item-heading'
    const organization = document.createElement('h3')
    organization.id = `work-organization-${index}`
    organization.className = 'work-item-organization'
    organization.textContent = data.organizationName
    const position = document.createElement('p')
    position.className = 'work-item-position'
    position.textContent = data.position
    heading.append(organization, position)
    header.append(initial, heading)
    if (isCurrent) {
        const status = document.createElement('span')
        status.className = 'work-item-status'
        status.textContent = 'Current'
        header.appendChild(status)
    }

    const responsibilities = document.createElement('ul')
    responsibilities.className = 'work-item-responsibilities'
    fillWorkResponsibilities(responsibilities, data.description)

    const skillsSection = document.createElement('div')
    skillsSection.className = 'work-item-skills-section'
    const skillsHeading = document.createElement('div')
    skillsHeading.className = 'work-item-skills-heading'
    const skillsLabel = document.createElement('p')
    skillsLabel.className = 'work-item-skills-label'
    skillsLabel.textContent = 'SKILLS & TECHNOLOGIES'
    const hint = document.createElement('span')
    hint.className = 'work-item-hint'
    hint.textContent = 'View details ↗'
    hint.setAttribute('aria-hidden', 'true')
    skillsHeading.append(skillsLabel, hint)
    const skills = document.createElement('ul')
    skills.className = 'work-item-skills'
    skills.setAttribute('role', 'list')
    fillWorkSkills(skills, data.skills)
    skillsSection.append(skillsHeading, skills)

    const openButton = document.createElement('button')
    openButton.type = 'button'
    openButton.className = 'work-item-open-button'
    openButton.setAttribute('aria-label', `View work details for ${data.organizationName}`)
    openButton.setAttribute('aria-haspopup', 'dialog')
    openButton.setAttribute('aria-controls', 'work-details-dialog')
    openButton.addEventListener('click', () => openWorkDetails(data))

    card.append(header, responsibilities, skillsSection)
    item.append(dates, card, openButton)
    return item
}

function fillWorkResponsibilities(list, description) {
    list.replaceChildren()
    description.split('\n').map(line => line.trim().replace(/^[-•]\s*/, '')).filter(Boolean).forEach(line => {
        const responsibility = document.createElement('li')
        responsibility.textContent = line
        list.appendChild(responsibility)
    })
}

function fillWorkSkills(list, skills) {
    list.replaceChildren()
    skills.forEach(skill => {
        const tag = document.createElement('li')
        tag.textContent = skill
        list.appendChild(tag)
    })
}

function setupWorkDialog() {
    const dialog = document.getElementById('work-details-dialog')
    document.getElementById('work-details-close').addEventListener('click', closeWorkDetails)
    dialog.addEventListener('cancel', event => {
        event.preventDefault()
        closeWorkDetails()
    })
    dialog.addEventListener('keydown', event => {
        if (event.key !== 'Tab') return
        const controls = dialog.querySelectorAll('button:not([disabled]), a[href]')
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    })
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect()
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom)) closeWorkDetails()
    })
    dialog.addEventListener('close', () => {
        window.clearTimeout(workDialogCloseTimer)
        dialog.classList.remove('is-closing')
        document.body.classList.remove('work-dialog-open')
    })
}

function openWorkDetails(data) {
    const dialog = document.getElementById('work-details-dialog')
    window.clearTimeout(workDialogCloseTimer)
    dialog.classList.remove('is-closing')
    document.getElementById('work-details-title').textContent = data.organizationName
    document.getElementById('work-details-position').textContent = data.position
    document.getElementById('work-details-period').textContent = `${data.startDate} — ${data.endDate}`
    document.getElementById('work-details-initial').textContent = data.organizationName.split(/\s+/)[0].slice(0, 2).toUpperCase()
    document.getElementById('work-details-status').hidden = data.endDate !== 'Present'
    fillWorkResponsibilities(document.getElementById('work-details-responsibilities'), data.description)
    fillWorkSkills(document.getElementById('work-details-skills'), data.skills)
    document.querySelector('.work-dialog-scroll').scrollTop = 0
    document.body.classList.add('work-dialog-open')
    if (!dialog.open) dialog.showModal()
}

function closeWorkDetails() {
    const dialog = document.getElementById('work-details-dialog')
    if (!dialog.open || dialog.classList.contains('is-closing')) return
    dialog.classList.add('is-closing')
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220
    workDialogCloseTimer = window.setTimeout(() => dialog.close(), duration)
}
