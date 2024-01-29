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
    
    let line = false; 
    //let column = false;
    let alternate = true;

    for (let y = margin; y < (windowHeight-diag); y += diag){
        //line
        for ( let x = margin; x < (windowWidth-diag); x += diag){ 
            //column
            if(line){
                quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
                line = false;
            }
            else {
                line = true
            }   
        }

        if (alternate){
            line = !line
            alternate = false
        }
        else{
            alternate = true
        }
         //reset at each line
    }

    
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}