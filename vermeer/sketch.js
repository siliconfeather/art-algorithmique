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

    //quad(x1, y1, x2, y2, x3, y3, x4, y4)

    for (let y = margin; y < (windowHeight-margin); y += diag){
        for ( let x = margin; x < (windowWidth-margin); x += diag){ 
            quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y-diag/2)
        }
    }

    
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}