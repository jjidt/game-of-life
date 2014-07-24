Square = {
  initialize: function(x,y) {
  	this.xCoordinate = x;
  	this.yCoordinate = y;
    this.alive = false;
    this.neighbors = [];
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
    this.rows = rows;
    this.rowHalf = rowHalf;
  	for(var i = -rowHalf; i <= rowHalf; i++) {
      for(var j = -rowHalf; j <= rowHalf; j++) {
        thisBoard.spaces.push(Square.create(i,j));
      }
    }
    for(var k = 0; k <this.spaces.length; k++) {
      this.getNeighbors(k);
    }
  },

  create: function(rows) {
    var newBoard = Object.create(Board);
    newBoard.initialize(rows);
    return newBoard;
  },

  getNeighbors: function(square) {
    var currentSpace = this.spaces[square];
    var currentX = currentSpace.xCoordinate;
    var currentY = currentSpace.yCoordinate;
    var currentXAbs = Math.abs(currentX);
    var currentYAbs = Math.abs(currentY);
    var currentIndex = square;
    var targetX;
    var targetY;
    var targetIndex;
    var counter;

    for(var i = 0; i < this.spaces.length; i++) {
      var targetSpace = this.spaces[i];
      targetX = targetSpace.xCoordinate;
      targetY = targetSpace.yCoordinate;
      var targetXAbs = Math.abs(targetX);
      var targetYAbs = Math.abs(targetY);
      targetIndex = i;

      if(currentSpace != targetSpace) {
        //currentSpace is a corner square
        if(currentXAbs === this.rowHalf && currentYAbs === this.rowHalf) {
          //targetSpace is also a corner square
          if(currentXAbs === targetXAbs && currentYAbs === targetYAbs) {
            currentSpace.neighbors.push(targetSpace);
          }     //inner angles
          else if((currentX +1 === targetX && currentY +1 === targetY) ||
             (currentX -1 === targetX && currentY -1 === targetY) ||
             (currentX -1 === targetX && currentY +1 === targetY) ||
             (currentX +1 === targetX && currentY -1 === targetY)
            ) {
            currentSpace.neighbors.push(targetSpace);
          }     //horizontal matches
          else if((currentX === targetX ||
                  currentX === -targetX) &&
                 (currentY +1 === targetY ||
                  currentY -1 === targetY)) {
            currentSpace.neighbors.push(targetSpace);
          }     //vertical matches
          else if((currentY === targetY ||
                  currentY === -targetY) &&
                 (currentX +1 === targetX ||
                  currentX -1 === targetX)) {
            currentSpace.neighbors.push(targetSpace);
          }//currentSpace is a top or bottom-row edge piece
        } else if(currentXAbs === this.rowHalf) {
                //horizontal matches
          if(currentX === targetX && (currentY+1 === targetY || currentY-1 ===targetY)) {
            currentSpace.neighbors.push(targetSpace);
          }     //vertical matches
          else if(currentY === targetY && (currentX+1 === targetX || currentX-1 ===targetX || -currentX ===targetX)) {
            currentSpace.neighbors.push(targetSpace);
          }     //diagonal matches
          else if((currentX +1 === targetX && currentY +1 === targetY) ||
             (currentX -1 === targetX && currentY -1 === targetY) ||
             (currentX -1 === targetX && currentY +1 === targetY) ||
             (currentX +1 === targetX && currentY -1 === targetY)
             ){
            currentSpace.neighbors.push(targetSpace);
          }     //wrap diagonals
          else if((-currentX === targetX) &&
                  (currentY+1 === targetY ||
                   currentY-1 === targetY)) {
            currentSpace.neighbors.push(targetSpace);
          }//currentSpace is a left or right side edge piece
        } else if(currentYAbs === this.rowHalf) {
                //horizontal matches
          if(currentY === targetY && (currentX+1 === targetX || currentX-1 ===targetX)) {
            currentSpace.neighbors.push(targetSpace);
          }     //vertical matches
          else if(currentX === targetX && (currentY+1 === targetY || currentY-1 ===targetY || -currentY ===targetY)) {
            currentSpace.neighbors.push(targetSpace);
          }     //diagonal matches
          else if((currentY +1 === targetY && currentX +1 === targetX) ||
             (currentX -1 === targetY && currentX -1 === targetX) ||
             (currentX -1 === targetY && currentY +1 === targetX) ||
             (currentX +1 === targetY && currentY -1 === targetX)
             ){
            currentSpace.neighbors.push(targetSpace);
          }     //wrap diagonals
          else if((-currentY === targetY) &&
                  (currentX+1 === targetX ||
                   currentX-1 === targetX)) {
            currentSpace.neighbors.push(targetSpace);
          }

        } else
        { //space is landlocked
          if(currentX -1 === targetX) {
            if(currentY -1 === targetY ||
               currentY === targetY ||
               currentY +1 === targetY) {
              currentSpace.neighbors.push(targetSpace);
            }
          } else if(currentX +1 === targetX) {
            if(currentY -1 === targetY ||
               currentY === targetY ||
               currentY +1 === targetY) {
              currentSpace.neighbors.push(targetSpace);
            }
          } else if(currentX === targetX) {
            if(currentY -1 === targetY ||
               currentY +1 === targetY) {
              currentSpace.neighbors.push(targetSpace);
            }
          }
        }
      }
    }
  },

  checkNeighbors: function(spaceIndex) {
    var seedCount = 0;
    this.spaces[spaceIndex].neighbors.forEach(function(i){
      if(i.alive) {
        seedCount += 1.;
      }
    });
    return seedCount;
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
  var rowNumber = 111;
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
          $("#"+number).addClass("alive");
        }else if (gameBoard.spaces[number].alive === false) {
          $("#"+number).removeClass("alive");
        }
  };

  var currentSpaces = gameBoard.spaces;

  for (var i = 0; i < currentSpaces.length; i++) {
        if (Math.random() > 0.9) {
          currentSpaces[i].alive = true;
        } else {
          currentSpaces[i].alive = false;
        }
        updateBlocks(i);
  }

  var makeItSo = function(){
     for (var j = 0; j < gameBoard.spaces.length; j++) {
        gameBoard.fate(j);
      }
      gameBoard.advanceRound();
      for (var m = 0; m < gameBoard.spaces.length; m++) {
        updateBlocks(m);
      }
  };

  var interval = function() {
    setInterval(function(){makeItSo()}, 0);
  };

  $("#make-it-so").click(function() {
    interval();
  });
});
