/*
    title: Logo 
    author: LenaMK
    date: 2023-01-13
    description: 
    inpiration: 

*/


function setup() { 
    const width = 800;
    const height = 1000
    createCanvas(width, height);
    background(200);
    //noStroke(); //enlève le contour
    fill(255);

    bodyTop = width/8
    bodyBottom = 1
    // triangle(x1, y1, x2, y2, x3, y3)
    triangle(bodyTop, bodyTop, 500, bodyTop, bodyTop, 700)
    triangle(bodyTop, bodyTop, bodyTop, 700, width/8*5, 700)

    line(300, 700, width/8*1.5, 900)
    line(300, 700, 450, 900)

    circle() 

    
} 
