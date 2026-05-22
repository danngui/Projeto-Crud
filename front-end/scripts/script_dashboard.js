// =========================
// PROTEÇÃO
// =========================
const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "home.html";
}

// =========================
// MODAL
// =========================
const modal = document.getElementById("newUserModal");
const overlay = document.getElementById("modalOverlay");
const openBtn = document.querySelector(".new-user");
const closeBtn = document.getElementById("closeModal");
const createBtn = document.querySelector(".create-user-btn");

let editandoUsuarioId = null;

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");

  resetModal();
}

openBtn.addEventListener("click", () => {
  editandoUsuarioId = null;
  resetModal();
  openModal();
});

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// =========================
// RESET MODAL
// =========================
function resetModal() {
  document.querySelector("#nome").value = "";
  document.querySelector("#sobrenome").value = "";
  document.querySelector("#email").value = "";

  document.querySelector(".modal-header h2").innerText = "Novo Usuário";
  document.querySelector(".create-user-btn").innerText = "Criar Usuário";
}

// =========================
// CARREGAR USUÁRIOS
// =========================

function closeUserModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");

  resetModal();
  editandoUsuarioId = null;
}

async function carregarUsuarios() {

  const res = await fetch(
    "http://localhost/Projeto-Crud/back-end/scripts/listar_usuarios.php"
  );

  const data = await res.json();

  const tbody = document.getElementById("tbodyUsuarios");
  tbody.innerHTML = "";

  data.forEach(usuario => {

    const tr = document.createElement("tr");

    const letra = usuario.nome.charAt(0).toUpperCase();

    tr.innerHTML = `
      <td>
        <div class="user">
          <div class="avatar">${letra}</div>
          ${usuario.nome}
        </div>
      </td>

      <td>${usuario.email}</td>

      <td class="status">Ativo</td>

      <td>${formatarData(usuario.created_at)}</td>

      <td class="dots">

        <img src="icons/dots.png" class="dots-icon">

        <div class="action-menu">

          <button class="action-item edit-btn"
            data-id="${usuario.id}"
            data-nome="${usuario.nome}"
            data-email="${usuario.email}">
            Editar
          </button>

          <button class="action-item delete-btn"
            data-id="${usuario.id}">
            Deletar
          </button>

        </div>

      </td>
    `;

    tbody.appendChild(tr);
  });

  ativarEventos();
}

// =========================
// FORMATAR DATA
// =========================
function formatarData(data) {
  if (!data) return "-";
  return new Date(data).toLocaleDateString("pt-BR");
}

// =========================
// MENU DOTS
// =========================
function ativarEventos() {

  document.querySelectorAll(".dots-icon").forEach(icon => {

    icon.onclick = (e) => {

      e.stopPropagation();

      const menu = icon.nextElementSibling;

      document.querySelectorAll(".action-menu")
        .forEach(m => m.classList.remove("active"));

      menu.classList.toggle("active");
    };
  });

}

// fechar menus
document.addEventListener("click", () => {
  document.querySelectorAll(".action-menu")
    .forEach(m => m.classList.remove("active"));
});

// =========================
// CLICK GLOBAL (EDITAR / DELETAR)
// =========================
document.addEventListener("click", (e) => {

  // EDITAR
  if (e.target.classList.contains("edit-btn")) {

    const id = e.target.dataset.id;
    const nome = e.target.dataset.nome;
    const email = e.target.dataset.email;

    editandoUsuarioId = id;

    const partes = nome.split(" ");

    document.querySelector("#nome").value = partes[0];
    document.querySelector("#sobrenome").value = partes.slice(1).join(" ");
    document.querySelector("#email").value = email;

    document.querySelector(".modal-header h2").innerText = "Editar Usuário";
    document.querySelector(".create-user-btn").innerText = "Salvar Alterações";

    openModal();
  }

  // DELETAR
  if (e.target.classList.contains("delete-btn")) {

    const id = e.target.dataset.id;

    deletarUsuario(id);
  }

});

// =========================
// CRIAR / EDITAR
// =========================
createBtn.addEventListener("click", async () => {

  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;

  const payload = {
    nome: `${nome} ${sobrenome}`,
    email
  };

  let url = "http://localhost/Projeto-Crud/back-end/scripts/cadastro.php";

  // 🔥 SE ESTIVER EDITANDO
  if (editandoUsuarioId) {
    url = "http://localhost/Projeto-Crud/back-end/scripts/atualizar_usuario.php";
    payload.id = editandoUsuarioId;
  } else {
    payload.senha = "123456";
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  console.log(data);

  closeUserModal();
  carregarUsuarios();

  editandoUsuarioId = null;
});

// =========================
// DELETAR
// =========================
async function deletarUsuario(id) {

  const confirmar = confirm("Deseja deletar este usuário?");

  if (!confirmar) return;

  await fetch(
    "http://localhost/Projeto-Crud/back-end/scripts/deletar_usuario.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    }
  );

  carregarUsuarios();
}

// =========================
// INIT
// =========================
carregarUsuarios();