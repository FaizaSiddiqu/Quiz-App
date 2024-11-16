const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Text Markup Language" , correct : true},
            {text: "Hyperlinks and Text Markup Language" , correct : false},
            {text: "Home Tool Markup Language" , correct : false},
            {text: "Hyper Text styling Language" , correct : false}
        ]
    },
    {
        question: "What is the purpose of Javscript",
        answers: [
            {text: "For Building webpages" , correct : false},
            {text: "For coding webpages" , correct : true},
            {text: "For Styling webpages" , correct : false},
            {text: "For Object oriented programming" , correct : false}
        ]
    },
    {
        question: "What does href do?",
        answers: [
            {text: "create a headings" , correct : false,},
            {text: "create a Horizontal rule" , correct : false},
            {text: "create a hyperlinks" , correct : true},
            {text: "create a webpages" , correct : false}
        ]
    },
    {
        question: "What kind of color is #00000?",
        answers: [
            {text: "HSL" , correct : false},
            {text: "HEX" , correct : true},
            {text: "RGB" , correct : false},
            {text: "PNG" , correct : false}
        ]
    },
    {
        question: "How is a Javscript called?",
        answers: [
            {text: "Style", correct: false},
            {text: "nav", correct: false},
            {text: "script", correct: true},
            {text: "html", correct: false}
        ]
    },
    {
        question: "How is a Javscript file saved?",
        answers: [
            {text: ".html" , correct : false},
            {text: ".js" , correct : true},
            {text: ".css" , correct : false},
            {text: "Nothing" , correct : false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex =  0 
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0
    score = 0 
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct){
             button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , selectAnswer)
    });
};

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz()


