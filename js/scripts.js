Square = {
  initialize: function(x,y) {
  	this.xCoordinate = x;
  	this.yCoordinate = y;
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
  }
}
