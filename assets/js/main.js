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

// SEÇÕES
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

// ANIMAÇÃO DOS NOTEBOOKS
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

// ===================== MENU (CÓDIGO CORRIGIDO) =====================

// Seleciona todos os links do menu para fechar o menu ao clicar
const menuLinks = document.querySelectorAll(".menu a");

/**
 * Adiciona a classe 'menu-expanded' ao body
 */
function openMenu() {
    // Adiciona a classe no body
    document.body.classList.add("menu-expanded");
}

/**
 * Remove a classe 'menu-expanded' do body
 */
function closeMenu() {
    // Remove a classe do body
    document.body.classList.remove("menu-expanded");
}

// 1. Configura os botões para ABRIR o menu
// (Usando a classe `.open` que você já tinha)
document.querySelectorAll(".open").forEach((btn) => {
    btn.addEventListener("click", openMenu);
});

// 2. Configura os botões e links para FECHAR o menu
// (Usando a classe `.close` e os links `a`)
document.querySelectorAll(".close").forEach((btn) => {
    btn.addEventListener("click", closeMenu);
});

menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});


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
