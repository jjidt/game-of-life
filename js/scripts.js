Square = {
  initialize: function(x,y) {
  	this.xCoordinate = x;
  	this.yCoordinate = y;
    this.alive = false;
  },
  create: function(x,y) {
  	var newSquare = Object.create(Square);
  	newSquare.initialize(x,y);
  	return newSquare;
  }
};

Board = {
  initialize: function(rows) {
  	this.spaces = [];
    var thisBoard = this;
    var rowHalf = (rows-1)/2;
  	for(var i = -rowHalf; i <= rowHalf; i++) {
      for(var j = -rowHalf; j <= rowHalf; j++) {
        thisBoard.spaces.push(Square.create(i,j));
      }
    }
  },
  create: function(rows) {
    var newBoard = Object.create(Board);
    newBoard.initialize(rows);
    return newBoard;
  },
  checkNeighbors: function(element) {
    var livingNeighbors = 0;
    var currentSquare = this.spaces[element];
    this.spaces.forEach(function(square){
      if ((Math.abs(square.xCoordinate)- Math.abs(currentSquare.xCoordinate)) <= 1 &&
          (Math.abs(square.yCoordinate)- Math.abs(currentSquare.yCoordinate)) <= 1 &&
          square !== currentSquare &&
          square.alive === true) {
          livingNeighbors += 1;
        }
    });
    return livingNeighbors;
  },
  fate: function(element) {
    var targetSquare = this.spaces[element];
    var seeds = this.checkNeighbors(element);
    if (targetSquare.alive === true) {
      if (seeds === 2 || seeds === 3) {
        targetSquare.nextRound = true;
      } else {
        targetSquare.nextRound = false;
      }
    }
    if (targetSquare.alive === false) {
      if (seeds === 3) {
        targetSquare.nextRound = true;
      } else {
        targetSquare.nextRound = false;
      }
    }
  },
  advanceRound: function() {
    var workingGame = this.spaces;
    for (var k = 0; k < workingGame.length; k++) {
      workingGame[k].alive = workingGame[k].nextRound;
    }
  }
};

$(document).ready(function(){
  var rowNumber = 67;
  var gameBoard = Board.create(rowNumber);
  var createCounter = 0;

  var createTable = function(rowNumber) {
    for (var i = 0; i < rowNumber; i++) {
      $("table").append("<tr>");
      for (var j = 0; j < rowNumber; j++) {
        $("tr").last().append("<td id=" + createCounter + ">");
        createCounter += 1;
      }
    }
  }

  createTable(rowNumber);

  var updateBlocks = function(number) {
        if (gameBoard.spaces[number].alive === true) {
          console.log("alive");
          $("#"+number).css({"background-color": "pink"});
        }else if (gameBoard.spaces[number].alive === false) {
          console.log("dead");
          $("#"+number).css({"background-color": "blue"});
        }
  };

  var currentSpaces = gameBoard.spaces;
  
  for (var i = 0; i < currentSpaces.length; i++) {
        if (Math.random() > 0.9) {
          console.log(i);
          currentSpaces[i].alive = true;
        } else {
          currentSpaces[i].alive = false;
        }
        updateBlocks(i);
  }


  $("#make-it-so").click(function () {
    for (var j = 0; j < gameBoard.spaces.length; j++) {
      gameBoard.fate(j);
    }
    gameBoard.advanceRound();
    for (var m = 0; m < gameBoard.spaces.length; m++) {
      updateBlocks(m);
    }
  });
});