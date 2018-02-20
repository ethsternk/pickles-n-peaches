let currentPlayer = "X";
let nextPlayer = "O";

let playerXSelections = new Array();
let playerOSelections = new Array();

let cells = document.getElementsByClassName("open");
const allCells = document.querySelectorAll("td");

let XWins = 0;
let OWins = 0;
let draws = 0;

const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

function checkWinner(player) {
    for (let i = 0; i < winningCombinations.length; i++) {
        matches = 0;
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if (player.includes(winningCombinations[i][j])) {
                matches++;
            } else {
                break;
            }
        }
        if (matches >= 3) {
            return true;
        }
    }
}

function checkDraw() {
    return playerOSelections.length + playerXSelections.length >= 9;
}

function resetGame() {
    playerXSelections = new Array();
    playerOSelections = new Array();
    for (var i = 0; i < allCells.length; i++) {
        allCells[i].innerHTML = "";
        allCells[i].className = "open";
    }
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener('click', handleClick)
    }
}

handleClick = function (event) {
    var cell = event.target;
    cells = document.getElementsByClassName("open");
    cell.removeEventListener('click', handleClick);

    if (currentPlayer === "X") {
        cell.innerHTML = "<img src='pickle.png'>";
        cell.className = "X";
        playerSelections = playerXSelections;
        nextPlayer = "O";
        document.getElementById("prompt").innerHTML = "<span style='color:orange'>Peach</span>'s turn";
    } else {
        cell.innerHTML = "<img src='peach.png'>";
        cell.className = "O";
        playerSelections = playerOSelections;
        nextPlayer = "X";
        document.getElementById("prompt").innerHTML = "<span style='color:green'>Pickle</span>'s turn";
    }

    playerSelections.push(parseInt(cell.id));

    if (checkWinner(playerSelections)) {
        if (currentPlayer === "X") {
            alert("Nice pickle skills!")
            XWins++;
            document.getElementById("XWins").innerHTML = XWins;
        } else {
            alert("Put that peach on a pedestal!")
            OWins++;
            document.getElementById("OWins").innerHTML = OWins;
        }
        resetGame();
    }
    if (checkDraw()) {
        alert("Quit poking around.");
        draws++;
        document.getElementById("draws").innerHTML = draws;
        resetGame();
    }

    currentPlayer = nextPlayer;
}

for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener('click', handleClick)
}