var viewScores = document.getElementById("view-scores");
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var questions = document.getElementById("questions");
var answer = document.getElementById("answers");
var finalScore = document.getElementById("final-scores");
var intialsIput = document.getElementById("intials");
var submitButton = document.getElementById("submit");

var answerButton;
var time = 60;
var timerId ;
var questionArrayIndex = 0;



//quiz multple choice questions and answers the user will use 

var myQuestions = [
    {
    
        question: "What is a string?",
        answers: ["Series of characters surrounded by quots","A two value, True or False","Data types that includes numbers and booles" ],
        correctAnswer: "Series of characters surrounded by quots"
    },

    {
        question: "True or false question, a number can be ingeter or decemal?",
        answers: ["false","True"],
        correctAnswer: "false"
    },

    {
        question: "This checks what type of date used followed by the name of the variable?",
        answers: ["Boolean", "Number","Typeof"],
        correctAnswer: "Typeo"
    },
    {
        question: "Which compares strict equity?",
        answers: ["=", "==", "==="],
        correctAnswer: "=="
    }, 
    {
        question: "What is a reusable blocks of code that perform a specific task?",
        answers: ["Typeof","===", "Functions"],
        correctAnswer: "==="
    },
];

//The start quiz function starts when the start buttun is clicked then timer starts and triggers questions. 

function startQuiz(){

   //Hide the start button and display questions
   startButton.classList.add("hidden");
   questions.classList.remove("hiddden");
     timerEl.textContent = time;
     timerId = setInterval(function() {
        time--;
     timerEl.textContent = time;
        if (time <=0 ){
            quizOver();
        }
     }, 1000)

 //function will display the questions
displayQuestion()

}

function displayQuestion(){
questions.innerHTML= ""
var quizQuestions = myQuestions[questionArrayIndex]

//Creates an element in the DOM to store the questions
var questionEl = document.createElement("h2");
questionEl.textContent= quizQuestions.question;

console.log(quizQuestions.answers);

//loops through the array of questions and answers 

answer.innerHTML=""
for (var i = 0; i < quizQuestions.answers.length; i++){

    //Creats buttons, adds content, and event lister
    var answerButton = document.createElement("button");
    answerButton.textContent = quizQuestions.answers[i];
    answerButton.setAttribute("value", quizQuestions.answers[i])

    answer.append(answerButton)
}

//Append all the elements created

questions.append(questionEl, answer)

}

//creates a function tie to the button event lister and view the asnswer selected

function resuits(e){
    //Whenver the user select an incorrect answer, time will be subracted by 10 second 
    console.log(e.target)
    if (e.target.value !== myQuestions[questionArrayIndex].correctAnswer){
        time -= 10;
        timerEl.textContent =time;
    }
//increase the question array by 1
    questionArrayIndex++;

    displayQuestion()
}

//if the time is equal to zero, the time is up or else display more questions
console.log(myQuestions.length)
if (time === 0 || questionArrayIndex === myQuestions.length -1){
    quizOver();
} else {
    // displayQuestion();
}

function quizOver(){
    clearInterval(timerId);
    
questions.classList.add("hidden");
finalScore.classList.remove("hiddden");
finalScore.textContent = time;
}

//score function will display the score and intials 
function scoreRecord(){
    var intials = intialsIput.value.trim();
    
    if (intials !== ""){
        var highsScores = JSON.parse(localStorage.getItem("highScores")) || []
        
        var userRecord = {
            intials: intials,
            score: time
        }
        
        highsScores.push(userRecord)
        
        localStorage.setItem("highscore", JSON.stringify(highsScores))
        
        window.location.href= ""
    }
}
answer.addEventListener("click", resuits);

startButton.addEventListener("click", startQuiz)

submitButton.addEventListener("click", scoreRecord)

console.log(submitButton)

