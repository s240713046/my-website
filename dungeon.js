"use strict";

const W = 31;//迷路の幅
const H = 31;//迷路の高さ

const maze = [];//迷路

let ctx;

function random(v){
    return Math.floor(Math.random() * v);//０からｖまでの乱数を整数で表す
}

function init(){
    let maze = document.getElementById("maze");
    ctx = maze.getContext("2d");

    createMaze(W,H);//迷路作成
    repaint();
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

const wallimg = new Image();
wallimg.src = "kabe1.png";

const floorimg = new Image();
floorimg.src = "kusa.png";

//描画
function repaint(){

    //床
    for(let x = 0; x < W; x++){
        for(let y = 0; y < H; y++){
            ctx.drawImage(floorimg,x*16,y*16,16,16);
        }
    }

    //壁
    for(let x = 0; x < W; x++){
        for(let y = 0; y < H; y++){
            if(maze[y][x] == 1){
                ctx.drawImage(wallimg, x * 16, y * 16, 16, 16);
            }
        }
    }
}