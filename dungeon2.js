"use strict";

const W = 31;//迷路の幅
const H = 31;//迷路の高さ

const maze = [];//迷路

let ctx;

/*スタートとタイマー用*/
let startTime = 0;
let isStarted = false;

function start(){
    createMaze(W,H);
    repaint();

    clearInterval(timer);
    player.x = 1;
    player.y = 1;
    player.dir = 1;

    timer = setInterval(tick,100);
    
    isStarted = false;
    document.getElementById("time").textContent = "";

}
function time(){
    startTime = Date.now();
    isStarted = true;

    document.getElementById("time").textContent = "0秒";
}

 
/*ゴール設定*/
let goalx = W - 2;
let goaly = H - 2;

function random(v){
    return Math.floor(Math.random() * v);//０からｖまでの乱数を整数で表す
}

function init(){
    let maze = document.getElementById("maze");
    ctx = maze.getContext("2d");

    createMaze(W,H);//迷路作成
    repaint();

    go();
}

function go(){
    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;

    let maze = document.getElementById("maze");
    //迷路への参照を取得して各種イベントハンドラ登録
    maze.oncontextmenu = function(e){
        e.preventDefault(); //コンテキストメニューを非表示に（タッチ対応）
    };

    timer = setInterval(tick,100); 
}

function createMaze(w,h){
    for(let y = 0; y < h; y++){
        maze[y] = [];
        for(let x = 0;x < w; x++ ) {
            maze[y][x] = x == 0||x == w-1||y == 0||y == h - 1 ? 1 : 0;
        }
    }
    for (let y = 2; y < h - 2; y += 2){
        for(let x = 2; x < w - 2; x += 2){
            maze[y][x] = 1;//柱を立てる
            let dir = random(y == 2 ? 4:3);
            let px = x;//今のｘ座標
            let py = y;//今のｙ座標
            switch (dir){
                case 0:
                    py++;//下に倒す
                    break;
                case 1:
                    px--;//左に倒す
                    break;
                case 2:
                    px++;//右に倒す
                    break;
                case 3:
                    py--;//上に倒す
                    break;
            }
            maze[py][px] = 1;//倒れた場所も柱にする
        }
    }
}

//メインルーチン
function tick(){

    if(isStarted){
        let endTime = new Date().getTime();
        let time = (endTime - startTime) / 1000;
        document.getElementById("time").textContent = Math.floor(time) + "秒";
    }
    player.update();

    /*ゴール設定*/
    if(player.x == goalx && player.y == goaly){
        clearInterval(timer);
        isStarted = false;
        alert("ゴール！");
    }

    repaint();
}

const wallimg = new Image();
wallimg.src = "kabe1.png";

const floorimg = new Image();
floorimg.src = "kusa.png";

//描画
function repaint(){

    //床
    for(let x = 0; x < W; x++){
        for(let y = 0; y < H; y++){
            ctx.drawImage(floorimg, x*16, y*16, 16, 16);
        }
    }

    //壁
    for(let x = 0; x < W; x++){
        for(let y = 0; y < H; y++){
            if(maze[y][x] == 1){
                ctx.drawImage(wallimg, x*16, y*16, 16, 16);
            }
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(goalx * 16 + 2,goaly * 16 + 2, 12,12);

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect(goalx * 16 + 2,goaly * 16 + 2,12,12);

    player.paint(ctx,16,16,16,16);

    ctx.restore();
}

//キー&マウス押下のイベントハンドラ
function mykeydown(e){
    e.preventDefault();//デフォルトのスクロール動作を止める
    keyCode = e.keyCode;
}

function mykeyup(e){
    keyCode = 0;
}



const player = new Player(1,1); //主人公
let keyCode = 0; //押されたキー
let timer = NaN;//タイマー

//主人公オブジェクトコンストラクタ
function Player(x,y){
    this.x = x; //x座標
    this.y = y; //y座標
    this.dir = 1;//向き

    this.update = function(){
        let nx = 0; //仮のｘ方向の移動量
        let ny = 0;//仮のｙ方向の移動量
        switch (keyCode){
            case 37:
                nx = -1;
                this.dir = 2;
                break;
            case 38:
                ny = -1;
                this.dir = 0;
                break;
            case 39:
                nx = +1;
                this.dir = 3;
                break;
            case 40:
                ny = +1;
                this.dir = 1;
                break;
        }
        if (maze[this.y + ny][this.x + nx] == 0 && (nx != 0 || ny != 0)){
            //移動先の座標が通路（０）のとき
            this.x = this.x + nx; //ｘ座標更新
            this.y = this.y + ny; //ｙ座標更新
        }
    };

    this.paint = function(gc,x,y,w,h){
        let img = document.getElementById("hero" + this.dir);
        //gc.drawImage(img,x,y,w,h); //教科書
        gc.drawImage(img, this.x*16, this.y*16, 16, 16); //主人公描画
    };
}

function reset(){/*リセット機能*/
    clearInterval(timer);

    player.x = 1;
    player.y = 1;
    player.dir = 1;

    timer = setInterval(tick,100);

    keyCode = 0;

    document.getElementById("time").textContent = "";
}