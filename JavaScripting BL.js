let MovingL = false
let MovingR = false
let MovingU = false
let MovingD = false
let Speed = 5
let positionX = 60
let positionY = 500
let schroum = new Audio("schroum.m4a")
let dim_piou = { width: 536/5*1.5, height: 305/5*1.5 };

function init(){
	let piou = document.getElementById("piou")
	piou.style.left = "400px"
	piou.style.top = "700px"
}

function update() {
	let piou = document.getElementById("piou")
	let piouDim = piou.getBoundingClientRect();
	let NouvPiouDim = { left: piouDim.left, top:piouDim.top, right:piouDim.right, bottom:piouDim.bottom, width: piouDim.width, height: piouDim.height };
	
	/*if (document.getElementById("porte1")) {
        let porte1Dim = porte1.getBoundingClientRect();
        if (isIntersecting(porte1Dim, NouvPiouDim)) {
            console.log("porte1");
            Level_2()
        }
    }

	if (document.getElementById("porte2")) {
		let porte2Dim = porte2.getBoundingClientRect();
		if (isIntersecting(porte2Dim, NouvPiouDim)) {
			console.log("porte2");
			schroum.play();
			removeImage(porte2)
		}
	}

	if (document.getElementById("crumb1")) {
		let crumb1Dim = crumb1.getBoundingClientRect();
		if (isIntersecting(crumb1Dim, NouvPiouDim)) {
			console.log("boo");
			removeImage(crumb1);
			schroum.play();
			mangeMiette()
		}
	}

	if (document.getElementById("crumb2")) {
		let crumb2Dim = crumb2.getBoundingClientRect();
		if (isIntersecting(crumb2Dim, NouvPiouDim)) {
			console.log("boo");
			removeImage(crumb2);
			schroum.play();
			mangeMiette()
		}
	}
	if (document.getElementById("crumb3")) {
		let crumb3Dim = crumb3.getBoundingClientRect();
		if (isIntersecting(crumb3Dim, NouvPiouDim)) {
			console.log("boo");
			removeImage(crumb3);
			schroum.play();
			mangeMiette()
		}
	}
	if (document.getElementById("crumb4")) {
		let crumb4Dim = crumb4.getBoundingClientRect();
		if (isIntersecting(crumb4Dim, NouvPiouDim)) {
			console.log("boo");
			removeImage(crumb4);
			schroum.play();
			mangeMiette()
		}
	}*/

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



function manageIntersect(direction) {
	let piou = document.getElementById("piou")
	let piouDim = piou.getBoundingClientRect();
	let NouvPiouDim = { left: piouDim.left, top:piouDim.top, right:piouDim.right, bottom:piouDim.bottom, width: piouDim.width, height: piouDim.height };

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

	// Prendre en compte tous les éléments avec la classe .image (img ou div)
	for (const otherElement of document.querySelectorAll('.image')) {
		if (piou != otherElement) {
			let mobilierDim = otherElement.getBoundingClientRect();
			if (isIntersecting(NouvPiouDim, mobilierDim)){
				return true;
			}
		}
	}
	return false;
}

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
    for (const obstacle of document.querySelectorAll('.image')) {
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
    //console.log("Dimensions changées avec succès.");
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
function Level_2() {
    location.replace("Level 2.html")
}
function Level_3() {
    location.replace("Level 3.html")
}

function mangeMiette() {
    let currentCount = getCounter();
    currentCount++;
    setCounter(currentCount); 
    document.getElementById("counter").textContent = "Crumbs eaten : " + currentCount;
}

function changerdimensions(height, width, id) {
	document.getElementById(id).style.height = height + 'px';
	document.getElementById(id).style.width = width + 'px';
}
function placerBloc(x, y, id) {
	const bloc = document.getElementById(id);
	bloc.style.left = x + 'px';
	bloc.style.top = y + 'px';
}

