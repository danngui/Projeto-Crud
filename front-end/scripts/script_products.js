// Seleciona os elementos principais da página
const newUserBtn = document.querySelector(".new-user");
const modal = document.getElementById("newUserModal");
const overlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

// Elementos da pré-visualização da imagem
const productImage = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");

/* MODAL */

// Função para abrir o modal
function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Função para fechar o modal
function closeUserModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Adiciona eventos apenas se os elementos existirem
if (newUserBtn) newUserBtn.addEventListener("click", openModal);

if (closeModal) closeModal.addEventListener("click", closeUserModal);

if (overlay) overlay.addEventListener("click", closeUserModal);

/* MENU DOS TRÊS PONTOS (DOTS MENU) */

// Percorre todos os botões de menu
document.querySelectorAll(".dots").forEach((button) => {

  // Seleciona o ícone e o menu interno
  const icon = button.querySelector(".dots-icon");
  const menu = button.querySelector(".action-menu");

  // Se não existir ícone ou menu, interrompe
  if (!icon || !menu) return;

  // Evento de clique no ícone
  icon.addEventListener("click", (event) => {

    // Impede propagação do clique
    event.stopPropagation();

    // Fecha outros menus abertos
    document.querySelectorAll(".action-menu").forEach((item) => {

      if (item !== menu) {
        item.classList.remove("active");
      }

    });

    // Abre ou fecha o menu atual
    menu.classList.toggle("active");

  });

});

// Fecha todos os menus ao clicar fora deles
document.addEventListener("click", () => {

  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.classList.remove("active");
  });

});

/* PRÉ-VISUALIZAÇÃO DE IMAGEM */

if (productImage) {

  // Evento ao selecionar uma imagem
  productImage.addEventListener("change", function () {

    // Pega o primeiro arquivo selecionado
    const file = this.files[0];

    if (file) {

      // Cria leitor de arquivo
      const reader = new FileReader();

      // Quando a leitura terminar
      reader.onload = function (e) {

        // Exibe a imagem na pré-visualização
        imagePreview.innerHTML = `
          <img src="${e.target.result}" alt="Preview">
        `;

      };

      // Lê o arquivo como URL
      reader.readAsDataURL(file);

    } else {

      // Caso nenhuma imagem seja selecionada
      imagePreview.innerHTML = `
        <span>Nenhuma imagem selecionada</span>
      `;

    }

  });

}

/* TRANSIÇÃO DE PÁGINA */

// Seleciona todos os elementos com atributo data-page
document.querySelectorAll("[data-page]").forEach((item) => {

  item.addEventListener("click", function (e) {

    // Impede o comportamento padrão
    e.preventDefault();

    // Obtém o destino da navegação
    const target = this.getAttribute("data-page");

    // Se não houver destino, encerra
    if (!target) return;

    // Redireciona para a página desejada
    window.location.href = target;

  });

});