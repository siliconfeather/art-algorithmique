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
    
    //si je mets noLoop le cercle ne suit pas la souris
    //noLoop();
    
} 
  
function draw() { 
    background(000); 
    circle(mouseX, mouseY, 180, 180); 

    //en l'état, where is art change d'emplacement à chaque loop, il faut garder le loop pour suivre la souris mais définir des constantes pour l'emplacement de "Where is art?"
    text("Where is art?", random(0, displayWidth-250), random(0, displayHeight-100)); 
} 
