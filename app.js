const MAX = 12;
let hiddenZombies = [];
let displayedZombies = [];
let random = Math.floor(Math.random()*MAX);
for(let i = 0; i < MAX; i++){
    if(i == random){
        displayedZombies.push("Images/Zombies/zombie-" + i + ".png"); 
    }
    else{
        hiddenZombies.push("Images/Zombies/zombie-" + i + ".png");
    }
}

function zombieUpdate(){
    let zombieDisplay = "";
    let upButtonDisplay = "";
    let downButtonDisplay = "";
    let addButtonClass = "";
    let subtractButtonClass = "";
    if(hiddenZombies.length <= 1){
        addButtonClass = " disabled";
    };
    if(displayedZombies.length <= 1){
        subtractButtonClass = " disabled";
    };
    for(let players = 0; players <= displayedZombies.length -1; players++){
        upButtonDisplay += '<td><img src="Images/Buttons/upButton.png" class="arrow" onclick="upArrowClick('+ (players+1) +')"></td>';
        zombieDisplay += '<td><img id="zombie'+ (players+1) + '" src="'+ displayedZombies[players] +'" ></td>';
        downButtonDisplay += '<td><img  src="Images/Buttons/downButton.png" class="arrow" onclick="downArrowClick('+ (players+1) +')"></td>';
    };
    document.getElementById("upButtonDisplay").innerHTML = '<td></td>' + upButtonDisplay;
    document.getElementById("zombieDisplay").innerHTML = '<td><img id="addButton" src="Images/Buttons/addButton.png" class="zombieButton' + addButtonClass + '" onclick="addButtonClick()"></td>' + zombieDisplay + '<td><img id="subtractButton" src="Images/Buttons/subtractButton.png" class="zombieButton' + subtractButtonClass + '" onclick="subtractButtonClick()"></td>'
    document.getElementById("downButtonDisplay").innerHTML = '<td></td>' + downButtonDisplay;
    sessionStorage.setItem("exportZombies", displayedZombies.toString());
};

window.addButtonClick = () => {
    displayedZombies.push(hiddenZombies[0]);
    hiddenZombies.shift();
    zombieUpdate();
};
window.subtractButtonClick =() => {
    hiddenZombies.push(displayedZombies[displayedZombies.length-1]);
    displayedZombies.pop();
    zombieUpdate();
};
window.upArrowClick = (id) => {
    hiddenZombies.push(displayedZombies[id-1]);
    displayedZombies[id-1] = hiddenZombies[0];
    hiddenZombies.shift();
    zombieUpdate();
};
window.downArrowClick = (id) => {
    hiddenZombies.unshift(displayedZombies[id-1])
    displayedZombies[id-1] = hiddenZombies[hiddenZombies.length-1];
    hiddenZombies.pop()
    zombieUpdate();
};
window.startButtonClick = () => {
    let score = document.getElementById("rounds").value;
    if(score>=1)
    {
        sessionStorage.setItem("winningScore", score);
        window.location.assign("https://joseph061605.github.io/ZombieDice/game.html");
    }
    else
    {
        alert("that is not a valid number of points")
    };
};
if(window.location.pathname == "/index.html"){
    zombieUpdate();
};

export let exportZombies = sessionStorage.getItem("exportZombies");
export let winningScore = parseInt(sessionStorage.getItem("winningScore"));
