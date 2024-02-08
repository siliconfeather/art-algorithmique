/*
    title: Vermeer's tiles
    author: LenaMK
    date: 2023-01-29
    description: les planchers dans les œuvres de Vermer
    inpiration: genuary 25th prompt "If you like generative art, you probably have some photos on your phone of cool looking patterns, textures, shapes or things that you’ve seen. You might have even thought, “I should try to recreate this with code”. Today is the day."
*/


var side //size of square
var diag //hypothénuse

//possibilité de rotate un ou des éléments
//repaire 0,0 en haut à gauche. Rotate tourne le repaire

var margin

function setup() { 

    createCanvas(windowWidth, windowHeight); 

    var ratio = windowWidth/windowHeight

    if (ratio < 1)
        side = windowHeight/25;
    else
        side = windowWidth/25; //size of square
    diag = Math.sqrt(side*side*2) //hypothénuse
    margin = diag/2 


    noLoop();
} 
   

function draw() { 
     
    background(0o0);

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