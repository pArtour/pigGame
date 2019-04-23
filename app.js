/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables
let scores, roundScore, activePlayer, gamePlaying, lastDice, score, scoreValue;

// Setting the winning score
		score = document.getElementById('score');
		score.addEventListener('input', function() {
			scoreValue = parseInt(score.value);
			if (scoreValue === null || scoreValue === undefined || scoreValue === 0) {
				gamePlaying = false;
			} else {
				gamePlaying = true;				
			}
});
		

init();
// Click event
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random number.
		let dice1 = Math.floor(Math.random() * 6) + 1;
		let dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result.
		document.getElementById('diceOne').style.display = 'block';
		document.getElementById('diceTwo').style.display = 'block';
		// diceDOM.style.display = 'block';
		document.getElementById('diceOne').src = 'dice-' + dice1 + '.png';
		document.getElementById('diceTwo').src = 'dice-' + dice2 + '.png';

		// 3. Update the round score IF the rolled number wasn't 1.
		
			if (dice1 !== 1 && dice2 !== 1) {
			// Add score 
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//Add CURRENT SCORE to GLOBAL SCORE
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		

		//Chek if player won the game 
		if (scores[activePlayer] >= scoreValue) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('diceOne').style.display = 'none';
			document.getElementById('diceTwo').style.display = 'none';
			
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});



function nextPlayer() {
	//Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('diceOne').style.display = 'none';
	document.getElementById('diceTwo').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	//Default variables
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	score.value = null;

	// gamePlaying = true;
	//Default values
	document.getElementById('diceOne').style.display = 'none';
	document.getElementById('diceTwo').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}