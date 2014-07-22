Square = {
  initialize: function(x,y) {
  	this.xCoordinate = x;
  	this.yCoordinate = y;
    this.alive = false;
    this.nextRound = true;
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
    var workingGame = this;
    for (var i = 0; i < this.spaces.length; i++) {
      workingGame.spaces[i].alive = workingGame.spaces[i].nextRound;
    }
  }
};

$(document).ready(function(){
  var rowNumber = 21;
  var gameBoard = Board.create(rowNumber);
  var createCounter = 0;

  for (var i = 0; i < rowNumber; i++) {
    $("table").append("<tr>");
    for (var j = 0; j < rowNumber; j++) {
      $("tr").last().append("<td id=" + createCounter + ">");
      createCounter += 1;
    }
  }

  $("td").click(function(){
    var tileNumber = parseInt($(this).attr("id"));
    $(this).addClass("alive");
    gameBoard.spaces[tileNumber].alive = true;
    console.log(gameBoard.spaces[tileNumber]);
  });

  var updateBlocks = function(i) {
        if (gameBoard.spaces[i].alive === true) {
          $("#"+i).addClass("alive");
        }else if (gameBoard.spaces[i].alive === false) {
          $("#"+i).removeClass("alive");
        }
  };

  $("#make-it-so").on("click", function(){
      for(var i = 0; i < gameBoard.spaces.length; i++) {
        console.log(gameBoard.spaces[i]);
        gameBoard.fate(i);
        gameBoard.advanceRound();
        updateBlocks(i);
        console.log (".")
      }
  });

  $("#randomize").on("click", function(){
    for(var i = 0; i < gameBoard.spaces.length; i++) {
        if (Math.random() > .5) {
          gameBoard.spaces[i].alive = true;
        }
        updateBlocks(i);
    };
  });
});
