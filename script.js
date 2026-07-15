let quesNum = document.querySelector("#quesNum");
let question = document.querySelector("#question-text");
let option = document.querySelectorAll(".option");
let optionA = document.querySelector("#option-a");
let optionB = document.querySelector("#option-b");
let optionC = document.querySelector("#option-c");
let optionD = document.querySelector("#option-d");
let nextBtn = document.querySelector("#next-button");
let prevBtn = document.querySelector("#prev-button");
let subBtn = document.querySelector("#submit-button");
let backResultBtn = document.querySelector("#back-result-button");
let restartBtn = document.querySelector("#restart-button");
let reviewBtn = document.querySelector("#review-button");
let scoreDis = document.querySelector("#score");
let resText = document.querySelector("#text");
let progressBar = document.querySelector("#progress-bar");
let pageHeading = document.querySelector("#page-heading");
const isReviewMode = () => sessionStorage.getItem("reviewMode") === "true";
let reviewAns = JSON.parse(localStorage.getItem("userSelected")) || [];

//Array of questions, options and answers
let questions = [
    {
        question: "What is the capital of France?",
        option: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        option: ["Earth", "Jupiter", "Mars", "Saturn"], 
        answer: "Jupiter"
    },
    {
        question: "What is the chemical symbol for gold?",
        option: ["Au", "Ag", "Fe", "Hg"],
        answer: "Au"
    },
    {
        question: "What is the smallest prime number?",
        option: ["0", "1", "2", "3"],
        answer: "2"
    },
    {
        question: "What is the largest ocean on Earth?",
        option: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    { 
        question: "Who wrote the Indian national song?",
        option: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Kavi Pradeep", "Allama Iqbal"],
        answer: "Bankim Chandra Chattopadhyay"
    },
    {
        question: "Who is the founder of Microsoft?",
        option: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
        answer: "Bill Gates"
    },
    {
        question: "What is the currency of Japan?",
        option: ["Yen", "Dollar", "Euro", "Pound"],
        answer: "Yen"
    },
    {
        question: "How many languages are recognized in the Indian constitution?",
        option: ["18", "22", "24", "26"],
        answer: "22"
    },
    {
        question: "What is the largest desert in the world?",
        option: ["Sahara Desert", "Gobi Desert", "Kalahari Desert", "Antarctic Desert"],
        answer: "Antarctic Desert"
    },
];

let userSelected = new Array(questions.length).fill(null); 

if(window.location.pathname.includes("index.html") && sessionStorage.getItem("reviewMode") !== "true"){
    localStorage.removeItem("userSelected");
}

//Function to display the question and options
const displayQuestion = (index) => {
    if (isReviewMode()) {
        pageHeading.innerText = "Review Your Answers";
    } else {
        pageHeading.innerText = "Welcome to the General Knowledge Quiz";
    }
    let currentQuestion = questions[index];
    question.innerText = currentQuestion.question;
    styleOptions();
    optionA.innerText = `A. ${currentQuestion.option[0]}`;
    optionB.innerText = `B. ${currentQuestion.option[1]}`;
    optionC.innerText = `C. ${currentQuestion.option[2]}`;
    optionD.innerText = `D. ${currentQuestion.option[3]}`;

    let savedAnswer = isReviewMode()? reviewAns[index] : userSelected[index];

    if(!isReviewMode() && savedAnswer !== null){
    showSelectedOption(option[savedAnswer], savedAnswer);
    }

    if(isReviewMode()){
        subBtn.style.display = "none";
        if(backResultBtn){
            backResultBtn.style.display = "block";
        }
        let selected = reviewAns[index];
        let correctAns = questions[index].answer;
        option.forEach((opt,i)=>{
            opt.style.pointerEvents = "none";
            //unanswered question
            if(selected === null){
                if(currentQuestion.option[i] === correctAns){
                opt.style.backgroundColor = "#FFD580";
                }
            }
            //answered question
            else{
                if(currentQuestion.option[i] === correctAns){
                    opt.style.backgroundColor = "lightgreen";
                }
                if(selected !== null && i === selected && currentQuestion.option[i] !== correctAns){
                    opt.style.backgroundColor = "salmon";
                }
            }
        });
    };
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === questions.length - 1);

    //progress bar 
    let progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    if (isReviewMode()) {
        progressBar.style.backgroundColor = "#7C3AED";   // Green
    } else {
        progressBar.style.backgroundColor = "#2563EB";   // Blue
    }
};

//style options 
const styleOptions = () => {
    option.forEach((opt) => {
        opt.style.backgroundColor = "#f2f2f2";
        opt.style.cursor = isReviewMode()?"default":"pointer";
        opt.addEventListener("mouseover", () => {
            if(opt.style.backgroundColor !== "lightblue" && opt.style.backgroundColor !== "white"){
                opt.style.backgroundColor = "#e6e6e6";
            }
       });
       opt.addEventListener("mouseout", () => {
            if(opt.style.backgroundColor !== "lightblue" && opt.style.backgroundColor !== "white"){
                opt.style.backgroundColor = "#f2f2f2";
            }
       });
   });
};

//Function to show selected option
const showSelectedOption = (selectedOption,index) => {
    if(isReviewMode()){
        return;
    }
    styleOptions();
    option.forEach((opt) => {
        if(opt === selectedOption){
            opt.style.backgroundColor = "lightblue";
        } else {
            opt.style.backgroundColor = "white";
        }
    });
    let currQuesIdx = parseInt(quesNum.innerText) - 1;
    userSelected[currQuesIdx] = index;
};

option.forEach((opt,index) => {
    opt.addEventListener("click", () => {
        showSelectedOption(opt,index);            
    }); 
});

//Answer submission functionality
subBtn?.addEventListener("click", () => {
    let score = 0;
    for(let i=0; i<questions.length; i++){
        if(userSelected[i] !== null && questions[i].option[userSelected[i]] === questions[i].answer){
            score++;
        }
    }
    localStorage.setItem("score",score);
    //save all selected answers
    localStorage.setItem("userSelected",JSON.stringify(userSelected));
    window.location.href = "result.html";
});

//Next button functionality
nextBtn?.addEventListener("click", () => {
    quesNum.innerText = parseInt(quesNum.innerText) + 1;
    if (parseInt(quesNum.innerText) === questions.length) {
        if (!isReviewMode()) {
            subBtn.style.display = "block";
        }
    }  
    displayQuestion(parseInt(quesNum.innerText) - 1);
});

//Previous button functionality
prevBtn?.addEventListener("click", () => {
    let currQues = parseInt(quesNum.innerText);
    prevBtn.style.backgroundColor = "#0f1f30";
    if(currQues>1){
        quesNum.innerText = currQues - 1;
        subBtn.style.display = "none";
    }
    displayQuestion(currQues - 2);
});

//restart button functionality
if(restartBtn){
    restartBtn.addEventListener("click", () => {
        localStorage.removeItem("score");
        localStorage.removeItem("userSelected");
        sessionStorage.removeItem("reviewMode");
        location.replace("./index.html");
    });
};

//score display
if(scoreDis){
    scoreDis.innerText = localStorage.getItem("score");
    if(scoreDis.innerText < 5){
        resText.innerText = "Keep Practicing!";
        resText.style.color = "#d26363";
    }
    else if(scoreDis.innerText === 5 || scoreDis.innerText <=9){
        resText.innerText = "Great Job!";
        resText.style.color = "#61bf61";
    }
};

//Review Answer
reviewBtn?.addEventListener("click",() =>{
    sessionStorage.setItem("reviewMode","true");
    window.location.href = "index.html";
});

//display back button
backResultBtn?.addEventListener("click", () => {
    window.location.href = "result.html";
});

// Display the first question when index.html loads
if (question) {
    displayQuestion(0);
}