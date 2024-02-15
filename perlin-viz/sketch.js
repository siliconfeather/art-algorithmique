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
    margin = 50

    var nblines = windowHeight/diag

    for (let i = 0; i <= nblines; i++){
        linecolor[i] = random(360)
    }
} 
   

function makeTile (x, y){
    fill(0, 0, 0, 250);
    stroke(0, 0, 100, 250)
    rect(x, y, diag, diag)                                                                                                                                                                                                                                                                                                                                                                           
    quad(x, y, x+diag/2, y+diag/2, x, y+diag, x-diag/2, y+diag/2)
}

/*suggestions
- travailler sur le ton pour évolution
- real tiles (no empty spaces),movement at the scale of the tile
*/
function draw() { 

    

    fill(0, 0, 100, 250);

    var lineNb = 0

    yoff = 0.0

    for (let y = margin; y < windowHeight; y += diag){
        //line or  y height
        xoff = 0.0

        //stroke(linecolor[lineNb], 80, 80, 250)
        //line(0, y, windowWidth/2, y)
        lineNb += 1
        //lines
        for ( let x = margin; x < windowWidth; x += diag){ 
            
            xoff += incx
            makeTile(x, y)
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
