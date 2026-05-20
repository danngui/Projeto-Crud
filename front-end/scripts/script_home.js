/* =========================
   ELEMENTOS
========================= */

const cadastroBox =
  document.getElementById("cadastroBox");

const loginBox =
  document.getElementById("loginBox");

const openLogin =
  document.getElementById("openLogin");

const openCadastro =
  document.getElementById("openCadastro");

/* =========================
   TOGGLE PASSWORD
========================= */

function setupPasswordToggle(
  inputId,
  buttonId
) {

  const input =
    document.getElementById(inputId);

  const button =
    document.getElementById(buttonId);

  button.addEventListener("click", () => {

    const isPassword =
      input.type === "password";

    input.type =
      isPassword ? "text" : "password";

    button.innerHTML = isPassword
      ? '<i class="fa-regular fa-eye-slash"></i>'
      : '<i class="fa-regular fa-eye"></i>';

  });

}

/* Cadastro */

setupPasswordToggle(
  "senha",
  "toggleSenha"
);

/* Login */

setupPasswordToggle(
  "login-senha",
  "toggleLoginSenha"
);

/* =========================
   TROCAR TELAS
========================= */

function showLogin() {

  cadastroBox.classList.remove("visible");
  cadastroBox.classList.add("hidden");

  loginBox.classList.remove("hidden");
  loginBox.classList.add("visible");

}

function showCadastro() {

  loginBox.classList.remove("visible");
  loginBox.classList.add("hidden");

  cadastroBox.classList.remove("hidden");
  cadastroBox.classList.add("visible");

}

/* =========================
   EVENTOS
========================= */

openLogin.addEventListener("click", (e) => {

  e.preventDefault();

  showLogin();

});

openCadastro.addEventListener("click", (e) => {

  e.preventDefault();

  showCadastro();

});

/* =========================
   ESTADO INICIAL
========================= */

cadastroBox.classList.add("visible");

loginBox.classList.add("hidden");

/* =========================
   LOGIN
========================= */

const loginForm =
  loginBox.querySelector("form");

loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const email =
    document
      .getElementById("login-email")
      .value;

  const senha =
    document
      .getElementById("login-senha")
      .value;

  /* Credenciais */

  if (
    email === "admin@gmail.com" &&
    senha === "admin"
  ) {

    /* Redirecionar */

    window.location.href =
      "dashboard.html";

  } else {

    alert("E-mail ou senha inválidos.");

  }

});