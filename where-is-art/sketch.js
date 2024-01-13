/*
    title: Where is art? 
    author: LenaMK
    date: 2023-01-13
    description: rechercher le texte "Where is art?", la souris est un cercle blanc qui révèle le texte en noir sur fond noir. L'emplacement du texte est différent (random) à chaque fois qu'on charge la page
    inpiration: effet lampe de poche; tel un spéléologue dans une grotte. Discussions dans le cours sur qu'est-ce que c'est l'art, et "où" il se trouve
    initial code inspired by: https://www.geeksforgeeks.org/p5-js-displaywidth-variable/

*/

// devraient plutôt être des constantes mais il ne reconaît pas la fonction random à l'extérieur de setup
var x
var y

function setup() { 
    // le canevas fait la taille de la fenêtre du navigateur (ne recharge pas en cas de modification de la taille de la fenêtre)
    createCanvas(windowWidth, windowHeight); 
  
    textSize(30); 

    //peut-être ajuster les valeurs intiales (100 au lieu de zéro) car le curseur a des chances d'être en haut de la page / pour ne pas tomber dessus trop vite?
    x = random(0, windowWidth-400)
    y = random(0, windowHeight-100)

    noCursor(); //enlève la souris
} 
  
function draw() { 
     
    background(0o0); //à aller voir: fonctionnement des codes couleurs, 000 donnait une erreur

    circle(mouseX, mouseY, 280, 280); 
    //quel support pour tablette/touch? 

    //comment changer la fonte?
    text("Where is art?", x, y); 


} 

/*
Pour changer la taille du canevas si la taille de la fenêtre est modifiée
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
source: https://stackoverflow.com/questions/68029286/how-do-i-make-the-canvas-perfectly-fit-to-the-window-size-in-p5
*/