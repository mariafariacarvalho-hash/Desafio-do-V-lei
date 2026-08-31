// ==========================================
// 1. VARIÁVEIS (Estado do Jogo)
// ==========================================
let pontos = 0;
let placarTimeA = 0;
let placarTimeB = 0;
let setAtual = 1;
let setsVencidosTimeA = 0;
let setsVencidosTimeB = 0;
let bolaEmJogo = true;
let bolaLevantada = false; // Controle que impede atacar sem antes levantar
let timeANoCimaQuadra = true; // Controla qual time está de qual lado da quadra

// ==========================================
// 2. FUNÇÃO DE RODÍZIO (Lógica de Troca)
// ==========================================
function fazerRodizio() {
// Pega os nomes atuais de cada campo na quadra
const p1 = document.getElementById("pos1").value;
const p2 = document.getElementById("pos2").value;
const p3 = document.getElementById("pos3").value;
const p4 = document.getElementById("pos4").value;
const p5 = document.getElementById("pos5").value;
const p6 = document.getElementById("pos6").value;

// Rotação oficial de vôlei (sentido horário)
document.getElementById("pos1").value = p2;
document.getElementById("pos6").value = p1;
document.getElementById("pos5").value = p6;
document.getElementById("pos4").value = p5;
document.getElementById("pos3").value = p4;
document.getElementById("pos2").value = p3;

// Reseta a condição do levantamento no rodízio
bolaLevantada = false;

document.getElementById("resultado").innerHTML =
"🔄 Rodízio realizado! O novo sacador (Posição 1) é: <b>" + p2 + "</b>!";
}

// ==========================================
// 3. FUNÇÕES DE AÇÕES DAS JOGADAS (DOM)
// ==========================================
function sacar() {
bolaLevantada = false; // Reinicia a sequência de ataque
const sacador = document.getElementById("pos1").value;
document.getElementById("resultado").innerHTML = "🏐 Saque realizado por <b>" + sacador + "</b>!";
}

function defender() {
document.getElementById("resultado").innerHTML = "👏 Defesa realizada com sucesso! Agora preparem o levantamento.";
}

function manchete() {
document.getElementById("resultado").innerHTML = "👏 Manchete realizada com sucesso! Agora preparem o levantamento.";
}

function toque() {
document.getElementById("resultado").innerHTML = "👏 Toque realizado com sucesso!.";
}

function levantar() {
// Pega o nome do jogador na Posição 3 (Levantador)
const levantador = document.getElementById("pos3").value;

// Ativa a permissão para que o ataque ocorra
bolaLevantada = true;

document.getElementById("resultado").innerHTML =
"🎯 Levantamento perfeito feito por <b>" + levantador + "</b> (Posição 3)! Bola pronta para o ATAQUE!";
}

function atacar() {
// REGRA DE VALIDAÇÃO: Verifica se houve levantamento prévio
if (!bolaLevantada) {
document.getElementById("resultado").innerHTML =
"⚠️ <b>Ataque não permitido!</b> É necessário realizar um <b>Levantamento</b> antes de atacar!";
return; // Interrompe a função
}

// Consome a bola levantada (precisará de outro levantamento no próximo ponto)
bolaLevantada = false;

document.getElementById("resultado").innerHTML = "🔥 Ataque potente no chão! Ponto para sua equipe!";

registrarPonto("A");
}

function bloquear() {
document.getElementById("resultado").innerHTML = "🛡️ Bloqueio realizado!";
}

// ==========================================
// 4. REGRAS DE NEGÓCIO E LÓGICA DA PARTIDA
// ==========================================
function registrarPonto(timeVencedor) {
if (!bolaEmJogo) return;

if (timeVencedor === "A") {
placarTimeA++;
console.log("Ponto para o Time A!");
// Faz o rodízio automaticamente ao marcar ponto
fazerRodizio();
} else {
placarTimeB++;
console.log("Ponto para o Time B!");
}

// Atualiza o placar profissional
atualizarPlacarProfissional();

verificarFimDeSet();
}

function atualizarPlacarProfissional() {
// Atualiza os placar grandes dos times
const teamAPlacar = document.getElementById("teamAPlacar");
const teamBPlacar = document.getElementById("teamBPlacar");
if (teamAPlacar) teamAPlacar.innerHTML = placarTimeA;
if (teamBPlacar) teamBPlacar.innerHTML = placarTimeB;

// Atualiza o Set Info
const setInfo = document.getElementById("setInfo");
if (setInfo) setInfo.innerHTML = "SET " + setAtual;

// Atualiza os sets vencidos
const setsInfo = document.getElementById("setsInfo");
if (setsInfo) {
setsInfo.innerHTML = "Sets: " + setsVencidosTimeA + " x " + setsVencidosTimeB;
}
}

function verificarFimDeSet() {
const PONTOS_VITORIA = 25;
const DIFERENCA_MINIMA = 2;

// Verifica se alguém atingiu 25 pontos com diferença mínima de 2
if (placarTimeA >= PONTOS_VITORIA && (placarTimeA - placarTimeB) >= DIFERENCA_MINIMA) {
setsVencidosTimeA++;
console.log("Fim do Set! Time A venceu o Set " + setAtual + "!");
document.getElementById("resultado").innerHTML = 
"🏆 <b>FIM DO SET!</b> Sua equipe venceu o Set " + setAtual + "!<br>" +
"Sets: Time A " + setsVencidosTimeA + " x " + setsVencidosTimeB + " Time B";
bolaEmJogo = false;
reiniciarSet();
} else if (placarTimeB >= PONTOS_VITORIA && (placarTimeB - placarTimeA) >= DIFERENCA_MINIMA) {
setsVencidosTimeB++;
console.log("Fim do Set! Time B venceu o Set " + setAtual + "!");
document.getElementById("resultado").innerHTML = 
"🏆 <b>FIM DO SET!</b> Time B venceu o Set " + setAtual + "!<br>" +
"Sets: Time A " + setsVencidosTimeA + " x " + setsVencidosTimeB + " Time B";
bolaEmJogo = false;
reiniciarSet();
}
}

function reiniciarSet() {
setTimeout(() => {
setAtual++;
placarTimeA = 0;
placarTimeB = 0;
bolaLevantada = false;
bolaEmJogo = true;

// Troca os times de lado da quadra
trocarLadoQuadra();

// Atualiza o placar profissional
atualizarPlacarProfissional();

document.getElementById("resultado").innerHTML = "📍 Novo set iniciado! SET " + setAtual + "<br>⚽ Times trocaram de lado!<br>Posicionem-se para começar!";
}, 2000);
}

function trocarLadoQuadra() {
// Inverte qual time está em qual lado
timeANoCimaQuadra = !timeANoCimaQuadra;

// Atualiza a informação visual de qual lado cada time está
atualizarLadoQuadra();

console.log("Times trocaram de lado! Time A agora está " + (timeANoCimaQuadra ? "ACIMA" : "ABAIXO") + " da quadra.");
}

function atualizarLadoQuadra() {
const elementoLado = document.getElementById("ladoQuadra");
if (elementoLado) {
if (timeANoCimaQuadra) {
elementoLado.innerHTML = "<span style='color: #a855c7;'>🔕 Time A (ROXO): ACIMA | Time B (AZUL): ABAIXO</span>";
} else {
elementoLado.innerHTML = "<span style='color: #64b4e6;'>🔕 Time A (ROXO): ABAIXO | Time B (AZUL): ACIMA</span>";
}
}
}

// ==========================================
// 5. INICIALIZAÇÃO DO JOGO
// ==========================================
atualizarLadoQuadra();
atualizarPlacarProfissional();

// ==========================================
// 6. MASCOTE YU NISHINOYA
// ==========================================
const mascoteNishinoya = document.querySelector('.mascote-nishinoya');

if (mascoteNishinoya) {
  mascoteNishinoya.addEventListener('click', function() {
    this.classList.add('nishinoya-ataque');
    
    // Mensagem especial
    const resultado = document.getElementById("resultado");
    if (resultado) {
      resultado.innerHTML = "💪 Yu Nishinoya: 'Deixa comigo! Vou defender com tudo!' 🏐";
    }
    
    setTimeout(() => {
      this.classList.remove('nishinoya-ataque');
    }, 600);
  });
}

// Ajusta a imagem fora de campo para o personagem oficial de Yu Nishinoya,
// mantendo-o ao lado direito da quadra e fora das linhas de jogo.
const quadra = document.querySelector('.quadra-container');
let personagemNishinoya = document.querySelector('.imagem-fora-campo');

if (!personagemNishinoya) {
  personagemNishinoya = document.createElement('img');
  personagemNishinoya.className = 'imagem-fora-campo';
  personagemNishinoya.alt = 'Yu Nishinoya da Karasuno';
  document.body.appendChild(personagemNishinoya);
}

if (quadra && personagemNishinoya) {
  const estiloNishinoya = document.createElement('style');
  estiloNishinoya.textContent = `
    .imagem-fora-campo {
      position: fixed !important;
      right: clamp(12px, 2vw, 32px) !important;
      bottom: 44px !important;
      left: auto !important;
      z-index: 3 !important;
      width: min(290px, 26vw) !important;
      max-width: 330px !important;
      min-width: 190px !important;
      height: auto !important;
      object-fit: cover !important;
      object-position: center !important;
      transform: translateY(-12px) rotate(0deg) !important;
      border: 4px solid #ef5b23 !important;
      border-radius: 12px !important;
      box-shadow: 0 10px 24px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.12) !important;
      filter: drop-shadow(0 10px 18px rgba(0,0,0,0.6)) saturate(1.06) !important;
      pointer-events: none !important;
      background: rgba(17, 24, 39, 0.6);
    }

    @media (max-width: 720px) {
      .imagem-fora-campo {
        position: relative !important;
        right: auto !important;
        bottom: auto !important;
        display: block !important;
        width: min(280px, 85vw) !important;
        margin: 0 auto 24px !important;
      }
    }
  `;

  document.head.appendChild(estiloNishinoya);

  personagemNishinoya.src = 'assets/haikyuu-side.webp';
  personagemNishinoya.alt = 'Yu Nishinoya da Karasuno';
  personagemNishinoya.title = 'Yu Nishinoya';
  personagemNishinoya.setAttribute('aria-label', 'Yu Nishinoya da Karasuno');
  personagemNishinoya.style.position = 'fixed';
  personagemNishinoya.style.right = '18px';
  personagemNishinoya.style.bottom = '44px';
  personagemNishinoya.style.left = 'auto';
  personagemNishinoya.style.zIndex = '3';
  personagemNishinoya.style.width = 'min(290px, 26vw)';
  personagemNishinoya.style.maxWidth = '330px';
  personagemNishinoya.style.minWidth = '190px';
  personagemNishinoya.style.transform = 'translateY(-12px) rotate(0deg)';
  personagemNishinoya.style.border = '4px solid #ef5b23';
  personagemNishinoya.style.borderRadius = '12px';
  personagemNishinoya.style.boxShadow = '0 10px 24px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.12)';
  personagemNishinoya.style.filter = 'drop-shadow(0 10px 18px rgba(0,0,0,0.6)) saturate(1.06)';
  personagemNishinoya.style.pointerEvents = 'none';
}

// ==========================================
// 7. HINATA NO LADO OPOSTO DA QUADRA
// ==========================================
const quadraContainer = document.querySelector('.quadra-container');
let personagemHinata = document.querySelector('.hinata-fora-campo');

if (!personagemHinata) {
  personagemHinata = document.createElement('div');
  personagemHinata.className = 'hinata-fora-campo';
  personagemHinata.setAttribute('aria-label', 'Shōyō Hinata da Karasuno');
  personagemHinata.title = 'Shōyō Hinata';
  document.body.appendChild(personagemHinata);
}

if (quadraContainer && personagemHinata) {
  const estiloHinata = document.createElement('style');
  estiloHinata.textContent = `
    .hinata-fora-campo {
      position: fixed !important;
      left: clamp(10px, 1.8vw, 28px) !important;
      bottom: 18px !important;
      z-index: 3 !important;
      width: min(220px, 20vw) !important;
      height: auto !important;
      pointer-events: none !important;
      display: block !important;
      filter: none !important;
      transform: none !important;
      background: transparent !important;
    }

    .hinata-figura {
      position: relative;
      width: 100%;
      height: 310px;
      display: block;
      transform: translateY(-8px);
    }

    .hinata-corpo {
      position: absolute;
      left: 50%;
      bottom: 12px;
      width: 116px;
      height: 140px;
      transform: translateX(-50%);
    }

    .hinata-cabeca {
      position: absolute;
      left: 50%;
      top: 18px;
      width: 96px;
      height: 92px;
      transform: translateX(-50%);
      background: #f7d3b1;
      border-radius: 42% 42% 46% 46%;
      border: 3px solid #18263d;
      box-shadow: inset 0 -4px 0 rgba(109, 64, 38, 0.12);
      z-index: 2;
    }

    .hinata-cabelo {
      position: absolute;
      left: 50%;
      top: 4px;
      width: 116px;
      height: 74px;
      transform: translateX(-50%);
      background: linear-gradient(180deg, #f29129 0%, #cf5d1b 100%);
      border-radius: 52% 48% 38% 42%;
      border: 3px solid #18263d;
      z-index: 4;
      overflow: hidden;
    }

    .hinata-cabelo::before,
    .hinata-cabelo::after {
      content: '';
      position: absolute;
      background: linear-gradient(180deg, #ef7b1b 0%, #c65b1a 100%);
      border: 3px solid #18263d;
      border-bottom: none;
      border-radius: 50% 50% 0 0;
    }

    .hinata-cabelo::before {
      width: 26px;
      height: 48px;
      left: 8px;
      top: -18px;
      transform: rotate(-24deg);
    }

    .hinata-cabelo::after {
      width: 26px;
      height: 48px;
      right: 8px;
      top: -18px;
      transform: rotate(24deg);
    }

    .hinata-franja {
      position: absolute;
      left: 50%;
      top: 14px;
      width: 70px;
      height: 18px;
      transform: translateX(-50%) rotate(-2deg);
      background: linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
      border-radius: 50% 50% 60% 60%;
      z-index: 5;
    }

    .hinata-olho {
      position: absolute;
      top: 42px;
      width: 20px;
      height: 18px;
      background: #5d2d19;
      border-radius: 50%;
      z-index: 6;
    }

    .hinata-olho.esquerdo { left: 26px; }
    .hinata-olho.direito { right: 26px; }

    .hinata-olho::after {
      content: '';
      position: absolute;
      width: 7px;
      height: 7px;
      background: #fff;
      border-radius: 50%;
      top: 3px;
      left: 6px;
    }

    .hinata-sorriso {
      position: absolute;
      left: 50%;
      top: 60px;
      width: 26px;
      height: 12px;
      transform: translateX(-50%);
      border-bottom: 4px solid rgba(80, 36, 30, 0.8);
      border-radius: 0 0 18px 18px;
      z-index: 6;
    }

    .hinata-camisa {
      position: absolute;
      left: 50%;
      top: 108px;
      width: 124px;
      height: 88px;
      transform: translateX(-50%);
      background: linear-gradient(180deg, #1a365a 0%, #112842 100%);
      border: 3px solid #0d1f33;
      border-radius: 18px 18px 14px 14px;
      box-shadow: inset 0 -8px 0 rgba(6, 14, 24, 0.18);
      z-index: 3;
    }

    .hinata-camisa::before {
      content: '';
      position: absolute;
      inset: 0 8px 0 8px;
      background: linear-gradient(90deg, rgba(255, 116, 38, 0.9), rgba(255, 116, 38, 0.7));
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      border-radius: 10px 10px 8px 8px;
      opacity: 0.95;
    }

    .hinata-numero {
      position: absolute;
      left: 50%;
      top: 18px;
      transform: translateX(-50%);
      font-size: 34px;
      line-height: 1;
      font-weight: 900;
      color: #f7f7f7;
      text-shadow: 3px 3px 0 rgba(17, 17, 17, 0.5);
      z-index: 4;
    }

    .hinata-braco {
      position: absolute;
      top: 118px;
      width: 20px;
      height: 88px;
      background: linear-gradient(180deg, #f7d3b1 0%, #e8b48d 100%);
      border: 3px solid #172d47;
      border-radius: 14px;
      z-index: 2;
    }

    .hinata-braco.esquerdo { left: 18px; transform: rotate(10deg); }
    .hinata-braco.direito { right: 18px; transform: rotate(-10deg); }

    .hinata-short {
      position: absolute;
      left: 50%;
      top: 188px;
      width: 118px;
      height: 42px;
      transform: translateX(-50%);
      background: linear-gradient(180deg, #1b3657 0%, #0f2740 100%);
      border: 3px solid #0d1f33;
      border-radius: 10px 10px 14px 14px;
      z-index: 3;
    }

    .hinata-short::before,
    .hinata-short::after {
      content: '';
      position: absolute;
      top: 0;
      width: 18px;
      height: 100%;
      background: linear-gradient(180deg, #f29d28 0%, #df6e1d 100%);
      border-radius: 8px;
    }

    .hinata-short::before { left: 12px; }
    .hinata-short::after { right: 12px; }

    .hinata-perna {
      position: absolute;
      top: 226px;
      width: 24px;
      height: 62px;
      background: linear-gradient(180deg, #f7d3b1 0%, #e8b48d 100%);
      border: 3px solid #16263d;
      border-radius: 12px;
      z-index: 1;
    }

    .hinata-perna.esquerda { left: 92px; }
    .hinata-perna.direita { right: 92px; }

    .hinata-joelho {
      position: absolute;
      top: 260px;
      width: 26px;
      height: 12px;
      background: #111111;
      border-radius: 10px;
      z-index: 2;
    }

    .hinata-joelho.esquerdo { left: 88px; }
    .hinata-joelho.direito { right: 88px; }

    .hinata-sapato {
      position: absolute;
      top: 286px;
      width: 32px;
      height: 18px;
      background: linear-gradient(180deg, #f2f4f7 0%, #d7dfe9 100%);
      border: 3px solid #0f2035;
      border-radius: 10px 10px 8px 8px;
      z-index: 2;
    }

    .hinata-sapato.esquerdo { left: 80px; }
    .hinata-sapato.direito { right: 80px; }

    .hinata-sapato::before {
      content: '';
      position: absolute;
      inset: 4px 5px 4px 5px;
      background: linear-gradient(90deg, #d33f34 0%, #f5b1a2 100%);
      border-radius: 8px;
    }
  `;

  document.head.appendChild(estiloHinata);

  personagemHinata.innerHTML = `
    <div class="hinata-figura">
      <div class="hinata-cabelo"></div>
      <div class="hinata-franja"></div>
      <div class="hinata-cabeca">
        <div class="hinata-olho esquerdo"></div>
        <div class="hinata-olho direito"></div>
        <div class="hinata-sorriso"></div>
      </div>
      <div class="hinata-corpo">
        <div class="hinata-camisa"><span class="hinata-numero">10</span></div>
        <div class="hinata-braco esquerdo"></div>
        <div class="hinata-braco direito"></div>
        <div class="hinata-short"></div>
        <div class="hinata-perna esquerda"></div>
        <div class="hinata-perna direita"></div>
        <div class="hinata-joelho esquerdo"></div>
        <div class="hinata-joelho direito"></div>
        <div class="hinata-sapato esquerdo"></div>
        <div class="hinata-sapato direito"></div>
      </div>
    </div>
  `;

  personagemHinata.style.position = 'fixed';
  personagemHinata.style.left = '18px';
  personagemHinata.style.bottom = '18px';
  personagemHinata.style.zIndex = '3';
  personagemHinata.style.width = 'min(220px, 20vw)';
  personagemHinata.style.maxWidth = '240px';
  personagemHinata.style.minWidth = '160px';
  personagemHinata.style.transform = 'translateY(0)';
  personagemHinata.style.pointerEvents = 'none';
}
