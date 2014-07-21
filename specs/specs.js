describe("Square", function(){
  describe("initialize", function() {
  	it("assigns the correct coordinate", function() {
  	  var testSquare = Object.create(Square);
  	  testSquare.initialize(0,1);
  	  testSquare.xCoordinate.should.equal(0);
  	  testSquare.yCoordinate.should.equal(1); 
  	});
  });
  describe("create", function() {
  	it("creates a new Square object", function() {
  	  var testSquare = Square.create(0,0);
  	  Square.isPrototypeOf(testSquare).should.equal(true);
  	});
  });
});

describe("Board", function() {
  describe("initialize", function(){
    it("creates an array of 49 squares when it is initialized", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      testBoard.spaces.length.should.equal(49);
    });
    it("sets the coordinates of each square", function() {
      var testBoard = Object.create(Board);
      testBoard.spaces[1].xCoordinate.should.equal(-3);
    });
  });
  describe("create", function() {
    it("creates a new Board object", function() {
      var testBoard = Board.create();
      Board.isPrototypeOf(testBoard).should.equal(true);
    });
  });
});