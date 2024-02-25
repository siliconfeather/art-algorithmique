/*
    title: 
    author: LenaMK
    date: 2023-02-24
    description: r

*/

var data 

function preload() {
    data = loadJSON("data.json")
    
}

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    
    createCanvas(windowWidth, windowHeight); 
    textSize(14) 

    frameRate(1)
    background(0, 0, 0);     
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() { 

    
    fill(0, 0, 100, 250)

    var artwork = Math.floor(random(278))
    console.log(artwork)

    text(data[artwork]["title"]["fr"], random(windowWidth-100), random((windowHeight-10)))

    /*
    for (let i = 0; i < data.length; i++){
        data[i].title.fr, random(windowWidth-100), (windowHeight-10))
    };
*/


} 


