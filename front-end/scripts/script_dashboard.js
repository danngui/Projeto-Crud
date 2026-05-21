// Seleciona os elementos do DOM
const newUserBtn = document.querySelector(".new-user")
const modal = document.getElementById("newUserModal")
const overlay = document.getElementById("modalOverlay")
const closeModal = document.getElementById("closeModal")

// Função para abrir o modal
function openModal() {
  modal.classList.add("active")
  overlay.classList.add("active")
}

// Função para fechar o modal
function closeUserModal() {
  modal.classList.remove("active")
  overlay.classList.remove("active")
}

// Evento de clique no botão "novo usuário"
newUserBtn.addEventListener("click", openModal)

// Evento de clique no botão de fechar modal
closeModal.addEventListener("click", closeUserModal)

// Fecha o modal ao clicar no fundo escurecido (overlay)
overlay.addEventListener("click", closeUserModal)

// Seleciona todos os botões de três pontinhos
const dotsButtons = document.querySelectorAll(".dots")

dotsButtons.forEach((button) => {

  // Seleciona o ícone e o menu de ações dentro do botão
  const icon = button.querySelector(".dots-icon")
  const menu = button.querySelector(".action-menu")

  // Evento ao clicar no ícone
  icon.addEventListener("click", (event) => {

    // Impede que o clique se propague para o documento
    event.stopPropagation()

    // Fecha todos os menus, exceto o atual
    document.querySelectorAll(".action-menu").forEach((item) => {

      if(item !== menu){
        item.classList.remove("active")
      }

    })

    // Alterna a visibilidade do menu atual
    menu.classList.toggle("active")

  })

})

// Fecha todos os menus ao clicar fora deles
document.addEventListener("click", () => {

  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.classList.remove("active")
  })

  /* TRANSIÇÃO DE PÁGINA */

  // Seleciona todos os elementos que possuem o atributo data-page
  document.querySelectorAll("[data-page]").forEach((item) => {

    item.addEventListener("click", function (e) {

      // Impede o comportamento padrão do link
      e.preventDefault();

      // Obtém o destino da navegação
      const target = this.getAttribute("data-page");

      // Se não houver destino, encerra a função
      if (!target) return;

      // Redireciona para a página alvo
      window.location.href = target;

    });

  });

})