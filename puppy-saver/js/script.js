var canvas = document.querySelector('.my-game');
var ctx = canvas.getContext('2d');


var points = 0;
var lostPuppies = 0;
var puppiesSaved = $('.puppies-saved');
var puppiesLost = $('.puppies-lost');
var gameSFX = new Audio('audio/game.mp3');
var caughtSFX = new Audio('audio/caught-puppy.mp3')
var lostSFX = new Audio('audio/lost-puppy.mp3');
var loseSFX = new Audio('audio/ruh-roh.mp3');
var endgameSFX = new Audio ('audio/game-end.mp3')
var retryButton = document.querySelector('.retry-button');

gameSFX.loop = true;
gameSFX.play();


$('.lose-modal').modal('hide')


// this is the box used to catch the puppies

var catchBox = {
  x: 200,
  y: 350,
  width: 90,
  height: 50,
  draw: function() {
      ctx.fillStyle = 'burlywood';
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};


// this is a box that is beneath the visible canvas used for the losing mechanism

var loseBox = {
  x: 0,
  y: 440,
  width: 500,
  height: 50,
  draw: function() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};


// puppies

var puppyBlack = new Image();
puppyBlack.src = './images/puppyImage.svg';

function Puppies (x, y, image, isLoaded, width, height) {
  this.x = x
  this.y = y
  this.image = image;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
}

Puppies.prototype.draw = function () {
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var myPuppies = [
                             // random x spawn                                    random spawn y above
                             // find way to make DRY  - not working right now
  new Puppies (getRandom(0, 450), ((Math.random() * canvas.height - 410)), puppyBlack, false, 40, 40),
  new Puppies (getRandom(0, 450), ((Math.random() * canvas.height - 410)), puppyBlack, false, 40, 40),
  new Puppies (getRandom(0, 450), ((Math.random() * canvas.height - 410)), puppyBlack, false, 40, 40),
  new Puppies (getRandom(0, 450), ((Math.random() * canvas.height - 410)), puppyBlack, false, 40, 40),
];

function makePuppies() {
  for (var i=0; i < 1; i++ ) {
  myPuppies.push(new Puppies(getRandom(0, 450), ((Math.random() * canvas.height - 410)), puppyBlack, false, 40, 40));
  console.log(myPuppies);
  }
}

function drawPuppies(){
  myPuppies.forEach(function (onePuppy) {
    onePuppy.y += 1;
    onePuppy.draw();

    // collision detection for catching box
    while (catchBox.x < onePuppy.x + onePuppy.width &&
      catchBox.x + catchBox.width > onePuppy.x &&
      catchBox.y < onePuppy.y + onePuppy.height &&
      catchBox.height + catchBox.y > onePuppy.y) {
        points += 1;
        //removes puppy from canvas without compromising score
        onePuppy.y += NaN;
        puppiesSaved.empty();
        puppiesSaved.append(points);
        caughtSFX.play();
      }

    // collision detection for losing box
    while (loseBox.x < onePuppy.x + onePuppy.width &&
      loseBox.x + loseBox.width > onePuppy.x &&
      loseBox.y < onePuppy.y + onePuppy.height &&
      loseBox.height + loseBox.y > onePuppy.y) {
        lostPuppies += 1;
        //removes puppy from canvas
        onePuppy.y += NaN;
        puppiesLost.empty();
        puppiesLost.append(lostPuppies);
        lostSFX.play();
      }

    // change speed at certain points
    if (points >= 30) {
      onePuppy.y += 6;
    }
    else if (points >= 25) {
      onePuppy.y += 5;
    }
    else if (points >= 20) {
      onePuppy.y += 4;
    }
    else if (points >= 15) {
      onePuppy.y += 3;
    }
    else if (points >= 10) {
      onePuppy.y += 2;
    }
    else if (points >= 5) {
        onePuppy.y += 1;
    }

  });

}


// timeout function to increase based on points

var delay = 3000;
setTimeout(function () {
    delay = 3000
}, 3000);

function timeout() {
    if (points >= 8) {
      delay = 500;
    }
    else if (points >= 5) {
      delay = 1000;
    }
    else if (points >= 3) {
      delay = 2000;
    }
    else if (points >= 0) {
      delay = 3000;
    }
    setTimeout(function () {
        timeout();
        makePuppies();
    }, delay);
};
timeout();


// draw!

function draw () {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPuppies();

  catchBox.draw(); //leave here so it is in front of puppies

    // checks catchBox collision with walls
    if (catchBox.x <= 0) {
        catchBox.x = 0;
    }
    if (catchBox.x >= 430) {
        catchBox.x = 410;
    }

  loseBox.draw();

  var animationRequest = requestAnimationFrame(draw);

  // losing mechanism
  if (lostPuppies >= 5) {

    $('.lose-modal').modal('show');

    gameSFX.pause();
    endgameSFX.play();
    loseSFX.play();

    cancelAnimationFrame(animationRequest);
    return;
  }
}

requestAnimationFrame(draw);


// listener for lose modal to refresh page

window.onclick = function(event) {
    if (event.target == retryButton) {
        window.location.href = "game.html"
    }
}


// controls

document.addEventListener("keydown", function() {
  switch (event.keyCode) {
        case 37: //left arrow
        case 67: //a
          catchBox.x -= 30;
          break;
        case 39: //right arrow
        case 68: //d
          catchBox.x += 30;
          break;
  }
});
