/*
    title: Vermeer
    author: LenaMK
    date: 2023-01-29
    description: 
    inpiration: les planchers pas tout à fait en damier de Vermeer

*/

var side = 50; //size of square
var diag = Math.sqrt(side*side*2)

var margin = diag/2 




function setup() { 
    
    createCanvas(windowWidth, windowHeight); 
    noLoop();
} 
   

function draw() { 
     
    background(0o0); //white on black, could be the other way around but there is more black so should be easier

    fill(255);

    //quad(x1, y1, x2, y2, x3, y3, x4, y4)
    
    let line = true; 
    let alternate = false;

    for (let y = margin; y < (windowHeight-diag); y += diag){
        //line or  y height
        for ( let x = margin; x < (windowWidth-diag); x += diag){ 
            // column or x position
            
            if (alternate){
                if(line){
                    quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
                    line = false;
                }
                else {
                    line = true
                }
            }
            else {
                quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
            }

            
             
        }
        alternate = !alternate
        
        line = true
    }

    
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}