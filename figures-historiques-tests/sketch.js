/*
    title: Figures historiques
    author: LenaMK
    date: 2023-02-24
    description: Constellations aléatoires formées par des œuvres d'art public réalisées par des femmes 
    data source: https://observablehq.com/@maison-mona/preparation-reconciliation?collection=@maison-mona/gender-analysis
    notes: still buggy, looses background on click and sometimes stops

*/


var importedObject, data, selection
var minArtworks = 5
var maxArtworks = 12

var minLat, minLong, maxLat, maxLong, minYear, maxYear
var maxColor = 100
var minColor = 10

var figureTime
var figureDistance

var initFigureTime = 30
var finishedFigureTime = 150
var drawTime, startFrame, nbSteps
var speed = 2
var maxDistance = 800
//var maxStepTime = 5 //seconds
//var maxStepFrames


var art = "\u203B"

function preload() {
    importedObject = loadJSON("data.json")
}




function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    
    createCanvas(windowWidth, windowHeight); 
    figureTime = 120 //init figure time
    startFrame = 0 //init start frame
    console.log(windowWidth)

 //   maxDistance = Math.max(windowWidth, windowHeight)
 //   maxStepFrames = maxStepTime*60
 //   speed = maxDistance / maxStepFrames
    

    data = Object.values(importedObject)

    //order by produced_at = from newest to oldest
    data.sort((a, b) => {
        return b.produced_at - a.produced_at;
    }).splice(data.length-3, data.length-3) //removes the 3 artworks without date
    
    minYear = Math.min(...data.map(item => item.produced_at))
    maxYear = Math.max(...data.map(item => item.produced_at))

    //canvas maps area of MTL
    minLat = 45.68
    maxLat = 45.39
    minLong = -73.95
    maxLong = -73.4
    
    textAlign(CENTER, CENTER);
    textSize(28);     
    

    console.log(data)
    console.log(art)
    
} 



function mousePressed(){

    console.log("mouse Pressed")
    if (isLooping())
        noLoop();
    else
        loop()


}

//sudo mapping to canvas
function getPosition(lat, long){
    var x, y, largelat, largelong

    largelat = lat*1000
    largelong = long*1000 

    x = map(largelong, minLong*1000, maxLong*1000, 0, windowWidth) 

    y = map(largelat, minLat*1000, maxLat*1000, 0, windowHeight)

    return [x, y]
}

function colorScale(year){
    var result = map(year, minYear, maxYear, maxColor, minColor)

    return result
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawSelection(selection, start){

    //always show the selection with more alpha
    selection.forEach(d => {
        noStroke()
        fill(341, colorScale(d.produced_at), 67, 150)
        text(art, d.artLocation[0], d.artLocation[1])
    })

    var status = frameCount-start
    drawTime = figureTime-initFigureTime-finishedFigureTime

    
    stroke(0, 0, 100, 165)

    if (status > (initFigureTime + drawTime)) { 
        //if the entire drawing is completed, last step is to stay as is 
        console.log("drawing completed")
        selection.forEach(d =>{
            if (d.nextArtLocation)
                line(d.artLocation[0], d.artLocation[1], d.nextArtLocation[0], d.nextArtLocation[1])                 
        })

    }
    else if ( status > initFigureTime){ 
        //start drawing after initial step of drawing with more alpha (Delay by initFigureTime)
        
        var currentStep = 0
        var nextStepTime = 0
        for (i = 0; i < nbSteps; i++){
            nextStepTime += selection[i].time
            if ((status-initFigureTime) > nextStepTime){
                currentStep += 1
            }
            

            if (i < currentStep){
                //draw the whole line
                line(selection[i].artLocation[0], selection[i].artLocation[1], selection[i].nextArtLocation[0], selection[i].nextArtLocation[1])
            }
            else if (i == currentStep) {
                //compute which part we need to draw
                var percentageOfCurrentStep = (status - initFigureTime ) / nextStepTime

                var endX = map(percentageOfCurrentStep, 0, 1, selection[i].artLocation[0], selection[i].nextArtLocation[0])
                var endY = map(percentageOfCurrentStep, 0, 1, selection[i].artLocation[1], selection[i].nextArtLocation[1])
                line(selection[i].artLocation[0], selection[i].artLocation[1], endX, endY)

            }
        }
    }

}

function draw() { 
      
    background(0, 0, 0)    

    data.forEach(d => {
        var location = getPosition(d.location.lat, d.location.lng)

        noStroke()
        fill(341, colorScale(d.produced_at), 67, 60)

        push()
            textSize(28);     
            text(art, location[0], location[1])
        pop()        
          
        
    });

    //new selection
    if (frameCount-figureTime == startFrame){
        startFrame = frameCount;
        var nbArtworks = Math.round( random(minArtworks, maxArtworks))
        var randomStart = Math.round( random(0, 276-nbArtworks))
        console.log("randomStart", randomStart)

        selection = data.slice(randomStart, randomStart+nbArtworks)
        console.log("new selection", selection)

        nbSteps = (selection.length-1)
        console.log("nb Steps", nbSteps)
        
        var distance = 0;
        var time = 0
        selection.forEach(d =>{
            var location = getPosition(d.location.lat, d.location.lng)
            d.artLocation = location
            var currentDistance
            var currentTime
            var current = selection.indexOf(d)
            if (current < selection.length-1){
                
                var nextLocation = getPosition(selection[current+1].location.lat, selection[current+1].location.lng)
                d.nextArtLocation = nextLocation
                currentDistance = dist(location[0], location[1], nextLocation[0], nextLocation[1])
                
                if (currentDistance > maxDistance){
                    console.log("step "+ current + " :" + currentDistance + "replaced by max distance")
                    distance += maxDistance
                    currentTime = Math.trunc(maxDistance / speed)
                    
                }
                else {
                    console.log("step "+ current + " :" + currentDistance)
                    distance += currentDistance
                    currentTime = Math.trunc(currentDistance / speed)
                    
                }
                d.time = currentTime
                time += currentTime
                d.distance = currentDistance
            }
            else{
                d.distance = 0
                d.time = 0
            }
            
        })

        figureDistance = distance

        console.log("Figure distance", figureDistance)
    
        figureTime = Math.trunc(time) + initFigureTime + finishedFigureTime
        console.log("Figure time", figureTime)
    }

    if (selection)
        drawSelection(selection, startFrame)    

    


} 


