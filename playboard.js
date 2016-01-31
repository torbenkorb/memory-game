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
        container.innerHTML += '<li class="card"><img src="img/' + this.cards[i] + '"></li>';
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

Game.prototype.addPoints = function(points) {
    this.points += points;
    this.writePoints();
}

Game.prototype.doublePoints = function() {
    this.points += this.points;
    this.updatePoints();
}

Game.prototype.resetPoints = function() {
    this.points = 0;
    this.updatePoints();
}

Game.prototype.hideMatched = function() {
    for(var i=0; i < this.savedCards.length; i++) {
    this.savedCards[i].style.visibility = 'hidden';
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
}

Game.prototype.saveHighscore = function() {
    this.highscore.push(this.points);
}

Game.prototype.savePlayer = function() {
    var player = document.getElementById('player');
    player.innerHTML = this.player;
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
            game.addPoints(500);
            game.savedCards.push(this);

        } else {
            game.savedCards = [];
        }
        game.updateAttempts();




        if(game.matches === game.cards.length / 2) {
            if(game.attempts < game.cards.length) {
                game.addPoints(game.points);
            }
            if (game.attempts === game.cards.length / 2) {
                game.addPoints(game.points * 2);
            }
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
var playerName = prompt("What's your name, Player?")
var game = new Game(stack2, playerName);
var gameContainer = document.getElementById('memorycard-container');
game.renderBoard(gameContainer);



