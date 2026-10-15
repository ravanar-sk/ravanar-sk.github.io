document.addEventListener('DOMContentLoaded', () => {
    setupProjectDialog()
    addingProjectData()
    setupProjectFilters()
})

const iconApple = "./app/resources/images/icons/iconApple.png"
const iconAndroid = "./app/resources/images/icons/iconAndroid.png"
const iconWeb = "./app/resources/images/icons/iconWeb.png"
const iconReact = "./app/resources/images/icons/iconReactNative.svg"
const iconFlutter = "./app/resources/images/icons/iconFlutter.svg"

let projectDialogCloseTimer
let projectDialogOpenedWithPointer = false
const projectCards = new Map()

function addingProjectData() {
    projects.forEach(project => {
        const category = getProjectCategory(project)
        const card = createProjectElement(project)
        projectCards.set(project, card)
        document.getElementById(`${category}-projects-grid`).appendChild(card)
    })
}

function setupProjectFilters() {
    const filters = document.getElementById('projects-filters')
    const options = [
        { label: 'All projects', platform: null },
        { label: 'iOS', platform: 'iOS' },
        { label: 'Android', platform: 'Android' },
        { label: 'Web', platform: 'Web' },
        { label: 'React Native', platform: 'React Native' },
        { label: 'Flutter', platform: 'Flutter' }
    ]

    options.forEach(({ label, platform }, index) => {
        const count = projects.filter(project => !platform ||
            getProjectPlatforms(project).some(item => item.label === platform)).length
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'projects-filter'
        button.setAttribute('aria-label', label)
        button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false')
        const name = document.createElement('span')
        name.textContent = label
        const total = document.createElement('span')
        total.className = 'projects-filter-count'
        total.textContent = count
        total.setAttribute('aria-hidden', 'true')
        button.append(name, total)
        button.addEventListener('click', () => {
            filters.querySelectorAll('button').forEach(filter => {
                filter.setAttribute('aria-pressed', filter === button ? 'true' : 'false')
            })
            let visibleCount = 0
            projects.forEach(project => {
                const visible = !platform || getProjectPlatforms(project).some(item => item.label === platform)
                projectCards.get(project).hidden = !visible
                if (visible) visibleCount++
            })
            updateProjectCount(visibleCount)
        })
        filters.appendChild(button)
    })
    updateProjectCount(projects.length)
}

function updateProjectCount(count) {
    document.getElementById('projects-result-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`
    document.querySelectorAll('.projects-group').forEach(group => {
        const visibleCount = group.querySelectorAll('.projects-grid-item:not([hidden])').length
        document.getElementById(`${group.dataset.category}-projects-count`).textContent =
            `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`
        group.hidden = visibleCount === 0
    })
}

function getProjectCategory(project) {
    return project.isPersonal === true ? 'personal' : 'professional'
}

function getProjectInitials(project) {
    return project.title.trim().split(/\s+/).slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()
}

function getProjectPlatforms(project) {
    const data = project.projectData || {}
    const platforms = []
    if (data.type === 'web-react') platforms.push({ label: 'React JS', icon: iconReact })
    if (data.type?.startsWith('react-native')) platforms.push({ label: 'React Native', icon: iconReact })
    if (data.type?.startsWith('flutter')) platforms.push({ label: 'Flutter', icon: iconFlutter })
    if (data.ios) platforms.push({ label: 'iOS', linkLabel: 'App Store', icon: iconApple, url: data.ios.url })
    if (data.android) platforms.push({ label: 'Android', linkLabel: 'Google Play', icon: iconAndroid, url: data.android.url })
    if (data.type?.startsWith('web') || data.web) platforms.push({ label: 'Web', linkLabel: 'Visit website', icon: iconWeb, url: data.web?.url })
    return platforms
}

function getProjectTypeLabel(project, platforms) {
    const type = project.projectData?.type || ''
    if (type.startsWith('react-native')) return 'React Native app'
    if (type.startsWith('flutter')) return 'Flutter app'
    if (type === 'electron') return 'Electron desktop app'
    if (type === 'web-react') return 'React web project'
    if (type === 'web-angular') return 'Angular web project'
    if (platforms.some(platform => platform.label === 'Web')) return 'Web project'
    return platforms.length ? `${platforms.map(platform => platform.label).join(' & ')} app` : 'Mobile app'
}

function createProjectBuildBadge(project) {
    const method = project.buildMethod
    if (!Object.hasOwn(projectBuildMethods, method)) return null
    const badge = document.createElement('span')
    badge.className = 'project-build-badge'
    badge.dataset.buildMethod = method
    badge.textContent = projectBuildMethods[method]
    return badge
}

function getProjectUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null
    try {
        const url = new URL(value, document.baseURI)
        return ['http:', 'https:'].includes(url.protocol) ? url.href : null
    } catch {
        return null
    }
}

function setProjectImage(image, source, fallback) {
    // Reset each time so a failed image on one project doesn't affect the next.
    image.onerror = () => {
        image.hidden = true
        image.removeAttribute('src')
        if (fallback) fallback.hidden = false
    }
    image.hidden = !source
    if (fallback) fallback.hidden = !!source
    if (source) image.src = source
    else image.removeAttribute('src')
}

function createProjectElement(project) {
    const card = document.createElement('li')
    card.className = 'projects-grid-item'
    card.addEventListener('keydown', () => card.classList.remove('is-pointer-restored'))
    card.addEventListener('focusout', event => {
        if (!card.contains(event.relatedTarget)) card.classList.remove('is-pointer-restored')
    })

    const openButton = document.createElement('button')
    openButton.type = 'button'
    openButton.className = 'projects-grid-open-button'
    openButton.setAttribute('aria-label', `View details for ${project.title}`)
    openButton.setAttribute('aria-haspopup', 'dialog')
    openButton.setAttribute('aria-controls', 'project-details-dialog')
    openButton.addEventListener('click', event => openProjectDetails(project, event.detail > 0))

    const artwork = document.createElement('div')
    artwork.className = 'projects-grid-item-artwork'
    const initial = document.createElement('span')
    initial.className = 'projects-grid-item-initial'
    initial.textContent = getProjectInitials(project)
    initial.setAttribute('aria-hidden', 'true')
    const image = document.createElement('img')
    image.className = 'projects-grid-item-bg-image'
    image.alt = ''
    image.loading = 'lazy'
    setProjectImage(image, project.icon, initial)
    artwork.append(initial, image)

    const content = document.createElement('div')
    content.className = 'projects-grid-item-content-container'
    const platforms = getProjectPlatforms(project)
    const category = document.createElement('span')
    category.className = 'projects-card-type'
    category.textContent = getProjectTypeLabel(project, platforms)
    const title = document.createElement('h4')
    title.className = 'projects-grid-title'
    title.textContent = project.title
    content.append(category, title)
    const buildBadge = createProjectBuildBadge(project)
    if (buildBadge) {
        content.appendChild(buildBadge)
        openButton.setAttribute('aria-label', `View details for ${project.title} — ${buildBadge.textContent}`)
    }
    if (project.description?.trim()) {
        const description = document.createElement('span')
        description.className = 'projects-card-description'
        description.textContent = project.description.trim()
        description.setAttribute('aria-hidden', 'true')
        content.appendChild(description)
    }
    openButton.append(artwork, content)

    const tags = document.createElement('div')
    tags.className = 'projects-tags-container'
    const tagsRow = document.createElement('div')
    tagsRow.className = 'projects-tags-row'

    platforms.forEach(platform => {
        const icon = document.createElement('img')
        icon.className = 'projects-tags-item'
        icon.src = platform.icon
        icon.alt = platform.label
        const url = getProjectUrl(platform.url)
        const tag = document.createElement(url ? 'a' : 'span')
        tag.className = 'projects-platform-tag'
        tag.title = platform.label
        if (url) {
            tag.href = url
            tag.setAttribute('aria-label', `${project.title} — ${platform.linkLabel}`)
        }
        tag.appendChild(icon)
        tagsRow.appendChild(tag)
    })

    const hint = document.createElement('span')
    hint.className = 'projects-view-details'
    hint.setAttribute('aria-hidden', 'true')
    const hintLabel = document.createElement('span')
    hintLabel.textContent = 'VIEW DETAILS'
    const hintArrow = document.createElement('span')
    hintArrow.className = 'projects-view-details-arrow'
    hintArrow.textContent = '↗'
    hint.append(hintLabel, hintArrow)
    content.appendChild(hint)
    tags.appendChild(tagsRow)
    card.append(openButton, tags)
    return card
}

function setupProjectDialog() {
    const dialog = document.getElementById('project-details-dialog')
    document.getElementById('project-details-close').addEventListener('click', closeProjectDetails)
    dialog.addEventListener('cancel', event => {
        event.preventDefault()
        closeProjectDetails()
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
            event.clientY < bounds.top || event.clientY > bounds.bottom)) closeProjectDetails()
    })
    dialog.addEventListener('close', () => {
        window.clearTimeout(projectDialogCloseTimer)
        dialog.classList.remove('is-closing')
        document.body.classList.remove('project-dialog-open')
        // Escape can make restored focus visible even after a pointer-opened dialog.
        if (projectDialogOpenedWithPointer) {
            document.activeElement.closest('.projects-grid-item')?.classList.add('is-pointer-restored')
        }
        projectDialogOpenedWithPointer = false
    })
}

function openProjectDetails(project, openedWithPointer = false) {
    const dialog = document.getElementById('project-details-dialog')
    const icon = document.getElementById('project-details-icon')
    const banner = document.getElementById('project-details-banner')
    const platforms = document.getElementById('project-details-platforms')
    const buildMethod = document.getElementById('project-details-build-method')
    const links = document.getElementById('project-details-links')

    window.clearTimeout(projectDialogCloseTimer)
    projectDialogOpenedWithPointer = openedWithPointer
    dialog.classList.remove('is-closing')
    document.getElementById('project-details-title').textContent = project.title
    document.getElementById('project-details-description').textContent = project.description?.trim() || 'More details about this project will be added soon.'
    document.getElementById('project-details-initial').textContent = getProjectInitials(project)
    setProjectImage(icon, project.icon)
    setProjectImage(banner, project.bannerImage || project.icon)
    banner.classList.toggle('is-icon-fallback', !project.bannerImage)
    platforms.replaceChildren()
    buildMethod.replaceChildren()
    const buildBadge = createProjectBuildBadge(project)
    buildMethod.hidden = !buildBadge
    if (buildBadge) buildMethod.appendChild(buildBadge)
    links.replaceChildren()

    const addedLinks = new Set()
    function addLink(label, source) {
        const url = getProjectUrl(source)
        // Treat a website URL with or without a trailing slash as the same link.
        const key = url?.replace(/\/$/, '')
        if (!url || addedLinks.has(key)) return
        addedLinks.add(key)
        const link = document.createElement('a')
        link.className = 'project-dialog-link'
        link.href = url
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        const text = document.createElement('span')
        text.textContent = label
        const arrow = document.createElement('span')
        arrow.textContent = '↗'
        arrow.setAttribute('aria-hidden', 'true')
        link.append(text, arrow)
        link.setAttribute('aria-label', `${label} (opens in a new tab)`)
        links.appendChild(link)
    }

    addLink('Visit website', project.website)
    getProjectPlatforms(project).forEach(platform => {
        const tag = document.createElement('span')
        tag.className = 'project-dialog-platform'
        const icon = document.createElement('img')
        icon.src = platform.icon
        icon.alt = ''
        icon.setAttribute('aria-hidden', 'true')
        const label = document.createElement('span')
        label.textContent = platform.label
        tag.append(icon, label)
        platforms.appendChild(tag)
        addLink(platform.linkLabel, platform.url)
    })
    document.getElementById('project-details-no-links').hidden = addedLinks.size > 0
    document.querySelector('.project-dialog-scroll').scrollTop = 0
    document.body.classList.add('project-dialog-open')
    if (!dialog.open) dialog.showModal()
}

function closeProjectDetails() {
    const dialog = document.getElementById('project-details-dialog')
    if (!dialog.open || dialog.classList.contains('is-closing')) return
    dialog.classList.add('is-closing')
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220
    projectDialogCloseTimer = window.setTimeout(() => dialog.close(), duration)
}
