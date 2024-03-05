/*
    title: 
    author: LenaMK
    date: 2023-02-24
    description: 
    data source: https://observablehq.com/@maison-mona/preparation-reconciliation?collection=@maison-mona/gender-analysis
    notes: still buggy, looses background on click and sometimes stops

*/

var importedObject, data

var randomMax //to randomize the maximum shown artworks. Make sure it removes newer artworks, not historical ones. Move the filter to setup!

var minLat, minLong, maxLat, maxLong, minYear, maxYear
var maxColor = 100
var minColor = 10


function preload() {
    importedObject = loadJSON("data.json")
}




function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    
    createCanvas(windowWidth, windowHeight); 
     
    
    data = Object.values(importedObject)

    //order by produced_at = from older to newest
    data.sort((a, b) => {
        return b.produced_at - a.produced_at;
    }).splice(data.length-3, data.length-3) //removes the 3 artworks without date
    
    //note to self: how many works by men don't have dates? 3 from 279 that's many, even more if you redure to artpubmtl source

    minYear = Math.min(...data.map(item => item.produced_at))
    maxYear = Math.max(...data.map(item => item.produced_at))

    //canvas is around MTL, the rest won't be visible
    // no need to remove them, there are very few anyway

    //approx ref, then manually centered on the selected data
    //https://www.openstreetmap.org/#map=10/45.3637/-74.0575
    //https://www.openstreetmap.org/#map=10/45.7752/-73.4312
    minLat = 45.68
    maxLat = 45.39
    minLong = -73.95
    maxLong = -73.4

/* min max from the data set

    var mapPadding = 0.1
    minLat = Math.min(...data.map(item => item.location.lat))-mapPadding
    maxLat = Math.max(...data.map(item => item.location.lat))+mapPadding
    minLong = Math.min(...data.map(item => item.location.lng))-mapPadding
    maxLong = Math.max(...data.map(item => item.location.lng))+mapPadding
*/
    /*checking the getPosition function

    console.log("WindowWidth", windowWidth)
    console.log("WindowHeight", windowHeight)

    console.log("minLat", minLat)
    console.log("maxLat", maxLat)
    console.log("minLong", minLong)
    console.log("maxLong", maxLong)

    console.log("test minLat minLong", getPosition(minLat, minLong))
    console.log("test  maxLat minLong", getPosition(maxLat, minLong))
    console.log("test  minLat maxLong", getPosition(minLat, maxLong))
    console.log("test  maxLat maxLong", getPosition(maxLat, maxLong))
    */

    

    //console.log(data.map(d => d.produced_at))

    //frameRate(1)
    noLoop()

    randomMax = random(10, 276)
} 


//sudo mapping to canvas
//returns valid values (mathematical mapping works) but doesn't respect the geographic mapping norms, north isn't up etc.
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

function draw() { 
    background(0, 0, 0);   
        
    fill(0, 0, 100, 250)

    //TIME 
    //put timer in data loop
    //time variable, compteur de temps ex: 1 an = 360 frames
    //temps courant: frames since start of the piece (modulo)
    //si on veut que ça se dessine au fur et à mesure → diviser la distance à faire par le nombre de frames ...

    data.slice(0,randomMax).forEach(d => {

        var location = getPosition(d.location.lat, d.location.lng)

        noStroke()
        fill(341, colorScale(d.produced_at), 67, 120)

        //circle(location[0], location[1], 18)
        //text(d.title.fr, location[0], location[1])

        var current = data.indexOf(d)        

        
        if(current > 0){
            stroke(0, 0, 100, 165)

            var previouslocation = getPosition(data[current-1].location.lat, data[current-1].location.lng)

            //width = distance between two locations
            var arcWidth = dist(previouslocation[0], previouslocation[1], location[0], location[1]) 
            console.log("arcWidth", arcWidth)


            var arcHeight = ((data[current-1].produced_at-d.produced_at)+1)*100
            console.log("arcHeight", arcHeight)

            /*    

            push()
                noFill()
                angleMode(DEGREES)
                translate(previouslocation[0], previouslocation[1])
                var startAngle = 0
                var stopAngle = 180
                arc(arcWidth/2, 0, arcWidth, arcHeight, startAngle, stopAngle)
            pop()
            */

            //arc((x, y), width, height, start, stop)
            //from Python docs https://p5.readthedocs.io/en/latest/install.html
            //arc((105, 105), 100, 50, PI / 2, 3 * PI / 2)

            line(previouslocation[0], previouslocation[1], location[0], location[1]) 
        }
                   
        
    });


    /*
    var artwork = Math.floor(random(278))
    console.log(artwork)

    text(data[artwork]["title"]["fr"], random(windowWidth-100), random((windowHeight-10)))

*/

} 


