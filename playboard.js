'use strict';

var stack = ['House', 'Cat', 'Car', 'Mountain', 'Bird', 'Dog'];
var stack2 = ['animals-01.svg' ,'animals-02.svg' ,'animals-03.svg' ,'animals-07.svg' ,'animals-05.svg' ,'animals-09.svg']

function Game(stack, player) {
    this.player = player;
    this.cards = stack.concat(stack);
    this.highscore = [];
    this.savePlayer();
}


Game.prototype.renderBoard = function(container) {
    this.matches = 0;
    this.points = 0;
    this.writePoints();
    this.attempts = 0;
    this.writeAttempts();
    this.openCard = undefined;
    this.savedCards = [];
    this.cards.sort(function() { return .5 - Math.random() });
    container.innerHTML = "";
    for ( var i=0; i < this.cards.length; i++ ) {
        container.innerHTML += '<li class="card"><div class="card__inner"><div class="card__backside"></div><div class="card__image"><img src="img/' + this.cards[i] + '"></div></div></li>';
    }
    this.addListener();
    var gameoverModal = document.getElementById('game-over');
    gameoverModal.classList.remove('show');
};

Game.prototype.addListener = function() {
    var cardItems = document.querySelectorAll('li.card');
    for (var i=0; i < cardItems.length; i++) {
        cardItems[i].addEventListener('click', playGame);
    }
}

Game.prototype.updateMatches = function() {
    this.matches++;
}

Game.prototype.writeAttempts = function() {
    var attempts = document.getElementById('attempter');
    attempts.innerHTML = this.attempts;
}

Game.prototype.updateAttempts = function() {
    this.attempts++;
    this.writeAttempts();
}

Game.prototype.writePoints = function() {
    var container = document.getElementById('pointer');
    container.innerHTML = this.points;
}

Game.prototype.updatePoints = function() {
    var points = this.cards.length / 2 * 100;
    points = points - (this.attempts * 100);
    if (points <= 100) {
        points = 100;
    }    
    this.points += points;
    this.writePoints();
}

Game.prototype.calculatePoints = function() {
    if(this.attempts < this.cards.length) {
        this.points += this.points * 4;
        this.writePoints();
    }
    if (this.attempts === this.cards.length / 2) {
        this.points += this.points * 9;
        this.writePoints();
    }
}


Game.prototype.hideMatched = function() {
    for(var i=0; i < this.savedCards.length; i++) {
    //this.savedCards[i].style.visibility = 'hidden';
    this.savedCards[i].classList.add('matched');
    }
}

Game.prototype.hideUnmatched = function() {
    var showed = document.querySelectorAll('.open');
    for(var i=0; i < showed.length; i++) {
        showed[i].classList.remove('open');
    }
}

Game.prototype.gameOver = function() {
    var pointer = document.getElementById('end-pointer');
    var attempter = document.getElementById('end-attempter');
    var player = document.getElementById('playerName');
    var gameoverModal = document.getElementById('game-over');
    pointer.innerHTML = this.points;
    attempter.innerHTML = this.attempts;
    player.innerHTML = this.player;
    gameoverModal.classList.add('show');
    this.saveHighscore();
}

Game.prototype.saveHighscore = function() {
    var combinedScore = [];

    combinedScore.push(this.points);
    combinedScore.push(this.attempts);

    this.highscore.push(combinedScore);

    var highscoreElement = document.getElementById('highscores');
    highscoreElement.innerHTML = "";
    for (var i = 0; i < this.highscore.length; i++) {
        var counter = i + 1;
        highscoreElement.innerHTML += '<p>' + counter + '.) ' + this.highscore[i];
    }


}

Game.prototype.savePlayer = function() {
    var player = document.getElementById('player');
    player.innerHTML = this.player;
}

Game.prototype.debugMode = function() {
    var cardItems = document.querySelectorAll('li.card');
    for (var i=0; i < cardItems.length; i++) {
        cardItems[i].classList.add('debug');
    }
}



// CONTROLLER

function playGame() {

    if(game.savedCards.length > 1) {
        game.hideMatched();
        game.savedCards = [];
    }

    if(game.savedCards.length === 0) {

        game.hideUnmatched();
        game.savedCards.push(this);
        this.className += ' open';

    } else {


        if(game.savedCards[0] === this) {
            return;
        } else {
            this.className += ' open';
        }

        if(game.savedCards[0].innerHTML === this.innerHTML) {
            game.updateMatches();
            game.updatePoints();
            game.savedCards.push(this);

        } else {
            game.savedCards = [];
        }
        game.updateAttempts();




        if(game.matches === game.cards.length / 2) {
            game.calculatePoints();
            game.gameOver();
        }
    }
}



// RESTART
var restartButton = document.getElementById('restart');
restartButton.onclick = function(e) {
    e.preventDefault();
    var gameContainer = document.getElementById('memorycard-container');
    game.renderBoard(gameContainer);
}

// INIT
var playerName = prompt("Hi Player, what's your name?")
if(!playerName) {
    playerName = "Player 1";
}
var game = new Game(stack2, playerName);
var gameContainer = document.getElementById('memorycard-container');
game.renderBoard(gameContainer);



