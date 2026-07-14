let quesNum = document.querySelector("#quesNum");
let question = document.querySelector("#question");
let option = document.querySelectorAll(".option");
let optionA = document.querySelector("#option-a");
let optionB = document.querySelector("#option-b");
let optionC = document.querySelector("#option-c");
let optionD = document.querySelector("#option-d");
let nextBtn = document.querySelector("#next-button");
let prevBtn = document.querySelector("#prev-button");
let subBtn = document.querySelector("#submit-button");

//Function to display the question and options
const displayQuestion = (index) => {
    let currQues = questions[index];
    question.innerText = currentQuestion.question;
    optionA.innerText = currentQuestion.options[0];
    optionB.innerText = currentQuestion.options[1];
    optionC.innerText = currentQuestion.options[2];
    optionD.innerText = currentQuestion.options[3];
}   









//Function to show selected option
const showSelectedOption = (selectedOption) => {
    option.forEach((opt) => {
        if(opt === selectedOption){
            opt.style.backgroundColor = "lightblue";
        } else {
            opt.style.backgroundColor = "white";
        }
    });
}

option.forEach((opt) => {
    opt.addEventListener("click", () => {
        showSelectedOption(opt);            
    }); 
});

//Next button functionality
nextBtn.addEventListener("click", () => {
    quesNum.innerText = parseInt(quesNum.innerText) + 1;
    if(parseInt(quesNum.innerText)=== 10){
        nextBtn.style.display = "none";
        subBtn.style.display = "block";
    }
});

//Previous button functionality
prevBtn.addEventListener("click", () => {
    let currQues = parseInt(quesNum.innerText);
    if(currQues>1){
        quesNum.innerText = currQues - 1;
        nextBtn.style.display = "block";
        subBtn.style.display = "none";
    }
});