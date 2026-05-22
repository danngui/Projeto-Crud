// =========================
// CARREGAR CARDÁPIO DO BANCO (ATUALIZADO)
// =========================

async function loadCardapio() {

  const res = await fetch(
    "http://localhost/Projeto-Crud/back-end/scripts/get_produto.php"
  );

  const data = await res.json();

  const grid = document.querySelector(".products-grid");

  grid.innerHTML = "";

  data.forEach(prod => {

    const imagem = prod.imagem
      ? prod.imagem
      : "img/default.jpg";

    const descricao = prod.descricao
      ? prod.descricao
      : "Produto disponível no sistema.";

    const preco = Number(prod.preco)
      .toFixed(2)
      .replace(".", ",");

    const estoque = Number(prod.estoque);

    const card = document.createElement("div");
    card.classList.add("store-product-card");

    card.innerHTML = `
      <div class="store-product-image">
        <img src="${imagem}" alt="${prod.nome}">
      </div>

      <div class="store-product-content">

        <div class="store-product-top">
          <h3>${prod.nome}</h3>

          <span class="product-category">
            ${prod.categoria}
          </span>
        </div>

        <p class="product-description">
          ${descricao}
        </p>

        <div class="product-price">
          R$ ${preco}
        </div>

        <div class="product-stock">
          Estoque: ${estoque}
        </div>

        <div class="store-product-actions">

          <button class="buy-btn">Comprar</button>
          <button class="details-btn">Detalhes</button>

        </div>

      </div>
    `;

    grid.appendChild(card);
  });
}

// init
loadCardapio();