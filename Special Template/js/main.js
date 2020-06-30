// local storage 
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null){

    document.documentElement.style.setProperty('--main--color', localStorage.getItem("color_option"))

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active")

        if(element.dataset.color === mainColors){

            element.classList.add("active")

        }

    })

}

// Settings box
document.querySelector(".toggle-settings i").onclick = function(){

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");

}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li =>{

    li.addEventListener("click", (e) =>{

        document.documentElement.style.setProperty('--main--color', e.target.dataset.color)
        
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);

    })

})

// Random background
let backgroundOptin = true;

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null){

    if(backgroundLocalItem === "true"){

        backgroundOptin = true

    }else{

        backgroundOptin = false

    }

    document.querySelectorAll(".random-background span").forEach(element =>{

        element.classList.remove("active");

    })

    if(backgroundLocalItem === "true"){

        document.querySelector(".random-background .yes").classList.add("active")

    }else{
        document.querySelector(".random-background .no").classList.add("active")
    }

}

const randomBackgroundElement = document.querySelectorAll(".random-background span");

randomBackgroundElement.forEach(span =>{

    span.addEventListener("click", (e) =>{

        handleActive(e);

        if(e.target.dataset.background === "yes"){

            backgroundOptin = true;

            randomizeImgs();

            localStorage.setItem("background_option", true)

        }else{

            backgroundOptin = false;

            clearInterval(backgroundInterval)

            localStorage.setItem("background_option", false)

        }

    })

})

// slider
let landingPage = document.querySelector(".landing-page")

let imgArray = [
    "1.jpg","2.jpg","3.jpg","4.png"
]

function randomizeImgs(){

    if(backgroundOptin === true){

        backgroundInterval = setInterval(() => {

            let randomNumber = Math.floor(Math.random() * imgArray.length)
        
            landingPage.style.backgroundImage = 'url("imgs/' + imgArray[randomNumber] + '")'
        
        }, 1000)

    }else{



    }
}

randomizeImgs();


// Progress
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
    
    let skillsOffsetTop = ourSkills.offsetTop;

    let windowHeigt = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    let skillsOuterHeight = ourSkills.offsetHeight;

    console.log(skillsOffsetTop)

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeigt)){

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        })

    }

}

// Gallery
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img =>{

    img.addEventListener("click", (e) =>{

        let overlay = document.createElement("div");
        
        overlay.className = "popup-overlay";

        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");

        popupBox.className = "popup-box";

        if(img.alt !== null){

            let imgHeading = document.createElement("h3");

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading)
        }

        let popupImg = document.createElement("img");

        popupImg.src = img.src;

        popupBox.appendChild(popupImg);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");

        let closButtonText = document.createTextNode("X");

        closeButton.appendChild(closButtonText);

        closeButton.className = "close-button";

        popupBox.appendChild(closeButton);

    })

})

document.addEventListener("click", function(e){

    if(e.target.className == "close-button"){

        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();

    }

})  

// Bullets
let allBullests = document.querySelectorAll(".nav-bullets .bullet");

// links
let allLinks = document.querySelectorAll(".links a");

function scrollTo (elements){

    elements.forEach(ele =>{

        ele.addEventListener("click", (e)=>{
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: "smooth"
    
            })
    
        });
    
    });
}
scrollTo(allLinks);
scrollTo(allBullests);

// Handle Active state

function handleActive(ev){

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active")

    })

    ev.target.classList.add("active")
}

// Add Active class
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){

    bulletsContainer.style.display = "block";

    localStorage.setItem("bullets_option", "block");

    bulletsSpan.forEach(span =>{
        span.classList.remove("active")
    })

    if(bulletLocalItem ==="block"){

        bulletsContainer.style.display = "block"

        document.querySelector(".bullets-option .yes").classList.add("active")

    }else{
        
        bulletsContainer.style.display = "none"

        document.querySelector(".bullets-option .yes").classList.add("active")
    }

}

bulletsSpan.forEach(span =>{

    span.addEventListener("click",(e) =>{

        if(span.dataset.display === "show"){

            bulletsContainer.style.display = "block"

        }else{
            bulletsContainer.style.display = "none"
        }

        handleActive(e)
    })

})

document.querySelector(".reset-option").onclick = function(){

    localStorage.clear();
    window.location.reload(); 
}