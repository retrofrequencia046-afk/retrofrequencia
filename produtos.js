/* =========================================================
   RETROFREQUÊNCIA — CONFIGURAÇÕES DA LOJA
   Edite só este arquivo para trocar dados, preços e playlists.
   ========================================================= */

const LOJA = {
  nome: "RetroFrequência",

  // Usuário do Instagram (sem @). Todo o suporte e a entrega
  // do link acontecem pelo Direct deste perfil.
  instagram: "retrofrequencia",

  email: "contato@retrofrequencia.com.br",

  // Painel de estatísticas (Umami Cloud — grátis).
  // Crie a conta em cloud.umami.is, adicione o site e cole aqui
  // o "Website ID" (um código longo com traços). Deixe "" para desligar.
  umami: ""
};

/* ---------------------------------------------------------
   PLAYLISTS À VENDA
   - id: usado no link de pagamento (sem espaços nem acentos)
   - preco: use ponto como separador (9.90)
   - pix: código "Pix Copia e Cola" gerado no app do seu banco
     JÁ COM O VALOR da playlist. O QR Code é criado a partir dele.
   - cores: duas cores da capa (fita cassete desenhada pelo site)
   - capaTexto: texto curto na etiqueta da fitinha (ex.: "80's")
   - spotify: link da playlist, liberado na tela depois que o
     cliente aperta "Já realizei o pagamento".
   --------------------------------------------------------- */
const PRODUTOS = [
  {
    id: "rock-dance-80",
    nome: "Rock Dance 80's",
    subtitulo: "Hits de Balada",
    descricao: "Os maiores sucessos dançantes dos anos 80: rock, pop e synth que embalaram as festas do mundo todo.",
    categoria: "Anos 80 · Dance",
    musicas: 30,
    estilos: ["Rock", "Pop", "Synth"],
    preco: 9.90,
    selo: "Lançamento",
    destaque: true,
    cores: ["#FF7A1A", "#C2185B"],
    capaTexto: "80's",
    spotify: "https://open.spotify.com/playlist/7ntfqs3bdle0iahld7cazm",
    pix: "00020126580014BR.GOV.BCB.PIX0136aaf307f0-12fc-4549-8e68-ba3ef29b68df52040000530398654049.905802BR5921Nycolau Alves Taborda6009SAO PAULO62140510fAryPPa9vj6304A23A"
  },
  {
    id: "nacional-80",
    nome: "Nacional 80's",
    subtitulo: "Nostalgia Brasileira",
    descricao: "Os sucessos nacionais que marcaram os anos 80, para relembrar os bons tempos com as músicas que tocavam no rádio.",
    categoria: "Anos 80 · Nacional",
    musicas: 36,
    estilos: ["Nacional", "Anos 80", "Nostalgia"],
    preco: 9.95,
    selo: "Novidade",
    destaque: false,
    cores: ["#1E9E5A", "#E0A800"],
    capaTexto: "BR 80's",
    spotify: "https://open.spotify.com/playlist/5CUR00OKcZA58rsEtQEFoY",
    pix: "00020126580014BR.GOV.BCB.PIX0136aaf307f0-12fc-4549-8e68-ba3ef29b68df52040000530398654049.955802BR5921Nycolau Alves Taborda6009SAO PAULO62140510RtWPB1OXQd63040598"
  }
];
