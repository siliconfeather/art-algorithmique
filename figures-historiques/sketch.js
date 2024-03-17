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

var figureTime = 300
var startFrame, nbSteps

var art = "\u203B"

function preload() {
    importedObject = loadJSON("data.json")
}




function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    
    createCanvas(windowWidth, windowHeight); 

     
    
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

function drawSelection(selection, start, stepDuration){

    //always show the selection with more alpha
    selection.forEach(d => {

        var location = getPosition(d.location.lat, d.location.lng)

        noStroke()
        fill(341, colorScale(d.produced_at), 67, 150)
        text(art, location[0], location[1])
    })

    var status = frameCount-start
    var drawTime = figureTime - stepDuration*2 
    var percentage = status *100 / figureTime
    var drawPercentage = (status-stepDuration) *100 / drawTime
    //console.log("percentage", percentage)
    //console.log("draw percentage", drawPercentage)

    //start drawing after initial step of drawing with more alpha
    if ( percentage > 20 && percentage < 80 ){
        
        var toDraw = drawPercentage / nbSteps
        
        //console.log("to Draw", toDraw)

        
        /*
        if(current != 0){
            stroke(0, 0, 100, 165)

            var previouslocation = getPosition(selection[current-1].location.lat, selection[current-1].location.lng)
            
            line(previouslocation[0], previouslocation[1], location[0], location[1]) 
            
        }
        */
    }

    //when the entire drawing is completed, last step is to stay as is
    if (status > drawTime){
        
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

    if (frameCount >= figureTime){
        

        if (frameCount % figureTime == 0){
            startFrame = frameCount;
            var nbArtworks = Math.round( random(minArtworks, maxArtworks))
            var randomStart = Math.round( random(0, 276-nbArtworks))
            console.log("randomStart", randomStart)

            selection = data.slice(randomStart, randomStart+nbArtworks)
            console.log("new selection", selection)
            
            nbSteps = (selection.length-1)
            console.log("nb Steps", nbSteps)
            
        }

        drawSelection(selection, startFrame, figureTime/(selection.length+2))
    

    }


} 


