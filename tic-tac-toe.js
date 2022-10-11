window.onload = function() {
    var board = document.getElementById("board").children;
    console.log(board.length);

    for (i=0; i <= board.length - 1; i++) {
        board[i].className = "square";
    }
}