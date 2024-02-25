/*
    title: 
    author: LenaMK
    date: 2023-02-24
    description: 
    notes: still buggy, looses background on click and sometimes stops

*/

var importedObject, data

var minLat, minLong, maxLat, maxLong

function preload() {
    importedObject = loadJSON("data.json")
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




function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    
    createCanvas(windowWidth, windowHeight); 
     
    
    data = Object.values(importedObject)

    minLat = Math.min(...data.map(item => item.location.lat))
    minLong = Math.min(...data.map(item => item.location.lng))
    maxLat = Math.max(...data.map(item => item.location.lat))
    maxLong = Math.max(...data.map(item => item.location.lng))

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

    //order by produced_at from older to newest
    //for now, puts three null values at start → let's remove them
    data.sort((a, b) => {
        return b.produced_at - a.produced_at;
    }).reverse().splice(0, 3) //removes the 3 artworks without date
    //note to self: how many works by men don't have dates? 3 from 279 that's many, even more if you redure to artpubmtl source

    //console.log(data.map(d => d.produced_at))

    noLoop

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

        
    });


    /*
    var artwork = Math.floor(random(278))
    console.log(artwork)

    text(data[artwork]["title"]["fr"], random(windowWidth-100), random((windowHeight-10)))

*/

} 


