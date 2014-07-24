Square = {
  initialize: function(x,y) {
  	this.xCoordinate = x;
  	this.yCoordinate = y;
    this.alive = false;
<<<<<<< HEAD
    this.neighbors = [];
=======
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
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
<<<<<<< HEAD
    this.rows = rows;
    this.rowHalf = rowHalf;
=======
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
  	for(var i = -rowHalf; i <= rowHalf; i++) {
      for(var j = -rowHalf; j <= rowHalf; j++) {
        thisBoard.spaces.push(Square.create(i,j));
      }
    }
<<<<<<< HEAD
    for(var k = 0; k <this.spaces.length; k++) {
      this.getNeighbors(k);
    }
=======
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
  },
  create: function(rows) {
    var newBoard = Object.create(Board);
    newBoard.initialize(rows);
    return newBoard;
  },
<<<<<<< HEAD
  // checkNeighbors: function(element) {
  //   var livingNeighbors = 0;
  //   var currentSquare = this.spaces[element];
  //   this.spaces.forEach(function(square){
  //     if ((Math.abs(square.xCoordinate)- Math.abs(currentSquare.xCoordinate)) <= 1 &&
  //         (Math.abs(square.yCoordinate)- Math.abs(currentSquare.yCoordinate)) <= 1 &&
  //         square !== currentSquare &&
  //         square.alive === true) {
  //         livingNeighbors += 1;
  //       }
  //   });
  //   return livingNeighbors;
  // },

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

=======
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
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
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
<<<<<<< HEAD
  var rowNumber = 111;
=======
  var rowNumber = 67;
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
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
<<<<<<< HEAD
          $("#"+number).addClass("alive");
        }else if (gameBoard.spaces[number].alive === false) {
          $("#"+number).removeClass("alive");
=======
          console.log("alive");
          $("#"+number).css({"background-color": "pink"});
        }else if (gameBoard.spaces[number].alive === false) {
          console.log("dead");
          $("#"+number).css({"background-color": "blue"});
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
        }
  };

  var currentSpaces = gameBoard.spaces;
<<<<<<< HEAD

  for (var i = 0; i < currentSpaces.length; i++) {
        if (Math.random() > 0.9) {
=======
  
  for (var i = 0; i < currentSpaces.length; i++) {
        if (Math.random() > 0.9) {
          console.log(i);
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
          currentSpaces[i].alive = true;
        } else {
          currentSpaces[i].alive = false;
        }
        updateBlocks(i);
  }

<<<<<<< HEAD
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
=======

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
>>>>>>> cbeee34a156ebfebfcd420fcc6089dbddb423752
