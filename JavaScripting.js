

let MovingL = false
let MovingR = false
let MovingU = false
let MovingD = false
let Speed = 5
let positionX = 60
let positionY = 500
let schroum = new Audio("schroum.m4a")

function init(){

	let porte1 = document.getElementById("porte1")
	porte1.style.left = "1899px"
	porte1.style.top = "500px"
	let porte2 = document.getElementById("porte2")
	porte2.style.left = "1782px"
	porte2.style.top = "530px"
	let piou = document.getElementById("piou")
	piou.style.left = "60px"
	piou.style.top = "500px"
	let crumb1 = document.getElementById("crumb1")
	crumb1.style.left = "1400px"
	crumb1.style.top = "550px"
	let crumb2 = document.getElementById("crumb2")
	crumb2.style.left = "1100px"
	crumb2.style.top = "850px"
	let crumb3 = document.getElementById("crumb3")
	crumb3.style.left = "200px"
	crumb3.style.top = "850px"
	let crumb4 = document.getElementById("crumb4")
	crumb4.style.left = "1300px"
	crumb4.style.top = "300px"
	let poubelle = document.getElementById("poubelle")
	poubelle.style.left = "1400px"
	poubelle.style.top = "650px"
	let chaise = document.getElementById("chaise")
	chaise.style.left = "1250px"
	chaise.style.top = "520px"
	let peluche = document.getElementById("peluche")
	peluche.style.left = "5px"
	peluche.style.top = "750px"
	let bureau = document.getElementById("bureau")
	bureau.style.left = "1400px"
	bureau.style.top = "300px"
	let lit = document.getElementById("lit")
	lit.style.left = "500px"
	lit.style.top = "300px"
	let commode1 = document.getElementById("commode1")
	commode1.style.left = "900px"
	commode1.style.top = "760px"
	let commode2 = document.getElementById("commode2")
	commode2.style.left = "900px"
	commode2.style.top = "600px"
}

function update() {
	let piou = document.getElementById("piou")
	let piouDim = piou.getBoundingClientRect();
	let NouvPiouDim = { left: piouDim.left, top:piouDim.top, right:piouDim.right, bottom:piouDim.bottom, width: piouDim.width, height: piouDim.height };
	
	if (document.getElementById("porte1")) {
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

document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		MovingL = true
		piou.src = "piou haut gauche.png"
	}
	if (event.key === "ArrowRight") {
		MovingR = true
		piou.src = "piou haut droit.png"
	}
	if (event.key === "ArrowUp") {
		MovingU = true
		piou.src = "piou haut nord.png"
	}
	if (event.key === "ArrowDown") {
		MovingD = true
		piou.src = "piou haut sud.png"
	}
	if (event.key === "Shift") {
		Speed = 10
	}
  }
)
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
    location.replace("Level 1.html")
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

