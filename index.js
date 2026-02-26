let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Fetch questions from db.json
fetch("db.json")
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        showQuestion();
    });

function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = decodeHTML(currentQuestion.question);
}

function selectAnswer(answer) {
    selectedAnswer = answer;
}

function nextQuestion() {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
        score++;
    }

    selectedAnswer = null;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    document.getElementById("score-text").innerText =
        `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    document.getElementById("result-box").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");

    showQuestion();
}
