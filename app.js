//DOM elements
const header = $("header");
const nav_height = header.outerHeight();
const headerName = document.querySelector("#header-name");
const burger = document.querySelector(".burger");
const burger1 = document.querySelector(".line1");
const burger2 = document.querySelector(".line2");
const burger3 = document.querySelector(".line3");
const nav = document.querySelector("#header-links");
const navLinks = document.querySelectorAll(".menu-buttons");
const resume = $(".resume");
const links = document.querySelectorAll(".menuButtons");
const sections = $("section");
const labelTransform = document.querySelectorAll(".label-transform");

// Show header name & background depending on scroll and window width
const showHeaderName = () => {
  const width = window.innerWidth;
  if (width <= 768) {
    headerName.style.color = "#fdde2be6";
    if (window.scrollY < 30) {
      headerName.style.display = "none";
    } else {
      headerName.style.display = "block";
    }
  } else if (width > 768 && width <= 1024) {
    headerName.style.display = "none";
    if (window.scrollY > 100) {
      header.addClass("yellow-header");
      links.forEach(link => link.classList.add("black-text"));
    } else {
      header.removeClass("yellow-header");
      links.forEach(link => link.classList.remove("black-text"));
    }
  } else {
    headerName.style.display = "block";
    if (window.scrollY > 100) {
      headerName.style.opacity = "1";
      header.addClass("yellow-header");
      nav.style.padding = "0.8em 0";
      links.forEach(link => link.classList.add("black-text"));
    } else {
      headerName.style.opacity = "0";
      header.removeClass("yellow-header");
      nav.style.padding = "2.5em 0";
      links.forEach(link => link.classList.remove("black-text"));
    }
  }
};

//Change active state navlinks on scroll
const linkCurrentState = () => {
  const cur_pos = $(this).scrollTop();
  sections.each(function() {
    const top = $(this).offset().top - nav_height - 200;
    const bottom = top + $(this).outerHeight();
    if (cur_pos >= top && cur_pos <= bottom) {
      header.find("a").removeClass("current black");
      let linkName = $(this).attr("id");
      linkName = linkName.slice(0, linkName.length - 8);
      header.find(`a[data-page= ${linkName}]`).addClass("current");
      if (cur_pos < 100) {
        header.find(`a[data-page= ${linkName}]`).addClass("black");
      }
    }
  });
};

//Scroll page on click
$(".menuButtons").on("click", function(e) {
  const idName = $(this).attr("data-page");
  const x = window.innerWidth;
  let headerHeight = $(window).height() * 0.062;

  $("html, body").animate(
    {
      scrollTop: $("#" + idName + "-section").offset().top - headerHeight
    },
    1200
  );
});

const navSlide = () => {
  burger.addEventListener("click", () => {
    // toggle nav
    nav.classList.toggle("nav-active");
    if (nav.classList.contains("nav-active")) {
      nav.style.animation = `navSlide 0.5s forwards`;
      $("body").addClass("navBar-open");
    } else {
      nav.style.animation = `navSlideOut 0.5s`;
      $("body").removeClass("navBar-open");
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
};

const navClose = () => {
  nav.style.animation = `navSlideOut 0.5s`;
  nav.classList.remove("nav-active");
  burger.classList.remove("toggle");
  $("body").removeClass("navBar-open");
  navLinks.forEach(link => {
    link.style.animation = "";
  });
};

const closeNav = event => {
  if (
    nav.classList.contains("nav-active") &&
    event.target != nav &&
    event.target != burger1 &&
    event.target != burger2 &&
    event.target != burger3
  ) {
    navClose();
  }
};

//Load Projects from JSON
function loadProjects() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const projects = JSON.parse(xhttp.responseText);
      displayProjects(projects);
    }
  };
  xhttp.open("GET", "projects.json", true);
  xhttp.send();
}

//DISPLAY PROJECTS
function displayProjects(projects) {
  const resultList = document.querySelector(".projects");
  const listItems = projects.map(function(project) {
    const name = project.name;
    const image = project.imgPath;
    const codeLink = project.codeLink;
    const demoLink = project.demoLink;
    const description = project.description;
    const skillsUsed = project.skillsUsed;

    return `<div class="project-div">
              <div class="img-container">
                <img src = ${image} alt=${name} class="project-pic">
                <div class="project-links">
                  <a href="${codeLink}" target="_blank" rel="noopener" title="View Code">
                    <button class="btn">Code</button>
                  </a>
                  <a href="${demoLink}" target="_blank" rel="noopener" title="View Demo">
                    <button class="btn">Demo</button>
                 </a>
                </div>
              </div>
              <div class="project-description">
                <h3>${name} </h3>
                <p>${description}<br><br><span class="white-text">Skills used: </span>${skillsUsed}</p>
              </div>  
            </div>`;
  });
  resultList.innerHTML = listItems.join("");
}

// Form labels animations
const moveUp = input => {
  const labelName = input.getAttribute("name");
  const currenLAbel = document.querySelector(`.label-${labelName}`);
  currenLAbel.classList.add("moveUp");
};

const moveDown = input => {
  const labelName = input.getAttribute("name");
  const currenLAbel = document.querySelector(`.label-${labelName}`);
  if (input.value == "") {
    currenLAbel.classList.remove("moveUp");
  }
};
// Event listeners
window.addEventListener("mouseup", closeNav);
window.addEventListener("load", linkCurrentState);
window.addEventListener("scroll", linkCurrentState);
window.addEventListener("scroll", showHeaderName);
window.addEventListener("load", showHeaderName);

labelTransform.forEach(input =>
  input.addEventListener("focus", () => moveUp(input))
);
labelTransform.forEach(input =>
  input.addEventListener("focusout", () => moveDown(input))
);

loadProjects();
navSlide();
