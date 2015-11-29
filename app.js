/*

4.) Let user open 2 cards and compare them, if matches 1 point, if not 1 fail
5.) Once all cards are found game is finished

*/


'use strict';

// 1.) Create an array with the unique items. For example some nouns
var subjects = [
  'House',
  'Mouse',
  'Dog',
  'Cat',
  'Car',
  'Yellow'
];


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

console.log(memoryBoard);

var shownSubject;
var compareSubject;
var points = 0;

document.getElementById('counter').innerText=points;

// Create click event
$('p').click(function() {

  $(this).addClass('open');

  if( $('.open').length <= 1) {
    shownSubject = $(this).text();
  }

  if( $('.open').length >= 2) {
    compareSubject = $(this).text();
  }

  console.log(shownSubject, compareSubject);

  if( shownSubject !== compareSubject ) {
    console.log("Fail...");
  } else {
    console.log("GOAL!!!!!");
    points+=100;
  }

  document.getElementById('counter').innerText=points;


  if ( $('.open').length >= 2 ) {
    console.log('No more!');
  }

  
})

