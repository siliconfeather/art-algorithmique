/*
    title: Visualizing Perlin noise
    author: LenaMK
    date: 2023-02-12
    description: 
*/

var side //size of square
var diag //hypothénuse

var xoff, yoff, incx, incy, incz
var zoff = 0.0
//possibilité de rotate un ou des éléments
//repaire 0,0 en haut à gauche. Rotate tourne le repaire

var nbSquares = 125

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

    if (ratio < 1)
        side = windowHeight/nbSquares
        ;
    else
        side = windowWidth/nbSquares; //size of square

    diag = Math.sqrt(side*side*2) //hypothénuse
    margin = 10


    incx = 42
    incy = 10
    incz = 0.1

} 
   
   

function draw() { 
     

    fill(0, 0, 100, 250);
    background(0, 0, 0)


//perlin noise 


    yoff = 0.0
    push()
    for (let y = margin; y < (windowHeight-diag); y += diag){
        //line or  y height
        xoff = 0.0
        for ( let x = margin; x < (windowWidth-diag); x += diag){ 
            // column or x position
            xoff += incx

            fill(0, 0, 100, 180)

            angle = noise(xoff, yoff, zoff)

            rotate(angle)
            quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
        }

        yoff += incy
    }    
    pop()
    fill(0, 0, 100, 250)

//rect for code variables
//to have multiple

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


    
    
    
    
    //end of frame
    zoff += 0.0003;
} 

