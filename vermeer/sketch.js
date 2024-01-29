/*
    title: Vermeer
    author: LenaMK
    date: 2023-01-29
    description: 
    inpiration: les planchers pas tout à fait en damier de Vermeer

*/

var side = 25; //size of square
var diag = Math.sqrt(side*side*2)

var margin = diag/2 




function setup() { 
    
    createCanvas(windowWidth, windowHeight); 
    console.log("diag", diag)
    noLoop();
} 
   

function draw() { 
     
    background(0o0); 

    fill(255);

    for (let y = margin; y < (windowHeight-margin); y += diag){
        for ( let x = margin; x < (windowWidth-margin); x += diag){ //for as often as 
            rect(x, y, side, side)
        }
    }

    
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}