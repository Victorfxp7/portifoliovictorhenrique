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

// ===================== MENU (CÓDIGO REFATORADO) =====================

// Seleciona todos os botões que interagem com o menu (abrir e fechar)
const menuToggleBtns = document.querySelectorAll(".open, .close, .menu a");

/**
 * Alterna a classe 'menu-expanded' no body.
 * Adiciona também a função de fechar o menu ao clicar em um link.
 */
function toggleMenu() {
    document.body.classList.toggle("menu-expanded");
}

// Configura os eventos de clique para abrir/fechar o menu
menuToggleBtns.forEach((btn) => {
    // Para botões de abrir/fechar E LINKS (para fechar após navegar)
    btn.addEventListener("click", () => {
        // Se o elemento clicado for um link, ele fecha o menu.
        // Se for um botão (.open ou .close), ele alterna o estado.
        if (btn.tagName === 'A' || btn.classList.contains('open') || btn.classList.contains('close')) {
            toggleMenu();
        }
    });
});

// REMOVIDO: As funções 'openMenu()' e 'closeMenu()' não são mais necessárias.
// As chamadas 'openMenu();' e 'closeMenu();' no final do script foram removidas, 
// pois a lógica agora é aplicada via 'addEventListener' diretamente.


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
