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
})