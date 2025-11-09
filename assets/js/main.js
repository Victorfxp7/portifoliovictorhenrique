import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

// ELEMENTOS
const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");

// SEÇÕES (CORREÇÃO IMPORTANTE!)
const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const knowledge = document.querySelector("#knowledge");
const contact = document.querySelector("#contact");

// ===================== INICIALIZAÇÃO =====================

window.addEventListener("load", function begin() {
  projetos(projectsSection);

  const desafioBtn = document.querySelector("#desafio");
  if (desafioBtn) {
    desafioBtn.addEventListener("click", () => {
      desafios(projectsSection);
      const backBtn = document.querySelector("#backToProjectsBtn");
      if (backBtn) backBtn.addEventListener("click", begin);
    });
  }
});

// ANIMAÇÃO DOS NOTEBOOKS — SEM QUEBRAR O onload
window.addEventListener("load", () => {
  setTimeout(() => {
    notebook_1.style.opacity = 0;
    notebook_1.style.animation = "none";
    notebook_2.style.animation = "none";
    notebook_2_white.style.animation = "none";
    vidro.style.animation = "none";
  }, 4000);
});

// ===================== SCROLL =====================

window.addEventListener("scroll", onScroll);
onScroll();

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  if (!section) return;

  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);
  if (!menuElement) return;

  menuElement.classList.remove("active");
  if (sectionBoundaries) menuElement.classList.add("active");
}

function showNavOnScroll() {
  navigation.classList.toggle("scroll", scrollY > 0);
}

function showBackToTopButtonOnScroll() {
  backToTopButton.classList.toggle("show", scrollY > 550);
}

// ===================== MENU =====================

function openMenu() {
  document.body.classList.add("menu-expanded");
}

function closeMenu() {
  document.body.classList.remove("menu-expanded");
}

// ===================== SCROLL REVEAL =====================

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(`
  #home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledge header,
  #knowledge .card,
  #contact,
  #contact header
`);

// ===================== TEMA CLARO =====================

// Salvar estado existente
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  if (toggle) toggle.checked = true;
}

// Alterar tema
if (toggle) {
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
  });
}
