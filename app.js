//  Game Values 
 let min = 1,
     max = 10,
     winningNum = getRandomNum(min, max),
     guessesLeft = 3;


// UI Elements
const UIgameWrap = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');


// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play Again Event listener
UIgameWrap.addEventListener('mousedown', function(e){
  if(e.target.classList.contains('play-again')){
    window.location.reload()
  } 
});

// Listen for guess
UIguessBtn.addEventListener('click', function(e){

  let guess = parseInt(UIguessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  else{
    // Check if won
    if(guess === winningNum){

      // Game over - won
      gameOver(true, `${winningNum} is correct, YOU WIN!`);

      // Play again
      playAgain();
    }
    else{

      // Wrong number
      guessesLeft -= 1;

      if(guessesLeft === 0){

        // Game over - lost
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);

        // Play again
        playAgain();

      }
      else{

        // Game continues - Answer wrong
        gameOver(false, `${guess} is not correct. You have ${guessesLeft} trial(s) left`);

        UIguessInput.disabled = false;
        UIguessInput.value = '';
      }
    }
  }

  e.preventDefault();
})

function setMessage(msg, color){
  UImessage.textContent = msg;
  UImessage.style.color = color;
}

function gameOver(won, message){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input field
  // UIguessInput.setAttribute('disabled', '');
  UIguessInput.disabled = true;

  // Set border green
  UIguessInput.style.borderColor = color;

  // Message
  setMessage(message, color);
}

// Get Winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}



function playAgain(){

  // // Creating Play again element
  // const playBtn = document.createElement('input');

  // // Set attributes
  // playBtn.setAttribute('type', 'submit');
  // playBtn.setAttribute('value', 'Play Again');
  // playBtn.setAttribute('id', 'play-again');

  // // Replace submit with play-again
  // UIgameWrap.replaceChild(playBtn, UIguessBtn);
  
  UIguessBtn.value = 'Play Again';
  UIguessBtn.className += 'play-again';
}

