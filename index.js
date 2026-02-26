let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const answerButtons = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");

// Disable Next button initially
nextBtn.disabled = true;

// Fetch questions
fetch("./db/db.json")
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        showQuestion();
    });

// Decode HTML entities
function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Show current question
function showQuestion() {
    const questionElement = document.getElementById("question");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = decodeHTML(currentQuestion.question);

    // Reset button state
    nextBtn.disabled = true;
    selectedAnswer = null;
    answerButtons.forEach(btn => btn.classList.remove("selected"));
     // Make sure quiz box is visible and result box is hidden
    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("result-box").classList.add("hidden");
}

// Answer button click logic
answerButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove selected class from all buttons
        answerButtons.forEach(btn => btn.classList.remove("selected"));

        // Add selected class to clicked button
        button.classList.add("selected");

        // Save selected answer
        selectedAnswer = button.dataset.answer;

        // Enable Next button
        nextBtn.disabled = false;
    });
});

// Add event listener to Next button
nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    // Check answer
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
        score++;
    }

    currentQuestionIndex++;

    // Next question or show results
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Show final results
function showResults() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    document.getElementById("score-text").innerText =
        `You scored ${score} out of ${questions.length}`;
}

// Restart quiz
function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;

    const quizBox = document.getElementById("quiz-box");
    const resultBox = document.getElementById("result-box");
    const scoreText = document.getElementById("score-text");

    // Hide results and show quiz
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");

    // Clear old score
    scoreText.innerText = "";

    // Reset buttons and Next button
    nextBtn.disabled = true;
    answerButtons.forEach(btn => btn.classList.remove("selected"));

    // Show the first question
    showQuestion();
}
