/*
title: Where is art? 
author: LenaMK
date: 2023-01-13
initial code inspired by: https://www.geeksforgeeks.org/p5-js-displaywidth-variable/

*/

function setup() { 
    // use of displayWidth variable 
    createCanvas(displayWidth-100, displayHeight-150); 
  
    // Set text size
    textSize(40); 

    const x = random(0, displayWidth-400)
    const y = random(0, displayHeight-200)

    text("Where is art?", x, y); 
} 
  
function draw(x,y) { 
     
    //background(000);
    circle(mouseX, mouseY, 480, 480); 

    //en l'état je crois que j'efface le texte avec draw (on le voit mieux sans background), il faut que je réussisse à le mettre dans draw mais en récupérant les valeurs constantes x et y dans setup
    
} 
