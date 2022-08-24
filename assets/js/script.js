var quizBank = [
    {
        id: 0,
        question: 'Which keyword will not allow you to create a new variable?',
        choices: [
            {text: 'var', correct: 0},
            {text: 'let', correct: 0},
            {text: 'command', correct: 1},
            {text: 'const', correct: 0},
        ]
    },
    {
        id: 1,
        question: 'Which of the following is a boolean value?',
        choices: [
            {text: '"cat"', correct: 0},
            {text: 'false', correct: 1},
            {text: '3.14', correct: 0},
            {text: '-100', correct: 0},
        ]
    },
    {
        id: 2,
        question: 'Which of the following is not a falsy value?',
        choices: [
            {text: '0', correct: 0},
            {text: 'null', correct: 0},
            {text: 'NaN', correct: 0},
            {text: '-5', correct: 1},
        ]
    },
    {
        id: 3,
        question: 'Which expression creates a new array?',
        choices: [
            {text: 'var Colors = [blue, green, yellow, red];', correct: 1},
            {text: 'Colors = red & yellow', correct: 0},
            {text: 'set Colors: blue; green; yellow; red;', correct: 0},
            {text: 'x = 1', correct: 0},
        ]
    },{
        id: 4,
        question: 'What method can you use to join two arrays?',
        choices: [
            {text: 'connect()', correct: 0},
            {text: 'concat()', correct: 1},
            {text: 'addArray()', correct: 0},
            {text: 'plus()', correct: 0},
        ]
    },{
        id: 5,
        question: 'What do you call a function that is a property of an object?',
        choices: [
            {text: 'action', correct: 0},
            {text: 'method', correct: 1},
            {text: 'utility', correct: 0},
            {text: 'document', correct: 0},
        ]
    },{
        id: 6,
        question: 'Which expression creates a random number between 1 and 10?',
        choices: [
            {text: 'randomInt(0-10)', correct: 0},
            {text: 'Math.random() * 11', correct: 0},
            {text: 'Math.floor(Math.random() * 11)', correct: 1},
            {text: 'Math.random(0, 10)', correct: 0},
        ]
    },{
        id: 7,
        question: 'How do you create a dialog box that accepts text input?',
        choices: [
            {text: 'window.alert', correct: 0},
            {text: 'window.confirm', correct: 0},
            {text: 'console.log', correct: 0},
            {text: 'window.prompt', correct: 1},
        ]
    },{
        id: 8,
        question: 'What is the index of the first item in an array?',
        choices: [
            {text: '1', correct: 0},
            {text: 'init', correct: 0},
            {text: 'null', correct: 0},
            {text: '0', correct: 1},
        ]
    },{
        id: 9,
        question: 'What is the DOM?',
        choices: [
            {text: 'Document Object Model', correct: 1},
            {text: 'Data Oriented Model', correct: 0},
            {text: 'Delete Other Methods', correct: 0},
            {text: 'a fancy variable', correct: 0},
        ]
    }
];



var startButtonEl = document.querySelector('#start-quiz');
var welcomeEl = document.querySelector('#welcome');
var questionBoxEl = document.querySelector('#question-box');
var endQuizEl = document.querySelector('#end-quiz');
var highScoresEl = document.querySelector('#high-scores');
var scoreButtonEl = document.querySelector('#score-button');
var scoresLinkEl = document.querySelector('#scores-link');
var clearButtonEl = document.querySelector('#clear');



var quizProgress = 0;
var timer = 100;
var highScores = [];
var endQuizIndicator = false;

var questionText = document.querySelector('#question-text');
var choice1 = document.querySelector('#choice1');
var choice2 = document.querySelector('#choice2');
var choice3 = document.querySelector('#choice3');
var choice4 = document.querySelector('#choice4');


// ------------------function section--------------------------------------


var startQuiz = function () {
    
    welcomeEl.style.display = 'none';
    questionBoxEl.style.display = 'block';
    highScoresEl.style.display = 'none';
    loadQuestion(quizProgress);
    quizProgress++;
    questionBoxEl.addEventListener('click', checkAnswer);

};




var quizTimer = function() {
    var timerEl = document.querySelector('#timer');
    var countdown = setInterval(function() {

        if (timer > 0) {
            timer --;
            timerEl.textContent = 'Time: ' + timer;
        } 
        else {
            timerEl.textContent = 'Time: 0';
            clearInterval(countdown);
            endQuiz();
        }
        if (endQuizIndicator) {
            clearInterval(countdown);
        }

        
    }, 1000);
};
var loadQuestion = function(quizProgress) {
    questionText.textContent = quizBank[quizProgress].question;
    choice1.textContent = quizBank[quizProgress].choices[0].text;
    choice2.textContent = quizBank[quizProgress].choices[1].text;
    choice3.textContent = quizBank[quizProgress].choices[2].text;
    choice4.textContent = quizBank[quizProgress].choices[3].text;

    choice1.setAttribute('data-correct', quizBank[quizProgress].choices[0].correct);
    choice2.setAttribute('data-correct', quizBank[quizProgress].choices[1].correct);
    choice3.setAttribute('data-correct', quizBank[quizProgress].choices[2].correct);
    choice4.setAttribute('data-correct', quizBank[quizProgress].choices[3].correct);
};




var checkAnswer = function() {
    var answerFeedbackEl = document.querySelector('#feedback');
    var targetEl = event.target;
    var verifyCorrect = targetEl.getAttribute('data-correct');
    if (parseInt(verifyCorrect) === 1) {
        answerFeedbackEl.textContent = 'Correct!';
    }
    else {
        answerFeedbackEl.textContent = 'Incorrect!';
        timer = timer - 10;
    }
    var clearFeedback = function() {answerFeedbackEl.textContent = '';};
    setTimeout(clearFeedback, 2000);
    if (quizProgress < quizBank.length) {
        startQuiz();
    }
    else {
        endQuiz();
    }
};
var endQuiz = function() {
    
    questionBoxEl.style.display = 'none';
    endQuizEl.style.display = 'block';
    endQuizIndicator = true;

    if (timer === 0) {
        document.querySelector('#score-form').style.display = 'none';
        document.querySelector('#display-score').textContent = 'You did not get a high score.'
    }
    else {
        var highScore = timer;
        document.querySelector('#display-score').textContent = 'Your score is ' + highScore;
    }

};

var saveScore = function() {
    event.preventDefault();
    highScoresEl.style.display = 'block';
    endQuizEl.style.display = 'none';
    var userInitials = document.querySelector('input').value;
    highScores.push({user: userInitials, score: timer});
    localStorage.setItem('scores', JSON.stringify(highScores));
    createScoreList();
};




var createScoreList = function() {
    var scoreList = document.querySelector('#score-list');

    for (i = 0; i < highScores.length; i++) {
        var scoreListItem = document.createElement('li');
        scoreListItem.textContent = highScores[i].user + '  -  ' + highScores[i].score;
        scoreList.appendChild(scoreListItem);
    }
};

var loadScores = function() {
    var savedScores = localStorage.getItem('scores');

    if (savedScores === null) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
    highScores = savedScores;

    createScoreList();
};

var showHighScores = function() {
    highScoresEl.style.display = 'block';
    questionBoxEl.style.display = 'none';
    welcomeEl.style.display = 'none';
    
};

var clearScores = function() {
    localStorage.clear();
}





startButtonEl.addEventListener('click', startQuiz);
startButtonEl.addEventListener('click', quizTimer);
scoreButtonEl.addEventListener('click', saveScore); 
scoresLinkEl.addEventListener('click', showHighScores);
clearButtonEl.addEventListener('click', clearScores);

loadScores();