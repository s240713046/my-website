let janken = ["グー","チョキ","パー"];
let message;
let isStarted = false;/*エラー用（開始ボタン）*/

/*点数をつけるための変数*/
let usscore = 0;
let coscore = 0;

function start(){
    usscore = 0;
    coscore = 0;

    usscore = document.getElementById("user").innerHTML ="0";
    coscore = document.getElementById("comp").innerHTML ="0";

    message = "";
    document.getElementById("result").innerHTML = message;
    document.getElementById("kekka").innerHTML = "";
    
    isStarted = true;/*エラー用（ちゃんとボタンを押していたら）*/

}


function judge(){

    if (!isStarted){/*エラー用（ボタンを押していない場合）*/
        alert("ゲーム開始ボタンを押してから始めてね！");
        return;/*繰り返さないようにするため*/
    }

    let comp = Math.floor(Math.random() * 3);
    let elements = document.getElementsByName('jk');
    let user=0;
    for (let i = 0; i < elements.length; i++)
        if (elements.item(i).checked) user = i;
    message = "あなたの手 :" +  janken[user]  + "<br>";
    message += "コンピュータの手 :" +  janken[comp]  + "<br>";

    if (user === comp){
        message += "惜しい！あいこです";
    }else if((user ==0 && comp==1) || (user==1 && comp==2) || (user==2 && comp==0)){
        message += "おめでとう！あなたにポイントが入ります";
        usscore++;
        document.getElementById("user").innerHTML = usscore;
    }else{
        message += "残念！コンピュータにポイントが入ります"
        coscore++;
        document.getElementById("comp").innerHTML = coscore;
    }

    if (usscore >= 5){
        document.getElementById("kekka").innerHTML = '<img src="kati.png" width="500">';
        document.getElementById("kekka").style.display = "block";
        isStarted = false;
    }

    if (coscore >= 5){
        document.getElementById("kekka").innerHTML = '<img src="make.png" width="500">';
        document.getElementById("kekka").style.display = "block";
        isStarted = false;
    }
    document.getElementById("result").innerHTML = message;
}