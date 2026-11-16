const simbolos = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png"
];

let cartas = [];
let primeira = null;
let bloqueado = false;
let vez = 1;
let pontos = [0, 0];
let pares = 0;           

const tabuleiro = document.getElementById("tabuleiro");
const vezJogador = document.getElementById("vez-jogador");
const btnReiniciar = document.getElementById("reiniciar");

function iniciar() {
    // duplica as imagens e embaralha
    cartas = [...simbolos, ...simbolos].sort(() => Math.random() - 0.5);
    primeira = null;
    bloqueado = false;
    vez = 1;
    pontos = [0, 0];
    pares = 0;

    // cria as cartas na tela
    tabuleiro.innerHTML = "";
    cartas.forEach(simbolo => {
        const carta = document.createElement("div");
        carta.className = "carta";
        carta.dataset.simbolo = simbolo;
        carta.textContent = "❓";
        carta.onclick = () => clicar(carta);
        tabuleiro.appendChild(carta);
    });
    atualizarPlacar();
}

function atualizarPlacar() {
    document.getElementById("pontos1").textContent = pontos[0];
    document.getElementById("pontos2").textContent = pontos[1];
    vezJogador.textContent = "Vez do Jogador " + vez;
}

function virar(carta) {
    carta.classList.add("virada");
    carta.innerHTML = `<img src="${carta.dataset.simbolo}">`;
}

function desvirar(carta) {
    carta.classList.remove("virada");
    carta.textContent = "❓";
}

function clicar(carta) {
    // ignora clique se estiver bloqueado, ou se a carta já estiver virada
    if (bloqueado || carta.classList.contains("virada")) return;

    virar(carta);

    if (primeira === null) {
        primeira = carta;   // guarda a primeira carta
        return;
    }

    // segunda carta: compara
    if (primeira.dataset.simbolo === carta.dataset.simbolo) {
        // acertou: continua na vez
        primeira.classList.add("acertada");   // <- adicione
        carta.classList.add("acertada");
        pontos[vez - 1]++;
        pares++;
        primeira = null;
        atualizarPlacar();
        if (pares === simbolos.length) fimDeJogo();
    } else {
        // errou: espera 1 segundo, desvira e passa a vez
        bloqueado = true;
        const a = primeira;
        primeira = null;
        setTimeout(() => {
            desvirar(a);
            desvirar(carta);
            vez = vez === 1 ? 2 : 1;
            bloqueado = false;
            atualizarPlacar();
        }, 1000);
    }
}

function fimDeJogo() {
    const [a, b] = pontos;
    if (a > b) vezJogador.textContent = `Jogador 1 venceu! (${a} × ${b})`;
    else if (b > a) vezJogador.textContent = `Jogador 2 venceu! (${a} × ${b})`;
    else vezJogador.textContent = `Empate! (${a} × ${b})`;
}

btnReiniciar.onclick = iniciar;
iniciar();
