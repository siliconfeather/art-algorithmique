/*
    title: Perlin noise rotation on tessalation
    author: LenaMK
    date: 2023-02-12
    description: 
*/


var tesselate = true
var rotateCanvas = false
var variability = 0.0003

var xoff, yoff
var incx = 0.55
var incy = 0.05
var incz = 2.5
var zoff = 0.0

var side //size of square
var diag //hypothénuse



var nbSquares = 25

var fontsize = 35
var textboxAscent, textboxDescent, textboxHeight

var linecolor=[]


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
    margin = 10

    var nblines = windowHeight/diag

    for (let i = 0; i <= nblines; i++){
        linecolor[i] = random(360)
    }
} 
   
/*suggestions
- travailler sur le ton pour évolution
- real tiles (no empty spaces),movement at the scale of the tile
*/
function draw() { 

    

    fill(0, 0, 100, 250);
    background(0, 0, 0)

    var lineNb = 0

    yoff = 0.0
    push()
    //translate(windowWidth/2, windowHeight/2)
    for (let y = margin; y < windowHeight; y += diag){
        //line or  y height
        xoff = 0.0

        //stroke(linecolor[lineNb], 80, 80, 250)
        //line(0, y, windowWidth/2, y)
        lineNb += 1
        //lines
        for ( let x = margin; x < windowWidth; x += diag){ 

            xoff += incx
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
        }
        if (rotateCanvas){
                angle = noise(xoff, yoff, zoff)
                rotate(angle)
            }       


        yoff += incy
    }    
    pop()
    



/*
//rect for code variables
//to have multiple canvases: instance mode 
// https://github.com/processing/p5.js/wiki/Global-and-instance-mode

    fill(0, 0, 100, 250)
    //rectangle location
    var rectMargin = 80
    var rectX = windowWidth/3*2-rectMargin
    var rectY = windowHeight/3+rectMargin
    var rectWidth = windowWidth/3-rectMargin*2
    var rectHeight = windowHeight/3*2-rectMargin*2

    rect(rectX, rectY, rectWidth, rectHeight)

    fill(0, 100, 0, 250)

    for (let textboxY = rectY; textboxY < (rectY + rectHeight); textboxY += textboxHeight){
        text(String(noise(xoff, yoff, zoff)), rectX+50, textboxY )

    }


    
    */
    
    
    //end of frame
    zoff += variability;
} 
