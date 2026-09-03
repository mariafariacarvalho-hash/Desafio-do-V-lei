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
let personagemNishinoya = document.querySelector('.personagem-fora-nishinoya');

if (!personagemNishinoya) {
  personagemNishinoya = document.createElement('img');
  personagemNishinoya.className = 'imagem-fora-campo personagem-fora-nishinoya';
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
      height: min(163px, calc(26vw * 0.5627)) !important;
      aspect-ratio: 750 / 422 !important;
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

    .personagem-fora-hinata {
      left: clamp(12px, 2vw, 32px) !important;
      right: auto !important;
    }

    @media (max-width: 720px) {
      .imagem-fora-campo {
        position: relative !important;
        right: auto !important;
        left: auto !important;
        bottom: auto !important;
        display: block !important;
        width: min(280px, 85vw) !important;
        height: 158px !important;
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
