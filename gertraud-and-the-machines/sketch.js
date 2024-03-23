/*
    title: Gertraud & the machines
    author: LenaMK et William Diakite
    date: 2023-03-27
    description:

*/


var mic, vol, spectrum, fft, bandW, sound
var nbBands = 64
var volHistoryMax, spectrumHistoryMax
var volHistory = []
var spectrumHistory = []
var ampHistory = []
var playing

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 
    angleMode(DEGREES)
   
    mic = new p5.AudioIn()
    mic.start()
    playing = true
 
    fft = new p5.FFT(0.7, nbBands)  
    fft.setInput(mic)

    bandW = windowWidth / nbBands
    background(0, 0, 0);   
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function disque(){

}


function frequencyMeter(){

    console.log(spectrumHistory.length)


    //max history for this viz
    var maxHist
    if(spectrumHistory.length > 50)
        maxHist = 50
    else
        maxHist = spectrumHistory.length

    console.log("maxHist", maxHist)
    

    stroke(0, 0, 100, 80)
    noFill()
    for (h = maxHist; h > 0; h--){
        
        beginShape()
        for (i = 0; i < spectrum.length; i++){
            //if there is a history
            
            var value = spectrumHistory[spectrumHistory.length-h][i]

            var y = map(value, 0, 256, 0, windowHeight)

            vertex(i*bandW, height - y)          
    
        }
        endShape()
    }

    //current frequency
    stroke(341, 100, 67, 250)
    noFill()
    beginShape();
    for (i = 0; i < spectrum.length; i++){
        var y = map(spectrum[i], 0, 256, 0, windowHeight)

        vertex(i*bandW, height - y)
    }
    endShape()
    
    
    
}

/*

function mousePressed(){
    if (playing == true){
        mic.stop()
        playing = false;
    }
    else{
        mic.start()
        playing = true;
    }
        
}*/


function mousePressed(){
    console.log("mouse Pressed")
    if (isLooping())
        noLoop();
    else
        loop()
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
    spectrumHistory.push(spectrum)
    spectrumHistoryMax = windowWidth
    if (spectrumHistory.length > spectrumHistoryMax){
        spectrumHistory.splice(0,1)
    }
    
    //console.log(spectrumHistory)
    frequencyMeter();

    
} 


