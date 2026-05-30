let qno = 1;
let x=0;
let startTime = 0;
let isStarted =false;

function q(){
    let dgt = [1,2,3,4,5,6,7,8,9];
    let a = Array(8);
    x = Math.floor(Math.random() * 9);
    for(let i=0,j = 0; i < 9; i++){
        if(i !=x){
            a[j] = dgt[i];
            j++;
        }
    }
    shuffle(a);
}

function start(){
    qno = 1;
    startTime = Date.now();/*タイマー開始*/
    isStarted = true;

    document.getElementById("time").textContent = "計測中…";
    
    q();
}

document.addEventListener('keydown',myhandler,false);

function myhandler(event){
    if (!isStarted) return;

    for (let i = '1'; i <= '9'; i++){
        if (event.key == String(i)){
            //alert(i);
            document.getElementById("ans" + qno).innerText = '['+i+']';
            if (i == x+1){
                qno++;

                if (qno > 10){
                    let endTime = new Date().getTime();
                    let time = (endTime - startTime)/1000;

                    document.getElementById("time").textContent = "解答にかかった時間：" + Math.floor(time) + "秒！";

                    isStarted = false;
                    return;
                }
                q();
            }
        }
    }
}

Array.prototype.shuffle = function(){
    let i = this.length;
    while(i){
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffle(cards){
    //let cards = [1,1,2,2,3,3,4,4,5,5,6,6];
    cards.shuffle();
    document.getElementById("question" + qno).innerText = cards.join(" ");
}
