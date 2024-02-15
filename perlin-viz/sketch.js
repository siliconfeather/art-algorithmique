/*
    title: Perlin noise rotation on tessalation
    author: LenaMK
    date: 2023-02-12
    description: 
*/


var vermeer = true
var showStroke = false

var xoff, yoff
var incx = 0.55
var incy = 0.05
var incz = 2.5
var zoff = 0.0

var side //size of square
var diag //hypothénuse



var nbSquares = 12

var fontsize = 35
var textboxAscent, textboxDescent, textboxHeight

var linecolor=[]


function setup() { 



    colorMode(HSB, 360, 100, 100, 250);
    angleMode(DEGREES)
    createCanvas(windowWidth, windowHeight); 

    textSize(fontsize); 
    textboxAscent = textAscent()
    textboxDescent = textDescent()
    textboxHeight = textboxAscent+textboxDescent

    var ratio = windowWidth/windowHeight

    //size of square
    if (ratio < 1)
        side = windowHeight/nbSquares
        ;
    else
        side = windowWidth/nbSquares; 

    diag = Math.sqrt(side*side*2) //hypothénuse
    margin = 50

    if (showStroke)
        stroke(0, 0, 50, 250)
} 
   

function makeTile (x, y, size){
    fill(0, 0, 100, 250);
    
    rect(x, y, size, size);

    var small = Math.sqrt(size/4*size/4*2)

    fill(0, 0, 0, 250);
    for (let i = 1; i<=3; i+=2){ 
        for (let j = 1; j<=3; j+=2){
            push();
                rectMode(CENTER);
                translate(x+size*j/4, y+size*i/4)
                rotate(45);
                rect(0, 0, small, small)

                
            pop();
            
        }
    }       

    if (vermeer){
        push()
            rectMode(CENTER);
            rect(x+size/2, y+size/2, size/2, size/2);
        pop()
    }


    ///quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)                                                                                  
    //quad(x+diag/4, y, x+diag, y+diag, x+diag/2, y+diag, x-diag/2, y+diag/2)
}

/*suggestions
- travailler sur le ton pour évolution
- real tiles (no empty spaces),movement at the scale of the tile
*/
function draw() { 

    

    fill(0, 0, 100, 250);

    var lineNb = 0

    yoff = 0.0

    for (let y = margin; y < windowHeight-diag-margin; y += diag){
        //line or  y height
        xoff = 0.0

        //stroke(linecolor[lineNb], 80, 80, 250)
        //line(0, y, windowWidth/2, y)
        lineNb += 1
        //lines
        for ( let x = margin; x < windowWidth-diag-margin; x += diag){ 
            
            xoff += incx
            makeTile(x, y, diag)
            /*
            fill(linecolor[lineNb], 80, 80, 250)
            
            if (rotateCanvas){
                angle = noise(xoff, yoff, zoff)
                rotate(angle)
            }       

            quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)


            fill(0, 0, 100, 180)
            //text(String(noise(xoff, yoff, zoff)), x, y )

            if (!tesselate){
                break;
            }
            */
        }
        /*
        if (rotateCanvas){
                angle = noise(xoff, yoff, zoff)
                rotate(angle)
            }       

        */
        yoff += incy
    }    
   
    //end of frame
    zoff += variability;
} 
