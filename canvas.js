let canvas = document.getElementById("cvs");
let ctx = canvas.getContext("2d");

let num = 0;
let timerId = NaN;
let count = 0;

let angle = 0;

function start(){
    if (isNaN(timerId)){
        timerId = setInterval(tick,50);
    }
    angle += 2;
}

function stopTimer(){
    clearInterval(timerId);
    timerId = NaN;
}

function tick(){
    angle += 2;
    ctx.clearRect(0,0,canvas.width,canvas.height);//次の画像が表示するときに画面を新しくする

    for (rotDig = 0; rotDig < 360; rotDig += 45){
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotDig + angle) / 180 * Math.PI);

        if(count < 20){
            drawRct(0, 0, 30, 30, "crimson");
            drawRct(0, 0, 20, 20,"salmon");
            
            drawCc1(30, 30, 10, "orangered");
            drawCc1(30, 30, 5, "yellow");
            
            drawRct(50, 50, 30, 30,"orange");
            drawRct(55,55,20,20,"khaki");
        }
        else if(count < 40){
            drawRct(0, 0, 30, 30, "navy");
            drawCc1(0, 0, 10,"deepskyblue");

            drawCc2(30, 30, 10, "mediumslateblue")
            
            drawImgA(50, 50, 25, 25, 1);
            
            drawRct(70, 70, 45, 45,"deepskyblue");
            drawRct(75, 75,35,35,"skyblue");
        }
        else{
            drawRct(0, 0, 30, 30, "darkgreen");
            drawTri(0, 0, 20, 20, "yellowgreen")
            
            drawCc1(30, 30, 10, "seagreen");
            drawCc2(30, 30, 10, "springgreen");
            
            drawCc1(45, 45, 15, "limegreen");

            drawImgA(70, 70, 25, 25, 2);
            
            drawRct(90, 90, 45, 45,"forestgreen");
            drawRct(95,95,35,35,"silver")
        }
        ctx.restore();
    }
    count++;

    if (count >= 60){
        count = 0;
    }
}

let img = new Array();/*画像*/
for (i = 0; i < 3; i++){
    img[i] = new Image();
    img[i].src = "button" + i + ".png";
}
function drawImgA(x,y,w,h,i){
    ctx.drawImage(img[i],x,y,w,h);
}


function drawRct(x, y, w, h, color){/*四角*/
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawTri(x, y, w, h, color){/*三角*/
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + w/2, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
}

function drawCc1(x, y, r, color){/*円*/
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawCc2(x, y, r, color){/*円・半*/
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, 0, Math.PI * 1, true);
    ctx.closePath();
    ctx.fill();
}