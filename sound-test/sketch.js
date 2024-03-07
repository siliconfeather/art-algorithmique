/*
    title: 
    author: LenaMK
    date: 2023-03-06
    description: test de son
    inspiration: https://www.youtube.com/watch?v=q2IDNkUws-A&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=8

*/

var mic, amp 
var volHistory = []
var ampHistory = []


function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 

    

    mic = new p5.AudioIn()
    mic.start()

    amp = new p5.Amplitude()
    amp.setInput(mic)
}
   


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() { 
     
    background(0, 0, 0);   
        
    fill(0, 0, 100, 250)

    var vol = mic.getLevel()
    volHistory.push(vol*10)

    //fill(0, 0, 100, 250)
    //ellipse(windowWidth/2, windowHeight/2, windowWidth, vol*5000)

    stroke(0, 0, 100, 250)  
    text("Amp * 100",windowWidth-200, windowHeight-70) 
    text(amp.getLevel()*100, windowWidth-200, windowHeight-50); 

    text("vol * 10", windowWidth-200, windowHeight-120) 
    text(vol*10, windowWidth-200, windowHeight-100); 

    ampHistory.push(amp.getLevel()*10)

    stroke(0, 0, 100, 150)
    noFill()
    beginShape()
    for (var i = 0; i<volHistory.length; i++){
        var y = map(volHistory[i], 0, 1, height/3*2, 0)
        vertex(i, y)
    }
    endShape()

    if (volHistory.length > width-50){
        volHistory.splice(0,1)
    }

    stroke(341, 100, 67, 250)
    line(volHistory.length, 0, volHistory.length, height)

} 


