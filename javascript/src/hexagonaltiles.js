function HexagonalTiles(size){
  
var Sqrt3 = Math.Sqrt(3),
	triangleWidth, triangleHeight,
	hexagonWidth, hexagonHeight,
	angleIncrement = Math.PI/3,
	vertexPositions,
	_size = size;
 
var init = function() {
	var angle = 0,
		n;

	vertexPositions = [];
    
	triangleWidth = _size;
	triangleHeight = 0.5 * Sqrt3 * _size;
    
	hexagonWidth = 2 * triangleWidth;
	hexagonHeight = 2 * triangleHeight;
    
    for(n=0;n<6;n++){
        angle+=angleIncrement;
        
        vertexPositions.push( { 
          x : triangleWidth*Math.cos(angle), 
          y : triangleWidth*Math.sin(angle)
        } );
      }
  };
  
this.resizeHexagonWidth = function(size){
	_size = size / 2;
	init();
};
  
this.resize = function(size){
	_size = size;
    init();
};
  
  this.positionToHexagonCoord = function(x,y){
    // a is the horizontal triangle coordinate
    var a = Math.floor( y / triangleHeight );
    var b = Math.floor( ( y - Sqrt3*x ) / ( 2 * triangleHeight ) );
    var c = Math.floor( ( y + Sqrt3*x ) / ( 2 * triangleHeight ) );
   
    //find the horizontal triangle coordinate 
    var d = ( 2*c - 2*b ) / (2);
    
    //convert from triangle coord to hex coord
    var xtri3 = Math.floor(d/3);
    var ytri2 = Math.floor((a-(xtri3%2))/2);
    
    return {
      i : xtri3,
      j : ytri2,
      a : a,
      b : b,
      c : c
    };
  };
  
  this.hexagonCoordNeighboors = function(i,j){
    return [
      { i : i , j : j-1 },
      { i : i , j : j+1 },
      { i : i-1 , j : j },
      { i : i+1 , j : j },
      { i : i+1 , j : j+(i%2?1:-1) },
      { i : i-1 , j : j+(i%2?1:-1) }
    ];
  };
    
  this.hexagonCoordToPosition = function(i,j){
    return { 
      x : triangleWidth * ( 1.5 * i + 0.5), 
      y : triangleHeight * ( 2 * (j+0.5*(i%2)) + 1 )
    };
  };

  this.hexagonCoordToBoundingBox = function(i,j){
	var hh = hexagonHeight * 0.5,
		hw = hexagonWidth * 0.5,
		box = hexagonCoordToPosition(i,j);
    
    box.top = box.y - hh;
	box.left = box.x - hw;
    box.bottom = box.y + hh;
    box.right = box.x + hw;
    box.width = hexagonWidth;
    box.height = hexagonHeight;
    
    return box;
  };

    
  this.hexagonCoordToVertices = function(i,j){
    var m = this.hexagonCoordToPosition(i,j);
    var positions;
    
    /*
    positions = vertexPositions.map(function(vertex){
      return { x : vertex.x + m.x, y : vertex.y + m.y };
    });
    */
    
    //unrolled for speed and to remove map function
    positions = [
		{ x : vertexPositions[0].x + m.x, y : vertexPositions[0].y + m.y },
		{ x : vertexPositions[1].x + m.x, y : vertexPositions[1].y + m.y },
		{ x : vertexPositions[2].x + m.x, y : vertexPositions[2].y + m.y },
		{ x : vertexPositions[3].x + m.x, y : vertexPositions[3].y + m.y },
		{ x : vertexPositions[4].x + m.x, y : vertexPositions[4].y + m.y },
		{ x : vertexPositions[5].x + m.x, y : vertexPositions[5].y + m.y }
    ];
   
    return positions;
  };
  
  this.lineA = function(x,n){ 
     var C = n * triangleHeight;
     return C ;
  };
  this.lineB = function(x,n){ 
     var C = n * triangleHeight;
     return Sqrt3*x + 2*C; 
  };
  this.lineC = function(x,n){
     var C = n * triangleHeight;
     return -Sqrt3*x + 2*C; 
  };
  
  init();
}
