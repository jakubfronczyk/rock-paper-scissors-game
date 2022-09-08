//prevent animation on load
setTimeout(() =>{
    document.body.classList.remove("preloader");
}, 500)
//DOM
const btnRules = document.querySelector(".rules-btn")
const btnClose = document.querySelector(".close-btn")
const modalRules = document.querySelector(".modal")

const CHOICES =[
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    }
]
const choiceButtons = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results__result')

const resultWinner = document.querySelector(".results__winner")
const resultText = document.querySelector(".results__text")

const playAgainBtn = document.querySelector(".play-again")

const scoreNumber = document.querySelector(".score__number")
let score = 0

//game logic
choiceButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName)
        choose(choice)
    })
})

function choose(choice) {
    const aichoice= aiChoose(choice)
    displayResults([choice, aichoice])
    displayWinner([choice, aichoice])
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[rand]
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx)=>{
        setTimeout(()=>{
            resultDiv.innerHTML=`
            <div class="choice ${results[idx].name}">
                <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}"/>
            </div>
            `
        }, idx * 1000)//first index[0] its going to be 0
    })

    gameDiv.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")
}

function displayWinner(results){
    setTimeout(()=>{
        const userWins = isWinner(results)
        const aiWins = isWinner(results.reverse())

        if (userWins){
            resultText.innerText = "you win"
            resultDivs[0].classList.toggle("winner")
            keepScore(1)
        } else if (aiWins){
            resultText.innerText = "you lose"
            resultDivs[1].classList.toggle("winner")
            keepScore(-1)
        }else{
            resultText.innerText = "draw"
        }
}, 1000)
    resultWinner.classList.toggle("hidden")
    resultsDiv.classList.toggle("show-winner")
}

function isWinner(results){
    return results[0].beats === results[1].name
}

function keepScore(point){
    score += point
    scoreNumber.innerText = score


}

//play again
playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = ""
        resultDiv.classList.remove("winner")
    })
    
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden")
    resultsDiv.classList.toggle("show-winner")
})

// show/hide rules
btnRules.addEventListener("click", () =>{
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () =>{
    modalRules.classList.toggle("show-modal");
});