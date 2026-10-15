document.addEventListener('DOMContentLoaded', () => {
    const name = `${userData.name.first} ${userData.name.middle} ${userData.name.last}`
    document.getElementById('about-me-name').textContent = name
    document.getElementById('about-me-primary-role').textContent = userData.jobTitles[0]
    document.querySelector('.about-portrait .about-photo').alt = `Portrait of ${name}`
    document.getElementById('about-me-description').textContent = userData.about_me

    const roles = document.getElementById('about-me-roles')
    userData.jobTitles.forEach(title => {
        const role = document.createElement('li')
        role.textContent = title
        roles.appendChild(role)
    })

    if (userData.email.value) {
        const emailLink = document.getElementById('about-me-email')
        emailLink.href = `mailto:${userData.email.value}`
        emailLink.hidden = false
    }

    const phoneNumber = userData.phone[0]?.value[0]?.replace(/[^\d+]/g, '')
    if (phoneNumber) {
        const whatsappLink = document.getElementById('about-me-whatsapp')
        whatsappLink.href = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`
        whatsappLink.hidden = false
        const callLink = document.getElementById('about-me-call')
        callLink.href = `tel:${phoneNumber}`
        callLink.hidden = false
    }

    const github = userData.codeAndTechnicalForums.find(item => item.title.toLowerCase() === 'github')
    if (github) {
        const link = document.getElementById('about-me-github')
        link.href = github.link
        link.hidden = false
    }

    const linkedin = userData.socialMediaLinks.find(item => item.title.toLowerCase() === 'linkedin')
    if (linkedin?.link) {
        const link = document.getElementById('about-me-linkedin')
        link.href = linkedin.link
        link.hidden = false
    }
})
