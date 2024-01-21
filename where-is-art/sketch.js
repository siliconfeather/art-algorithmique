/*
    title: Where is art? 
    author: LenaMK
    date: 2023-01-13
    description: rechercher le texte "Art is here". La souris est un cercle blanc qui révèle le texte en noir sur fond noir. L'emplacement du texte est différent (random) à chaque fois qu'on charge la page, et se modifie quand on clique sur le texte
    inpiration: effet lampe de poche; tel un spéléologue dans une grotte. Discussions dans le cours sur qu'est-ce que c'est l'art, et "où" il se trouve
    initial code inspired by: https://www.geeksforgeeks.org/p5-js-displaywidth-variable/

*/

// Art position
var x, y
var art = "Art is here."
var fontsize = 35
var font = 'BagnardRegular'
var artWidth, artHeight, artAscent, artDescent

// Circle
var circleRadius //somehow isn't the radius but the diameter...
var overflow = 50

function setup() { 
    
    createCanvas(windowWidth, windowHeight); 
  
    textSize(fontsize); 
    textFont(font) 

    artWidth = textWidth(art)
    artAscent = textAscent()
    artDescent = textDescent()
    artHeight = artAscent+artDescent

    circleRadius = (artWidth+overflow)

    console.log("size: "+artWidth+" "+artAscent+" "+artDescent)


    setArt();

    //the cursor could actually be the text cursor(type)
    noCursor(); //enlève la souris, voir si c'est à garder vu qu'on ajoute une interaction avec un clic
} 

function setArt(){
    // enlever l'ancier s'il y en a un et placer le nouveau
    clear()
    x = random(5, windowWidth-artWidth) 
    y = random(artAscent, windowHeight-artDescent) //pour que ça fitte exactement

    console.log("x", x)
    console.log("y", y)
}


//function mousePressed() by p5
// The coding Train https://www.youtube.com/watch?v=DEHsr4XicN8
// dist(x,y, mouseX, mouseY)
function mousePressed() {
    //quand le cercle est sur Art: qz

    console.log(mouseX, mouseY)
    var artCenterX = x + artWidth/2
    var artCenterY = y + artHeight/2

    var distance = dist(mouseX, mouseY, artCenterX, artCenterY)
    console.log("distance from mouse", distance)
    //make sure the new art location is far enough from current pos? 

    if (distance < overflow)
        setArt();
    
}

function draw() { 
     
    background(0o0); 


    circle(mouseX, mouseY, circleRadius); 
    //quel support pour tablette/touch? ok mais erreur dans taille de navigateur

    //rectangle is exactly the size of the text 
    //rect(x, y-artAscent, artWidth, artHeight) 

    //text gets a bit thick from reloading over itself but it doesn't when the mouse is over it so no difference
    text(art, x, y); 

    rect()



} 


// Pour changer la taille du canevas si la taille de la fenêtre est modifiée.
// source: https://stackoverflow.com/questions/68029286/how-do-i-make-the-canvas-perfectly-fit-to-the-window-size-in-p5
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setArt()
}
