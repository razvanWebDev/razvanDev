//DOM elements
const header = $('header');
const nav_height = header.outerHeight();
const headerName = document.querySelector('#header-name');
const burger = document.querySelector('.burger');
const burger1 = document.querySelector('.line1');
const burger2 = document.querySelector('.line2');
const burger3 = document.querySelector('.line3');
const nav = document.querySelector('#header-links');
const navLinks = document.querySelectorAll('.menu-buttons');
const links = document.querySelectorAll(".menuButtons");
const sections = $('section');


//Load Projects from JSON
function loadProjects() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const projects = JSON.parse(xhttp.responseText);
            displayProjects(projects);
        }
    }
    xhttp.open('GET', "projects.json", true);
    xhttp.send();
}

//DISPLAY PROJECTS
function displayProjects(projects) {
    const resultList = document.querySelector('.projects');
    const listItems = projects.map(function (project) {
        const name = project.name;
        const image = project.imgPath;
        const codeLink = project.codeLink;
        const demoLink = project.demoLink;
        const description = project.description;
        const skillsUsed = project.skillsUsed;

        return `<div class="project-div">
                <h3>${name} </h3>
                <div class="img-container">
                  <img src = ${image} alt="pic" class="project-pic">
                  <div class="project-links">
                            <a href="${codeLink}" target="_blank">
                                  <button class="btn"> View Code</button>
                            </a>
                            <a href="${demoLink}" target="_blank">
                                  <button class="btn">View Demo</button>
                            </a>
                     </div>
                </div>
                <p>${description}</p>
                <p>${skillsUsed}</p>
              </div>`;
    })
    resultList.innerHTML = listItems.join('');
}

// Change header background on scroll
const headerBackground = () => {
    const y = window.scrollY;
    const x = window.innerWidth;
    if (x >= 768) {
        if (y > 20) {
            header.addClass('yellow-header');
            links.forEach((link) => link.classList.add('black-text'));
        } else {
            header.removeClass('yellow-header');
            links.forEach((link) => link.classList.remove('black-text'));
        }
    }
}

//Show header name on max-width of 768px
const showHeaderName = () => {
    const width  = window.innerWidth;
    const y = window.innerHeight;
    if(width <= 768 && window.scrollY > y * 0.899) {
        $('#header-name').fadeIn();
        header.css({"background-color":"rgba(20, 20, 20, 0.85)"});
    }else{
        $('#header-name').fadeOut();
        header.css({"background-color":"rgba(0, 0, 0, 0)"});
    }
}

//Change active state navlinks on scroll

const linkCurrentState = () => {
    const cur_pos = $(this).scrollTop();

    sections.each(function () {
        const top = $(this).offset().top - nav_height - 200;
        const bottom = top + $(this).outerHeight();
        if (cur_pos >= top && cur_pos <= bottom) {
            header.find('a').removeClass('current');
            let linkName = $(this).attr('id');
            linkName = linkName.slice(0, linkName.length - 8);
            header.find(`a[data-page= ${linkName}]`).addClass('current');
        }
    });
}

//Scroll page on click
$('.menuButtons').on('click', function (e) {
    const idName = $(this).attr('data-page');
    const x = window.innerWidth;
    let headerHeight = $(window).height() * 0.1;

    $('html, body').animate({
        scrollTop: $("#" + idName + "-section").offset().top - headerHeight
    }, 'slow');
});

const navSlide = () => {
    burger.addEventListener('click', () => {
        // toggle nav
        nav.classList.toggle('nav-active');
        if (nav.classList.contains("nav-active")) {
            nav.style.animation = `navSlide 0.5s forwards`;
            $('body').addClass('navBar-open');
        } else {
            nav.style.animation = `navSlideOut 0.5s`;
            $('body').removeClass('navBar-open');
        }

        // Amimate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navFade 0.5s ${index / 5 + 0.5}s ease forwards`;
            }
        });

        // burger animation
        burger.classList.toggle("toggle");
    });
}

const navClose = () => {
    nav.style.animation = `navSlideOut 0.5s`;
    nav.classList.remove('nav-active');
    burger.classList.remove("toggle");
    $('body').removeClass('navBar-open');
    navLinks.forEach((link) => {
        link.style.animation = "";
    })
}


const closeNav = (event) => {
    if ((nav.classList.contains('nav-active')) && (event.target != nav) && (event.target != burger1 && event.target != burger2 && event.target != burger3)) {
        navClose();
    }
}



// Event listeners
window.addEventListener('scroll', headerBackground);
window.addEventListener('load', headerBackground);
window.addEventListener('mouseup', closeNav);
window.addEventListener('load', linkCurrentState);
window.addEventListener('scroll', linkCurrentState);
window.addEventListener('scroll', showHeaderName);


loadProjects();
navSlide();


