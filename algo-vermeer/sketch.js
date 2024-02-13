/*
    title: 
    author: LenaMK
    date: 2023-02-08
    description: 
*/

var side //size of square
var diag //hypothénuse

var xoff, yoff, incx, incy, incz
var zoff = 0.0
//possibilité de rotate un ou des éléments
//repaire 0,0 en haut à gauche. Rotate tourne le repaire

var nbSquares = 125

var margin

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 

    var ratio = windowWidth/windowHeight

    if (ratio < 1)
        side = windowHeight/nbSquares
        ;
    else
        side = windowWidth/nbSquares; //size of square

    diag = Math.sqrt(side*side*2) //hypothénuse
    margin = 10

    yoff = 0.0
    xoff = 0.0
    incx = 0.2
    incy = 0.2
    incz = 0.01

} 
   
   

function draw() { 
     

    fill(0, 0, 100, 250);
    background(0, 0, 0)
    
    let line = true; 
    let alternate = false;

    off = 10
    yoff = 0.0
    for (let y = margin; y < (windowHeight-diag); y += diag){
        //line or  y height
        xoff = 0.0
        for ( let x = margin; x < (windowWidth-diag); x += diag){ 
            // column or x position
            xoff += incx

            angle = noise(xoff, yoff, zoff)
            if (alternate){
                if(line){
                    rotate(angle)
                    quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
                    line = false;
                    
                }
                else {
                    line = true
                    
                }
            }
            else {

                //rotate(angle)
                quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
            }
        }
        alternate = !alternate
        line = true
        yoff += incy
    }    

    //end of frame
    zoff += 0.0003;
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}