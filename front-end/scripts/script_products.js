const newUserBtn = document.querySelector(".new-user");
const modal = document.getElementById("newUserModal");
const overlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

const productImage = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");

/* MODAL */

function openModal() {

  modal.classList.add("active");
  overlay.classList.add("active");

}

function closeUserModal() {

  modal.classList.remove("active");
  overlay.classList.remove("active");

}

newUserBtn.addEventListener("click", openModal);

closeModal.addEventListener("click", closeUserModal);

overlay.addEventListener("click", closeUserModal);

/* DOTS MENU */

const dotsButtons = document.querySelectorAll(".dots");

dotsButtons.forEach((button) => {

  const icon = button.querySelector(".dots-icon");
  const menu = button.querySelector(".action-menu");

  icon.addEventListener("click", (event) => {

    event.stopPropagation();

    document.querySelectorAll(".action-menu").forEach((item) => {

      if (item !== menu) {
        item.classList.remove("active");
      }

    });

    menu.classList.toggle("active");

  });

});

document.addEventListener("click", () => {

  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.classList.remove("active");
  });

});

/* IMAGE PREVIEW */

if (productImage) {

  productImage.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = function (e) {

        imagePreview.innerHTML = `
          <img src="${e.target.result}" alt="Preview">
        `;

      };

      reader.readAsDataURL(file);

    } else {

      imagePreview.innerHTML = `
        <span>Nenhuma imagem selecionada</span>
      `;

    }

  });

}