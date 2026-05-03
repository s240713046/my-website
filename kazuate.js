let answer=0;
let count=0;
let isStarted = false;/*エラー用（開始ボタン）*/

function start(){
    answer = Math.floor(Math.random()*100)+1;
    count = document.getElementById("co").innerHTML ="0";
    isStarted = true;/*エラー用（ちゃんとボタンを押していたら）*/
    document.getElementById("result").innerHTML = "";
    document.getElementById("num").value = "";

    document.getElementById("seikou").style.display="none";/*画像を２回目で消す動作*/ 
    document.getElementById("seikou").innerHTML = "";

    console.log(answer);
}

function judge(){

    if (!isStarted){/*エラー用（ボタンを押していない場合）*/
        alert("ゲーム開始ボタンを押してから始めてね！");
        return;/*繰り返さないようにするため*/
    }

    let a = Number(document.getElementById("num").value);
    count++;
    document.getElementById("co").textContent = count;
    if(a === answer){
        document.getElementById("result").textContent = "当たり！";
        document.getElementById("seikou").innerHTML = '<img src="omedetou.png" width="500">'; 
        document.getElementById("seikou").style.display = "block";
    }else if(a < answer){
        document.getElementById("result").textContent = "もっと大きいよ";
    }else{
        document.getElementById("result").textContent = "もっと小さいよ";
    }   
}
