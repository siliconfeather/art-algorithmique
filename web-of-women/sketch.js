/*
    title: 
    author: LenaMK
    date: 2023-02-24
    description: 
    notes: still buggy, looses background on click and sometimes stops

*/

var importedObject, data

var minLat, minLong, maxLat, maxLong

var mapPadding = 0.3

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
    }).reverse().splice(0, 3) //removes the 3 artworks without date
    
    //note to self: how many works by men don't have dates? 3 from 279 that's many, even more if you redure to artpubmtl source

    //canvas is around MTL, the rest won't be visible
    // no need to remove them, there are very few anyway

    //https://www.openstreetmap.org/#map=10/45.3637/-74.0575
    //https://www.openstreetmap.org/#map=10/45.7752/-73.4312
    minLat = 45.7752
    maxLat = 45.3637
    minLong = -74.0575
    maxLong = -73.4312
/* min max from the data set

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

    noLoop

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




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() { 
    background(0, 0, 0);   
        
    fill(0, 0, 100, 250)



    data.forEach(d => {
        var location = getPosition(d.location.lat, d.location.lng)
        circle(location[0], location[1], 5)
        text(d.title.fr, location[0], location[1])

        
    });


    /*
    var artwork = Math.floor(random(278))
    console.log(artwork)

    text(data[artwork]["title"]["fr"], random(windowWidth-100), random((windowHeight-10)))

*/

} 


