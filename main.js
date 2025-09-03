document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-menu");
  const navbar = document.getElementById("navbar");
  const main = document.querySelector("main");
  const navLinks = document.querySelectorAll(".a-nav");
  const devTypesH2 = document.querySelector("#dev-types");
  const sections = document.querySelectorAll(
  "#body-main-section, #sobre-mi-section, #resumen-section, #habilidades-section, #contacto-section"
  )

  const arrayTypes = ["Web Developer", "Frontend Developer", "Backend Developer"];
  let index = 0;
  let isDeleting = false;
  let text = "";
  let typingSpeed = 100;
  let pauseTime = 2000;

  //funcion que simula el efecto de escritura con los textos de arrayTypes
  function typeWriter() {
    const currentText = arrayTypes[index];
    
    if (isDeleting) {
        text = currentText.substring(0, text.length - 1);
        typingSpeed = 50;
    } else {
        text = currentText.substring(0, text.length + 1);
        typingSpeed = 100;
    }

    devTypesH2.textContent = text;
    
    if (!isDeleting && text === currentText) {
        typingSpeed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && text === "") {
        isDeleting = false;
        index = (index + 1) % arrayTypes.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
  }
  //boton menu muestra y oculta el navbar
  toggleButton.addEventListener("click", () => {
    const icon = toggleButton.querySelector("i")

    navbar.classList.toggle("active")
    main.classList.toggle("nav-shifted")

    if (navbar.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  //navegacion entre secciones, ocultar y mostrar secciones removiendo clase hidden-section
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetSectionId = link.getAttribute("data-section")
      
      if (targetSectionId) {
        sections.forEach(section => {
            section.classList.add("hidden-section");
        })
        
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
          targetSection.classList.remove("hidden-section");
        }
      }

      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        main.classList.remove("nav-shifted");
        toggleButton.querySelector("i").classList.replace("fa-times", "fa-bars")
      }
    })
  })

  typeWriter()

  const emailHTml = document.getElementById("form-contacto")
  const buttonEmail = document.querySelector("#btnEmail")
  const inputName = document.querySelector("#inputName")
  const inputEmail = document.querySelector("#inputEmail")
  const inputMsj = document.querySelector("#inputMsj")
  const allInputs = document.querySelectorAll("#inputEmail , #inputName, #inputMsj")

  function inputLoop(borderStyle, borderBottom= false){

    allInputs.forEach(inp =>{

      if(borderBottom == false){
        inp.value = ""
        inp.style.border = borderStyle
      } else {
        inp.style.borderBottom = "2px solid gray"
      }
    })

  }

  buttonEmail.onclick=(e)=>{

    e.preventDefault()

    if(inputEmail.value != "" && inputName.value != ""){

      inputLoop("1px solid green")
      
      emailjs.init("5WlXzf6wPkuMVj5Cw")
      emailjs.sendForm("service_qgxp3z1", "template_k3f382c", emailHTml)
      
      .then(() => {
    
        inputLoop("none")

        inputLoop("", true)

      })
      .catch((err) => console.error("Error:", err));

    } else{      
      inputLoop("1px solid red")
    }


  }


})