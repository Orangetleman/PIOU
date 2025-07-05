let crumbCounter = 0;
let toum = new Audio("toum.mp4")
let musiqueActive = true;

function Home_button() {
    localStorage.removeItem("counter");
    location.replace("Home.html")
}
function Level_2_button() {
    localStorage.removeItem("counter");
    location.replace("Level 2.html")
}
function Level_3_button() {
    localStorage.removeItem("counter");
    location.replace("Level 3.html")
}
function Home() {
    location.replace("Home.html")
}
document.addEventListener("DOMContentLoaded", () => {
    // Centralize initialization of videoPlayed and videoFinished
    if (localStorage.getItem("videoPlayed") === null) {
        localStorage.setItem("videoPlayed", "false");
        console.log("videoPlayed initialized to false.");
    }

    if (localStorage.getItem("videoFinished") === null) {
        localStorage.setItem("videoFinished", "false");
    }

    // Add a firstRun key to detect the first execution
    if (localStorage.getItem("firstRun") === null) {
        localStorage.setItem("firstRun", "true");
        localStorage.setItem("videoPlayed", "false");
        localStorage.setItem("videoFinished", "false");
        console.log("First run detected. videoPlayed and videoFinished initialized to false.");
    }
});
function reset_run() {
    localStorage.setItem("firstRun", null);
    localStorage.setItem("videoPlayed", "false");
    localStorage.setItem("videoFinished", "false");
    // Afficher l'icône de validation temporairement
    const icon = document.getElementById("resetSuccessIcon");
    if (icon) {
        icon.style.display = "inline";
        setTimeout(() => {
            icon.style.display = "none";
        }, 2000);
    }
    console.log("videoFinished:", localStorage.getItem("videoFinished"));
    console.log("videoPlayed:", localStorage.getItem("videoPlayed"));
    console.log("firstRun:", localStorage.getItem("firstRun"));
}

function Level_1() {
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("OpeningVideo");

    console.log("Checking videoPlayed state before playing:", localStorage.getItem("videoPlayed"));

    if (localStorage.getItem("videoPlayed") !== "true") {
        overlay.style.display = "block";
        video.currentTime = 0;
        video.play();
        video.onended = () => {
            localStorage.setItem("videoPlayed", "true");
            console.log("videoPlayed set to true after video ends.");
            setTimeout(() => {
                overlay.style.display = "none";
                location.replace("Level 1.html");
            }, 100); // Ensure localStorage updates persist before redirection
        };
    } else {
        console.log("videoPlayed is already true, skipping video.");
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

function Level_bonus_button() {
    location.replace("bonus level.html")
}

function finishGame() {
    console.log("finishGame called");
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("EndingVideo");
	console.log("videoFinished:", localStorage.getItem("videoFinished"));
    console.log("firstRun:", localStorage.getItem("firstRun"));

    if (localStorage.getItem("videoFinished") !== "true") {
        console.log("Playing ending video for the first time.");
        alert("Congratulations! You've eaten " + getCounter() + " crumbs.");
        localStorage.removeItem("counter");
        stopTimerHandler();

        overlay.style.display = "block";
        video.currentTime = 0;
        video.play()

        video.onended = () => {
            console.log("Video finished playing.");
            localStorage.setItem("videoFinished", "true");
            console.log("Video finished, redirecting to Credits.");
            setTimeout(() => {
                location.replace("Credits.html");
            }, 100);
        };
    } else {
        console.log("Video already played, redirecting to Credits.");
		alert("Congratulations! You've eaten " + getCounter() + " crumbs.");
        localStorage.removeItem("counter");
        stopTimerHandler();
        setTimeout(() => {
			location.replace("Credits.html");
			}, 100);
		}
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
        //console.log('Le timer est déjà en route.');
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