'use strict';

// Create an array with the unique items.
var stack = [
  'img/animals-01.svg',
  'img/animals-02.svg',
  'img/animals-03.svg',
  'img/animals-04.svg',
  'img/animals-07.svg',
  'img/animals-08.svg'
];

// Double the items in the array and append it to the array
var memoryBoard = stack.slice(0);

for ( var i = 0; i < stack.length; i++ ) {
  memoryBoard.push(stack[i]);
}

// Shuffle the items from the array and print them to the browser. CSS hides content, by click it will be shown
memoryBoard.sort(function() { return 0.5 - Math.random() });

for ( var i = 0; i < memoryBoard.length; i++ ) {
  document.getElementById('memorycard-list').innerHTML += '<li><p><img src="' + memoryBoard[i] + '"></div></p>';
}



// Create Variables that will be used later

var firstCard = "";                           // The first opened card
var secondCard = "";                          // The second opened card
var totalPairs = stack.length;             // When matches is equal to this the player won
var openedCards = 0;                          // Should never be higher than 2
var matches = 0;                              // How many pairs already matched
var points = 0;                               // Points counter of the Player
var attempts = 0;                             // Attempts counter
var pointsCounter = document.getElementById('counter');     // The element in DOM which houses the points
var attemptsCounter = document.getElementById('attemptsCounter');     // The element in DOM which houses the attempts


// Print points variable to the browser
function printCounters(points, attempts) {
  $(pointsCounter).text(points);
  $(attemptsCounter).text(attempts);
}

function showCard(el) {
  el.addClass('open');
  openedCards++;
}

function hideCards() {
  $('.open').removeClass('open');
}

function removeContent() {
  firstCard = "";
  secondCard = "";
}

function removeMatchedCards() {
  $('.matched').css('visibility', 'hidden');
}

function increaseAttempts() {
  attempts++;
  printCounters(points,attempts);
}

function increasePoints(amount) {
  points += amount;
  printCounters(points, attempts);
}


// Create click event
$('#memorycard-list p').click(function() {

  if ( $(this).hasClass('open') ) {
    return;
  }

  showCard($(this));

  if ( matches != totalPairs ) {
    removeMatchedCards();
  }
  
  
  
  if ( openedCards == 1) {

    firstCard = $(this);

  } else if ( openedCards == 2) {

    secondCard = $(this);

    if( firstCard.html() !== secondCard.html() ) {
      increaseAttempts();
      console.log("Fail...");
    } else {
      increasePoints(100);
      increaseAttempts();
      matches++;
      secondCard.parent().addClass('matched');
      firstCard.parent().addClass('matched');
    }

  } else {
    
    hideCards();
    removeContent();
    openedCards = 1;
    $(this).addClass('open');
    firstCard = $(this);
  }






  

  if ( matches == totalPairs ) {

    if ( attempts == totalPairs ) {
      increasePoints(5000);

    }

    if ( attempts < 10 ) {
      increasePoints(1000);
    } 

    alert('YOU WON! GAME OVER');
    // Create a final GAME OVER screen
  }

  
  
})
