'use strict';

// Create an array with the unique items.
var subjects = [
  'img/airplane.svg',
  'img/directions_car.svg',
  'img/directions_transit.svg',
  'img/github3.svg',
  'img/home.svg',
  'img/truck.svg'
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
var firstCard = "";
var secondCard = "";
var openCards = 0;
var points = 0;
var attempts = 0;
var pointsCounter = document.getElementById('counter');
var attemptsCounter = document.getElementById('attemptsCounter');


// Print points variable to the browser
function printCounters(points, attempts) {
  $(pointsCounter).text(points);
  $(attemptsCounter).text(attempts);
}
printCounters(points, attempts);


function hideCards() {
  $('.open').removeClass('open');
}

function removeContent() {
  firstCard = "";
  secondCard = "";
}


// Create click event
$('p').click(function() {

  openCards++;
  $(this).addClass('open');
  $('.matched').css('visibility', 'hidden');
  
  
  if ( openCards == 1) {

    firstCard = $(this);

  } else if ( openCards == 2) {

    secondCard = $(this);

    if( firstCard.html() !== secondCard.html() ) {
      attempts++;
      console.log("Fail...");
      
    } else {
      points+=100;
      attempts++;
      console.log("GOAL!!!!!");

      firstCard.parent().addClass('matched');
      secondCard.parent().addClass('matched');
    }

  } else {
    openCards = 1;
    hideCards();
    removeContent();
    $(this).addClass('open');
    firstCard = $(this);
  }

  console.log( openCards, firstCard.html(), secondCard );

  printCounters(points, attempts);
  
})





/*
TODOs:
- Create an finish screen

*/