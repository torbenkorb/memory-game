/*

4.) Let user open 2 cards and compare them, if matches 1 point, if not 1 fail
5.) Once all cards are found game is finished

*/


'use strict';



// Create an array with the unique items.
var subjects = [
  'House',
  'Mouse',
  'Dog',
  'Cat',
  'Car',
  'Yellow'
];


// Create Variables that will be used later

var shownSubject;
var compareSubject;
var points = 0;
var pointsCounter = document.getElementById('counter');
var attempts = 0;
var attemptsCounter = document.getElementById('attemptsCounter');


// Print points variable to the browser
function printCounters(points, attempts) {
  pointsCounter.innerText=points;
  attemptsCounter.innerText=attempts;
}
printCounters(points, attempts);



// 2.) Double the items in the array and append it to the array
var memoryBoard = subjects.slice(0);

for ( var i = 0; i < subjects.length; i++ ) {
  memoryBoard.push(subjects[i]);
}



// 3.) Shuffle the items from the array and print them to the browser. CSS hides content, by click it will be shown
memoryBoard.sort(function() { return 0.5 - Math.random() });

for ( var i = 0; i < memoryBoard.length; i++ ) {
  document.getElementById('memorycard-list').innerHTML += '<li><p>' + memoryBoard[i] + '</div></p>';
}








// Create click event
$('p').click(function() {

  $(this).addClass('open');

  var openCards = $('.open');

  if( openCards.length <= 1) {
    shownSubject = $(this);
  }

  if( openCards.length >= 2) {
    compareSubject = $(this);

    if( shownSubject.text() !== compareSubject.text() ) {
      attempts++;
      alert("Fail...");
      shownSubject.removeClass('open');
      compareSubject.removeClass('open');
    } else {
      points+=100;
      attempts++;
      alert("GOAL!!!!!");
      shownSubject.removeClass('open').addClass('matched');
      compareSubject.removeClass('open').addClass('matched');
    }

  }

  printCounters(points, attempts);
  
})

