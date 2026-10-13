document.addEventListener('DOMContentLoaded', () => {
    setupProjectDialog()
    addingProjectData()
})

const iconApple = "./app/resources/images/icons/iconApple.png"
const iconAndroid = "./app/resources/images/icons/iconAndroid.png"
const iconWeb = "./app/resources/images/icons/iconWeb.png"
const iconReactNative = "./app/resources/images/icons/iconReactNative.svg"

let projectDialogCloseTimer

function addingProjectData() {
    const projectGridLayout = document.getElementById('projects-grid-layout')
    projects.forEach(project => projectGridLayout.appendChild(createProjectElement(project)))
}

function getProjectPlatforms(project) {
    const data = project.projectData || {}
    const platforms = []
    if (data.isReactNative) platforms.push({ label: 'React Native', icon: iconReactNative })
    if (data.ios) platforms.push({ label: 'iOS', linkLabel: 'App Store', icon: iconApple, url: data.ios.url })
    if (data.android) platforms.push({ label: 'Android', linkLabel: 'Google Play', icon: iconAndroid, url: data.android.url })
    if (data.type === 'web' || data.web) platforms.push({ label: 'Web', linkLabel: 'Visit website', icon: iconWeb, url: data.web?.url })
    return platforms
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
    const card = document.createElement('article')
    card.className = 'projects-grid-item'

    const openButton = document.createElement('button')
    openButton.type = 'button'
    openButton.className = 'projects-grid-open-button'
    openButton.setAttribute('aria-label', `View details for ${project.title}`)
    openButton.setAttribute('aria-haspopup', 'dialog')
    openButton.setAttribute('aria-controls', 'project-details-dialog')
    openButton.addEventListener('click', () => openProjectDetails(project))

    const artwork = document.createElement('div')
    artwork.className = 'projects-grid-item-artwork'
    const initial = document.createElement('span')
    initial.className = 'projects-grid-item-initial'
    initial.textContent = project.title.charAt(0).toUpperCase()
    initial.setAttribute('aria-hidden', 'true')
    const image = document.createElement('img')
    image.className = 'projects-grid-item-bg-image'
    image.alt = ''
    image.loading = 'lazy'
    setProjectImage(image, project.icon, initial)
    artwork.append(initial, image)

    const content = document.createElement('div')
    content.className = 'projects-grid-item-content-container'
    const title = document.createElement('h2')
    title.className = 'projects-grid-title'
    title.textContent = project.title
    content.appendChild(title)
    openButton.append(artwork, content)

    const tags = document.createElement('div')
    tags.className = 'projects-tags-container'
    const tagsRow = document.createElement('div')
    tagsRow.className = 'projects-tags-row'

    getProjectPlatforms(project).forEach(platform => {
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
    hint.textContent = 'VIEW DETAILS →'
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
    })
}

function openProjectDetails(project) {
    const dialog = document.getElementById('project-details-dialog')
    const icon = document.getElementById('project-details-icon')
    const banner = document.getElementById('project-details-banner')
    const platforms = document.getElementById('project-details-platforms')
    const links = document.getElementById('project-details-links')

    window.clearTimeout(projectDialogCloseTimer)
    dialog.classList.remove('is-closing')
    document.getElementById('project-details-title').textContent = project.title
    document.getElementById('project-details-description').textContent = project.description?.trim() || 'More details about this project will be added soon.'
    document.getElementById('project-details-initial').textContent = project.title.charAt(0).toUpperCase()
    setProjectImage(icon, project.icon)
    setProjectImage(banner, project.bannerImage || project.icon)
    banner.classList.toggle('is-icon-fallback', !project.bannerImage)
    platforms.replaceChildren()
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
        tag.textContent = platform.label
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
