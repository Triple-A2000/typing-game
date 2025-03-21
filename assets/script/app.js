'use strict';

class TypingGame {
    _words;
    _timeLeft;
    _score;
    _currentWord;
    _timer;
    _gameActive;

    constructor() {
        this.words = [
            'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'weather',
            'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'machine',
            'accurate', 'rainbow', 'bicycle', 'eclipse', 'trouble', 'developer',
            'database', 'periodic', 'fortune', 'phone', 'future', 'pasta', 'microwave',
            'jungle', 'wallet', 'canada', 'velvet', 'potion', 'treasure', 'beacon',
            'whisper', 'breeze', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven',
            'alphabet', 'magician', 'triangle', 'baseball', 'beyond', 'banana', 'perfume',
            'computer', 'butterfly', 'music', 'eagle', 'crown', 'chess', 'laptop',
            'bedroom', 'enemy', 'button', 'door', 'bird', 'superman', 'library',
            'bookstore', 'language', 'homework', 'beach', 'economy', 'awesome',
            'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet',
            'software', 'update', 'yellow', 'keyboard', 'window', 'beans', 'truck',
            'sheep', 'blossom', 'secret', 'wonder', 'destiny', 'quest', 'download',
            'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'audio', 'school',
            'detective', 'hero', 'progress', 'winter', 'passion', 'rebel', 'amber',
            'jacket', 'article', 'paradox', 'social', 'resort', 'mask', 'escape',
            'promise', 'band', 'level', 'hope', 'moonlight', 'media', 'orchestra',
            'volcano', 'guitar', 'raindrop', 'diamond', 'illusion', 'firefly', 'ocean',
            'cascade', 'journey', 'laughter', 'horizon', 'marvel', 'compiler', 'twilight',
            'harmony', 'symphony', 'solitude', 'essence', 'forest', 'melody',
            'vision', 'silence', 'eternity', 'embrace', 'poet', 'ricochet', 'mountain',
            'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo', 'fantasy',
            'radiant', 'mermaid', 'legend', 'monitor', 'plastic', 'pressure', 'bread',
            'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle', 'sunset',
            'farmer', 'garden', 'whistle', 'blanket', 'picnic', 'sweater', 'lantern',
            'theater', 'traffic', 'website', 'courage', 'shelter', 'painter', 'twinkle',
            'squeeze', 'forever', 'stadium', 'gourmet', 'flower', 'bravery', 'playful',
            'captain', 'vibrant', 'damage', 'outlet', 'general', 'batman', 'enigma',
            'storm', 'universe', 'engine', 'mistake', 'hurricane'
        ];
        this.timeLeft = 99;
        this.score = 0;
        this.currentWord = '';
        this.timer = null;
        this.gameActive = false;

        this.timeDisplay = document.getElementById('time');
        this.scoreDisplay = document.getElementById('hits');
        this.wordDisplay = document.getElementById('word-display');
        this.wordInput = document.getElementById('word-input');
        this.startBtn = document.getElementById('start-btn');
        this.backgroundMusic = document.getElementById('background-music');

        this.startBtn.addEventListener('click', () => this.startGame());
        this.wordInput.addEventListener('input', () => this.checkWord());
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') this.endGame();
        });
    }

    startGame() {
        if (this.gameActive) return;
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 99;
        this.timeDisplay.textContent = this.timeLeft;
        this.scoreDisplay.textContent = this.score;
        this.wordInput.disabled = false;
        this.wordInput.value = '';
        this.startBtn.textContent = 'Restart';
        this.wordInput.focus();

        this.playMusic();
        this.generateWord();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timeDisplay.textContent = this.timeLeft;
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    generateWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.currentWord = this.words[randomIndex];
        this.wordDisplay.textContent = this.currentWord;
    }

    checkWord() {
        if (this.wordInput.value.trim().toLowerCase() === this.currentWord) {
            this.score++;
            this.scoreDisplay.textContent = this.score;
            this.wordInput.value = '';
            this.generateWord();
        }
    }

    endGame() {
        clearInterval(this.timer);
        this.gameActive = false;
        this.wordInput.disabled = true;
        this.wordDisplay.textContent = 'Game Over';
        this.stopMusic();
    }

    playMusic() {
        this.backgroundMusic.play();
    }

    stopMusic() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }
}

function getDate() {
    const options = { year: 'numeric', 
                      month: 'short', 
                      day: '2-digit' 
                    };

    return new Date().toLocaleDateString('en-CA', options);
}

const typingGame = new TypingGame();
