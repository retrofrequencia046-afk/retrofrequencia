/* RetroFrequência — comportamento do site */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  const formatarPreco = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Abre a conversa (Direct) com o perfil da loja no Instagram
  const linkDirect = "https://ig.me/m/" + LOJA.instagram;
  const linkPerfil = "https://instagram.com/" + LOJA.instagram;
  const linkMessenger = LOJA.messenger ? "https://m.me/" + LOJA.messenger : linkDirect;

  function capaSVG(p) {
    const [c1, c2] = p.cores || ["#FF7A1A", "#FF3D7F"];
    const id = "g" + p.id.replace(/\W/g, "");
    return `
      <svg viewBox="0 0 200 120" role="img" aria-label="Capa da playlist ${p.nome}">
        <defs>
          <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
          </linearGradient>
        </defs>
        <rect width="200" height="120" fill="url(#${id})"/>
        <text x="190" y="16" text-anchor="end" font-family="Rubik, sans-serif" font-weight="800" font-size="7" letter-spacing="1.2" fill="#fff" opacity=".9">@RETROFREQUENCIA</text>
        <rect x="44" y="24" width="112" height="64" rx="8" fill="#0B0A09"/>
        <rect x="52" y="31" width="96" height="24" rx="4" fill="#F5EFE6"/>
        <text x="100" y="48" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="900" font-size="12" fill="#0B0A09" textLength="86" lengthAdjust="spacingAndGlyphs">${p.nome.toUpperCase().slice(0, 18)}</text>
        <rect x="70" y="61" width="60" height="20" rx="10" fill="#2B2520"/>
        <circle cx="82" cy="71" r="6.5" fill="#F5EFE6"/><circle cx="82" cy="71" r="2.5" fill="#0B0A09"/>
        <circle cx="118" cy="71" r="6.5" fill="#F5EFE6"/><circle cx="118" cy="71" r="2.5" fill="#0B0A09"/>
        <text x="100" y="109" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="900" font-size="14" fill="#FFE066">» APENAS ${formatarPreco(p.preco).replace(/\s/g, " ")} «</text>
      </svg>`;
  }

  function capaMini(p) {
    const [c1, c2] = p.cores || ["#FF7A1A", "#FF3D7F"];
    const id = "m" + p.id.replace(/\W/g, "");
    return `
      <svg viewBox="0 0 100 100" role="img" aria-label="Capa da playlist ${p.nome}">
        <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
        <rect width="100" height="100" fill="url(#${id})"/>
        <rect x="14" y="26" width="72" height="48" rx="6" fill="#0B0A09"/>
        <rect x="20" y="29" width="60" height="17" rx="3" fill="#F5EFE6"/>
        <text x="50" y="42" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="900" font-size="12" fill="#0B0A09" ${(p.capaTexto || "80's").length > 4 ? 'textLength="52" lengthAdjust="spacingAndGlyphs"' : ""}>${p.capaTexto || "80's"}</text>
        <rect x="32" y="52" width="36" height="14" rx="7" fill="#2B2520"/>
        <circle cx="40" cy="59" r="4.5" fill="#F5EFE6"/><circle cx="60" cy="59" r="4.5" fill="#F5EFE6"/>
      </svg>`;
  }

  /* ---------- Estatísticas (Umami) ---------- */
  if (LOJA.umami) {
    const um = document.createElement("script");
    um.defer = true;
    um.src = "https://cloud.umami.is/script.js";
    um.dataset.websiteId = LOJA.umami;
    document.head.appendChild(um);
  }
  // Registra um clique/ação com o nome da playlist (quando houver)
  function contar(evento, playlist) {
    if (!LOJA.umami) return;
    let tentativas = 0;
    const enviar = () => {
      if (window.umami && window.umami.track) {
        window.umami.track(evento, playlist ? { playlist } : undefined);
      } else if (tentativas++ < 25) {
        setTimeout(enviar, 300);
      }
    };
    enviar();
  }

  /* ---------- Links gerais ---------- */
  document.querySelectorAll(".js-direct").forEach((a) => {
    a.addEventListener("click", () => contar("pediu-ajuda-instagram"));
  });
  document.querySelectorAll(".js-direct").forEach((a) => {
    a.href = linkDirect; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll(".js-messenger").forEach((a) => {
    a.href = linkMessenger; a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", () => contar("pediu-ajuda-messenger"));
  });
  document.querySelectorAll(".js-perfil").forEach((a) => {
    a.href = linkPerfil; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll(".js-arroba").forEach((el) => { el.textContent = "@" + LOJA.instagram; });
  const em = document.getElementById("link-email");
  if (em) em.href = "mailto:" + LOJA.email;
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Vitrine ---------- */
  const lista = document.getElementById("lista-produtos");
  if (lista) {
    const ordenados = [...PRODUTOS].sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    lista.innerHTML = ordenados.map((p, i) => `
      <article class="card card--v2 card--cor${i % 2}${p.destaque ? " card--destaque" : ""}">
        ${p.selo ? `<span class="card__selo">${p.selo}</span>` : ""}
        <div class="card__topo">
          <div class="card__thumb">${capaMini(p)}</div>
          <div class="card__info">
            <h2 class="card__nome">${p.nome}</h2>
            <p class="card__sub">${p.subtitulo || ""}</p>
            <p class="card__preco">${formatarPreco(p.preco)} <small>no Pix</small></p>
          </div>
        </div>
        <div class="card__corpo">
          ${p.destaques ? `
          <div class="faixas">
            <p class="faixas__titulo">Algumas das ${p.musicas} músicas:</p>
            <ul class="faixas__lista">${p.destaques.map(([m, a]) => `<li><b>${m}</b> <span>${a}</span></li>`).join("")}</ul>
            <p class="faixas__mais">+ ${p.musicas - p.destaques.length} outros sucessos</p>
          </div>` : ""}
          <a class="btn btn--comprar" href="pagamento.html?produto=${encodeURIComponent(p.id)}">Quero esta playlist</a>
          <p class="card__spotify"><span class="spotify-ponto" aria-hidden="true"></span>Link na hora · ouça no Spotify</p>
          <details class="card__det">
            <summary>Ver detalhes</summary>
            <p class="card__desc">${p.descricao}</p>
            <p>${p.musicas} músicas para ouvir no Spotify, pelo celular ou computador. Depois do Pix, o link aparece na tela com um botão para abrir no Spotify.</p>
          </details>
        </div>
      </article>`).join("");
  }

  // Cliques na vitrine
  document.querySelectorAll(".card").forEach((card) => {
    const nome = card.querySelector(".card__nome").textContent;
    card.querySelector(".btn--comprar").addEventListener("click", () => contar("clicou-comprar", nome));
    card.querySelector(".card__det").addEventListener("toggle", (e) => { if (e.target.open) contar("viu-detalhes", nome); });
  });

  // Botão flutuante só aparece depois que a pessoa rola a página
  const flut = document.querySelector(".flutuante");
  if (flut) {
    const checar = () => flut.classList.toggle("visivel", window.scrollY > 500);
    checar();
    window.addEventListener("scroll", checar, { passive: true });
  }

  /* ---------- Pagamento ---------- */
  if (!document.body.classList.contains("pg-pagamento")) return;

  const params = new URLSearchParams(location.search);
  const produto = PRODUTOS.find((p) => p.id === params.get("produto")) || PRODUTOS[0];

  document.getElementById("produto-nome").textContent = produto.nome;
  contar("abriu-pagamento", produto.nome);
  document.getElementById("produto-preco").textContent = formatarPreco(produto.preco);
  document.title = "Pague " + formatarPreco(produto.preco) + " com Pix — RetroFrequência";

  const codigo = (produto.pix || "").trim();
  if (!codigo) document.getElementById("aviso-config").hidden = false;

  const campo = document.getElementById("codigo-pix");
  campo.value = codigo;

  // QR Code
  if (!codigo) return;
  const qr = qrcode(0, "M");
  qr.addData(codigo);
  qr.make();
  document.getElementById("qr-code").innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });

  // Copiar
  const btn = document.getElementById("btn-copiar");
  const btnTexto = document.getElementById("btn-copiar-texto");
  const msg = document.getElementById("msg-copiado");
  let timer;

  btn.addEventListener("click", async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(codigo);
      ok = true;
    } catch (e) {
      campo.focus();
      campo.select();
      campo.setSelectionRange(0, codigo.length);
      try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
    }
    clearTimeout(timer);
    contar("copiou-pix", produto.nome);
    if (ok) {
      btn.classList.add("copiado");
      btnTexto.textContent = "✓ Código copiado!";
      msg.textContent = "Agora abra o aplicativo do seu banco.";
    } else {
      msg.textContent = "Não deu para copiar sozinho. Segure o dedo sobre o código abaixo e escolha “Copiar”.";
    }
    msg.classList.add("visivel");
    timer = setTimeout(() => {
      btn.classList.remove("copiado");
      btnTexto.textContent = "Copiar Pix";
    }, 6000);
  });

  /* ---------- Liberação da playlist ---------- */
  const APARECE = 10;   // segundos até o quadro de liberação aparecer
  const CARREGA = 50;   // segundos da barrinha até liberar o botão
  const chave = "rf_inicio_" + produto.id;
  let inicio = Date.now();
  try {
    const salvo = Number(sessionStorage.getItem(chave));
    if (salvo && Date.now() - salvo < 30 * 60 * 1000) inicio = salvo;
    else sessionStorage.setItem(chave, String(inicio));
  } catch (e) {}

  const $ = (id) => document.getElementById(id);
  const btnPaguei = $("btn-paguei");

  function atualizarContador() {
    const passou = (Date.now() - inicio) / 1000;
    if (passou < APARECE) return false;
    $("liberar").hidden = false;
    const carregado = passou - APARECE;
    const falta = Math.max(0, Math.ceil(CARREGA - carregado));
    $("barra-progresso").style.width = Math.min(100, (carregado / CARREGA) * 100) + "%";
    if (falta > 0) {
      $("contador").textContent = "0:" + String(falta).padStart(2, "0");
      return false;
    }
    btnPaguei.disabled = false;
    $("etapa-espera").querySelector(".liberar__titulo").textContent = "Tudo pronto!";
    $("espera-texto").textContent = "Pagamento feito? Aperte o botão para acessar sua playlist.";
    return true;
  }
  if (!atualizarContador()) {
    const t = setInterval(() => { if (atualizarContador()) clearInterval(t); }, 500);
  }

  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

  btnPaguei.addEventListener("click", async () => {
    contar("acessou-playlist", produto.nome);
    $("etapa-espera").hidden = true;
    $("etapa-processando").hidden = false;
    $("liberar").scrollIntoView({ behavior: "smooth", block: "center" });
    for (const id of ["proc-1", "proc-2", "proc-3"]) {
      $(id).classList.add("ativo");
      await esperar(1400);
      $(id).classList.remove("ativo");
      $(id).classList.add("feito");
    }
    await esperar(500);
    $("etapa-processando").hidden = true;
    $("link-playlist").value = produto.spotify || "";
    $("btn-spotify").href = produto.spotify || "#";
    $("etapa-pronto").hidden = false;
    $("liberar").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("btn-spotify").addEventListener("click", () =>
    contar("abriu-spotify", produto.nome));

  $("btn-copiar-link").addEventListener("click", async () => {
    const campoLink = $("link-playlist");
    let ok = false;
    try { await navigator.clipboard.writeText(campoLink.value); ok = true; }
    catch (e) {
      campoLink.focus(); campoLink.select();
      try { ok = document.execCommand("copy"); } catch (e2) {}
    }
    $("msg-link").textContent = ok ? "✓ Link copiado!" : "Segure o dedo sobre o link e escolha “Copiar”.";
  });
})();
