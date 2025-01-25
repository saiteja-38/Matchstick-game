let sticksLeft = 15;
let currentPlayer = "Player 1";
let isPlayingWithComputer = null;

function setGameMode(playingWithComputer) {
    isPlayingWithComputer = playingWithComputer;
    document.getElementById('game-mode').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    updateGame();
}

function updateGame() {
    const matchsticksDiv = document.getElementById('matchsticks');
    const turnIndicator = document.getElementById('turn-indicator');

    matchsticksDiv.innerHTML = '';
    for (let i = 0; i < sticksLeft; i++) {
        const stick = document.createElement('div');
        stick.className = 'matchstick';
        matchsticksDiv.appendChild(stick);
    }

    if (sticksLeft > 0) {
        turnIndicator.textContent = `${currentPlayer}'s turn`;
    }
}

function takeSticks(sticksTaken) {
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');

    if (sticksTaken < 1 || sticksTaken > 3) {
        messageElement.textContent = "You can only take 1, 2, or 3 sticks!";
        return;
    }

    if (sticksLeft - sticksTaken <= 0) {
        sticksLeft = 0;
        updateGame();
        messageElement.textContent = `${currentPlayer} loses!`;
        restartButton.style.display = 'block';
        return;
    }

    sticksLeft -= sticksTaken;
    messageElement.textContent = '';

    if (isPlayingWithComputer) {
        if (currentPlayer === "Player 1") {
            currentPlayer = "Computer";
            updateGame();
            setTimeout(() => computerTurn(), 1000);
        } else {
            currentPlayer = "Player 1";
            updateGame();
        }
    } else {
        currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
        updateGame();
    }
}

function computerTurn() {
    let computerChoice;
    if (sticksLeft % 4 === 0) {
        computerChoice = 3;
    } else if (sticksLeft % 4 === 3) {
        computerChoice = 2;
    } else if (sticksLeft % 4 === 2) {
        computerChoice = 1;
    } else {
        computerChoice = Math.floor(Math.random() * 3) + 1;
    }
    takeSticks(computerChoice);
}

function resetGame() {
    sticksLeft = 15;
    currentPlayer = "Player 1";
    isPlayingWithComputer = null;
    document.getElementById('game-mode').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('restart-button').style.display = 'none';
}
