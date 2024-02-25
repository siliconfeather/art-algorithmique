/*
    title: 
    author: LenaMK
    date: 2023-02-24
    description: Titre d'œuvres d'art dans l'espace public réalisées par des femmes
    notes: still buggy, looses background on click and sometimes stops. Complete random so it can show same title several times. Would have to pick random from the array, and pop the value from the array after placing it on the screen.

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
    console.log("radom value = ", artwork)

    console.log("MONA id", data[artwork]["id"])

    //*sans titre* est valeur par défaut
    var string = "(Sans titre)" 
    //si on a un titre, l'écrire
    if (data[artwork]["title"]["fr"] != null)
        string = data[artwork]["title"]["fr"]
 


    text(string, random(windowWidth-100), random((windowHeight-10)))

    /*
    for (let i = 0; i < data.length; i++){
        data[i].title.fr, random(windowWidth-100), (windowHeight-10))
    };
*/


} 


