const APPARRITION_POS = {
    initpos : {x:60,y:350,facing:"piou haut droit"} ,
    // BL page 1
    pos1_1 : {x:1612.5,y:660,facing:"piou haut gauche"} ,
    pos1_2 : {x:1612.5,y:815,facing:"piou haut gauche"} ,
    pos1_3 : {x:60,y:815,facing:"piou haut nord"} ,
    pos1_4 : {x:370.5,y:815,facing:"piou haut nord"} ,
    // BL page 2
    pos2_3 : {x:60,y:350,facing:"piou haut sud"} ,
    pos2_4 : {x:370.5,y:350,facing:"piou haut sud"} ,
    pos2_7 : {x:1612.5,y:350,facing:"piou haut gauche"} ,
    pos2_8 : {x:1612.5,y:505,facing:"piou haut gauche"},
    pos2_9 : {x:1612.5,y:660,facing:"piou haut gauche"},
    pos2_10 : {x:1612.5,y:815,facing:"piou haut gauche"},
    // BL page 3
    pos3_1 : {x:60,y:660,facing:"piou haut droit"},
    pos3_2 : {x:60,y:815,facing:"piou haut droit"},
    pos3_5 : {x:681,y:815,facing:"piou haut nord"},
    pos3_6 : {x:1612.5,y:815,facing:"piou haut nord"},
    // BL page 4
    pos4_5 : {x:681,y:350,facing:"piou haut sud"},
    pos4_6 : {x:1612.5,y:350,facing:"piou haut sud"},
    pos4_7 : {x:60,y:350,facing:"piou haut droit"},
    pos4_8 : {x:60,y:505,facing:"piou haut droit"},
    pos4_9 : {x:60,y:660,facing:"piou haut droit"},
    pos4_10 : {x:60,y:815,facing:"piou haut droit"}
}

window.MovingL = false;
window.MovingR = false;
window.MovingU = false;
window.MovingD = false;
let Speed = 5;
let schroum = new Audio("schroum.m4a");
let dim_piou = { width: 536/5*0.75, height: 305/5*0.75 };
let positionX = 60; // Valeur par défaut, sera écrasée par init()
let positionY = 350;
let crumb1removed = false;

// --- Déclaration des compteurs de crumbs mangés derrière chaque mur ---
const crumbsMangesParMur = {
    bloc1: 0,
    bloc2: 0,
    bloc3: 0,
    bloc_compression_1: 0,
    bloc_compression_2: 0,
    porte1: 0,
    porte2: 0,
    porte3: 0
};

function update() {
	let piou = document.getElementById("piou")
	let piouDim = piou.getBoundingClientRect();
	let NouvPiouDim = { left: piouDim.left, top:piouDim.top, right:piouDim.right, bottom:piouDim.bottom, width: piouDim.width, height: piouDim.height }; 
    let a = 100
    let PiouDimAvecAttract = { left: piouDim.left - a, top:piouDim.top- a, right:piouDim.right+ a, bottom:piouDim.bottom+ a };
    
    let PiouAttractLeft = { left: PiouDimAvecAttract.left, top: PiouDimAvecAttract.top, right: NouvPiouDim.left, bottom: PiouDimAvecAttract.bottom};
    let PiouAttractRight = {left: NouvPiouDim.right,top: PiouDimAvecAttract.top,right: PiouDimAvecAttract.right,bottom: PiouDimAvecAttract.bottom};
    let PiouAttractTop = {left: PiouDimAvecAttract.left,top: PiouDimAvecAttract.top,right: PiouDimAvecAttract.right,bottom: NouvPiouDim.top};
    let PiouAttractBottom = {left: PiouDimAvecAttract.left,top: NouvPiouDim.bottom,right: PiouDimAvecAttract.right,bottom: PiouDimAvecAttract.bottom};

    document.querySelectorAll('img[data-alone="true"]').forEach(crumb => {
        if (crumb && crumb.style.display !== "none") {
            let crumbDim = crumb.getBoundingClientRect();
            if (isIntersecting(crumbDim, NouvPiouDim)) {
                removeImage(crumb);
                schroum.play();
                mangeMiette();
            }
            if (isIntersecting(crumbDim, PiouAttractRight)) {
                console.log("huhu");
                if (crumb1removed == false) {
                    positionX += Speed;
                    console.log("waitaminute")
                    piou.style.left = positionX + "px";
                }
            }
            if (isIntersecting(crumbDim, PiouAttractLeft)) {
                console.log("huhu");
                if (crumb1removed == false) {
                    positionX -= Speed;
                    console.log("waitaminute")
                    piou.style.left = positionX + "px";
                }
            }
            if (isIntersecting(crumbDim, PiouAttractTop)) {
                console.log("huhu");
                if (crumb1removed == false) {
                    positionY -= Speed;
                    console.log("waitaminute")
                    piou.style.top = positionY + "px";
                }
            }
            if (isIntersecting(crumbDim, PiouAttractBottom)) {
                console.log("huhu");
                if (crumb1removed == false) {
                    positionY += Speed;
                    console.log("waitaminute")
                    piou.style.top = positionY + "px";
                }
            }
	    }
	});


    // VERS LA PAGE 1
    if (document.getElementById("p1d")) {
        let p1dDim = p1d.getBoundingClientRect();
        if (isIntersecting(p1dDim, NouvPiouDim)) {
            console.log("p1d");
            Page_1("BL page1.js",1)
        }
    }
    if (document.getElementById("p2d")) {
        let p2dDim = p2d.getBoundingClientRect();
        if (isIntersecting(p2dDim, NouvPiouDim)) {
            console.log("p2d");
            Page_1("BL page1.js",2)
        }
    }
    if (document.getElementById("p3b")) {
        let p3bDim = p3b.getBoundingClientRect();
        if (isIntersecting(p3bDim, NouvPiouDim)) {
            console.log("p3b");
            Page_1("BL page1.js",3)
        }
    }
    if (document.getElementById("p4b")) {
        let p3bDim = p3b.getBoundingClientRect();
        if (isIntersecting(p3bDim, NouvPiouDim)) {
            console.log("p4b");
            Page_1("BL page1.js",4)
        }
    }

    // VERS LA PAGE 2
    if (document.getElementById("p3")) {
        let p3Dim = p3.getBoundingClientRect();
        if (isIntersecting(p3Dim, NouvPiouDim)) {
            console.log("p3");
            Page_2("BL page2.js",3)
        }
    }
    if (document.getElementById("p4")) {
        let p4Dim = p4.getBoundingClientRect();
        if (isIntersecting(p4Dim, NouvPiouDim)) {
            console.log("p4");
            Page_2("BL page2.js",4)
        }
    }
    if (document.getElementById("p7d")) {
        let p7dDim = p7d.getBoundingClientRect();
        if (isIntersecting(p7dDim, NouvPiouDim)) {
            console.log("p7d");
            Page_2("BL page2.js",7)
        }
    }
    if (document.getElementById("p8d")) {
        let p8dDim = p8d.getBoundingClientRect();
        if (isIntersecting(p8dDim, NouvPiouDim)) {
            console.log("p8d");
            Page_2("BL page2.js",8)
        }
    }
    if (document.getElementById("p9d")) {
        let p9dDim = p9d.getBoundingClientRect();
        if (isIntersecting(p9dDim, NouvPiouDim)) {
            console.log("p9d");
            Page_2("BL page2.js",9)
        }
    }   
    if (document.getElementById("p10d")) {
        let p10dDim = p10d.getBoundingClientRect();
        if (isIntersecting(p10dDim, NouvPiouDim)) {
            console.log("p10d");
            Page_2("BL page2.js",10)
        }
    }

    // VERS LA PAGE 3
    if (document.getElementById("p1")) {
        let p1Dim = p1.getBoundingClientRect();
        if (isIntersecting(p1Dim, NouvPiouDim)) {
            console.log("p1");
            tp1 = true
            Page_3("BL page3.js",1)
        }
    }
    if (document.getElementById("p2")) {
        let p2Dim = p2.getBoundingClientRect();
        if (isIntersecting(p2Dim, NouvPiouDim)) {
            console.log("p2");
            Page_3("BL page3.js",2)
        }
    }
    if (document.getElementById("p5b")) {
        let p5bDim = p5b.getBoundingClientRect();
        if (isIntersecting(p5bDim, NouvPiouDim)) {
            console.log("p5b");
            Page_3("BL page3.js",5)
        }
    }
    if (document.getElementById("p6b")) {
        let p6bDim = p6b.getBoundingClientRect();
        if (isIntersecting(p6bDim, NouvPiouDim)) {
            console.log("p6b");
            Page_3("BL page3.js",6)
        }
    }

    // VERS LA PAGE 4
    if (document.getElementById("p5")) {
        let p5Dim = p5.getBoundingClientRect();
        if (isIntersecting(p5Dim, NouvPiouDim)) {
            console.log("p5");
            Page_4("BL page4.js",5)
        }
    }
    if (document.getElementById("p6")) {
        let p6Dim = p6.getBoundingClientRect();
        if (isIntersecting(p6Dim, NouvPiouDim)) {
            console.log("p6");
            Page_4("BL page4.js",6)
        }
    }
    if (document.getElementById("p7g")) {
        let p6Dim = p6.getBoundingClientRect();
        if (isIntersecting(p6Dim, NouvPiouDim)) {
            console.log("p7g");
            Page_4("BL page4.js",7)
        }
    }
    if (document.getElementById("p8g")) {
        let p6Dim = p6.getBoundingClientRect();
        if (isIntersecting(p6Dim, NouvPiouDim)) {
            console.log("p8g");
            Page_4("BL page4.js",8)
        }
    }
    if (document.getElementById("p9g")) {
        let p6Dim = p6.getBoundingClientRect();
        if (isIntersecting(p6Dim, NouvPiouDim)) {
            console.log("p9g");
            Page_4("BL page4.js",9)
        }
    }
    if (document.getElementById("p10g")) {
        let p6Dim = p6.getBoundingClientRect();
        if (isIntersecting(p6Dim, NouvPiouDim)) {
            console.log("p10g");
            Page_4("BL page4.js",10)
        }
    }

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

	*/

	// Gérer tous les crumbs liés à un mur/porte
	/*document.querySelectorAll('img[data-mur], img[data-porte]').forEach(crumb => {
		if (crumb && crumb.style.display !== "none") {
			let crumbDim = crumb.getBoundingClientRect();
			if (isIntersecting(crumbDim, NouvPiouDim)) {
				removeImage(crumb);
				schroum.play();
				mangeMiette(crumb);
			}
		}
	});

	// Gérer tous les crumbs "seuls"
	document.querySelectorAll('img[data-alone="true"]').forEach(crumb => {
		if (crumb && crumb.style.display !== "none") {
			let crumbDim = crumb.getBoundingClientRect();
			if (isIntersecting(crumbDim, NouvPiouDim)) {
				removeImage(crumb);
				schroum.play();
				mangeMiette(); // Pas de paramètre, car pas lié à un mur
			}
		}
	});

    document.querySelectorAll('img[data-alone="true"]').forEach(crumb => {
		if (crumb && crumb.style.display !== "none") {
			let crumbDim = crumb.getBoundingClientRect();
        if (isIntersecting(crumbDim, NouvPiouDim)) {
				removeImage(crumb);
				schroum.play();
				mangeMiette();
			}
		}
	});*/

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

// Ne rien mettre ici ! update() sera appelé par chaque page HTML après init()

function isIntersecting(rect1, rect2) {
	return (rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top);
}
function defPos(page, enterNb) {
    if (page === "BL page1.js") {
        if (enterNb === 1) {
            return APPARRITION_POS.pos1_1
        } else if (enterNb === 2 ) {
            return APPARRITION_POS.pos1_2
        } else if (enterNb === 3 ) {
            return APPARRITION_POS.pos1_3
        } else if (enterNb === 4 ) {
            return APPARRITION_POS.pos1_4
        }
    }
    if (page === "BL page2.js") {
        if (enterNb === 3 ) {
            return APPARRITION_POS.pos2_3
        } else if (enterNb === 4 ) {
            return APPARRITION_POS.pos2_4
        } else if (enterNb === 7 ) {
            return APPARRITION_POS.pos2_7
        } else if (enterNb === 8 ) {
            return APPARRITION_POS.pos2_8
        } else if (enterNb === 9 ) {
            return APPARRITION_POS.pos2_9
        } else if (enterNb === 10 ) {
            return APPARRITION_POS.pos2_10
        }
    }
    if (page === "BL page3.js") {
        if (enterNb === 1 ) {
            return APPARRITION_POS.pos3_1
        } else if (enterNb === 2 ) {
            return APPARRITION_POS.pos3_2
        } else if (enterNb === 5 ) {
            return APPARRITION_POS.pos3_5
        } else if (enterNb === 6 ) {
            return APPARRITION_POS.pos3_6
        }
    }
    if (page === "BL page4.js") {
        if (enterNb === 5 ) {
            return APPARRITION_POS.pos4_5
        } else if (enterNb === 6 ) {
            return APPARRITION_POS.pos4_6
        } else if (enterNb === 7 ) {
            return APPARRITION_POS.pos4_7
        } else if (enterNb === 8 ) {
            return APPARRITION_POS.pos4_8
        } else if (enterNb === 9 ) {
            return APPARRITION_POS.pos4_9
        } else if (enterNb === 10 ) {
            return APPARRITION_POS.pos4_10
        }
    }
};
function Home() {
    location.replace("Home.html")
}
function Level_2() {
    location.replace("Level 2.html")
}
function Level_3() {
    location.replace("Level 3.html")
}
function Page_1(page, enterNb) {
    const coord = defPos(page, enterNb);
    sessionStorage.setItem('piouCoord', JSON.stringify(coord));
    location.replace("BL page1.html");
}
function Page_2(page, enterNb) {
    const coord = defPos(page, enterNb);
    sessionStorage.setItem('piouCoord', JSON.stringify(coord));
    location.replace("BL page2.html");
}
function Page_3(page, enterNb) {
    const coord = defPos(page, enterNb);
    sessionStorage.setItem('piouCoord', JSON.stringify(coord));
    location.replace("BL page3.html");
}
function Page_4(page, enterNb) {
    const coord = defPos(page, enterNb);
    sessionStorage.setItem('piouCoord', JSON.stringify(coord));
    location.replace("BL page4.html");
}
function getMurFromCrumb(crumb) {
    return crumb.dataset.mur;
}

// Harmonise les ids de blocs associés à une porte ("porteX_blocG", "porteX_blocD", etc.) en "porteX".
// Pour les autres murs/blocs, retourne l'id tel quel.
function getMurKeyFromId(id) {
    if (!id) return null;
    // Si id commence par "porte" suivi d'un chiffre, puis "_bloc" et une lettre (G/D/H/B)
    const porteMatch = id.match(/^(porte\d+)_bloc[GDHB]$/);
    if (porteMatch) return porteMatch[1];
    // Si id est exactement "porteX" (au cas où)
    const porteSimple = id.match(/^(porte\d+)$/);
    if (porteSimple) return porteSimple[1];
    // Sinon, retourne l'id tel quel (pour les autres murs/blocs)
    return id;
}

function mangeMiette(crumb = null) {
    let currentCount = getCounter();
    currentCount++;
    setCounter(currentCount); 
    document.getElementById("counter").textContent = "Crumbs eaten : " + currentCount;
    // Si le crumb est associé à un mur ou une porte, incrémente le bon compteur harmonisé
    if (crumb && (crumb.dataset.mur || crumb.dataset.porte)) {
        const murKey = getMurKeyFromId(crumb.dataset.mur || crumb.dataset.porte);
        if (murKey && crumbsMangesParMur[murKey] !== undefined) {
            crumbsMangesParMur[murKey]++;
        }
    }
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

function animeMur(id, vitesse, poussePiou = true, ancrage = 'topleft') {
    const bloc = document.getElementById(id);
    let initialWidth = bloc.offsetWidth;
    let initialHeight = bloc.offsetHeight;
    let minWidth = Math.max(10, initialWidth * 0.2);
    let minHeight = Math.max(10, initialHeight * 0.2);
    let t = 0;
    let direction = 1;
	vitesse = vitesse || 2;
	vitesse /= 100;
    let initialLeft = parseFloat(bloc.style.left) || 0;
    let initialTop = parseFloat(bloc.style.top) || 0;

    // Déduire l'axe à partir de l'ancrage
    let axe = 3; // Par défaut diagonal
    if (['topcenter', 'bottomcenter'].includes(ancrage)) {
        axe = 2; // horizontal
    } else if (['centerleft', 'centerright'].includes(ancrage)) {
        axe = 1; // vertical
    }

    function animate() {
        t += direction * vitesse;
        if (t >= 1) { t = 1; direction = -1; }
        if (t <= 0) { t = 0; direction = 1; }

        let newWidth = initialWidth;
        let newHeight = initialHeight;
        if (axe === 1 || axe === 3) {
            newWidth = initialWidth - (initialWidth - minWidth) * t;
        }
        if (axe === 2 || axe === 3) {
            newHeight = initialHeight - (initialHeight - minHeight) * t;
        }
        changerdimensions(newHeight, newWidth, id);

        // --- Ajuster la position selon l'ancrage ---
        let left = initialLeft;
        let top = initialTop;
        if (ancrage === 'topright') {
            left = initialLeft + (initialWidth - newWidth);
        } else if (ancrage === 'bottomleft') {
            top = initialTop + (initialHeight - newHeight);
        } else if (ancrage === 'bottomright') {
            left = initialLeft + (initialWidth - newWidth);
            top = initialTop + (initialHeight - newHeight);
        } else if (ancrage === 'center') {
            left = initialLeft + (initialWidth - newWidth) / 2;
            top = initialTop + (initialHeight - newHeight) / 2;
        } else if (ancrage === 'centerright') {
            left = initialLeft + (initialWidth - newWidth);
            top = initialTop + (initialHeight - newHeight) / 2;
        } else if (ancrage === 'centerleft') {
            top = initialTop + (initialHeight - newHeight) / 2;
        } else if (ancrage === 'topcenter') {
            left = initialLeft + (initialWidth - newWidth) / 2;
        } else if (ancrage === 'bottomcenter') {
            left = initialLeft + (initialWidth - newWidth) / 2;
            top = initialTop + (initialHeight - newHeight);
        }
        bloc.style.left = left + 'px';
        bloc.style.top = top + 'px';
        // ---

        // --- Pousser Piou si collision ---
        if (poussePiou) {
            const piou = document.getElementById('piou');
            const blocRect = bloc.getBoundingClientRect();
            const piouRect = piou.getBoundingClientRect();
            if (isIntersecting(blocRect, piouRect)) {
                // Calcul du déplacement selon l'ancrage et l'axe
                let dx = 0, dy = 0;
                if (axe === 1 || axe === 3) {
                    if (['topleft', 'bottomleft', 'centerleft', 'topcenter', 'bottomcenter', 'center'].includes(ancrage)) {
                        dx = (direction === -1) ? +1 : -1;
                    } else {
                        dx = (direction === -1) ? -1 : +1;
                    }
                }
                if (axe === 2 || axe === 3) {
                    if (['topleft', 'topright', 'topcenter', 'centerleft', 'centerright', 'center'].includes(ancrage)) {
                        dy = (direction === -1) ? +1 : -1;
                    } else {
                        dy = (direction === -1) ? -1 : +1;
                    }
                }
                let force = (axe === 3) ? vitesse * 150 : vitesse * 300;
                positionX += dx * force;
                positionY += dy * force;
                piou.style.left = positionX + 'px';
                piou.style.top = positionY + 'px';
                repulsePiouOutOfBloc(bloc);
            }
        }
        checkPiouCompression([id]);
        requestAnimationFrame(animate);
    }
    animate();
}

function checkPiouCompression(animatedIds) {
    const piou = document.getElementById('piou');
    const piouRect = piou.getBoundingClientRect();
    let intersectingBlocs = [];
    for (const id of animatedIds) {
        const bloc = document.getElementById(id);
        if (!bloc) continue;
        const blocRect = bloc.getBoundingClientRect();
        if (isIntersecting(piouRect, blocRect)) {
            // Si Piou est complètement à l'intérieur d'un mur
            if (
                piouRect.left >= blocRect.left &&
                piouRect.right <= blocRect.right &&
                piouRect.top >= blocRect.top &&
                piouRect.bottom <= blocRect.bottom
            ) {
                const murKey = getMurKeyFromId(id);
                if (murKey) {
                    killPiou("écrasé", murKey);
                } else {
                    killPiou();
                }
                return;
            }
            intersectingBlocs.push({rect: blocRect, id});
        }
    }
    // Vérifier s'il y a au moins deux blocs qui "coinceraient" Piou
    for (let i = 0; i < intersectingBlocs.length; i++) {
        for (let j = i + 1; j < intersectingBlocs.length; j++) {
            const a = intersectingBlocs[i].rect;
            const b = intersectingBlocs[j].rect;
            // Coincé horizontalement (un bloc à gauche, un à droite)
            if (
                a.right <= piouRect.left && b.left >= piouRect.right ||
                b.right <= piouRect.left && a.left >= piouRect.right
            ) {
                // On prend la clé du premier bloc trouvé
                const murKey = getMurKeyFromId(intersectingBlocs[i].id) || getMurKeyFromId(intersectingBlocs[j].id);
                if (murKey) {
                    killPiou("écrasé", murKey);
                } else {
                    killPiou();
                }
                return;
            }
            // Coincé verticalement (un bloc au-dessus, un en dessous)
            if (
                a.bottom <= piouRect.top && b.top >= piouRect.bottom ||
                b.bottom <= piouRect.top && a.top >= piouRect.bottom
            ) {
                const murKey = getMurKeyFromId(intersectingBlocs[i].id) || getMurKeyFromId(intersectingBlocs[j].id);
                if (murKey) {
                    killPiou("écrasé", murKey);
                } else {
                    killPiou();
                }
                return;
            }
        }
    }
}

function killPiou(reason = "écrasé", murId = null) {
    const piou = document.getElementById('piou');
    piou.style.display = 'none';
    let message = '';
    const murKey = getMurKeyFromId(murId);
	console.log("killPiou debug:", {reason, murId, murKey, crumbs: crumbsMangesParMur[murKey]});
    // Si mort par écrasement et qu'il y a des crumbs à retirer pour ce mur/porte
    if (
        reason === "écrasé" &&
        murKey &&
        crumbsMangesParMur[murKey] !== undefined &&
        crumbsMangesParMur[murKey] > 0
    ) {
        let currentCount = getCounter();
        let crumbsToRemove = crumbsMangesParMur[murKey];
        setCounter(Math.max(0, currentCount - crumbsToRemove));
        document.getElementById("counter").textContent = "Crumbs eaten : " + getCounter();
        localStorage.setItem("counter", Math.max(0, currentCount - crumbsToRemove));
        message = `Piou a été écrasé par ${murKey} ! Les ${crumbsToRemove} crumbs mangés que cachait ce mur sont perdus.`;
		if (crumbsToRemove === 1) { message = `Piou a été écrasé par ${murKey} ! Le crumb mangé que cachait ce mur est perdu.`; }
        crumbsMangesParMur[murKey] = 0; // On remet à zéro le compteur de ce mur/porte
    } else if (reason === "écrasé" && murKey && crumbsMangesParMur[murKey] !== undefined) {
        // Mort par porte/mur mais aucun crumb mangé derrière
        message = `Piou a été écrasé par ${murKey} ! Mais aucun crumb n'avait été mangé derrière ce mur.`;
    } else {
        switch (reason) {
            case "feu":
                message = 'Piou a été brûlé par la boule de feu !';
                break;
            case "mur":
            case "écrasé":
                message = 'Piou a été écrasé !';
                break;
            default:
                message = 'Piou est mort !';
        }
    }
    alert(message);
    location.reload();
}

function repulsePiouOutOfBloc(bloc) {
    let piou = document.getElementById('piou');
    let piouRect = piou.getBoundingClientRect();
    let blocRect = bloc.getBoundingClientRect();
    let maxIter = 20;
    let stuck = false;

    while (isIntersecting(blocRect, piouRect) && maxIter-- > 0) {
        let leftDist = Math.abs(piouRect.right - blocRect.left);
        let rightDist = Math.abs(blocRect.right - piouRect.left);
        let topDist = Math.abs(piouRect.bottom - blocRect.top);
        let bottomDist = Math.abs(blocRect.bottom - piouRect.top);
        let minDist = Math.min(leftDist, rightDist, topDist, bottomDist);

        if (minDist === leftDist) {
            positionX -= leftDist + 1;
        } else if (minDist === rightDist) {
            positionX += rightDist + 1;
        } else if (minDist === topDist) {
            positionY -= topDist + 1;
        } else if (minDist === bottomDist) {
            positionY += bottomDist + 1;
        }
        piou.style.left = positionX + 'px';
        piou.style.top = positionY + 'px';
        piouRect = piou.getBoundingClientRect();

        // Vérifier collision avec n'importe quel autre bloc (fixe ou animé)
        for (const other of document.querySelectorAll('.image')) {
            if (other !== bloc && isIntersecting(piouRect, other.getBoundingClientRect())) {
                stuck = true;
                break;
            }
        }
        if (stuck) break;
    }
    // Si Piou est toujours coincé dans un autre bloc après repousse, il est écrasé
    if (stuck || isPiouInAnyBlocExcept(bloc)) {
        killPiou("écrasé", bloc.id);
    }
}

// Fonctions utilitaires :

function isPiouInAnyBlocExcept(exceptBloc) {
    const piou = document.getElementById('piou');
    const piouRect = piou.getBoundingClientRect();
    for (const other of document.querySelectorAll('.image')) {
        if (other !== exceptBloc && isIntersecting(piouRect, other.getBoundingClientRect())) {
            return true;
        }
    }
    return false;
}
