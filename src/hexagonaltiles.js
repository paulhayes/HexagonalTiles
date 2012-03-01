function HexagonalTiles(size){
  
  var sqrt3 = Math.sqrt(3);
  var triangleWidth = Math.sqrt(4/3);
  var triangleHeight = 1;
  var angleIncrement = Math.PI/3;
  var vertexPositions;
  var _size = size;
 
  var init = function() {
    vertexPositions = [];
    var angle = 0;
    for(var n=0;n<6;n++){
        angle+=angleIncrement;
        
        vertexPositions.push( { 
          x : _size*triangleWidth*Math.cos(angle), 
          y : _size*triangleWidth*Math.sin(angle)
        } );
      }
  };
      
  this.resize = function(size){
    _size = size;
    init();
  }
  
  this.positionToHexagonCoord = function(x,y){
    // a is the horizontal triangle coordinate
    var a = Math.floor( y / _size );
    var b = Math.floor( ( y - sqrt3*x ) / ( 2 * _size ) );
    var c = Math.floor( ( y + sqrt3*x ) / ( 2 * _size ) );
   
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
      x : _size * sqrt3 * i + ( _size * 0.5 * triangleWidth ), 
      y : 2 * _size * (j+0.5*(i%2)) + _size
    };
  };
    
  this.hexagonCoordToVertices = function(i,j){
    var m = this.hexagonCoordToPosition(i,j);
    var positions = [];
    var angle=0;
    
    positions = vertexPositions.map(function(vertex){
      return { x : vertex.x + m.x, y : vertex.y + m.y };
    });
   
    return positions;
  };
  
  this.lineA = function(x,n){ 
     var C = n * _size;
     return C ;
  };
  this.lineB = function(x,n){ 
     var C = n * _size;
     return sqrt3*x + 2*C; 
  };
  this.lineC = function(x,n){
     var C = n * _size;
     return -sqrt3*x + 2*C; 
  };
  
  init();
}