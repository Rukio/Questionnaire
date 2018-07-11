var private = document.querySelector('.questionnaire__private');
var experience = document.querySelector('.questionnaire__experience');
var about = document.querySelector('.questionnaire__about');

function nav(y) {

    if (y == 1) {
        window.scrollTo(0, private.getBoundingClientRect().top);
    } else

    if (y == 2) {
        window.scrollTo(0, experience.getBoundingClientRect().top);
    }

    if (y == 3) {
        window.scrollTo(0, about.getBoundingClientRect().top);
    }
}