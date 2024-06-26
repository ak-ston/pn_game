let betsOnPlayer = 0;
let betsOnBanker = 0;
let betsOnTie = 0;

function updateBetCounts() {
    const playerInput = document.getElementById('player-input').value;
    const bankerInput = document.getElementById('banker-input').value;
    const tieInput = document.getElementById('tie-input').value;

    const playerCount = playerInput ? playerInput.split(',').filter(name => name.trim() !== '').length : 0;
    const bankerCount = bankerInput ? bankerInput.split(',').filter(name => name.trim() !== '').length : 0;
    const tieCount = tieInput ? tieInput.split(',').filter(name => name.trim() !== '').length : 0;

    document.getElementById('player-count').innerText = playerCount;
    document.getElementById('banker-count').innerText = bankerCount;
    document.getElementById('tie-count').innerText = tieCount;
}

function getCard() {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 'J', 'Q', 'K'];
    return cards[Math.floor(Math.random() * cards.length)];
}

function getCardValue(card) {
    if (card === 'A') return 1;
    if (card === 'J' || card === 'Q' || card === 'K') return 0;
    return card;
}

function dealCards() {
    const playerCards = [getCard(), getCard()];
    const bankerCards = [getCard(), getCard()];

    let playerScore = (getCardValue(playerCards[0]) + getCardValue(playerCards[1])) % 10;
    let bankerScore = (getCardValue(bankerCards[0]) + getCardValue(bankerCards[1])) % 10;

    if (playerScore < 8 && bankerScore < 8) {
        // Player's turn to draw a third card
        if (playerScore <= 5) {
            const playerThirdCard = getCard();
            playerCards.push(playerThirdCard);
            playerScore = (playerScore + getCardValue(playerThirdCard)) % 10;
        }

        // Banker's turn to draw a third card
        const playerThirdCardValue = playerCards.length === 3 ? getCardValue(playerCards[2]) : null;

        if (bankerScore <= 3) {
            if (playerThirdCardValue !== 8 || playerThirdCardValue === null && (playerScore === 6 || playerScore === 7)) {
                const bankerThirdCard = getCard();
                bankerCards.push(bankerThirdCard);
                bankerScore = (bankerScore + getCardValue(bankerThirdCard)) % 10;
            }
        } else if (bankerScore === 4) {
            if ((playerThirdCardValue >= 2 && playerThirdCardValue <= 7) || (playerThirdCardValue === null && (playerScore === 6 || playerScore === 7))) {
                const bankerThirdCard = getCard();
                bankerCards.push(bankerThirdCard);
                bankerScore = (bankerScore + getCardValue(bankerThirdCard)) % 10;
            }
        } else if (bankerScore === 5) {
            if ((playerThirdCardValue >= 4 && playerThirdCardValue <= 7) || (playerThirdCardValue === null && (playerScore === 6 || playerScore === 7))) {
                const bankerThirdCard = getCard();
                bankerCards.push(bankerThirdCard);
                bankerScore = (bankerScore + getCardValue(bankerThirdCard)) % 10;
            }
        } else if (bankerScore === 6) {
            if ((playerThirdCardValue === 6 || playerThirdCardValue === 7) || (playerThirdCardValue === null && (playerScore === 6 || playerScore === 7))) {
                const bankerThirdCard = getCard();
                bankerCards.push(bankerThirdCard);
                bankerScore = (bankerScore + getCardValue(bankerThirdCard)) % 10;
            }
        }
    }

    return {
        playerCards,
        bankerCards,
        playerScore,
        bankerScore
    };
}

function determineWinner(playerScore, bankerScore) {
    if (playerScore > bankerScore) {
        return 'player';
    } else if (bankerScore > playerScore) {
        return 'banker';
    } else {
        return 'tie';
    }
}

window.placeBet = function(betOn) {
    const playerInput = document.getElementById('player-input').value;
    const bankerInput = document.getElementById('banker-input').value;
    const tieInput = document.getElementById('tie-input').value;

    const playerNames = playerInput.split(',').filter(name => name.trim() !== '');
    const bankerNames = bankerInput.split(',').filter(name => name.trim() !== '');
    const tieNames = tieInput.split(',').filter(name => name.trim() !== '');

    if (betOn === 'player') {
        betsOnPlayer = playerNames.length;
        document.getElementById('player-bets').innerText = betsOnPlayer;
    } else if (betOn === 'banker') {
        betsOnBanker = bankerNames.length;
        document.getElementById('banker-bets').innerText = betsOnBanker;
    } else if (betOn === 'tie') {
        betsOnTie = tieNames.length;
        document.getElementById('tie-bets').innerText = betsOnTie;
    }

    updateBetCounts();
};

window.playGame = function() {
    const { playerCards, bankerCards, playerScore, bankerScore } = dealCards();

    document.getElementById('result').innerHTML = `
        <p>Player Cards: ${playerCards.join(', ')}</p>
        <p>Banker Cards: ${bankerCards.join(', ')}</p>
        <p>Player Score: ${playerScore}</p>
        <p>Banker Score: ${bankerScore}</p>
    `;

    const winner = determineWinner(playerScore, bankerScore);
    let resultMessage = '';
    let winnerNames = '';

    if (winner === 'player') {
        resultMessage = 'Winner: Player';
        winnerNames = document.getElementById('player-input').value.split(',').filter(name => name.trim() !== '').join(', ');
        document.getElementById('result').innerHTML += `<p style="color: blue;">${resultMessage}</p>`;
    } else if (winner === 'banker') {
        resultMessage = 'Winner: Banker';
        winnerNames = document.getElementById('banker-input').value.split(',').filter(name => name.trim() !== '').join(', ');
        document.getElementById('result').innerHTML += `<p style="color: red;">${resultMessage}</p>`;
    } else {
        resultMessage = 'Winner: Tie';
        winnerNames = document.getElementById('tie-input').value.split(',').filter(name => name.trim() !== '').join(', ');
        document.getElementById('result').innerHTML += `<p style="color: green;">${resultMessage}</p>`;
    }

    if (winnerNames) {
        document.getElementById('result').innerHTML += `<p>Winners: ${winnerNames}</p>`;
    } else {
        document.getElementById('result').innerHTML += `<p>No Winners</p>`;
    }
};

window.resetGame = function() {
    document.getElementById('player-input').value = '';
    document.getElementById('banker-input').value = '';
    document.getElementById('tie-input').value = '';

    document.getElementById('player-count').innerText = '0';
    document.getElementById('banker-count').innerText = '0';
    document.getElementById('tie-count').innerText = '0';

    document.getElementById('result').innerHTML = '';

    betsOnPlayer = 0;
    betsOnBanker = 0;
    betsOnTie = 0;
};


