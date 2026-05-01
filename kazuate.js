let answer=0;
let count=0;
function start(){
    answer = Math.floor(Math.random()*100)+1;
    count = document.getElementById("co").innerHTML ="0";
    document.getElementById("result").innerHTML = "";
    document.getElementById("num").value = "";
    console.log(answer);
}

function judge(){
    let a = Number(document.getElementById("num").value);
    count++;
    document.getElementById("co").textContent = count;
    if(a === answer){
        document.getElementById("result").textContent = "当たり！";
    }else if(a < answer){
        document.getElementById("result").textContent = "もっと大きいよ";
    }else{
        document.getElementById("result").textContent = "もっと小さいよ";
    }   
}
