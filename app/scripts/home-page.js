
document.addEventListener('DOMContentLoaded', domContentLoaded)
function domContentLoaded() {

    homePageAboutMe.innerHTML = `${userData.jobTitles[0]}  `

    homePageAboutMe.style.animationName = "home-page-about-me-width-animation"
}

let homePageAboutMe = document.getElementById('home-page-about-me');
let indexJobTitle = 0; // Current 
let indexHomePageAboutMeAnimationStatus = 0;
homePageAboutMe.addEventListener('animationstart', (ev) => {
    console.log("Animation Startted", ev);
});
homePageAboutMe.addEventListener('animationiteration', (ev) => {
    console.log("animation_iteration", ev);
    ++indexHomePageAboutMeAnimationStatus
    if ((indexHomePageAboutMeAnimationStatus % 2) === 1) {
        ++indexJobTitle
        homePageAboutMe.innerHTML = `${userData.jobTitles[indexJobTitle % userData.jobTitles.length]}  ` 
        // ++indexJobTitle
    }
});

// homePageAboutMe.addEventListener('animationend', (ev) => {
//    console.log("animation end", ev);
// });

// homePageAboutMe.addEventListener('animationcancel', (ev) => {
//     console.log("Animation canceled" , ev); 
// }
