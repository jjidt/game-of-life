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
        targetSquare.alive === true;
      }
    }
  }
}
