let MovingL = false
let MovingR = false
let MovingU = false
let MovingD = false
let Speed = 5
let positionX = 1340
let positionY = 300
let schroum = new Audio("schroum.m4a")
let Triche = 0;
let currentCount = getCounter();
let dim_piou = { width: 536/5, height: 305/5 };

function init(){

	let porte5 = document.getElementById("porte5")
	porte5.style.left = "10px"
	porte5.style.top = "460px"
	let porte6 = document.getElementById("porte6")
	porte6.style.left = "31px"
	porte6.style.top = "490px"
	let piou = document.getElementById("piou")
	piou.style.left = "1340px"
	piou.style.top = "300px"
	/*let crumb1 = document.getElementById("crumb1")
	crumb1.style.left = "1500px"
	crumb1.style.top = "550px"*/
	let crumb2 = document.getElementById("crumb2")
	crumb2.style.left = "800px"
	crumb2.style.top = "850px"
	let crumb3 = document.getElementById("crumb3")
	crumb3.style.left = "200px"
	crumb3.style.top = "850px"
	let crumb4 = document.getElementById("crumb4")
	crumb4.style.left = "1500px"
	crumb4.style.top = "850px"
	let gasinière = document.getElementById("gasinière")
	gasinière.style.left = "90px"
	gasinière.style.top = "280px"
	let frigo = document.getElementById("frigo")
	frigo.style.left = "700px"
	frigo.style.top = "523px"
	let table = document.getElementById("table")
	table.style.left = "280px"
	table.style.top = "700px"
	let poubelle = document.getElementById("poubelle")
	poubelle.style.left = "1080px"
	poubelle.style.top = "829px"
	let evier = document.getElementById("evier")
	evier.style.left = "1300px"
	evier.style.top = "617px"
	let Mur = document.getElementById("Mur")
	Mur.style.left = "1865px"
	Mur.style.top = "300px"
	let Mur2 = document.getElementById("Mur2")
	Mur2.style.left = "10px"
	Mur2.style.top = "920px"
}

function update() {
	let piou = document.getElementById("piou")
	let piouDim = piou.getBoundingClientRect();
	let NouvPiouDim = { 
		left: piouDim.left, top:piouDim.top, right:piouDim.right, bottom:piouDim.bottom, width: piouDim.width, height: piouDim.height 
	};
	
	if (document.getElementById("porte5")) {
        let porte5Dim = porte5.getBoundingClientRect();
        if (isIntersecting(porte5Dim, NouvPiouDim)) {
            finishGame()
			removeImage(porte5)
        }
    }
	

	if (document.getElementById("porte6")) {
		let porte6Dim = porte6.getBoundingClientRect();
		if (isIntersecting(porte6Dim, NouvPiouDim)) {
			schroum.play();
			removeImage(porte6)
		}
	}

	/*if (document.getElementById("crumbperime")) {
        let crumbpériméDim = crumbpérimé.getBoundingClientRect();
        if (isIntersecting(crumbpériméDim, NouvPiouDim)) {
            console.log("boo");
            removeImage(crumbpérimé);
			vomiMiette()
        }
    }*/

	/*if (document.getElementById("crumb1")) {
		let crumb1Dim = crumb1.getBoundingClientRect();
		if (isIntersecting(crumb1Dim, NouvPiouDim)) {
			console.log("boo");
			removeImage(crumb1);
			schroum.play();
			mangeMiette()
		}
	}*/

	if (document.getElementById("crumb2")) {
		let crumb2Dim = crumb2.getBoundingClientRect();
		if (isIntersecting(crumb2Dim, NouvPiouDim)) {
			removeImage(crumb2);
			schroum.play();
			mangeMiette()
			Triche++
		}
	}
	if (document.getElementById("crumb3")) {
		let crumb3Dim = crumb3.getBoundingClientRect();
		if (isIntersecting(crumb3Dim, NouvPiouDim)) {
			removeImage(crumb3);
			schroum.play();
			mangeMiette()
			Triche++
		}
	}
	if (document.getElementById("crumb4")) {
		let crumb4Dim = crumb4.getBoundingClientRect();
		if (isIntersecting(crumb4Dim, NouvPiouDim)) {
			removeImage(crumb4);
			schroum.play();
			mangeMiette()
			Triche++
		}
	}
	if (document.getElementById("BDF1")) {
        let BDF1Dim = BDF1.getBoundingClientRect();
        if (isIntersecting(BDF1Dim, NouvPiouDim)) {
            if (Triche == 1) {
				setCounter(currentCount);
            }
			if (Triche == 2) {
				localStorage.setItem("counter", currentCount);
			}
			if (Triche == 3) {
				localStorage.setItem("counter", currentCount);
			}
            location.reload();
			Triche = 0;
        }
    }


	if (manageIntersect("L"))
		MovingL = false;
	if (manageIntersect("R"))
		MovingR = false;
	if (manageIntersect("U"))
		MovingU = false;
	if (manageIntersect("D"))
		MovingD = false;

	if (piouDim.left - Speed < 0) MovingL = false;
    if (piouDim.right + Speed > window.innerWidth) MovingR = false;
    if (piouDim.top - Speed < 216) MovingU = false;
    if (piouDim.bottom + Speed > window.innerHeight) MovingD = false;


	if (MovingL) {
        positionX -= Speed;
    }
    if (MovingR) {
        positionX += Speed;
    }
    if (MovingU) {
        positionY -= Speed;
    }
    if (MovingD) {
        positionY += Speed;
    }

	piou.style.left = positionX + "px";
	piou.style.top = positionY + "px";

    requestAnimationFrame(update);
}

const BDFS = { id: "BDF1", position: 300, direction: 1 }

const BDFspeed = 5;
const maxPosition = 600;

function animate() {
        const BDF = document.getElementById("BDF1");
        if (BDF) {

            BDFS.position += BDFspeed * BDFS.direction;

            if (BDFS.position >= maxPosition || BDFS.position <= 300) {
                BDFS.direction *= -1;
            }

            BDF.style.top = BDFS.position + "px";
            BDF.style.left = '1500px'
        } 
    

    requestAnimationFrame(animate);
}
animate();

function manageIntersect(direction) {
	let piou = document.getElementById("piou")
	let piouDim = piou.getBoundingClientRect();
	let NouvPiouDim = { 
		left: piouDim.left, top:piouDim.top, right:piouDim.right, bottom:piouDim.bottom, width: piouDim.width, height: piouDim.height 
	};

	if (direction === "R")
		NouvPiouDim.left += Speed
	if (direction === "L")
		NouvPiouDim.left -= Speed
	if (direction === "U")
		NouvPiouDim.top -= Speed
	if (direction === "D"){
		NouvPiouDim.top += Speed
	}
	NouvPiouDim.right = NouvPiouDim.left + piouDim.width
	NouvPiouDim.bottom = NouvPiouDim.top + piouDim.height

	
	
	for (const otherElement of document.querySelectorAll('img.image')) {
		if (piou != otherElement) {
			let mobilierDim = otherElement.getBoundingClientRect();
			if (isIntersecting(NouvPiouDim, mobilierDim)){
				return true;
			}
		}
	}
	return false;
}

/*===============================================================*/

document.addEventListener("keydown", (event) => {
    const piou = document.getElementById("piou");

    if (event.key === "ArrowLeft") {
        MovingL = true;
        piou.src = "piou haut gauche.png";
        setPiouDimensions(piou, "horizontal");
    }
    if (event.key === "ArrowRight") {
        MovingR = true;
        piou.src = "piou haut droit.png";
        setPiouDimensions(piou, "horizontal");
    }
    if (event.key === "ArrowUp") {
        MovingU = true;
        piou.src = "piou haut nord.png";
        setPiouDimensions(piou, "vertical");
    }
    if (event.key === "ArrowDown") {
        MovingD = true;
        piou.src = "piou haut sud.png";
        setPiouDimensions(piou, "vertical");
    }
    if (event.key === "Shift") {
        Speed = 10;
    }
});

document.addEventListener("keyup", (event) => {
	if (event.key === "ArrowLeft") {
		MovingL = false
	}
	if (event.key === "ArrowRight") {
		MovingR = false
	}
	if (event.key === "ArrowUp") {
		MovingU = false
	}
	if (event.key === "ArrowDown") {
		MovingD = false
	}
	if (event.key === "Shift") {
		Speed = 5
	}
  }
)

function setPiouDimensions(piou, orientation) {
    // Sauvegarder les dimensions actuelles
    const currentWidth = piou.offsetWidth;
    const currentHeight = piou.offsetHeight;

    // Définir les nouvelles dimensions en fonction de l'orientation
    let newWidth, newHeight;
    if (orientation === "vertical") {
        newWidth = dim_piou.height; // Largeur pour l'orientation verticale
        newHeight = dim_piou.width; // Hauteur pour l'orientation verticale
    } else if (orientation === "horizontal") {
        newWidth = dim_piou.width; // Largeur pour l'orientation horizontale
        newHeight = dim_piou.height; // Hauteur pour l'orientation horizontale
    }

    // Appliquer temporairement les nouvelles dimensions pour tester les collisions
    piou.style.width = `${newWidth}px`;
    piou.style.height = `${newHeight}px`;

    // Vérifier si le personnage entre en collision avec un obstacle
    const piouDim = piou.getBoundingClientRect();
    for (const obstacle of document.querySelectorAll('img.image')) {
        const obstacleDim = obstacle.getBoundingClientRect();
        if (isIntersecting(piouDim, obstacleDim)) {
            // Collision détectée, annuler le changement de dimensions
            piou.style.width = `${currentWidth}px`;
            piou.style.height = `${currentHeight}px`;
            console.log("Collision détectée, dimensions annulées.");
            return;
        }
    }

    // Si aucune collision, conserver les nouvelles dimensions
    console.log("Dimensions changées avec succès.");
}

document.getElementById("counter").textContent = "Crumbs eaten : " + getCounter();

function removeImage(img) {
	img.remove();
}

init();

update();

function isIntersecting(rect1, rect2) {
	return (rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top);
}

function Home() {
    location.replace("Home.html")
}
function Level_1() {
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("OpeningVideo");
    const videoPlayed = localStorage.getItem("videoPlayed") === "true";

    if (!videoPlayed) {
        overlay.style.display = "block";
        video.play();
        video.onended = () => {
            localStorage.setItem("videoPlayed", "true");
            location.replace("Level 1.html");
        };
    } else {
        location.replace("Level 1.html");
    }
}function finishGame() {
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("EndingVideo");
    const videoFinished = localStorage.getItem("videoFinished") === "true";

    if (!videoFinished) {
        alert("Congratulations! You've eaten " + getCounter() + " crumbs.");
        localStorage.removeItem("counter");
        stopTimerHandler();

        overlay.style.display = "block";
        video.play();

        video.onended = () => {
            localStorage.setItem("videoFinished", "true");
            setTimeout(() => {
                location.replace("Credits.html");
            }, 100);
        };
    } else {
        location.replace("Credits.html");
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

function mangeMiette() {
    let currentCount = getCounter();
    currentCount++;
    setCounter(currentCount);
    document.getElementById("counter").textContent = "Crumbs eaten : " + currentCount;
}
function vomiMiette() {
    let currentCount = getCounter();
    currentCount--;
    setCounter(currentCount);
    document.getElementById("counter").textContent = "Crumbs eaten : " + currentCount;
}

function finishGame() {
    const overlay = document.getElementById("videoOverlay");
    const video = document.getElementById("EndingVideo");
    const videoFinished = localStorage.getItem("videoFinished") === "true";

    if (!videoFinished) {
        alert("Congratulations! You've eaten " + getCounter() + " crumbs.");
        localStorage.removeItem("counter");
        stopTimerHandler();

        overlay.style.display = "block";
        video.play();

        video.onended = () => {
            localStorage.setItem("videoFinished", "true");
            setTimeout(() => {
                location.replace("Credits.html");
            }, 100);
        };
    } else {
        location.replace("Credits.html");
    }
}