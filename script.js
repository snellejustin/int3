let score = 0;

let questionAnswered1 = false;
let questionAnswered2 = false;
let questionAnswered3 = false;

const buttonA1 = document.querySelector('.answer__A--1');
const buttonB1 = document.querySelector('.answer__B--1');
const buttonA2 = document.querySelector('.answer__A--2');
const buttonB2 = document.querySelector('.answer__B--2');
const buttonA3 = document.querySelector('.answer__A--3');
const buttonB3 = document.querySelector('.answer__B--3');

const buttonNext2 = document.querySelector('.next1')
const buttonNext4 = document.querySelector('.next2')
const buttonNext6 = document.querySelector('.next3')

const buttonRestart = document.querySelector('.restart')

const card1 = document.querySelector('.card__1')
const card2 = document.querySelector('.card__2')
const card3 = document.querySelector('.card__3')
const card4 = document.querySelector('.card__4')
const card5 = document.querySelector('.card__5')
const card6 = document.querySelector('.card__6')
const card7 = document.querySelector('.card__7')

const scoreTag = document.querySelector('.user__score')
let scoreText = document.querySelector('.letter__text')

const answerQuestion = () => {
    if (!questionAnswered1) {
        buttonA1.addEventListener('click', () => {
            card1.classList.add('card__next--left')
            questionAnswered1 = true
        })
        buttonB1.addEventListener('click', () => {
            score++
            card1.classList.add('card__next--right')
            questionAnswered1 = true
        })
    }

    if (!questionAnswered2) {
        buttonA2.addEventListener('click', () => {
            score++
            card3.classList.add('card__next--left')
            questionAnswered2 = true
        })
        buttonB2.addEventListener('click', () => {
            questionAnswered2 = true
            card3.classList.add('card__next--right')
        })
    }

    if (!questionAnswered3) {
        buttonA3.addEventListener('click', () => {
            score++
            questionAnswered3 = true
            card5.classList.add('card__next--left')
            overviewHandler(score)
        })
        buttonB3.addEventListener('click', () => {
            questionAnswered3 = true
            card5.classList.add('card__next--right')
            overviewHandler(score)
        })
    }
    buttonNext2.addEventListener('click', () => {
        card2.classList.add('card__next--right')
    })
    buttonNext4.addEventListener('click', () => {
        card4.classList.add('card__next--right')
    })
    buttonNext6.addEventListener('click', () => {
        card6.classList.add('card__next--right')
    })

    buttonRestart.addEventListener('click', () => {
        [card1, card2, card3, card4, card5, card6].forEach(card => card.classList.remove('card__next--right', 'card__next--left'));
    })

}


const overviewHandler = (score) => {
    scoreTag.innerHTML = `${score}`
    console.log(score)
    if (score === 0) {
        scoreText = 'text1'
    }
    if (score === 1) {
        scoreText = 'text2'
    }
    if (score === 2) {
        scoreText = 'text3'
    }
    if (score === 3) {
        scoreText = 'text4'
    }
}

const init = () => {

    const $nav = document.querySelector('.nav');
    const $navButton = document.querySelector('.nav__button');
    const $navList = document.querySelector('.nav__list');
    const $iconLink = document.querySelector('#iconlink');
    const listItems = $navList.querySelectorAll("li a");

    $navButton.classList.remove('hidden');
    $navList.classList.add("hidden");

    const openNavigation = () => {
        $navButton.setAttribute("aria-expanded", "true");
        $iconLink.setAttribute("xlink:href", "#close");
        $navList.classList.remove("hidden");
        $nav.classList.add('nav--fixed');
    }

    const closeNavigation = () => {
        $navButton.setAttribute("aria-expanded", "false");
        $iconLink.setAttribute("xlink:href", "#navicon");
        $navList.classList.add("hidden");
        $nav.classList.remove('nav--fixed');
    }

    const toggleNavigation = () => {
        const open = $navButton.getAttribute("aria-expanded");
        open === "false" ? openNavigation() : closeNavigation();
    }


    const handleBlur = () => {
        //if (!event.relatedTarget || !$navList.contains(event.relatedTarget)) {
        closeNavigation();
        //}
    }

    $navButton.addEventListener("click", toggleNavigation);

    // add event to the last item in the nav list to trigger the disclosure to close if the user tabs out of the disclosure
    listItems[listItems.length - 1].addEventListener("blur", handleBlur);

    // Close the disclosure if a user presses the escape key
    window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            $navButton.focus();
            closeNavigation();
        }
    });


    answerQuestion()
}



init();
