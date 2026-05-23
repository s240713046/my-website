let Block = "kusa.png";

function sblock(block){
    Block = block;
}

function init(){
    let b = document.getElementById("board");

    for (let i=0; i<15; i++){
        let tr = document.createElement("tr");

        for (let j = 0; j<20; j++){
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");
            img.src = "kusa.png";
            img.className = "cell";
            img.id = "cell" + i + j;
            img.onclick = clicked;
            td.appendChild(img);
        }
        b.appendChild(tr);
    }
}

function clicked(e){
    e.target.src = Block;
}

function reset(){
    let cells = document.getElementsByClassName("cell");

    for(let i=0; i < cells.length; i++){
        cells[i].src = "kusa.png";
    }
}