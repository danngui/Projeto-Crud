let editandoId = null;
let imagemBase64 = "";

// =========================
// MODAL
// =========================
const newUserBtn = document.querySelector(".new-user");
const modal = document.getElementById("newUserModal");
const overlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.querySelector(".modal-header h2");
const createBtn = document.querySelector(".create-user-btn");

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeUserModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  limparModal();
  editandoId = null;
}

if (newUserBtn) {
  newUserBtn.addEventListener("click", () => {
    editandoId = null;
    modalTitle.innerText = "Novo Produto";
    createBtn.innerText = "Criar Produto";
    limparModal();
    openModal();
  });
}

if (closeModal) closeModal.addEventListener("click", closeUserModal);
if (overlay) overlay.addEventListener("click", closeUserModal);

// =========================
// PREVIEW IMAGEM
// =========================
const imageInput = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");

if (imageInput) {
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      imagemBase64 = event.target.result;
      imagePreview.innerHTML = `<img src="${imagemBase64}" style="max-width:100%; border-radius:8px;">`;
    };
    reader.readAsDataURL(file);
  });
}

// =========================
// FORMATA PREÇO
// =========================
const precoInput = document.getElementById("precoProduto");
if (precoInput) {
  precoInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (!valor) return e.target.value = "";
    valor = (parseInt(valor) / 100).toFixed(2);
    valor = "R$ " + valor.replace(".", ",");
    e.target.value = valor;
  });
}

// =========================
// CREATE / EDIT PRODUTO
// =========================
createBtn.addEventListener("click", async () => {
  const nome = document.getElementById("nomeProduto").value;
  const categoria = document.getElementById("categoriaProduto").value;
  const preco = document.getElementById("precoProduto").value;
  const estoque = document.getElementById("estoqueProduto").value;
  const descricao = document.getElementById("descricaoProduto")?.value || "";

  let precoLimpo = String(preco)
    .replace("R$", "")
    .replace(/\s/g, "")
    .replace(",", ".")
    .trim();

  const url = editandoId
    ? "http://localhost/Projeto-Crud/back-end/scripts/atualizar_produto.php"
    : "http://localhost/Projeto-Crud/back-end/scripts/criar_produto.php";

  const body = {
    id: editandoId,
    nome,
    categoria,
    preco: precoLimpo,
    estoque,
    descricao,
    imagem: imagemBase64
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (data.erro) return alert(data.erro);
  alert(data.msg || (editandoId ? "Produto atualizado!" : "Produto criado!"));

  closeUserModal();
  await loadProducts();
});

// =========================
// CARREGAR PRODUTOS
// =========================
async function loadProducts() {
  const res = await fetch("http://localhost/Projeto-Crud/back-end/scripts/get_produto.php");
  const data = await res.json();

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  data.forEach((prod) => {
    const status = Number(prod.estoque) > 0 ? "Ativo" : "Sem estoque";
    const letra = prod.nome.charAt(0).toUpperCase();

    tbody.innerHTML += `
      <tr>
        <td>
          <div class="user">
            <div class="avatar">${letra}</div>
            ${prod.nome}
          </div>
        </td>
        <td>${prod.categoria}</td>
        <td>R$ ${Number(prod.preco).toFixed(2).replace(".", ",")}</td>
        <td>${prod.estoque}</td>
        <td class="status">${status}</td>
        <td class="dots">
          <img src="icons/dots.png" class="dots-icon">
          <div class="action-menu">
            <button class="action-item" 
              onclick="editProduct(${prod.id}, '${prod.nome}', '${prod.categoria}', '${prod.preco}', '${prod.estoque}', \`${prod.descricao || ""}\`, '${prod.imagem || ""}')">
              Editar
            </button>
            <button class="action-item" onclick="deleteProduct(${prod.id})">Deletar</button>
          </div>
        </td>
      </tr>
    `;
  });

  ativarMenus();
  updateDashboardStats(data);
}

// =========================
// MENU DOTS
// =========================
function ativarMenus() {
  document.querySelectorAll(".dots-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = icon.nextElementSibling;
      document.querySelectorAll(".action-menu").forEach((m) => {
        if (m !== menu) m.classList.remove("active");
      });
      menu.classList.toggle("active");
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".action-menu").forEach((menu) => menu.classList.remove("active"));
  });
}

// =========================
// EDITAR PRODUTO
// =========================
function editProduct(id, nome, categoria, preco, estoque, descricao, imagem) {
  editandoId = id;

  document.getElementById("nomeProduto").value = nome;
  document.getElementById("categoriaProduto").value = categoria;
  document.getElementById("estoqueProduto").value = estoque;
  document.getElementById("precoProduto").value = "R$ " + Number(preco).toFixed(2).replace(".", ",");
  document.getElementById("descricaoProduto").value = descricao;

  if (imagem) {
    imagemBase64 = imagem;
    imagePreview.innerHTML = `<img src="${imagem}" style="max-width:100%; border-radius:8px;">`;
  }

  modalTitle.innerText = "Editar Produto";
  createBtn.innerText = "Salvar Alterações";

  openModal();
}

// =========================
// DELETAR PRODUTO
// =========================
async function deleteProduct(id) {
  if (!confirm("Deseja deletar este produto?")) return;

  const res = await fetch("http://localhost/Projeto-Crud/back-end/scripts/deletar_produto.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  const data = await res.json();
  alert(data.msg || "Produto deletado!");
  await loadProducts();
}

// =========================
// LIMPAR MODAL
// =========================
function limparModal() {
  document.getElementById("nomeProduto").value = "";
  document.getElementById("categoriaProduto").value = "Sobremesa";
  document.getElementById("precoProduto").value = "";
  document.getElementById("estoqueProduto").value = "";
  if(document.getElementById("descricaoProduto")) document.getElementById("descricaoProduto").value = "";
  imagePreview.innerHTML = `<span>Nenhuma imagem selecionada</span>`;
  imagemBase64 = "";
  modalTitle.innerText = "Novo Produto";
  createBtn.innerText = "Criar Produto";
}

// =========================
// DASHBOARD STATS
// =========================
function updateDashboardStats(products) {
  const total = products.length;
  const ativos = products.filter(p => Number(p.estoque) > 0).length;
  const semEstoque = products.filter(p => Number(p.estoque) <= 0).length;

  document.getElementById("totalProdutos").innerText = total;
  document.getElementById("produtosAtivos").innerText = ativos;
  document.getElementById("semEstoque").innerText = semEstoque;
}

// =========================
// INIT
// =========================
loadProducts();