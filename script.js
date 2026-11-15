
const tabuleiro = document.getElementById("tabuleiro");

const cartas = [
    "🐶", "🐶",
    "🐱", "🐱",
    "🐸", "🐸",
    "🦊", "🦊",
    "🐼", "🐼",
    "🐵", "🐵",
    "🦁", "🦁",
    "🐰", "🐰"
];

let primeiraCarta = null;
let segundaCarta = null;
let jogadorAtual = 1;
let pontos1 = 0;
let pontos2 = 0;
let bloqueado = false;

function embaralhar() {
    cartas.sort(() => Math.random() - 0.5);
}

function criarTabuleiro() {
    tabuleiro.innerHTML = "";

    cartas.forEach((animal) => {
        const carta = document.createElement("div");

        carta.classList.add("carta");
        carta.textContent = "?";
        carta.dataset.animal = animal;

        carta.addEventListener("click", virarCarta);

        tabuleiro.appendChild(carta);
    });
}

function virarCarta() {
    if (bloqueado || this.classList.contains("virada")) {
        return;
    }

    this.textContent = this.dataset.animal;
    this.classList.add("virada");

    if (primeiraCarta === null) {
        primeiraCarta = this;
    } else {
        segundaCarta = this;
        verificarPar();
    }
}

function verificarPar() {
    bloqueado = true;

    if (primeiraCarta.dataset.animal === segundaCarta.dataset.animal) {
        if (jogadorAtual === 1) {
            pontos1++;
            document.getElementById("pontos1").textContent = pontos1;
        } else {
            pontos2++;
            document.getElementById("pontos2").textContent = pontos2;
        }

        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;

        verificarFim();
    } else {
        setTimeout(() => {
            primeiraCarta.textContent = "?";
            segundaCarta.textContent = "?";

            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            primeiraCarta = null;
            segundaCarta = null;

            trocarJogador();
            bloqueado = false;
        }, 1000);
    }
}

function trocarJogador() {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;

    document.getElementById("vez-jogador").textContent =
        "Vez do Jogador " + jogadorAtual;
}

function verificarFim() {
    const encontradas = document.querySelectorAll(".virada").length;

    if (encontradas === 16) {
        if (pontos1 > pontos2) {
            alert("Jogador 1 venceu!");
        } else if (pontos2 > pontos1) {
            alert("Jogador 2 venceu!");
        } else {
            alert("O jogo terminou empatado!");
        }
    }
}

function reiniciarJogo() {
    pontos1 = 0;
    pontos2 = 0;
    jogadorAtual = 1;
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    document.getElementById("pontos1").textContent = 0;
    document.getElementById("pontos2").textContent = 0;
    document.getElementById("vez-jogador").textContent = "Vez do Jogador 1";

    embaralhar();
    criarTabuleiro();
}

document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);

reiniciarJogo();
