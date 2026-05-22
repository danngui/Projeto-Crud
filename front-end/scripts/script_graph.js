// =========================
// NAVEGAÇÃO
// =========================
document.querySelectorAll("[data-page]").forEach((item) => {

  item.addEventListener("click", function () {

    const target = this.getAttribute("data-page");

    if (!target) return;

    window.location.href = target;

  });

});

// =========================
// DASHBOARD
// =========================
async function loadDashboard() {

  const res = await fetch(
    "http://localhost/Projeto-Crud/back-end/scripts/get_produto.php"
  );

  const produtos = await res.json();

  const tbody = document.getElementById("graphTableBody");

  tbody.innerHTML = "";

  let totalReceita = 0;
  let totalPedidos = 0;

  produtos.forEach((prod) => {

    // PADRÃO
    const vendas = 0;

    const preco = Number(prod.preco);

    const receita = vendas * preco;

    totalReceita += receita;
    totalPedidos += vendas;

    const status =
      Number(prod.estoque) > 0
        ? "Disponível"
        : "Sem estoque";

    const letra = prod.nome.charAt(0).toUpperCase();

    tbody.innerHTML += `
      <tr>

        <td>

          <div class="user">

            <div class="avatar">
              ${letra}
            </div>

            ${prod.nome}

          </div>

        </td>

        <td>${vendas}</td>

        <td>
          R$ ${receita.toFixed(2).replace(".", ",")}
        </td>

        <td class="status">
          ${status}
        </td>

      </tr>
    `;
  });

  // =========================
  // CARDS
  // =========================
  document.getElementById("totalReceita").innerText =
    `R$ ${totalReceita.toFixed(2).replace(".", ",")}`;

  document.getElementById("totalPedidos").innerText =
    totalPedidos;

  document.getElementById("clientesOnline").innerText =
    0;

}

loadDashboard();