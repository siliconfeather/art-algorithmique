/*
    title: Gertraud & the machines
    author: LenaMK et William Diakite
    date: 2023-03-27
    description:

*/


var mic, vol, spectrum, fft, bandW
var nbBands = 64
var volHistoryMax, spectrumHistoryMax
var volHistory = []
var ampHistory = []


function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 
    angleMode(DEGREES)

    mic = new p5.AudioIn()
    
    
    mic.start()
 
    fft = new p5.FFT(0.7, nbBands)  
    fft.setInput(mic)

    bandW = windowWidth / nbBands
    
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() { 
     
    background(0, 0, 0);   

    vol = mic.getLevel()
    
    volHistory.push(vol*10)
    volHistoryMax = windowWidth
    if (volHistory.length > volHistoryMax){
        volHistory.splice(0,1)
    }

    spectrum = fft.analyze()
    spectrumHistoryMax = windowWidth
    if (volHistory.length > volHistoryMax){
        volHistory.splice(0,1)
    }
    


    
} 


