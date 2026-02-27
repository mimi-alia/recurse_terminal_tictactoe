//Score array holds location of input placement
let score = [];

for (let i = 0; i <= 8; i++){
  score.push(" ");
}

//Valid character options for players
const valid = ["x","X","o","O"];

//Object holding player character selection
let players = {};

let currentTurn;

//Winning patterns (First attempt, ditched b/c didn't account for other placements on board that were not valid winning patterns)
// const winningPatterns = [["x","x","x"," "," "," "," "," "," "], [" "," "," ","x","x","x"," "," "," "], [" "," "," "," "," "," ","x","x","x"], ["x"," "," ","x"," "," ","x"," "," "], [" ","x"," "," ","x"," "," ","x"," "], [" "," ","x"," "," ","x"," "," ","x"], ["x"," "," "," ","x"," "," "," ","x"], [" "," ","x"," ","x"," ","x"," "," "], ["o","o","o"," "," "," "," "," "," "], [" "," "," ","o","o","o"," "," "," "], [" "," "," "," "," "," ","o","o","o"], ["o"," "," ","o"," "," ","o"," "," "], [" ","o"," "," ","o"," "," ","o"," "], [" "," ","o"," "," ","o"," "," ","o"], ["o"," "," "," ","o"," "," "," ","o"], [" "," ","o"," ","o"," ","o"," "," "]];

//Arr of index combos that would result in a win for tic tac toe
const winningIndexes = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0, 4, 8], [2,4,6]];


//Function that checks input validity
function checkInputValidity(input){
  if (!valid.includes(input)){
    return false;
  } else {
    return true;
  }
}


// Function that takes an x or o and places it at the index (subtracted from one to accommodate 0 indexing, which isn't typically user friendly)
function placeValue(value, index){
  if(checkInputValidity(value)){
    if(score[index - 1] === " "){
      value = value.toLowerCase();
      index = index - 1;
      score.splice(index, 1, value);
    } else if (index < 1){
      alert("... that's... not a valid .... spot??? try again.")
    } else {
      alert("Spot already occupied... try again ?")
    }
  } else {
   alert("hey! that's not a valid input for tic tac toeeee, use exes and ohs >.<")
  }
}

function squash(arr){
  arr.join("");
}

function clearBoard(){
  score = score.map(x => x = " ")
}

//Check if score pattern matches any winning patterns
// function assessWin(scoreArr, patternArr){
//   let scoreStr = scoreArr.join("");
//   patternArr = patternArr.map(pattern => pattern.join(""));

//   if (patternArr.includes(scoreStr)) {
//     clearBoard();
//     alert("Congrats, the game is won!!")
//   } else{
//     alert("No win, get wrecked.")
//   }

// }
  

// assessWin(score, winningPatterns);

//Check if score pattern matches winning index patterns

function assessWin(scoreArr, winningIndexArrs){
  let exes = "";
  let ohs = "";

  winningIndexArrs = winningIndexArrs.map(index => index.join(""));

  for (let value in scoreArr){
    if (scoreArr[value] === "x"){
      exes += value
    } else if (scoreArr[value] === "o") {
      ohs += value
    }
  }

  if(winningIndexArrs.includes(exes)){
    clearBoard();
    alert("Congrats, exes won! Game reset.");
  } else if (winningIndexArrs.includes(ohs)){
    clearBoard();
    alert("Congrats, ohs win! Game reset.");
  } else {
    return false;
  }
}


assessWin(score, winningIndexes)


//Function that selects players

function choosePlayer(){
  let options = ["x","o"];
  if(Object.keys(players).length !== 0){
    alert("Players already chosen !")
  }

  players.player1 = prompt("First player x or o ?").toLowerCase()
  options = options.filter(option => option !== players.player1)
  players.player2 = options[0]
}


//Function that handles turns between players
function takeTurn(){
  if (!currentTurn) {
    currentTurn = players.player1
  } else {
    let playerOptions = ["x","o"];
    let nextPlayer = playerOptions.filter(option => option != currentTurn).toString();
    currentTurn = nextPlayer;
  }
}


function playGame(){

  if(Object.keys(players).length !== 0){
    takeTurn();
  } else {
    alert("no player chosen")
  }

  if (assessWin(score, winningIndexes) === false){
    placeValue(currentTurn, prompt("Choose a spot on the board!"));
    //here is where the infinite loop starts
  } else {
    assessWin(score, winningIndexes);
  }
}

choosePlayer();
playGame();


//why does this create an infinite loop if embedded inside of the second conditional  of playGame (marked in code as here) but only triggers twice here???
// if (assessWin(score,winningIndexes) === false){
//   playGame();
// }