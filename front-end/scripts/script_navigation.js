document.querySelectorAll("[data-page]").forEach((item) => {

  item.addEventListener("click", function () {

    const target = this.getAttribute("data-page");

    if (target) {
      window.location.href = target;
    }

  });

});