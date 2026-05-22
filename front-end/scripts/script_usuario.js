// =========================
// PROTEÇÃO
// =========================
const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "home.html";
}

const userData = JSON.parse(user);

// =========================
// ELEMENTOS
// =========================
const nomeEl = document.querySelector(".profile-name");
const emailEl = document.querySelector(".profile-email");

const valores = document.querySelectorAll(".profile-value");
const avatar = document.querySelector(".profile-avatar");

// =========================
// PREENCHER COM LOCALSTORAGE
// =========================
function preencherUsuario() {

  const nome = userData.usuario?.nome || "Usuário";
  const email = userData.usuario?.email || "Email";

  nomeEl.textContent = nome;
  emailEl.textContent = email;

  avatar.textContent = nome.charAt(0).toUpperCase();

  valores[0].textContent = nome;
  valores[1].textContent = email;
  valores[2].textContent = "Usuário";
  valores[3].textContent = "Ativo";

  // ⚠️ NÃO USA data aqui
  valores[4].textContent = "-";
  valores[5].textContent = "-";
}

preencherUsuario();

// =========================
// BUSCAR DO BANCO (OPCIONAL - MELHOR)
// =========================
async function buscarUsuarioBanco() {
  try {

    const res = await fetch("http://localhost/Projeto-Crud/back-end/scripts/me.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userData.usuario.email
      })
    });

    const data = await res.json();

    if (data.erro) return;

    // atualizar UI com dados reais
    nomeEl.textContent = data.nome;
    emailEl.textContent = data.email;

    avatar.textContent = data.nome.charAt(0).toUpperCase();

    valores[0].textContent = data.nome;
    valores[1].textContent = data.email;
    valores[2].textContent = data.cargo || "Usuário";
    valores[3].textContent = "Ativo";
valores[4].textContent = data.created_at 
  ? formatarDataHora(data.created_at)
  : "-";

valores[5].textContent = data.last_login 
  ? formatarDataHora(data.last_login)
  : "Primeiro acesso";

  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
  }
}

function formatarDataHora(data) {
  const d = new Date(data);

  const hoje = new Date();

  const mesmoDia =
    d.getDate() === hoje.getDate() &&
    d.getMonth() === hoje.getMonth() &&
    d.getFullYear() === hoje.getFullYear();

  const hora = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (mesmoDia) {
    return `Hoje às ${hora}`;
  }

  return d.toLocaleDateString("pt-BR") + ` às ${hora}`;
}

// chama banco
buscarUsuarioBanco();

// =========================
// LOGOUT
// =========================
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {

    const confirmar = confirm("Deseja sair da conta?");

    if (!confirmar) return;

    // limpa sessão
    localStorage.removeItem("user");

    // redireciona pro login
    window.location.href = "home.html";

  });
}

// =========================
// NAVEGAÇÃO (data-page)
// =========================
document.querySelectorAll("[data-page]").forEach((item) => {

  item.addEventListener("click", function (e) {

    e.preventDefault();

    const target = this.getAttribute("data-page");

    if (!target) return;

    window.location.href = target;

  });

});