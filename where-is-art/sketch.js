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
    // use of displayWidth variable 
    createCanvas(displayWidth-100, displayHeight-150); 
  
    // Set text size
    textSize(40); 

    x = random(0, displayWidth-400)
    y = random(0, displayHeight-200)
} 
  
function draw() { 
     
    background(000);
    circle(mouseX, mouseY, 480, 480); 

    //ça marche!
    text("Where is art?", x, y); 

    
    
} 
