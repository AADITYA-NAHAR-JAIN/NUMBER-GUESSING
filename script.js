let targetNumber;
let attempts = 0;

const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit-guess');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetButton = document.getElementById('reset');

function startNewGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.textContent = '';
    message.classList.remove('fade');
    attemptsDisplay.textContent = attempts;
    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = true; // Disabled initially until valid input
    resetButton.style.display = 'none';
    guessInput.focus();
}

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        message.style.color = 'orange';
        animateMessage();
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === targetNumber) {
        message.textContent = '🎉 Congratulations! You guessed the correct number! 🎉';
        message.style.color = '#4caf50';
        document.body.classList.add('win-effect');
        resetButton.style.display = 'inline-block';
        guessInput.disabled = true;
        submitButton.disabled = true;
    } else {
        let diff = Math.abs(targetNumber - guess);
        if (diff <= 5) {
            message.textContent = '🔥 Very close! Try again.';
        } else if (diff <= 15) {
            message.textContent = '🙂 Close! Try again.';
        } else {
            message.textContent = guess < targetNumber ? '⬇️ Too low! Try again.' : '⬆️ Too high! Try again.';
        }
        message.style.color = '#e53935';
        animateMessage();

        // Provide hint after 3 attempts
        if (attempts === 3) {
            // Calculate nearest multiple of 10
            let nearestTen = Math.round(targetNumber / 10) * 10;
            let hint = `The number is near ${nearestTen}.`;
            message.textContent += ' Hint: ' + hint;
        }
    }
}

function animateMessage() {
    message.classList.remove('fade');
    void message.offsetWidth; // Trigger reflow
    message.classList.add('fade');
}

guessInput.addEventListener('input', () => {
    const guess = guessInput.value;
    submitButton.disabled = guess === '' || guess < 1 || guess > 100;
});

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', () => {
    document.body.classList.remove('win-effect');
    startNewGame();
});

guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !submitButton.disabled) {
        checkGuess();
    }
});

startNewGame();
