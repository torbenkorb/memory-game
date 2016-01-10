'use strict';

// Create an array with the unique items.
var subjects = [
  'img/animals-01.svg',
  'img/animals-02.svg',
  'img/animals-03.svg',
  'img/animals-04.svg',
  'img/animals-07.svg',
  'img/animals-08.svg'
];

// Double the items in the array and append it to the array
var memoryBoard = subjects.slice(0);

for ( var i = 0; i < subjects.length; i++ ) {
  memoryBoard.push(subjects[i]);
}

// Shuffle the items from the array and print them to the browser. CSS hides content, by click it will be shown
memoryBoard.sort(function() { return 0.5 - Math.random() });

for ( var i = 0; i < memoryBoard.length; i++ ) {
  document.getElementById('memorycard-list').innerHTML += '<li><p><img src="' + memoryBoard[i] + '"></div></p>';
}



// Create Variables that will be used later

var firstCard = "";                           // The first opened card
var secondCard = "";                          // The second opened card
var totalPairs = subjects.length;             // When matches is equal to this the player won
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
printCounters(points, attempts);


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


// Create click event
$('p').click(function() {

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
      attempts++;
      console.log("Fail...");
    } else {
      points+=100;
      attempts++;
      matches++;
      console.log("GOAL!!!!!");
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
      points+=5000;
    }

    if ( attempts < 10 ) {
      points+=1000;
    } 

    alert('YOU WON! GAME OVER');
    // Create a final GAME OVER screen
  }

  printCounters(points, attempts);
  
})
