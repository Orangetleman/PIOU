
let crumbCounter = 0;
let toum = new Audio("toum.mp4")
let musiqueActive = true;

function Home_button() {
    localStorage.removeItem("counter");
    location.replace("Home.html")
}
function Level_1_button(nextpage) {
    localStorage.removeItem("counter");
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("OpeningVideo");

    overlay.style.display = "block";
    video.play();

    video.onended = () => {
        location.replace(nextpage);
    };
}
function Level_2_button() {
    localStorage.removeItem("counter");
    location.replace("Level 2.html")
}
function Level_3_button() {
    localStorage.removeItem("counter");
    location.replace("Level 3.html")
}
function Credits_button() {
    localStorage.removeItem("counter");
    location.replace("Credits.html")
}

function Home() {
    location.replace("Home.html")
}
function Level_1() {
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("OpeningVideo");
    const videoPlayed = localStorage.getItem("videoPlayed") === "true";

    if (!videoPlayed) {
        console.log("Video not played yet, showing overlay and playing video.");
        overlay.style.display = "block";
        video.play();
        video.onended = () => {
            localStorage.setItem("videoPlayed", "true");
            location.replace("Level 1.html");
        };
    } else {
        console.log("Video already played, redirecting to Level 1.");
        location.replace("Level 1.html");
    }
}

function Level_2() {
    location.replace("Level 2.html")
}
function Level_3() {
    location.replace("Level 3.html")
}
function Credits() {
    location.replace("Credits.html")
}

function updateCounter() {
    const counterElement = document.getElementById("counter");
    counterElement.textContent = crumbCounter;
}

function getCounter() {
    return parseInt(localStorage.getItem("counter") || "0");
}

function setCounter(value) {
    localStorage.setItem("counter", value);
}

//------------------------------------------------------------------------------------------------------------------

let timerInterval;
let elapsedTime = getTimer();

function updateTimerDisplay() {
    const TimerElement = document.getElementById('Mon_Timer');
    TimerElement.textContent = `Temps: ${elapsedTime} secondes`;
    setTimer(elapsedTime);
    getTimer();
}

function getTimer() {
    return parseInt(localStorage.getItem("Mon_Timer") || "0");
}

function setTimer(value) {
    localStorage.setItem("Mon_Timer", value);
}

function startTimerHandler() {
    if (timerInterval) {
        console.log('Le timer est déjà en route.');
    } else {
        Enabler.startTimer('Mon_Timer');
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimerHandler() {
    if (!timerInterval) {
        console.log("Le timer est déjà à l'arrêt.");
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        Enabler.stopTimer('Mon_Timer');
    }
}

function ResetTimerHandler() {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        Enabler.stopTimer('Mon_Timer');
}



document.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        startTimerHandler();
    }
});


window.addEventListener('load', () => {
    updateTimerDisplay();
});

function play_1() {
    if (!musiqueActive) return;
    toum.play()
        .catch(err => console.error("Erreur lors de la lecture :", err));
    toum.onended = () => {
        play_2();
    };
}

function play_2() {
    if (!musiqueActive) return;
    toum.play()
        .catch(err => console.error("Erreur lors de la lecture :", err));
    toum.onended = () => {
        play_1();
    };
}

function stop_musique() {
    musiqueActive = false;
    toum.pause();
    toum.currentTime = 0;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") play_1();
    if (event.key === "ArrowRight") play_1();
    if (event.key === "ArrowUp") play_1();
    if (event.key === "ArrowDown") play_1();
});