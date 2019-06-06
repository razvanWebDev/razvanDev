const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.menuButtons');

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


//Load Projects from JSON
function loadProjects (){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
       if(this.readyState == 4 && this.status == 200) {
        //    console.log('response: ' + xhttp.responseText);
           var projects = JSON.parse(xhttp.responseText);
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


// Event listeners
window.addEventListener("scroll", headerBackground);
window.addEventListener("load", headerBackground);

loadProjects ();