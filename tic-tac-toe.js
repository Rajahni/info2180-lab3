"use strict";
var XPlay = [];
var OPlay = [];
var winPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Function creates the 3x3 board layout for the game.

function layout() {
    var board = document.getElementById("board").children;
    console.log(board.length);

    for (var i=0; i <= board.length - 1; i++) {
        board[i].className = "square";
    }
}

// Adds the "X" or "O" values on click, based on the player turn

function addXO() {
    var move = 1;
    var board = document.getElementById("board").children;
    
    for (const square of board) {
        square.addEventListener("click", function() {
            if (move == 1) {
                square.innerHTML = "X";
                square.classList.add("X");
                square.style.pointerEvents = "none";
                XPlay.push("X");
                move-=1;
                isWinner();

            }
            else{
                square.innerHTML = "O";
                square.classList.add("O");
                square.style.pointerEvents = "none";
                OPlay.push("O");
                move+=1;
                isWinner();
            }
        })
    }

}

// Highlights square that the mouse hovers over

function hoverSquare() {
    var board = document.getElementById("board").children;
    for (const square of board) {
        
        square.addEventListener("mouseover", function(){
            square.classList.add("hover");

        square.addEventListener("mouseout", function(){
            square.classList.remove("hover");
        })
        })
    }
}

// Function to check the winner of the game.

function isWinner() {
    var board = document.getElementById("board").children;

    console.log(XPlay);
    console.log(OPlay);
    for (var choice=0; choice<winPos.length; choice++){
        // "c?" represents choices

        var c0 = board[winPos[choice][0]].textContent;
        var c1 = board[winPos[choice][1]].textContent;
        var c2 = board[winPos[choice][2]].textContent;

        if (c0 == '' || c1 == '' || c2 == ''){
            continue;
        }
        // if values in three matching squares line up. ie. All X's, All O's
        if (c0 == c1 && c1 == c2) {
            if (c0 == "X"){
                var status = document.getElementById("status");
                status.classList.add("you-won");
                status.textContent="Congratulations! X is the Winner!";
                for (const square of board) {
                    square.style.pointerEvents = "none";
                }

                break;
            }
            if (c0=="O"){
                var status = document.getElementById("status");
                status.classList.add("you-won");
                status.textContent="Congratulations! O is the Winner!";
                for (const square of board) {
                    square.style.pointerEvents = "none";
                }

                break;
            }
        }

        // if there are no matching sets and all plays have been exhasted
        else if(XPlay.length + OPlay.length == 9){
            var status = document.getElementById("status");
            status.classList.add("you-won");
            status.textContent="No Winner, There is a Tie. Play Again?";
            for (const square of board) {
                square.style.pointerEvents = "none";
            }
            
            break;
        } 
    }
}

// Restart the game

function newGame(){
    function refresh(){
        XPlay = [];
        OPlay = [];
        var board = document.getElementById("board").children;

        
        for (const square of board){
            square.classList.remove("X");
            square.classList.remove("O");
            square.textContent = "";
            square.style.pointerEvents = "auto";

            document.getElementById("status").classList.remove("you-won");
            document.getElementById("status").textContent = "Move your mouse over a square and click to play an X or an O.";
            
        }
    }
    var newGameBtn = document.querySelector("button");
    newGameBtn.addEventListener("click", refresh);
}

window.onload = function(){
    layout();
    addXO();
    hoverSquare();
    newGame();
    isWinner();
}