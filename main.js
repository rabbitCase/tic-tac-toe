const player = (function createGame(){
    let gridarray = ["","","","","","","","",""];
    let marker = "X"
    let iteration = 0;

    function getcurrentplayer(){
        return marker;
    }
    
    function clear(){
        for(let i=0;i<9;i++){
            gridarray[i] = "";
            document.getElementById(`${i}`).textContent="";
        }
        iteration = 0;
    }

    function check(){
        function checkrow(row){
            return gridarray[row] != "" ? gridarray[row]==gridarray[row+1]? gridarray[row+1]==gridarray[row+2]? true : false : false : false;
        }
        function checkcol(col){
            return gridarray[col] != "" ? gridarray[col]==gridarray[col+3]? gridarray[col+3]==gridarray[col+6]? true : false : false : false;
        }
        function checkdiagnol(diagnol){
            return gridarray[diagnol] != "" ? diagnol == 0 ? gridarray[diagnol] == gridarray[diagnol+4] ? gridarray[diagnol+4]== gridarray[diagnol+8] ? true : false : false : gridarray[diagnol] == gridarray[diagnol+2] ? gridarray[diagnol+2]== gridarray[diagnol+4] ? true : false : false : false;
        }

        if(checkrow(0) || checkrow(3) || checkrow(3) || checkcol(0) || checkcol(1) || checkcol(2) || checkdiagnol(0) || checkdiagnol(2)){
            return true;
        }
        return false;   
    }

    function changeturn(){
        if(marker == "X"){
            marker = "O";
        }
        else{
            marker = "X";
        }
    }

    function playerindicator(flag){
        if(flag){//stop game
            document.getElementById(`${marker}`).style.backgroundColor = 'rgb(38, 38, 38)';
            document.getElementById(`${marker}`).style.boxShadow = '0px 0px 0px 0px rgb(254, 216, 0)';
            return;
        }
        if(marker == 'X'){
            document.getElementById(`${marker}`).style.backgroundColor = 'rgb(255, 247, 0)';
            document.getElementById(`${marker}`).style.boxShadow = '1px 1px 20px 2px rgb(254, 216, 0)';
            document.getElementById('O').style.backgroundColor = 'rgb(38, 38, 38)';
            document.getElementById('O').style.boxShadow = '0px 0px 0px 0px rgb(254, 216, 0)';
        }
        else{//marker is "O" 
            document.getElementById(`${marker}`).style.backgroundColor = 'rgb(255, 247, 0)';
            document.getElementById(`${marker}`).style.boxShadow = '1px 1px 20px 2px rgb(254, 216, 0)';
            document.getElementById("X").style.backgroundColor = 'rgb(38, 38, 38)';
            document.getElementById('X').style.boxShadow = '0px 0px 0px 0px rgb(254, 216, 0)';
        }
    }

    function markbox(index){

        if(gridarray[index] == ""){
            iteration++;
            gridarray[index] = marker;
            changeturn();
            playerindicator();
        }
    }

    function fillbox(i){
        const cell = document.getElementById(`${i}`);
        cell.textContent = gridarray[i];
        cell.style.transform = `scale(${1.05})`;
        setTimeout(() => {
            cell.style.transform = `scale(${1})`;
        },30);
    }

    function getiteration(){
        return iteration;
    }

    return {markbox, getcurrentplayer, clear, check, changeturn, fillbox, playerindicator, getiteration};
})();

const gameboard = document.getElementById("board");

for(let i = 0 ; i <  9 ; i++){
    const gridcell = document.createElement('div');
    gridcell.id = `${i}`;
    gridcell.className = "cell";
    gameboard.appendChild(gridcell);
}
player.playerindicator();
gameboard.addEventListener('click', (event) => {
    if(event.target.classList.contains("cell")){
        player.markbox(event.target.id);
        player.fillbox(event.target.id);
        if(!player.check() && player.getiteration() == 9){
            player.playerindicator(true);
            setTimeout(() => {
                alert("DRAW");
                player.clear();
                player.playerindicator();
            },200);
            return;
        }
        if(player.check()){
            player.playerindicator(true);
            player.changeturn();
            setTimeout(() => {
                alert("Winner is: " + `${player.getcurrentplayer()}`)
                player.clear();
                player.changeturn();
                player.playerindicator();
            },200);
            return;
        }
    }
});

const reset = document.getElementById('clear-grid');
reset.addEventListener('click', () => {
    player.clear();
});