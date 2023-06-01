//timer elements 
var timer = document.getElementById("timer");
var timerLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

// start time elements 
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

// questions elements
var questionDiv = document.getElementById("questionDiv");
var questionsTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var answerCheck = document.getElementById("answerCheck");

// score elements 
var summary = document.getElementById("summary");
var sumbitIntialBtn = document.getElementById("submitInitialBtn");
var intialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScore = document.getElementById("listOfHighScores");


var correctAns = 0;
var questionNum = 0;
var scoreResults;
var questionArrayIndex = 0;



//quiz multple choice questions and answers the user will use 

var questions = [
    {
    
        question: "What is a string?",
        choices: ["A. Series of characters surrounded by quots"," B. A two value, True or False","C. Data types that includes numbers and booles" ],
        correctAnswer: "A. Series of characters surrounded by quots"
    },

    {
        question: "True or false question, a number can be ingeter or decemal?",
        choices: ["A. false","B. True"],
        correctAnswer: "B. false"
    },

    {
        question: "This checks what type of date used followed by the name of the variable?",
        choices: ["A. Boolean", "B. Number","C. Typeof"],
        correctAnswer: "C. Typeo"
    },
    {
        question: "Which compares strict equity?",
        choices: ["A. =", "B. ==", "C. ==="],
        correctAnswer: "C. ==="
    }, 
    {
        question: "What is a reusable blocks of code that perform a specific task?",
        choices: ["A. Typeof","B. ===", "C. Functions"],
        correctAnswer: "C. Functions"
    },
];

console.log(typeof questions)

//The start quiz function starts when the start buttun is clicked then timer starts and triggers questions. 

var totalTime = 61;

function startQuiz(){

   //Hide the start button and display questions
  
   questionArrayIndex = 0;
   totalTime = 60;
   timerLeft.textContent = totalTime;
   intialInput.textContent = "";

   startDiv.style.display = "none";
   questionDiv.style.display = "block";
   timer.style.display = "block";
   timesUp.style.display = "none";

   var startTimer = setInterval(function() {
    totalTime--;
    timerLeft.textContent = totalTime;
   
    if(totalTime <= 0){
        clearInterval(startTimer);
        if (questionArrayIndex < questions.length -1 ){
            gameOver();
        }
    }

   }, 1000);

   showQuiz();
};

console.log(questions[questionArrayIndex].question);
console.log(questions[questionArrayIndex].choices);
console.log(questions[questionArrayIndex].correctAnswer);

function showQuiz() {
    nextQuestion();
}

function nextQuestion () {
    questionsTitle.textContent = questions[questionArrayIndex].question;
    choiceA.textContent = questions[questionArrayIndex].choices[0];
    choiceB.textContent = questions[questionArrayIndex].choices[1];
    choiceC.textContent = questions[questionArrayIndex].choices[2];
   
}

//after each question is answered check to see if the answer is correct or wrong 

function checkAnswers(correctAnswer) {
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionArrayIndex].correctAnswer === questions[questionArrayIndex].choices[correctAnswer]){
        //correct answer, add 1 score to final score 
        correctAns++;
        console.log(correctAns);
        answerCheck.textContent = "Correct!";
    } else {
        //wrong answer, duduct 10 second from the timer 
        totalTime -= 10;
        timerLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! the correct answer is: " + questions[questionArrayIndex].correctAnswer;

    }

    questionArrayIndex++;
    // now repeat with the rest of the questions

    if (questionArrayIndex < questions.length){
        nextQuestion();
    } else {

        gameOver();
    }
    
}

function chooseA(){checkAnswers(0);}
function chooseB(){checkAnswers(1);}
function chooseC(){checkAnswers(2);}

// When all the questions have been answered or the timer reaches zero its game over 

function gameOver(){
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    //show the final score 

    finalScore.textContent = correctAns;
}

//enter intial and store highscore in local storage 

function storeHighScore(event){
    event.preventDefault();

    //store function is no intials are enter 

    if (intialInput.value === ""){
        alert("Please enter your intials");
        return;
    }

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    //store scores into local storeage

    var savedHighScores = localStorage.getItem("high score");
    var scoreArray;

    if (savedHighScores === null){
        scoreArray = [];
    } else {
        scoreArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        intials: intialInput.value,
        score: finalScore.textContent

    };

    console.log(userScore);
    scoreArray.push(userScore);

    // stringfy array to be stored in local storage 

    var scoresArrayString = JSON.stringify(scoreArray);
    window.localStorage.setItem("high score" , scoresArrayString);

    // show current high scores 
    showHighScores();
}

// function to show high score 

var i = 0;

function showHighScores(){
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high score");

    //check if there is any local storege

    if (savedHighScores === null){
        return
    }

    console.log(savedHighScores);

    var storeHighScores = JSON.parse(savedHighScores);

    for (; i < storeHighScores.length; i++){
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storeHighScores[i].intials + ": " + storeHighScores[i].score;
        listOfHighScore.appendChild(eachNewHighScore);
    }

}

// adding event listers 

startQuizBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);

sumbitIntialBtn.addEventListener("click", function(event){
    storeHighScore(event);
});

viewHighScore.addEventListener("click", function(event){
    showHighScores(event);
});

goBackBtn.addEventListener("click", function(event){
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high score");
    listOfHighScore.innerHTML = "high scores cleared";
    listOfHighScore.setAttribute("style", "font-family: sans-serif; font-style: italic,")
})




// function displayQuestion(){
// questions.innerHTML= ""
// var quizQuestions = myQuestions[questionArrayIndex]

// //Creates an element in the DOM to store the questions
// var questionEl = document.createElement("h2");
// questionEl.textContent= quizQuestions.question;

// console.log(quizQuestions.answers);

// //loops through the array of questions and answers 

// answer.innerHTML=""
// for (var i = 0; i < quizQuestions.answers.length; i++){

//     //Creats buttons, adds content, and event lister
//     var answerButton = document.createElement("button");
//     answerButton.textContent = quizQuestions.answers[i];
//     answerButton.setAttribute("value", quizQuestions.answers[i])

//     answer.append(answerButton)
// }

// //Append all the elements created

// questions.append(questionEl, answer)

// }

// //creates a function tie to the button event lister and view the asnswer selected

// function resuits(e){
//     //Whenver the user select an incorrect answer, time will be subracted by 10 second 
//     console.log(e.target)
//     if (e.target.value !== myQuestions[questionArrayIndex].correctAnswer){
//         time -= 10;
//         timerEl.textContent =time;
//     }
// //increase the question array by 1
//     questionArrayIndex++;

//     displayQuestion()
// }

// //if the time is equal to zero, the time is up or else display more questions
// console.log(myQuestions.length)
// if (time === 0 || questionArrayIndex === myQuestions.length -1){
//     quizOver();
// } else {
//     // displayQuestion();
// }

// function quizOver(){
//     clearInterval(timerId);
    
// questions.classList.add("hidden");
// finalScore.classList.remove("hiddden");
// finalScore.textContent = time;
// }

// //score function will display the score and intials 
// function scoreRecord(){
//     var intials = intialsIput.value.trim();
    
//     if (intials !== ""){
//         var highsScores = JSON.parse(localStorage.getItem("highScores")) || []
        
//         var userRecord = {
//             intials: intials,
//             score: time
//         }
        
//         highsScores.push(userRecord)
        
//         localStorage.setItem("highscore", JSON.stringify(highsScores))
        
//         window.location.href= ""
//     }
// }
// answer.addEventListener("click", resuits);

// startButton.addEventListener("click", startQuiz)

// submitButton.addEventListener("click", scoreRecord)

// console.log(submitButton)

