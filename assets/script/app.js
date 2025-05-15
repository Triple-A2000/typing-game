'use strict';

import * as utils from './utils.js';
import words from './words.js';
import Score from './score.js';

const startGame = utils.select('#start-btn');
const numberOfHits = utils.select('#hits');
const timer = utils.select('#time');
const randomWords = utils.select('#word-display');
const typedWord = utils.select('#word-input');
const bgMusic = new Audio('./assets/media/game-bg-sound.mp3');
bgMusic.type = 'audio/mp3';
bgMusic.loop = true;
const gameOverSound = new Audio('./assets/media/game-over-sound.mp3');
gameOverSound.type = 'audio/mp3';
const correct = new Audio('./assets/media/game-correct-sound.mp3');
correct.type = 'audio/mp3';

let timeCount = 12;
let count = 0;
let timeInterval;
let wordList = [...words.sort(() => Math.random() - 0.5)];

typedWord.disabled = true;
typedWord.style.cursor = 'not-allowed';

function setTime() {
    clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        timer.textContent = timeCount.toString().padStart(2, '0');
        timeCount--;

        if (timeCount === 5) {
            let blinkCount = 0;
            let blinkInterval = setInterval(() => {
                timer.style.visibility = timer.style.visibility === 'hidden' ? 'visible' : 'hidden';
                blinkCount++;
                if (blinkCount >= 10) {
                    clearInterval(blinkInterval);
                    timer.style.visibility = 'visible';
                }
            }, 500);
        }

        if (timeCount < 0) {
            clearInterval(timeInterval);
            bgMusic.pause();
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    typedWord.disabled = true;
    typedWord.style.cursor = 'not-allowed';
    typedWord.value = '';
    randomWords.textContent = "Game Over!";
    randomWords.style.color = '#8D0E3D';
    gameOverSound.play();

    const accuracyPercentage = (count / words.length) * 100;
    const score = new Score(count, accuracyPercentage, new Date().toLocaleString());
    saveScore(score);
    updateScoreboardDisplay();
}

function getNextWord() {
    const newWord = wordList.pop();
    return `${newWord}`;
}

function validateHits() {
    const displayedWord = randomWords.textContent.trim();
    const userInput = typedWord.value.trim();

    if ((displayedWord.length === userInput.length) && (displayedWord === userInput)) {
        correct.currentTime = 0;
        correct.play();
        randomWords.textContent = getNextWord();
        typedWord.value = '';
        count++;
        numberOfHits.textContent = `${count}`;
    }
}

const rawScores = JSON.parse(localStorage.getItem('scoreHistory')) || [];
const validScores = rawScores.filter(score => score && score.hits !== undefined);
localStorage.setItem('scoreHistory', JSON.stringify(validScores));

function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('scoreHistory')) || [];
    const plainScore = {
        hits: score.hits,
        date: score.date
    };
    scores.push(plainScore);
    scores.sort((a, b) => b.hits - a.hits);
    scores = scores.slice(0, 9);
    localStorage.setItem('scoreHistory', JSON.stringify(scores));
}

function updateScoreboardDisplay() {
    const scoreboardBody = utils.select('#scoreboard-body'); // You need to add this tbody in HTML
    if (!scoreboardBody) return;

    const scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];
    scoreboardBody.innerHTML = '';

    scoreHistory.forEach((score, index) => {
        const row = utils.create('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.hits ?? '0'}</td>
            <td>${score.date ?? 'N/A'}</td>
        `;
        scoreboardBody.append(row);
    });
}

utils.listen('input', typedWord, validateHits);

window.onload = () => {
    updateScoreboardDisplay();
};

utils.listen('click', startGame, () => {
    typedWord.disabled = false;
    typedWord.style.cursor = 'text';
    typedWord.focus();
    randomWords.textContent = getNextWord();
    count = 0;
    timeCount = 12;
    numberOfHits.textContent = `${count}`;
    randomWords.style.color = '#000';
    setTime();
    bgMusic.play();
});
