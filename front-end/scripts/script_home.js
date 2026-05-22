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

function setupPasswordToggle(inputId, buttonId) {

  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);

  if (input && button) {
    button.addEventListener("click", () => {

      const isPassword = input.type === "password";

      input.type = isPassword ? "text" : "password";

      button.innerHTML = isPassword
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';

    });
  }
}

/* Cadastro */
setupPasswordToggle("senha", "toggleSenha");

/* Login */
setupPasswordToggle("login-senha", "toggleLoginSenha");

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
   LOGIN REAL (PHP + MYSQL)
========================= */

const loginForm =
  loginBox.querySelector("form");

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email =
    document.getElementById("login-email").value;

  const senha =
    document.getElementById("login-senha").value;

  try {

    const res = await fetch("http://localhost/Projeto-Crud/back-end/scripts/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (data.erro) {
      alert(data.erro);
      return;
    }

    // salva usuário
    localStorage.setItem("user", JSON.stringify(data));

    // redireciona
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o servidor");
  }

});

/* =========================
   CADASTRO REAL (PHP + MYSQL)
========================= */

const cadastroForm =
  cadastroBox.querySelector("form");

cadastroForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const nome =
    document.getElementById("nome").value;

  const email =
    document.getElementById("email").value;

  const senha =
    document.getElementById("senha").value;

  try {

    const res = await fetch("http://localhost/Projeto-Crud/back-end/scripts/cadastro.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await res.json();

    if (data.erro) {
      alert(data.erro);
      return;
    }

    alert("Cadastro realizado com sucesso!");

    // muda pra login
    showLogin();

  } catch (err) {
    console.error(err);
    alert("Erro no cadastro");
  }

});