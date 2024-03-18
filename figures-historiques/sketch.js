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
var stepTime = 80
var initFigureTime = 30
var finishedFigureTime = 150
var drawTime, startFrame, nbSteps


var art = "\u203B"

function preload() {
    importedObject = loadJSON("data.json")
}




function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    
    createCanvas(windowWidth, windowHeight); 
    figureTime = 300 //init figure time
    startFrame = 0 //init start frame
     
    
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

        var location = getPosition(d.location.lat, d.location.lng)

        noStroke()
        fill(341, colorScale(d.produced_at), 67, 150)
        text(art, location[0], location[1])
    })

    var status = frameCount-start
    drawTime = figureTime-initFigureTime-finishedFigureTime
    //var percentage = status *100 / figureTime
    //console.log("percentage", percentage)
    
    
    if (status > (initFigureTime + drawTime)) { 
        //if the entire drawing is completed, last step is to stay as is 
        console.log("drawing completed")
        selection.forEach(d =>{
            var current = selection.indexOf(d)

            if(current != 0){
                stroke(0, 0, 100, 165)
                var location = getPosition(d.location.lat, d.location.lng)
                var previouslocation = getPosition(selection[current-1].location.lat, selection[current-1].location.lng)
                
                line(previouslocation[0], previouslocation[1], location[0], location[1]) 
                
            }
        })

    }
    else if ( status > initFigureTime){ //
        
        //start drawing after initial step of drawing with more alpha (Delay by initFigureTime)
        //console.log("lets draw", drawTime)

        var currentStep = Math.trunc((status - initFigureTime) / stepTime)

        for (i = 0; i < nbSteps; i++){
            if (i < currentStep){
                //draw the whole line
                var startLocation = getPosition(selection[i].location.lat, selection[i].location.lng)
                var endLocation = getPosition(selection[i+1].location.lat, selection[i+1].location.lng)
                stroke(0, 0, 100, 165)
                line(startLocation[0], startLocation[1], endLocation[0], endLocation[1])
            }
            else if (i == currentStep) {
                //compute which part we need to draw
                var percentageOfCurrentStep = ((status - initFigureTime) / stepTime) - currentStep
                console.log(percentageOfCurrentStep+" of step "+currentStep)

                var startLocation = getPosition(selection[i].location.lat, selection[i].location.lng)
                var endLocation = getPosition(selection[i+1].location.lat, selection[i+1].location.lng)

                var endX = map(percentageOfCurrentStep, 0, 1, startLocation[0], endLocation[0])
                var endY = map(percentageOfCurrentStep, 0, 1, startLocation[1], endLocation[1])
                line(startLocation[0], startLocation[1], endX, endY)

            }
        }


        

        /*
        if(current != 0){
            stroke(0, 0, 100, 165)

            var previouslocation = getPosition(selection[current-1].location.lat, selection[current-1].location.lng)
            
            line(previouslocation[0], previouslocation[1], location[0], location[1]) 
            
        }
        */
    }

}

function draw() { 
      
    background(0, 0, 0)    
    fill(0, 0, 100, 250)

    //TIME 
    //put timer in data loop
    //time variable, compteur de temps ex: 1 an = 360 frames
    //temps courant: frames since start of the piece (modulo)
    //si on veut que ça se dessine au fur et à mesure → diviser la distance à faire par le nombre de frames ...

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

        figureTime = (nbSteps * stepTime)+initFigureTime+finishedFigureTime

    }

    if (selection)
        drawSelection(selection, startFrame)    

    


} 


