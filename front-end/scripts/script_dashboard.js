const newUserBtn = document.querySelector(".new-user")
const modal = document.getElementById("newUserModal")
const overlay = document.getElementById("modalOverlay")
const closeModal = document.getElementById("closeModal")

function openModal() {
  modal.classList.add("active")
  overlay.classList.add("active")
}

function closeUserModal() {
  modal.classList.remove("active")
  overlay.classList.remove("active")
}

newUserBtn.addEventListener("click", openModal)

closeModal.addEventListener("click", closeUserModal)

overlay.addEventListener("click", closeUserModal)

const dotsButtons = document.querySelectorAll(".dots")

dotsButtons.forEach((button) => {

  const icon = button.querySelector(".dots-icon")
  const menu = button.querySelector(".action-menu")

  icon.addEventListener("click", (event) => {

    event.stopPropagation()

    document.querySelectorAll(".action-menu").forEach((item) => {

      if(item !== menu){
        item.classList.remove("active")
      }

    })

    menu.classList.toggle("active")

  })

})

document.addEventListener("click", () => {

  document.querySelectorAll(".action-menu").forEach((menu) => {
    menu.classList.remove("active")
  })

/* PAGE TRANSITION */

document.querySelectorAll("[data-page]").forEach((item) => {

  item.addEventListener("click", function (e) {

    e.preventDefault();

    const target = this.getAttribute("data-page");

    if (!target) return;

    window.location.href = target;

  });

});

})