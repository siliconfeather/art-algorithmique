/*
    title: Where is art? 
    author: LenaMK
    date: 2023-01-13
    initial code inspired by: https://www.geeksforgeeks.org/p5-js-displaywidth-variable/
*/

// devraient plutôt être des constantes mais il ne reconaît pas la fonction random à l'extérieur de setup
var x
var y

function setup() { 
    // displayWidth prend la taille de mon écran et non de la fenêtre. Utiliser WidowWidth
    createCanvas(windowWidth, windowHeight); 
  
    // Set text size
    textSize(30); 

    x = random(0, windowWidth-400)
    y = random(0, windowHeight-100)
} 
  
function draw() { 
     
    background(0o0);
    circle(mouseX, mouseY, 280, 280); 
    //quel support pour tablette/touch? 

    //comment changer la fonte?
    text("Where is art?", x, y); 

    
    
} 
