/*
    title: Where is art? 
    author: LenaMK
    date: 2023-01-13
    description: rechercher le texte "Art is here", la souris est un cercle blanc qui révèle le texte en noir sur fond noir. L'emplacement du texte est différent (random) à chaque fois qu'on charge la page
    inpiration: effet lampe de poche; tel un spéléologue dans une grotte. Discussions dans le cours sur qu'est-ce que c'est l'art, et "où" il se trouve
    initial code inspired by: https://www.geeksforgeeks.org/p5-js-displaywidth-variable/

*/

// Art position
var x, y
var art = "Art is here."
var fontsize = 35
var font = 'BagnardRegular'
var artWidth, artHeight, artAscent, artDescent

function setup() { 
    // le canevas fait la taille de la fenêtre du navigateur (ne recharge pas en cas de modification de la taille de la fenêtre)
    createCanvas(windowWidth, windowHeight); 
  
    textSize(fontsize); 
    textFont(font) 

    artWidth = textWidth(art)
    artAscent = textAscent()
    artDescent = textDescent()

    console.log("size: "+artWidth+" "+artAscent+" "+artDescent)

    artHeight = artAscent+artDescent

    setArt();

    noCursor(); //enlève la souris, voir si c'est à garder vu qu'on ajoute une interaction avec un clic
} 

function setArt(){
    // ajuster les valeurs intiales 
    x = random(0, windowWidth-artWidth) 
    y = random(0, windowHeight-artHeight)
}


//function mousePressed() by p5
// The coding Train https://www.youtube.com/watch?v=DEHsr4XicN8
// dist(x,y, mouseX, mouseY)
function mousePressed() {
    //reste à set art seulement quand le cercle est sur Art
    var d = dist(mouseX, mouseY, x, y)
    setArt();
}

function draw() { 
     
    background(0o0); //à aller voir: fonctionnement des codes couleurs, 000 donnait une erreur


    circle(mouseX, mouseY, 280, 280); 
    //quel support pour tablette/touch? ok mais erreur dans taille de navigateur

    text(art, x, y); 

    text.clicked = function() {}


} 


// Pour changer la taille du canevas si la taille de la fenêtre est modifiée.
// source: https://stackoverflow.com/questions/68029286/how-do-i-make-the-canvas-perfectly-fit-to-the-window-size-in-p5
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setArt()
}
