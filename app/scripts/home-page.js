document.addEventListener('DOMContentLoaded', () => {
    const name = [userData.name.first, userData.name.middle].filter(Boolean).join(' ')
    document.getElementById('home-page-name-main').textContent = name
    document.getElementById('home-page-name-initials').textContent = userData.name.last
    document.getElementById('home-page-primary-role').textContent = userData.jobTitles.slice(0, 2).join(' · ')
    document.getElementById('home-page-introduction').textContent = userData.homeIntroduction || userData.about_me

    const secondaryRoles = userData.jobTitles.slice(2)
    const role = document.getElementById('home-page-about-me')
    if (!secondaryRoles.length) {
        role.parentElement.hidden = true
        return
    }
    let roleIndex = 0
    role.textContent = secondaryRoles[roleIndex]
    role.addEventListener('animationiteration', event => {
        if (event.animationName === 'home-role-cycle') {
            roleIndex = (roleIndex + 1) % secondaryRoles.length
            role.textContent = secondaryRoles[roleIndex]
        }
    })
})
