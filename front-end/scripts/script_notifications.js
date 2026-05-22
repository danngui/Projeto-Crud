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
// NOTIFICAÇÕES
// =========================
async function loadNotifications() {

  const res = await fetch(
    "http://localhost/Projeto-Crud/back-end/scripts/get_notificacao.php"
  );

  const notifications = await res.json();

  const container =
    document.getElementById("notificationsList");

  container.innerHTML = "";

  notifications.forEach((notif) => {

    const tempo = formatarTempo(notif.created_at);

    container.innerHTML += `

      <div class="notification-item">

        <div class="notification-left">

          <div class="notification-dot"></div>

          <div class="notification-text">

            <h3>${notif.titulo}</h3>

            <p>${notif.descricao}</p>

          </div>

        </div>

        <span class="notification-time">
          ${tempo}
        </span>

      </div>

    `;
  });

}

function formatarTempo(data) {

  const agora = new Date();

  const criada = new Date(data);

  const diff =
    Math.floor((agora - criada) / 1000);

  if (diff < 60) {
    return "Agora";
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)} min atrás`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h atrás`;
  }

  return `${Math.floor(diff / 86400)}d atrás`;
}

loadNotifications();