
// switch (event.keyCode) {
//       // case 32: //space bar
//       //   tetromino.y += 20;
//       //   break;
//       case 37: //left arrow
//         tetromino.x -= 1;
//         break;
//       // case 38: //up arrow
//       //   tetromino.y -= 1;
//       //   break;
//       case 39: //right arrow
//         tetromino.x += 1;
//         break;
//       case 40: //down arrow
//         tetromino.y += 1;
//         break;
// }


var playButton = $('.play-button');
var helpButton = $('.help-button');
var menuDiv = $('.menu-div');
var myGame = $('.my-game');
var retryButton = $('.retry-button');
var gameContainer = $('.game-container');

//hiding elements
gameContainer.hide(); //commenting out for now, remove comment later
retryButton.hide();
//menuDiv.hide(); //hiding out for now, remove this code later


playButton.click(function () {
  console.log('play marathon clicked');
  menuDiv.hide();
  gameContainer.show();
});

retryButton.click(function () {
  console.log('retry clicked');
  menuDiv.hide();
  retryButton.hide();
  myGame.show();

});


// trying to keep both modals from popping up when only one is clicked; leaving for now.

// var helpModal = $('#help-modal .help-modal');
// var aboutModal = $('#about-modal');
// var helpButton = $('#help-button');
// var aboutButton = $('#about-button');
// var modalBox = $('#about-modal-content');

// $('#about-modal').modal('hide');
// helpModal.modal('hide');

// helpModal.click(function () {
//   // $('#about-modal').modal('hide');
//   // $('#help-content').modal('show');
//   helpModal.modal('show');
// });
//
// aboutModal.click(function () {
//   helpModal.modal('hide');
//   aboutModal.modal('show');
// });//this works, do not touch!


//canvas stuff
