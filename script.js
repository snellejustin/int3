gsap.registerPlugin(ScrollTrigger)
let mm = gsap.matchMedia();

let auctionAudioInstance = null;

const container = document.querySelector('.floating__container');

const body = document.querySelector('.body')
const lever = document.querySelector('.interaction__lever')
let audioPlayed = false;

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
let scoreText = document.querySelector('.letter__text--result')

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
        score = 0;
    })
}

const overviewHandler = (score) => {
    scoreTag.innerHTML = `${score}`
    console.log(score)
    if (score === 0) {
        scoreText.innerHTML = 'Interesting! It seems none of your answers matched Plantin’s choices. That’s the beauty of thinking differently—sometimes our perspectives reveal something unique about how we see the world. Keep exploring!'
    }
    if (score === 1) {
        scoreText.innerHTML = 'You got 1 out of 3 answers the same as Plantin! It’s fascinating to see how your choices diverge—thinking differently is what keeps things interesting. Who knows, maybe you’d have been an innovator in Plantin’s time!'
    }
    if (score === 2) {
        scoreText.innerHTML = "You matched 2 out of 3 answers with Plantin, a true printmaking icon. It's fascinating to find common ground with such a historic master.Who knew you'd share a streak with Plantin's legacy?"
    }
    if (score === 3) {
        scoreText.innerHTML = 'Impressive! You matched all of Plantin’s answers—3 out of 3! It seems you’re right on the same wavelength as one of history’s great thinkers. Fantastic work!'
    }
}

const navigationHandler = () => {
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
}

const leverAudio = () => {
    const audio = new Audio('./assets/wooden-lever.mp3');
    audio.play();
}

const leverClickHandler = () => {
    const lever = document.querySelector('.interaction__lever');
    if (lever) {
        lever.onclick = () => {
            // document.body.classList.remove('stop-scroll');
            lever.classList.add('interaction__lever--pulled');
            if (!audioPlayed) {
                leverAudio();
                audioPlayed = true;
            }
            document.querySelector('.text__general--unrevealed').classList.add('hide');
            document.querySelector('.text__reveal').classList.add('reveal');
        };
    } else {
        console.error('Lever element not found');
    }
};


const getRandomLetter = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
};

const createLetter = () => {
    const letter = document.createElement('span');
    letter.className = 'floating-letter';
    letter.textContent = getRandomLetter();

    // Get the container's width to constrain letter positions
    const containerWidth = container.offsetWidth;

    // Set a random horizontal position within the container
    const randomX = Math.random() * containerWidth;

    letter.style.left = `${randomX}px`; // Position within container

    container.appendChild(letter);

    // Remove letter after animation ends
    letter.addEventListener('animationend', () => {
        letter.remove();
    });
};

const opacityChangers = () => {
    const elements = [".early__days--box", ".bookprinting__box", ".shady__box", ".settingtype__text", ".collage__press", ".info__box--red", ".lever__text", ".auction__text"]; // Array of target elements

    elements.forEach(selector => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: selector,
                start: "top center",
                end: "bottom center",
                scrub: true,
                markers: false,
            },
        });

        tl.to(selector, {
            opacity: 1,
            duration: 2,
        });
    });
};

// Play auction audio
const auctionAudio = () => {
    if (auctionAudioInstance === null) {
        auctionAudioInstance = new Audio('./assets/auction.wav');
        auctionAudioInstance.play().catch(error => {
            console.log('Audio playback failed:');
        });
    }
};

// Stop auction audio
const stopAuctionAudio = () => {
    if (auctionAudioInstance) {
        auctionAudioInstance.pause();
        auctionAudioInstance.currentTime = 0;
        auctionAudioInstance = null;
    }
};

// Play sold sound
const sold = () => {
    const audio = new Audio('./assets/sold.mp3');
    audio.play().catch(error => {
        console.log('Audio playback failed');
    });
};

const auction = () => {
    // Initialize ScrollTrigger directly
    ScrollTrigger.create({
        trigger: '.auction__box',
        start: "top center",  // When the top of the .auction__box reaches the center of the viewport
        end: "70% center",    // When the bottom of the .auction__box reaches the center of the viewport
        scrub: true,          // Scrub for smooth animation
        markers: false,        // Show markers for debugging
        onEnter: auctionAudio, // Play auction audio when the element enters the viewport
        onLeave: () => {
            stopAuctionAudio(); // Stop auction audio when leaving
            sold();              // Play sold sound
        }
    });
};

const footprintAudio = () => {
    const audio = new Audio('./assets/footprint.wav');
    audio.play();
}

const footprints = () => {
    const elements = [".footprint__1", ".footprint__2", ".footprint__3", ".footprint__4", ".footprint__5", ".footprint__6"];

    mm.add("(min-width: 768px)", () => {
        elements.forEach(selector => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: selector,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    markers: false,
                },
            });

            tl.to(selector, {
                opacity: 1,
                duration: 2,
                onStart: footprintAudio
            });
        });
    });
};

const carousel = () => {
    const carouselElement = document.querySelector('.horizontal__box--early');
    const carouselWidth = carouselElement.scrollWidth;
    const amountToScroll = carouselWidth - window.innerWidth;


    mm.add("(max-width: 767px)", () => {
        gsap.to('.horizontal__box--item--early', {
            x: -amountToScroll, // Moves the content horizontally
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal__box--early',
                start: 'center center',
                end: () => `+=${amountToScroll}`, // Scroll distance matches the width of the content
                pin: true, // Pins the container
                scrub: true, // Syncs animation to scroll
                markers: false, // Debugging markers
            },
        });
    })

    mm.add("(min-width: 768px)", () => {
        gsap.to('.horizontal__box--item--early', {
            x: -amountToScroll, // Moves the content horizontally
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal__box--early',
                start: '30% center',
                end: 'center center', // Scroll distance matches the width of the content
                pin: false, // Pins the container
                scrub: true, // Syncs animation to scroll
                markers: false, // Debugging markers
            },
        });
    })

    mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".narrator__box",
                start: "top center",
                end: "bottom center",
                scrub: true,
                markers: false,
            },
        });

        tl.to(".narrator__box", {
            opacity: 0,
            duration: 2,
        });

        tl.to(".france__box", {
            opacity: 1,
            duration: 2,
        })
            .to(".france__box", {
                opacity: 0,
                duration: 2,
            });

        tl.to(".antwerp__box", {
            opacity: 1,
            duration: 2,
        });
    });

};

const slideInFromLeft = () => {
    const elements = [".press__text", ".collage__settingtype", ".interaction__lever--box", ".info__box--yellow", ".collage__auction"]; // Add selectors for all target elements

    elements.forEach(selector => {
        gsap.to(selector, {
            x: 0, // Moves the element to its original position
            opacity: 1, // Makes it visible
            duration: 1.5, // Animation duration
            ease: "power2.out", // Smooth easing
            scrollTrigger: {
                trigger: selector, // Use the current element as the trigger
                start: "top center", // Start when the element is at the center of the viewport
                end: "center center", // End when the element is still at the center
                scrub: true, // Sync animation with scroll
                markers: false, // Debugging markers
            },
        });
    });
};


const finalCarousel = () => {
    const carouselElement = document.querySelector('.gulden__box');
    const carouselWidth = carouselElement.scrollWidth;
    const amountToScroll = carouselWidth - window.innerWidth;


    mm.add("(max-width: 767px)", () => {
        gsap.to('.horizontal__box--item', {
            x: -amountToScroll, // Moves the content horizontally
            ease: 'none',
            scrollTrigger: {
                trigger: '.gulden__box',
                start: 'center center',
                end: () => `+=${amountToScroll}`, // Scroll distance matches the width of the content
                pin: true, // Pins the container
                scrub: true, // Syncs animation to scroll
                markers: false, // Debugging markers
            },
        });
    })
}

const init = () => {
    navigationHandler();
    answerQuestion();
    leverClickHandler();

    carousel();
    opacityChangers();
    slideInFromLeft();
    finalCarousel();
    auction();
    footprints();

    setInterval(createLetter, 1000);
};

init();
