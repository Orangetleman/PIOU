
/*
// Récupère l'élément de l'image
const image = document.getElementById('piou_rotate');

// Écoute l'événement de mouvement de la souris
document.addEventListener('mousemove', (event) => {
    // Calcule l'angle entre la souris et le centre de l'image
    const centerX = image.offsetLeft + image.width / 2;
    const centerY = image.offsetTop + image.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI; // Convertit l'angle en degrés

    // Applique la rotation à l'image
    image.style.transform = `rotate(${angle}deg)`;
});
*/