let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let old_x = 0;
let old_y = 0;

let penColor = "green";/*初期のペンの色*/
let penType = 1;/*初期のペンの種類*/


function init(){
    ctx.fillStyle = "white";

document.getElementById("pen1").onclick = function(){
    penType = 1;
    document.getElementById("pen").innerHTML = "ボールペン（小）";
}

document.getElementById("pen2").onclick = function(){
    penType = 2;
    document.getElementById("pen").innerHTML = "ボールペン（中）";
}

document.getElementById("pen3").onclick = function(){
    penType = 3;
    document.getElementById("pen").innerHTML = "ボールペン（大）";
}

document.getElementById("color1").onclick = function(){
    penColor = "green";
    document.getElementById("color").innerHTML = "緑";
}

document.getElementById("color2").onclick = function(){
    penColor = "red";
    document.getElementById("color").innerHTML = "赤";
}

document.getElementById("color3").onclick = function(){
    penColor = "blue";
    document.getElementById("color").innerHTML = "青";
}

document.getElementById("color4").onclick = function(){
    penColor = "yellow";
    document.getElementById("color").innerHTML = "黄";
}

document.getElementById("color5").onclick = function(){
    penColor = "purple";
    document.getElementById("color").innerHTML = "紫";
}

document.getElementById("color6").onclick = function(){
    penColor = "white";
    document.getElementById("color").innerHTML ="消しゴム";
}


    canvas.addEventListener("touchstart",touchStart,false);
    canvas.addEventListener("touchmove",touchMove,false);

    /*初期表示*/
    document.getElementById("pen").innerHTML = "ボールペン（小）";
    document.getElementById("color").innerHTML = "緑";
}

function touchStart(event){
    event.preventDefault();

    let rect = canvas.getBoundingClientRect();

    old_x = event.touches[0].clientX - rect.left;
    old_y = event.touches[0].clientY - rect.top;
}

function touchMove(event){
    event.preventDefault();

    let rect = canvas.getBoundingClientRect();

    let c_x = event.touches[0].clientX - rect.left;
    let c_y = event.touches[0].clientY - rect.top;
    
    if (penType == 1){
        drawLine(old_x, old_y, c_x, c_y, 3, penColor);
    }
    else if(penType == 2){
        drawLine(old_x, old_y, c_x, c_y, 6, penColor);
    }
    else{
        drawLine(old_x, old_y, c_x, c_y, 9, penColor);
    }

    old_x = c_x;
    old_y = c_y;
}

function drawCc1(x, y, r, color){/*円*/
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, psize, color){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth = psize;
    ctx.strokeStyle = color;
    ctx.stroke();
}