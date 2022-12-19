getQuestions();

let userAnwers = {};
let position = 1;
let number = 1;


async function getQuestions() {
    await fetch('https://opentdb.com/api.php?amount=6&category=17&difficulty=medium&type=boolean')
        .then(res => res.json())
        .then(res => {
            const question_text = document.querySelector('.question-text');
            console.log(res.results);
            res.results.forEach((element, index) => {
                const p = document.createElement('p')
                p.innerHTML = element.question;
                if (index === 0) {
                    p.classList.add('question_active')
                }
                question_text.append(p);
                const totalQuiz = document.querySelector('.totalQuestions');
                totalQuiz.textContent = res.results.length;
                const question_position = document.querySelector('.question-position');
                question_position.textContent = 1;
            });
        })
        .catch(err => console.log(err.message))
    
    goToNext();
    goToPrevious();
    getAnswers(position);
    getAnswers(position);
    getAnswers(position);
    getAnswers(position);
    
}

function goToNext() {
    const btn = document.querySelector('.btn-next');
    const questions = document.querySelectorAll('.question-text p')
    btn.addEventListener('click', function () {
        for (let index = 0; index < questions.length; index++){
            if (questions[index].classList.contains('question_active')) {
                const question_position = document.querySelector('.question-position');
                position = parseInt(question_position.textContent) + 1;
                questions[index].classList.remove('question_active');
                if (index === questions.length - 1) {
                    questions[0].classList.add('question_active');
                    position = 1;
                    
                }
                else {
                    questions[index + 1].classList.add('question_active');
                    
                }
                question_position.textContent = position;
                break;
                
            }
        }

    })
    
}

function goToPrevious() {
    const btn = document.querySelector('.btn-previous');
    const questions = document.querySelectorAll('.question-text p')
    
    btn.addEventListener('click', function () {
        for (let index = questions.length - 1; index >= 0; index--){
            if (questions[index].classList.contains('question_active')) {
                questions[index].classList.remove('question_active');
                const question_position = document.querySelector('.question-position');
                position = parseInt(question_position.textContent) - 1;
                if (index === 0) {
                    questions[questions.length - 1].classList.add('question_active');
                    position = questions.length;
                    
                }
                else {
                    questions[index - 1].classList.add('question_active');
                    
                }
                question_position.textContent = position;
                break;
            }
        }

    })

}

function checkAnswers(answers) {
    
}
function getAnswers(position) {
    let answer;
    console.log("heey");
    const answers = document.querySelectorAll('.options button');
    answers.forEach((element) => {
        element.addEventListener('click', () => {
            answers.forEach((e) => {
                e.classList.remove('answerActive');
            })
            element.classList.add('answerActive');
            answer = element.dataset.value;
            console.log(position)
            console.log(userAnwers);
            userAnwers[position.toString()] = answer;
            console.log(userAnwers);
            // console.log(answer);
        })
    })
}