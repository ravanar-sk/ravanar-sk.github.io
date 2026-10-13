document.addEventListener('DOMContentLoaded', () => {
    const nameParts = [userData.name.first, userData.name.middle, userData.name.last].filter(Boolean)
    document.getElementById('side-menu-name').textContent = nameParts.join(' ')
    document.getElementById('side-menu-initials').textContent = nameParts.slice(0, 2).map(part => part[0]).join('')
    document.getElementById('side-menu-location').textContent = userData.location

    const navigation = document.querySelector('.side-navigation-links')
    const links = Array.from(navigation.querySelectorAll('a'))
    const sections = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean)
    let activeSectionId = ''
    let updateScheduled = false

    function revealMobileLink(link) {
        if (!window.matchMedia('(max-width: 700px)').matches) return
        const left = link.offsetLeft
        const right = left + link.offsetWidth
        if (left < navigation.scrollLeft) {
            navigation.scrollTo({ left, behavior: 'auto' })
        } else if (right > navigation.scrollLeft + navigation.clientWidth) {
            navigation.scrollTo({ left: right - navigation.clientWidth, behavior: 'auto' })
        }
    }

    function updateActiveSection() {
        let activeSection = sections[0]
        // Use a line below the mobile header so anchored sections and contact links stay accurate.
        for (const section of sections) {
            if (section.getBoundingClientRect().top <= 96) {
                activeSection = section
            } else {
                break
            }
        }
        if (!activeSection) return
        const activeLink = links.find(link => link.hash === `#${activeSection.id}`)
        if (activeSectionId !== activeSection.id) {
            activeSectionId = activeSection.id
            links.forEach(link => {
                if (link === activeLink) {
                    link.setAttribute('aria-current', 'location')
                } else {
                    link.removeAttribute('aria-current')
                }
            })
        }
        revealMobileLink(activeLink)
    }

    function scheduleSectionUpdate() {
        if (updateScheduled) return
        updateScheduled = true
        requestAnimationFrame(() => {
            updateScheduled = false
            updateActiveSection()
        })
    }

    window.addEventListener('scroll', scheduleSectionUpdate, { passive: true })
    window.addEventListener('resize', scheduleSectionUpdate)
    window.addEventListener('hashchange', scheduleSectionUpdate)
    window.addEventListener('load', scheduleSectionUpdate)
    updateActiveSection()
})
