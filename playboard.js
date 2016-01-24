'use strict';

var stack = ['House', 'Cat', 'Car', 'Mountain', 'Bird', 'Dog'];
var stack2 = ['animals-01.svg' ,'animals-02.svg' ,'animals-03.svg' ,'animals-07.svg' ,'animals-05.svg' ,'animals-09.svg']

function Game(stack) {
    this.allCards = stack.concat(stack);
    this.matches = null;
    this.points = null;
    this.attempts = null;
    this.openCard = null;
}

Game.prototype.sortCards = function() {
    this.sortedCards = this.allCards.sort(function() { return .5 - Math.random() });
};

Game.prototype.renderBoard = function(container) {
    this.sortCards();
    container.innerHTML = "";
    for ( var i=0; i < this.sortedCards.length; i++ ) {
        container.innerHTML += '<li onclick="getData(this)"><img src="img/' + this.sortedCards[i] + '"></li>';
    }
};

Game.prototype.updatePoints = function(points) {
    this.points += points;
    var pointer = document.getElementById('pointer');
    pointer.innerHTML = this.points;
};

Game.prototype.increaseAttempts = function() {
    this.attempts++;
    var attempter = document.getElementById('attempter');
    attempter.innerHTML = this.attempts;
};


Game.prototype.saveCard = function(card) {
    this.openCard = card;
};

Game.prototype.resetCard = function() {
    this.openCard = null;
};

Game.prototype.showCard = function(card) {
    card.classList.add('open');
};

Game.prototype.hideCards = function() {
    var cards = document.getElementsByClassName('open');
    for ( var i = cards.length - 1; i >= 0; --i ) {
        cards[i].classList.remove('open');
    }
};

Game.prototype.countCards = function() {
    var cards = document.getElementsByClassName('open');
    return cards.length;
};

Game.prototype.hasMatch = function(element1, element2) {
    this.matches++;
    element1.classList.add('match');
    element2.classList.add('match');
};

Game.prototype.removeMatched = function() {
    var matches = document.getElementsByClassName('match');
    for (var i = matches.length - 1; i >= 0; --i) {
        matches[i].style.visibility = "hidden";
    }
};

Game.prototype.gameOver = function() {
    var pointer = document.getElementById('end-pointer');
    var attempter = document.getElementById('end-attempter');
    var gameoverModal = document.getElementById('game-over');
    pointer.innerHTML = this.points;
    attempter.innerHTML = this.attempts;
    gameoverModal.classList.add('show');
}




// UI Functionality

function getData(el) {

    if( el.classList.contains('match') || el.classList.contains('open') ) {
        return;
    }

    game.removeMatched();
    
    if(game.countCards() == 2 && el.className != 'open') {
        game.hideCards();
    }

    if(game.openCard != undefined && el.className != 'open') {

        if(el.innerHTML == game.openCard.innerHTML) {
            game.updatePoints(500);
            game.hasMatch(el, game.openCard);
        }
        game.resetCard();
        game.increaseAttempts();
        
    } else {
        game.saveCard(el);
    }
    game.showCard(el);

    if(game.matches == game.allCards.length / 2) {
        if (game.attempts < 10 ) {
            game.updatePoints(game.points);
        } 
        if (game.attempts == game.matches) {
            game.updatePoints(game.points);
        }
        game.gameOver();
    }
    
}