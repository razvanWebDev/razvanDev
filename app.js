const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.menuButtons');
console.log(navLinks);

// Change header background on scroll
function headerBackground () {
    const y = window.scrollY;

    if (y > 20){
        header.classList.add('yellow-header');
        navLinks.forEach((link) => link.classList.add('black-text'));
    }else{
        header.classList.remove('yellow-header');
        navLinks.forEach((link) => link.classList.remove('black-text'));
    }
}



// Event listeners
window.addEventListener("scroll", headerBackground);
window.addEventListener("load", headerBackground);