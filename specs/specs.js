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
    it("creates an array of squares when it is initialized with a row length parameter", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize(7);
      testBoard.spaces.length.should.equal(49);
    });
    it("sets the coordinates of each square", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize(7);
      testBoard.spaces[1].xCoordinate.should.equal(-3);
    });
  });
  describe("create", function() {
    it("creates a new Board object", function() {
      var testBoard = Board.create();
      Board.isPrototypeOf(testBoard).should.equal(true);
    });
  });
  describe("checkNeighbors", function() {
    it("checks neighboring squares to determine how many of them are living", function() {
      var testBoard = Board.create(7);
      testBoard.spaces[18].alive = true;
      testBoard.checkNeighbors(25).should.equal(1);
    });
    it("checks neighboring squares on wrap around to determine how many of them are living", function() {
      var testBoard = Board.create(7);
      testBoard.spaces[0].alive = true;
      testBoard.spaces[6].alive = true;
      testBoard.checkNeighbors(48).should.equal(2);
    });
  });
  describe("fate", function() {
    it("keeps a living square with 2 living neighbors alive in the next round", function(){
      var testBoard = Board.create(7);
      testBoard.spaces[17].alive = true;
      testBoard.spaces[18].alive = true;
      testBoard.spaces[24].alive = true;
      testBoard.fate(24);
      testBoard.spaces[24].alive.should.equal(true);
    });
    it("keeps a living square with 3 living neighbors alive in the next round", function(){
      var testBoard = Board.create(7);
      testBoard.spaces[17].alive = true;
      testBoard.spaces[18].alive = true;
      testBoard.spaces[25].alive = true;
      testBoard.spaces[24].alive = true;
      testBoard.fate(24);
      testBoard.spaces[24].alive.should.equal(true);
    });

    it("kills a living square with more than 3 living neighbors", function(){
      var testBoard = Board.create(7);
      testBoard.spaces[17].alive = true;
      testBoard.spaces[18].alive = true;
      testBoard.spaces[25].alive = true;
      testBoard.spaces[32].alive = true;
      testBoard.spaces[24].alive = true;
      testBoard.fate(24);
      testBoard.spaces[24].alive.should.equal(false);
    });

    it("revives a dead square with exactly 3 living neighbors", function(){
      var testBoard = Board.create(7);
      testBoard.spaces[17].alive = true;
      testBoard.spaces[18].alive = true;
      testBoard.spaces[25].alive = true;
      testBoard.spaces[24].alive = false;
      testBoard.fate(24);
      testBoard.spaces[24].alive.should.equal(true);
    });

    it("keeps a square dead if it doesn't have 3 living neighbors", function(){
      var testBoard = Board.create(7);
      testBoard.spaces[17].alive = true;
      testBoard.spaces[18].alive = true;
      testBoard.spaces[25].alive = true;
      testBoard.spaces[23].alive = true;
      testBoard.spaces[24].alive = false;
      testBoard.fate(24);
      testBoard.spaces[24].alive.should.equal(false);
    });
  });
});
