const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const view = document.getElementById("view");
const timer = document.querySelector(".timer");
const end = document.getElementById("end");
const highScoreList = document.getElementById("highScoreList");
var secondsLeft = 60;
let question = document.getElementById("question");
let a = document.getElementById("a");
let b = document.getElementById("b");
let c = document.getElementById("c");
let d = document.getElementById("d");
const answers = document.querySelectorAll(".answer");
let answerList = [];
let questionNum = 0;

// I'm going to be real, I have no clue how this question array stuff works. Google is good to me but not good enough to explain why.
// I'm also not good at being creative so I'm stealing questions and answers from https://www.tutorialkart.com/quiz/general-programming-quiz/
const questionList= [
    {
        question: "𝔴𝔥𝔦𝔠𝔥 𝔬𝔣 𝔱𝔥𝔢 𝔣𝔬𝔩𝔩𝔬𝔴𝔦𝔫𝔤 𝔦𝔰 𝔞𝔫 𝔞𝔭𝔱 𝔡𝔢𝔰𝔠𝔯𝔦𝔭𝔱𝔦𝔬𝔫 𝔣𝔬𝔯 𝔞𝔫 𝔞𝔩𝔤𝔬𝔯𝔦𝔱𝔥𝔪?",
        choices: [
            {text: "𝔞 𝔭𝔯𝔬𝔠𝔢𝔰𝔰 𝔬𝔯 𝔰𝔢𝔱 𝔬𝔣 𝔯𝔲𝔩𝔢𝔰 𝔱𝔬 𝔟𝔢 𝔣𝔬𝔩𝔩𝔬𝔴𝔢𝔡 𝔦𝔫 𝔠𝔞𝔩𝔠𝔲𝔩𝔞𝔱𝔦𝔬𝔫𝔰 𝔬𝔯 𝔬𝔱𝔥𝔢𝔯 𝔭𝔯𝔬𝔟𝔩𝔢𝔪-𝔰𝔬𝔩𝔳𝔦𝔫𝔤 𝔬𝔭𝔢𝔯𝔞𝔱𝔦𝔬𝔫𝔰, 𝔢𝔰𝔭𝔢𝔠𝔦𝔞𝔩𝔩𝔶 𝔟𝔶 𝔞 𝔠𝔬𝔪𝔭𝔲𝔱𝔢𝔯.", correct: true},
            {text: "𝔭𝔯𝔬𝔤𝔯𝔞𝔪 𝔰𝔱𝔞𝔱𝔢𝔪𝔢𝔫𝔱𝔰 𝔱𝔥𝔞𝔱 𝔯𝔲𝔫 𝔱𝔬 𝔢𝔵𝔢𝔠𝔲𝔱𝔢 𝔞 𝔱𝔞𝔰𝔨.", correct: false},
            {text: "𝔞 𝔰𝔢𝔱 𝔬𝔣 𝔦𝔫𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫𝔰 𝔴𝔯𝔦𝔱𝔱𝔢𝔫 𝔦𝔫 𝔞 𝔭𝔯𝔬𝔤𝔯𝔞𝔪𝔪𝔦𝔫𝔤 𝔩𝔞𝔫𝔤𝔲𝔞𝔤𝔢 𝔱𝔬 𝔭𝔢𝔯𝔣𝔬𝔯𝔪 𝔞 𝔱𝔞𝔰𝔨.", correct: false},
            {text: "𝔰𝔢𝔱 𝔬𝔣 𝔦𝔫𝔰𝔱𝔯𝔲𝔠𝔱𝔦𝔬𝔫𝔰 𝔡𝔢𝔠𝔬𝔡𝔢𝔡 𝔣𝔯𝔬𝔪 𝔞 𝔥𝔦𝔤𝔥-𝔩𝔢𝔳𝔢𝔩 𝔭𝔯𝔬𝔤𝔯𝔞𝔪𝔪𝔦𝔫𝔤 𝔠𝔬𝔡𝔢 𝔱𝔬 𝔭𝔢𝔯𝔣𝔬𝔯𝔪 𝔱𝔥𝔢 𝔱𝔞𝔰𝔨.", correct: false}
        ]
    },
    {
        question: "𝔴𝔥𝔦𝔠𝔥 𝔬𝔣 𝔱𝔥𝔢 𝔣𝔬𝔩𝔩𝔬𝔴𝔦𝔫𝔤 𝔦𝔰 𝔫𝔬𝔱 𝔞 𝔭𝔯𝔬𝔤𝔯𝔞𝔪𝔪𝔦𝔫𝔤 𝔩𝔞𝔫𝔤𝔲𝔞𝔤𝔢?",
        choices: [
            {text: "𝔩𝔲𝔞", correct: false},
            {text: "𝔭𝔶𝔱𝔥𝔬𝔫", correct: false},
            {text: "𝔞𝔫𝔞𝔠𝔬𝔫𝔡𝔞", correct: true}, //correct answer
            {text: "𝔧𝔞𝔳𝔞", correct: false}
        ]
    },
    {
        question: "𝔴𝔥𝔞𝔱𝔰𝔞𝔭𝔭 𝔠𝔬𝔫𝔠𝔲𝔯𝔯𝔢𝔫𝔱 𝔪𝔬𝔡𝔢𝔩 𝔦𝔰 𝔦𝔪𝔭𝔩𝔢𝔪𝔢𝔫𝔱𝔢𝔡 𝔲𝔰𝔦𝔫𝔤 𝔴𝔥𝔞𝔱 𝔭𝔯𝔬𝔤𝔯𝔞𝔪𝔪𝔦𝔫𝔤 𝔩𝔞𝔫𝔤𝔲𝔞𝔤𝔢?",
        choices: [
            {text: "𝔧𝔞𝔳𝔞", correct:false},
            {text: "𝔢𝔯𝔩𝔞𝔫𝔤", correct:true}, //correct answer
            {text: "𝔫𝔬𝔡𝔢.𝔧𝔰", correct:false},
            {text: "𝔧𝔞𝔳𝔞𝔰𝔠𝔯𝔦𝔭𝔱", correct: false}
        ]
    },
    {
        question: "𝔭𝔶𝔱𝔥𝔬𝔫 𝔦𝔰 _____ 𝔭𝔯𝔬𝔤𝔯𝔞𝔪𝔪𝔦𝔫𝔤 𝔩𝔞𝔫𝔤𝔲𝔞𝔤𝔢.",
        choices: [
            {text: "𝔥𝔦𝔤𝔥-𝔩𝔢𝔳𝔢𝔩", correct:true},
            {text: "𝔪𝔦𝔡-𝔩𝔢𝔳𝔢𝔩", correct:false},
            {text: "𝔩𝔬𝔴-𝔩𝔢𝔳𝔢𝔩", correct:false},
            {text: "𝔫𝔬𝔫𝔢 𝔬𝔣 𝔱𝔥𝔢 𝔞𝔟𝔬𝔳𝔢", correct: false}
        ]
    }
];


start.addEventListener("click", startQuiz);
timer.addEventListener("click", silliness);
view.addEventListener("click", showHighScore);

function silliness(){
    alert("*indian mother voice* hey there, focus on your exam!")
};

function startQuiz(){
    countDown();
    start.classList.add("hide");
    quiz.classList.remove("hide");
    nextQuestion(questionNum);
};

function nextQuestion(current){
    if (current >= questionList.length){
        endQuiz()
        secondsLeft = 0
        timer.textContent = "𝔶𝔬𝔲 𝔟𝔢𝔞𝔱 𝔱𝔥𝔢 𝔠𝔩𝔬𝔠𝔨!";
    } else {
        question.textContent = questionList[current].question;
        a.textContent = questionList[current].choices[0].text;
        a.addEventListener("click", setAnswer, {
            correct: questionList[current].choices[0].correct
        })
        b.textContent = questionList[current].choices[1].text;
        b.addEventListener("click", setAnswer, {
            correct: questionList[current].choices[1].correct
        })
        c.textContent = questionList[current].choices[2].text;
        c.addEventListener("click", setAnswer, {
            correct: questionList[current].choices[2].correct
        })
        d.textContent = questionList[current].choices[3].text;
        d.addEventListener("click", setAnswer, {
            correct: questionList[current].choices[3].correct
        })
    }
};



function setAnswer(event){
    if (!event.correct) {
        secondsLeft -= 10
    };
    answerList.push({
        question: questionNum + 1,
        answer: event.correct
    })
    if (secondsLeft <= 0) {
        endQuiz()
    } else {
        removeEventListeners();
        questionNum++;
        nextQuestion(questionNum)
    }
}

function endQuiz(){
    var questionsUnanswered = questionList.length - answerList.length;
    var correctAnswers = 0;
    for (const answer of answerList){
        if (answer.correct) {
            correctAnswers++;
        }
    }
    const score = (correctAnswers / (answerList.length + questionsUnanswered)) * 100
    document.getElementById("submitScore").addEventListener("click", function(e){
        e.preventDefault()
        var highscores = [];
        if(localStorage.getItem("highscores") === null) {
            highscores.push({
                user: document.getElementById("initials").value,
                score: score
            })
            localStorage.setItem("highscores", JSON.stringify(highscores))
        } else {
            highscores = JSON.parse(localStorage.getItem("highscores"))
            highscores.push({
                user: document.getElementById("initials").value,
                score: score
            })
            highscores.sort(function(a, b){
                return b.score - a.score;
            })
            localStorage.setItem("highscores", JSON.stringify(highscores))
            showHighScore();
        }
    })
    end.classList.remove("hide");
    quiz.classList.add("hide");
    document.getElementById("score").innerHTML = `𝔶𝔬𝔲𝔯 𝔰𝔠𝔬𝔯𝔢: ${score}`;
}


function removeEventListeners(){
    a.removeEventListener("click", setAnswer)
    b.removeEventListener("click", setAnswer)
    c.removeEventListener("click", setAnswer)
    d.removeEventListener("click", setAnswer)
};


function countDown() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent ="𝔱𝔦𝔪𝔢: " + secondsLeft + " 𝔰𝔢𝔠𝔬𝔫𝔡𝔰";
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        timesup();
      };
  
    }, 1000);
};

function timesup () {
    timer.textContent = "𝔱𝔦𝔪𝔢'𝔰 𝔲𝔭!!!";
};

function showHighScore() {
    start.classList.add("hide");
    quiz.classList.add("hide");
    end.classList.add("hide");
    highScoreList.classList.remove("hide");
    var highScore = document.createElement("li");
    highScore.innerHTML = `${score.user} - ${score.score}♡`
    document.getElementById("highScoreList").appendChild(highScore);
};




