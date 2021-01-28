// global variables
var countdownTime
var countdown
var questionNum
var correctCount = 0
var highScore
var highUser
var user = ''
//obect of questions and correct answers 
var questions = [
  {
    question: "Neil deGrasse Tyson is:",
    answers: ["A Country Singer", "A Politician", "The Man"],
    correct: "The Man"
  },
  {
    question: "The largest asteroid known is:",
    answers: ["Justin Bieber", "Vesta", "Ceres"],
    correct: "Ceres"
  },
  {
    question: "Are aliens real?",
    answers: ["Yes", "No"],
    correct: "Yes"
  },
  {
    question: "What does space sound like?",
    answers: ["White Noise", "Death Metal", "Silence"],
    correct: "Silence"
  },
  {
    question: "How many star are there in the known universe?",
    answers: ["Unknown","100,000,000" , "100,000,000^100"],
    correct: "Unknown"
  }
]

// loops question array and makes answers buttons 
function nextQuestion() {
  var question = questions[questionNum]
  var questionLine = document.querySelector('#questionBox')
  questionLine.innerHTML = `<div class="alert alert-warning alert-dark"><h3>${question.question}</h3>`
  for (var i = 0; i < question.answers.length; i++) {
    var answer = question.answers[i]
    questionLine.innerHTML += `<button onClick="anAnswer(event,'${answer}')" class="btn btn-secondary me-3 btn-block">${answer}</button>`
  }
}
// clears local storage of high scores 
function clearHigh(event) {
  event.preventDefault()
  localStorage.clear()
  showHigh()

}
//checks if answer is correct and increases count, if wrong decrease time by 10 seconds
function anAnswer(event, answer) {
  event.preventDefault()
  if (answer === questions[questionNum].correct) {
    correctCount++
  } else {
    timeChange(10)
  }
  questionNum++
  // decide to show next question (if more), else end quiz
  if (questionNum < questions.length)
    nextQuestion()
  else
    finishQuiz()
}

function timeChange(byValue = 1) {
  // decrease by the value passed in, or if nothing, by 1
  countdown -= byValue
  document.querySelector('#countdown').textContent = countdown
  if (countdown < 1)
    finishQuiz()
}

function showPage(page) {
  // hide all pages
  document.querySelector('#quiz').classList.add('d-none')
  document.querySelector('#endPage').classList.add('d-none')
  // show selected page
  document.querySelector(`#${page}`).classList.remove('d-none')
}

function finishQuiz(event) {
  if (event) event.preventDefault()
  console.log(`finished`)
  // stop the countdown
  clearInterval(countdownTime)
  // show score page
  setHighScore(correctCount)
  //getHighScore(correctCount)
  showPage('endPage')
}

// display the name + leaderboard
function getHighScore(score) {
  console.log(score)
  if (localStorage.highScore == null ||
    score.count >= localStorage.highScore) {
    localStorage.highScore = score.count
    localStorage.highUser = score.username
    document.querySelector('#userID').value = ''
  }
  else document.querySelector('#userID').value = '';
}

// gives user option to enter name and save score
function setHighScore(correctCount) {
  document.querySelector('#endPage').innerHTML = `Your score is ${correctCount}!<div>Name: <input type="text" name="user" id="userID" placeholder="Enter Your Name"><button id="savebtn" class="save-btn btn" onclick="submitScores(event)">Save</button>`;
  console.log(userID)
}

// when submitted  stores data in an object
function submitScores(event) {
  if (event) event.preventDefault()
  savebtn = document.getElementById('#savebtn')
  user = document.querySelector('#userID').value
  var score = {
    username: user,
    count: correctCount
  }
  //console.log(score)
  getHighScore(score)
  showHigh()
}

//showing previous high score
function showHigh() {
  if (localStorage.highScore == undefined) {
    document.getElementById('highScoreBox').innerText = `The high score is not set yet`
  } else {
    document.getElementById('highScoreBox').innerText = `The high score is ${localStorage.highScore} \r\n Achieved by ${localStorage.highUser}`
  }
}

// START: 

function startQuiz() {
  correctCount = 0
  questionNum = 0
  countdown = 60
  countdownTime = setInterval(timeChange, 1000)
  // switch back to the quizPage
  showPage('quiz')
  nextQuestion()
  showHigh()
}
