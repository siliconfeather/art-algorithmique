/*
    title: Perlin noise rotation on tessalation
    author: LenaMK
    date: 2023-02-12
    description: 
*/


var vermeer = true
var rotateTiles = true
var showStroke = false
var tileOverflow = true

var xoff, yoff
var incx = 0.55
var incy = 0.05
var incz = 0.2
var zoff = 0.0
var variance = 0.002

var side //size of square
var diag //hypothénuse



var nbSquares = 12

var fontsize = 35
var textboxAscent, textboxDescent, textboxHeight

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
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
    else
        noStroke()
} 
   

function makeTile (x, y, size, xoff, yoff, zoff){
    //var localangle = noise(xoff, yoff, zoff)
    //console.log(localangle)
    fill(0, 0, 100, 250);


    
      
//translate canvas to tile location            
    push()
        translate(x, y)
    //make tile

        rect(0, 0, size, size); //white square basis

        var small = Math.sqrt(size/4*size/4*2)

        //black square fill
        fill(0, 0, 0, 250);
        for (let i = 1; i<=3; i+=2){ 
            for (let j = 1; j<=3; j+=2){
                push();
                    rectMode(CENTER);
                    angleMode(DEGREES)
                    translate(size*j/4, size*i/4)
                    rotate(45);
                    rect(0, 0, small, small)                   
                pop();
                
            }
        }     

    //overflow
        if (tileOverflow){
            fill(0, 0, 100, 250);

            for (let i = 0; i<=4; i+=2){ 
                for (let j = 0; j<=4; j+=2){
                    push();
                        rectMode(CENTER);
                        translate(diag/4*j, diag/4*i)
                        rotate(45);
                        rect(0, 0, small, small)    
                    pop();
                    
                }
            }
        }
    //vermeer style fill
        fill(0, 0, 0, 250);
        if (vermeer){
            push()
                rectMode(CENTER);
                rect(size/2, size/2, size/2, size/2);
            pop()
        }

    //rotate
    //text(String(angle)), x, y )
    if (rotateTiles){
        //center of the tile
        angle = noise(xoff, yoff, zoff) 
        console.log(angle)
        translate(size/2, size/2)
        rotate(angle)
    }


    pop()
    
}

/*suggestions
- travailler sur le ton pour évolution
- real tiles (no empty spaces),movement at the scale of the tile
*/
function draw() { 

    background(0, 0, 0)
    fill(0, 0, 100, 250);

    yoff = 0.0

    for (let y = margin; y < windowHeight-diag-margin; y += diag){
        
        xoff = 0.0

        for ( let x = margin; x < windowWidth-diag-margin; x += diag){ 
            xoff += incx

            //
            makeTile(x, y, diag, xoff, yoff, zoff)
   
      
        }
        
        yoff += incy
    } 
    
    //proof that it loops
    ///circle(mouseX, mouseY, 50); 
   
    //end of frame
    zoff += variance;
} 
