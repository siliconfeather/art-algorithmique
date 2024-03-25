/*
    title: Gertraud & the machines
    author: LenaMK et William Diakite
    date: 2023-03-27
    description:

*/

var showSpectrumPunchCards = false
var showSpectrumLines = false
var showSpectrumQuilt = true


var mic, vol, spectrum, fft, bandW, sound
var nbBands = 128

var volHistoryMax, spectrumHistoryMax
var volHistory = []
var spectrumHistory = []
var shapes = []
var playing

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 
    angleMode(DEGREES)
   
    mic = new p5.AudioIn()
    mic.start()
    playing = true
 
    fft = new p5.FFT(0.9, nbBands)  
    fft.setInput(mic)

    bandW = windowWidth / nbBands
    background(0, 0, 0);   
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/* trop exigeant de travailler sur un array de arrays, lags
function frequencyMeter(){

    //console.log(spectrumHistory.length)


    //max history for this viz
    var maxHist
    if(spectrumHistory.length > 50)
        maxHist = 50
    else
        maxHist = spectrumHistory.length

    //console.log("maxHist", maxHist)
    

    stroke(0, 0, 100, 80)
    noFill()
    for (h = maxHist; h > 0; h--){
        
        beginShape()
        for (i = 0; i < spectrum.length; i++){
            //if there is a history
            
            var value = spectrumHistory[spectrumHistory.length-h][i]

            var y = map(value, 0, 256, 0, windowHeight)

            vertex(i*bandW, height - y)          
            vertex(i*bandW, windowHeight)
    
        }
        endShape()
    }

    //current frequency
    stroke(141, 100, 67, 250)
    noFill()
    beginShape();
    for (i = 0; i < spectrum.length; i++){
        var y = map(spectrum[i], 0, 256, 0, windowHeight)

        vertex(i*bandW, height - y)
        vertex(i*bandW, windowHeight)
    }
    endShape()
    
    
    
}

function frequencyRects(){

    //console.log(spectrumHistory.length)


    //max history for this viz
    var maxHist
    if(spectrumHistory.length > 50)
        maxHist = 50
    else
        maxHist = spectrumHistory.length

    //console.log("maxHist", maxHist)
    

    stroke(0, 0, 100, 80)
    noFill()
    for (h = maxHist; h > 0; h--){
        
        
        for (i = 0; i < spectrum.length; i++){
            //if there is a history
            
            var value = spectrumHistory[spectrumHistory.length-h][i]

            var y = map(value, 0, 256, 0, windowHeight)

            rect(i*bandW, height - y, bandW, bandW/2)          
    
        }
        
    }

    //current frequency
    stroke(131, 100, 67, 250)
    noFill()
    beginShape();
    for (i = 0; i < spectrum.length; i++){
        var y = map(spectrum[i], 0, 256, 0, windowHeight)

        rect(i*bandW, height - y, bandW, bandW/2)    
    }
    endShape()
    
    
    
}

function frequencyDisc(){

    var widthPerSpectrum = windowHeight/2/nbBands

    var max
    if (spectrumHistory.length < 360)
        max = spectrumHistory
    else
        max = 360
    
    push()
    translate(width/2, height/2)

    //for the last 360 history elements
    for (var i = 0; i < max; i+=3){
        //for each band
        
        for (var s = 0; s < nbBands; s+=10){
            // I think the angle is just i?
            //map(i, 0, spectrum.length, 0, 360)
            var angle = i
            var r = widthPerSpectrum * s
            var x = r * cos(angle)
            var y = r * sin(angle)
    
            var opacity = map(spectrumHistory[i][s], 0, 255, 0, 100)
            fill(0, 0, opacity, 250)
            //stroke(0, 0, 100, 80)
            circle(x,y, widthPerSpectrum)
        }
        
        
        //var y = map(amp, 255, 1, height, 0)
        //fill(i, 255, 255 )
        //rect(i*bandW, y, bandW-2, height - y)
    }

    pop()
}
*/

function spectrumLines(){
    var selection = 4
    var margin = 10
    var pageMargin = 100

    for (var s = 1; s < nbBands / selection; s++){
        var dist = 3        
        var size = (windowWidth - pageMargin*2) / nbBands * selection
        
        var y = map(spectrum[s*selection/2 - 2], 0, 255, pageMargin, windowHeight - pageMargin)

        stroke(0, 0, 100, 250)           

        line((s-1) * size + pageMargin + (size-margin*2) /2, windowHeight - y - pageMargin, pageMargin , pageMargin + s*dist)


        //circle((s-1) * size + pageMargin, windowHeight - y - pageMargin, size - margin*2)
            
        
    }
}


function spectrumPunchCard(){

    var selection = 4
    var margin = 10
    var pageMargin = 100

    for (var s = 1; s < nbBands / selection; s++){
        
        var size = (windowWidth - pageMargin*2) / nbBands * selection
        
        
        var y = map(spectrum[s*selection/2 - 2], 0, 255, pageMargin, windowHeight - pageMargin)

        stroke(0, 0, 20, 250)
        fill(0, 0, 100, 150)                

        rect((s-1) * size + pageMargin, windowHeight - y - pageMargin, size - margin*2, size/2-margin)
        //circle((s-1) * size + pageMargin, windowHeight - y - pageMargin, size - margin*2)
            
        
    }

    
}


function spectrumQuilt(){
    var selection = 4
    var margin = 10
    var pageMargin = 100
    frameRate(5);
    for (var s = 1; s < nbBands; s++){
                    
        var startX = random(pageMargin, windowWidth-pageMargin)
        var startY = random(pageMargin, windowHeight-pageMargin)
        var nbSides = random(3,9)
        
        var opacity = map(spectrum[s-1], 0, 255, 0, 100)
        
        fill(0, 0, opacity, 250)

        push()
            translate(startX, startY)

            beginShape()

                vertex(0, 0)

                for(var i = 0; i < nbSides; i++){
                    vertex(random(5,50),random(5,50) )
                }

            endShape()
        pop()
        
    }
}


function buildShapes(){
    //as many shapes as there are bands in the frequency
    for (var b = 0; b < nbBands; b++){
        var nbSides = random(3, 9)
        var newShape = []

        //first value in shape array is nb of sides
        newShape.push(nbSides) 
        
        //create xy location for each side
        for(var i = 0; i <= nbSides; i++) {
            var x = random(5,50)
            var y = random(5,50)
            //following values are x, y for each side
            newShape.push(x, y)
            
        };

        shapes.push(newShape)
        
    }
}

function spectrumSmoothQuilt(){
    var selection = 4
    var margin = 10
    var pageMargin = 100

    /*
    if (shapes.length == 0)
        buildShapes();
    */
    for (var s = 1; s < shapes.length; s++){
                    
        var shapeX = 
        
        shapes[s].length
        
        var opacity = map(spectrum[s-1], 0, 255, 0, 100)
        console.log

        frameRate(5);
        
        fill(0, 0, opacity, 250)

        push()
            translate(startX, startY)

            beginShape()

                vertex(0, 0)

                for(var i = 0; i < nbSides; i++){
                    vertex(random(5,50),random(5,50) )
                }

            endShape()
        pop()
        
    }
}

function mousePressed(){
    if (isLooping()){
        noLoop();
        console.log("mouse Pressed → pause")

    }
    else{
        loop()
        console.log("mouse Pressed → play")
    }
        
}


function draw() { 
     
    background(0, 0, 0)

    /*vol = mic.getLevel()
    
    volHistory.push(vol*10)
    volHistoryMax = windowWidth
    if (volHistory.length > volHistoryMax){
        volHistory.splice(0,1)
    }
    */
    spectrum = fft.analyze()


    //console.log("window", windowWidth)
    //console.log("spectrum", bandW * spectrum.length)
    
    spectrumHistory.push(spectrum)
    spectrumHistoryMax = 10
    if (spectrumHistory.length > spectrumHistoryMax){
        spectrumHistory.splice(0,1)
    }
    
    
    if(showSpectrumPunchCards)
        spectrumPunchCard();
    
    if (showSpectrumLines)
        spectrumLines()

    if (showSpectrumQuilt)    
        spectrumQuilt()
    
} 


