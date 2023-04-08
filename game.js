const rollButton = document.getElementById("rollButton");
const endButton = document.getElementById("endButton");

const blank = {"color":"blank","side":"blank"};
const redDice = {"color":"red","side":"none","1":"shotgun","2":"shotgun","3":"shotgun","4":"footsteps","5":"footsteps","6":"brain"};
const yellowDice = {"color":"yellow","side":"none","1":"shotgun","2":"footsteps","3":"footsteps","4":"footsteps","5":"brain","6":"brain"};
const greenDice = {"color":"green","side":"none","1":"shotgun","2":"footsteps","3":"footsteps","4":"brain","5":"brain","6":"brain"};
let hiddenDice = [redDice, yellowDice, yellowDice, yellowDice, yellowDice, greenDice, greenDice, greenDice, greenDice, greenDice, greenDice]; // possible new dice rolls
let rolledDice = [blank, blank, blank]; //what the rolled dice lands on
let diceFile = [".gif", ".gif", ".gif"]; //file type for rolled dice
let savedDice = []; //all dice rolled so far


let firstPlayerPosition = 0;
import {exportZombies,winningScore} from "./app.js";
let zombies = exportZombies.split(",");
let zombiePoints = [];
for(let players = 0; players <= zombies.length -1; players++){
    zombiePoints.push(0);
};

let shotguns = 0;
let brains = 0;
let won = false;

function getRandomInt(min,max){ //finds random int, max exclusive
    return Math.floor(Math.random()*(max-min)) + min;
};
function diceUpdate(){
    const dice1 = document.getElementById("dice1").src = "Images/Dice/" + rolledDice[0]["side"] + diceFile[0];
    const dice2 = document.getElementById("dice2").src = "Images/Dice/" + rolledDice[1]["side"] + diceFile[1];
    const dice3 = document.getElementById("dice3").src = "Images/Dice/" + rolledDice[2]["side"] + diceFile[2];
    const color1 = document.getElementById("color1").src = "Images/Dice/" + rolledDice[0]["color"] + diceFile[0];
    const color2 = document.getElementById("color2").src = "Images/Dice/" + rolledDice[1]["color"] + diceFile[1];
    const color3 = document.getElementById("color3").src = "Images/Dice/" + rolledDice[2]["color"] + diceFile[2];
    let output = "";
    if(savedDice.length >= 1){
        for(let dice = 0; dice <= savedDice.length -1; dice++){
            output += "<img class='dice savedDice' src='Images/Dice/" + savedDice[dice]["side"] + ".png'><img class='color savedDice' src='Images/Dice/" + savedDice[dice]["color"] + ".png'>";
        };
    }
    document.getElementById("savedDiceDisplay").innerHTML = output; 
};
function textUpdate(){
    document.getElementById("diceLeftDisplay").innerHTML = hiddenDice.length + " Dice Left";
    document.getElementById("winningPointsDisplay").innerHTML = winningScore + " points to win";
};
function zombieUpdate(){
    let zombieDisplay = "";
    let pointDisplay = "";
    let zombieClass = "";
    for(let players = 0; players < zombies.length; players++){
        zombieClass ="";
        if(zombiePoints[players] == Math.max(...zombiePoints) && zombiePoints[players] >= winningScore){
            zombieClass = " winner";
        }
        else if(players == 0){
            zombieClass = " currentPlayer";
        };
        pointDisplay += '<td><div>'+zombiePoints[players]+'</div></td>'
        zombieDisplay += '<td><img src="'+ zombies[players] +'" class="zombie'+ zombieClass +'"></td>'; 
    };
    document.getElementById("zombieDisplay").innerHTML = zombieDisplay;
    document.getElementById("points").innerHTML = pointDisplay;
};
function buttonUpdate(){
    if(shotguns >= 3){
        rollButton.classList = "button disabled";
    }
    else{
        rollButton.classList = "button";
    };
    if(rolledDice[0] == blank){
        endButton.classList = "button disabled";
    }
    else{
        endButton.classList = "button";
    };
    if(won){
        rollButton.classList = "button disabled";
        endButton.classList = "button disabled";
    };
};
function winnerUpdate(){
    let max = Math.max(...zombiePoints);
    if(max >= winningScore){
        let zombieDisplay = "";
        let pointDisplay = "";
        let winner = "";
        for(let players = 0; players < zombies.length; players++){
            winner ="";
            if(zombiePoints[players] == max ){
                winner = " winner";
            };
            pointDisplay += '<td><div>'+zombiePoints[players]+'</div></td>'
            zombieDisplay += '<td><img src="'+ zombies[players] +'" class="zombie'+ winner +'"></td>'; 
        };
        document.getElementById("zombieDisplay").innerHTML = zombieDisplay;
        document.getElementById("points").innerHTML = pointDisplay;
        won = true;
}
};

rollButton.addEventListener("click", function(){ //rolls 3 new dice including footsteps dice 
     if(shotguns < 3){
        let newSaved = [];
        for(let dice = 0; dice <= 2; dice++){ //for each of dice, starting at zero;
            let randomDiceSide = getRandomInt(1,7); //saves random position on dice
            if(rolledDice[dice]["side"] == "footsteps"){ //if the dice land on footsteps roll that dice again
                rolledDice[dice]["side"] = rolledDice[dice][randomDiceSide + ""];
                diceFile[dice] = ".png";
            }
            else{ //else roll a new die
                if(hiddenDice.length <= 0){
                    hiddenDice = savedDice.slice(savedDice.length-6,savedDice.length-1);
                };
                let dieRolledPosition = getRandomInt(0,hiddenDice.length);
                rolledDice[dice] = JSON.parse(JSON.stringify(hiddenDice[dieRolledPosition]));
                hiddenDice.splice(dieRolledPosition,1);
                rolledDice[dice]["side"] = rolledDice[dice][randomDiceSide + ""];
                diceFile[dice] = ".gif";
                textUpdate();
            };
            if(rolledDice[dice]["side"] == "shotgun"){
                shotguns++;
                if(shotguns >= 3)
                {
                    brains = 0;
                }
                else{
                    newSaved.push(rolledDice[dice]);
                }
            }
            else if(rolledDice[dice]["side"] == "brain"){
                brains++;
                newSaved.push(rolledDice[dice]);
            };
        };
        diceUpdate();
        setTimeout(() => {
            diceFile = [".png", ".png", ".png"];
            diceUpdate();
            for(let saved = 0; saved <= newSaved.length -1; saved++){
                savedDice.push(JSON.parse(JSON.stringify(newSaved[saved])));
            };
        }, 500);
    }
    buttonUpdate();
});

endButton.addEventListener("click", function(){//resets dice and changes who's turn it is
    if(shotguns < 3){
        zombiePoints[0] += brains;
    };
    hiddenDice = [redDice, yellowDice, yellowDice, yellowDice, yellowDice, greenDice, greenDice, greenDice, greenDice, greenDice, greenDice]; // possible new dice rolls
    rolledDice = rolledDice = [blank, blank, blank];
    diceFile = [".gif", ".gif", ".gif"];  
    savedDice = [];
    shotguns = 0;
    brains = 0;
    hiddenDice = [redDice, yellowDice, yellowDice, yellowDice, yellowDice, greenDice, greenDice, greenDice, greenDice, greenDice, greenDice]; // possible new dice rolls
    zombies.push(zombies[0]);
    zombies.splice(0,1);
    zombiePoints.push(zombiePoints[0]);
    zombiePoints.splice(0,1);
    firstPlayerPosition -= 1;
    if(firstPlayerPosition < 0){
        firstPlayerPosition = zombies.length-1
    }
    diceUpdate();
    textUpdate();
    zombieUpdate();
    if(Math.max(...zombiePoints) >= winningScore){
        document.getElementById("playerDisplayGame").classList = "endgame";
        if(firstPlayerPosition == 0){
            won = true;
        };
    };
    buttonUpdate();
});
zombieUpdate();
buttonUpdate();
textUpdate();