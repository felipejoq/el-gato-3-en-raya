import './style.css';

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_X;

const panel = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
]

const boxes = document.getElementsByClassName('box');
const btnsReset = document.getElementsByClassName('resetBtn');
const btnsExit = document.getElementsByClassName('exitBtn');
const currentPlayerElement = document.getElementById('current-player');
const message = document.getElementById('message');

for (let box of boxes) {
    box.addEventListener('click', (evt) => {
        makeMove(evt)
    });
}

for (let btn of btnsReset) {
    btn.addEventListener('click', (evt) => {
        resetGame();
    });
}

for (let btn of btnsExit) {
    btn.addEventListener('click', (evt) => {
        exitMessage();
    })
}

const makeMove = (evt) => {
    const { target } = evt;

    if (panel[getRow(target)][getCol(target)] === EMPTY) {

        panel[getRow(target)][getCol(target)] = currentPlayer;

        target.innerText = `${currentPlayer}`;

        target.classList.add(getColorPlayer(currentPlayer));

        target.classList.add('no-empty-box');

        if (checkWinner(currentPlayer)) {
            let text = `<span>${currentPlayer}</span> Ha ganado!`;
            makeInfoMessage(text);
        } else if (checkPanel()) {
            let text = 'Empate!'
            makeInfoMessage(text);
        } else {
            switchPlayer();
        }

    }

}

const getRow = (element) => {
    return Number(element.id.split('-')[1]);
}

const getCol = (element) => {
    return Number(element.id.split('-')[2]);
}

const getColorPlayer = (player) => {
    return player === 'X' ? 'x-class' : 'o-class';
}

const switchPlayer = () => {

    if (currentPlayer === PLAYER_X) {
        currentPlayer = PLAYER_O;
        drawCurrentPlayer(currentPlayer);
    } else {
        currentPlayer = PLAYER_X;
        drawCurrentPlayer(currentPlayer);
    }

    currentPlayerElement.innerText = `${currentPlayer}`

    return currentPlayer;
}

const checkWinner = (player) => {
    // Verificar filas
    for (let row = 0; row < 3; row++) {
        if (
            panel[row][0] === player &&
            panel[row][1] === player &&
            panel[row][2] === player
        ) {
            return true;
        }
    }

    // Verificar columnas
    for (let col = 0; col < 3; col++) {
        if (
            panel[0][col] === player &&
            panel[1][col] === player &&
            panel[2][col] === player
        ) {
            return true;
        }
    }

    // Verificar diagonales
    if (
        (panel[0][0] === player &&
            panel[1][1] === player &&
            panel[2][2] === player) ||
        (panel[0][2] === player &&
            panel[1][1] === player &&
            panel[2][0] === player)
    ) {
        return true;
    }

    return false;
}

const checkPanel = () => {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (panel[row][col] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

const resetGame = () => {
    panel.forEach(row => {
        row.fill(EMPTY);
    });

    currentPlayer = PLAYER_X;

    for (let box of boxes) {
        box.innerText = '';
        box.classList.remove('no-empty-box');
        box.classList.remove('x-class');
        box.classList.remove('o-class');
        box.style.pointerEvents = 'auto'
    }

    message.parentElement.parentElement.style.display = 'none';
    currentPlayerElement.classList.remove('o-class');
    currentPlayerElement.classList.remove('x-class');
    currentPlayerElement.innerText = currentPlayer;

}

const exitMessage = () => {
    message.parentElement.parentElement.style.display = 'none';
    for (let box of boxes) {
        box.style.pointerEvents = 'none'
    }
}

const makeInfoMessage = (text) => {
    message.parentElement.parentElement.style.display = 'flex';
    message.innerHTML = text
    message.classList.add(getColorPlayer(currentPlayer));
}

const drawCurrentPlayer = (player) => {
    currentPlayerElement.classList.remove(getColorPlayer(PLAYER_X));
    currentPlayerElement.classList.remove(getColorPlayer(PLAYER_O));
    currentPlayerElement.classList.add(getColorPlayer(player));
}