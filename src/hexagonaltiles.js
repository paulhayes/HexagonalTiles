function HexagonalTiles(size){
  
  var sqrt3 = Math.sqrt(3);
  var triangleWidth = sqrt3 * 2/3;
  var triangleHeight = 1;
  
  this.positionToHexagonCoord = function(x,y){
    // a is the horizontal triangle coordinate
    var a = Math.floor( y / size );
    var b = Math.floor( ( y - sqrt3*x ) / ( 2 * size ) );
    var c = Math.floor( ( y + sqrt3*x ) / ( 2 * size ) );
   
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
      x : size * sqrt3 * i + ( size * sqrt3 * 1/3 ), 
      y : 2 * size * (j+0.5*(i%2)) + size
    };
  };
    
  this.hexagonCoordToVertices = function(i,j){
    var m = this.hexagonCoordToPosition(i,j);
    var positions = [];
    var angle=0;
    
    for(var n=0;n<6;n++){
      angle+=Math.PI/3;
      positions.push( { 
        x : m.x+size*2/3*sqrt3*Math.cos(angle), 
        y : m.y+size*2/3*sqrt3*Math.sin(angle)
      } );
    }
   
    return positions;
  };
  
  this.lineA = function(x,n){ 
     var C = n * size;
     return C ;
  };
  this.lineB = function(x,n){ 
     var C = n * size;
     return sqrt3*x + 2*C; 
  };
  this.lineC = function(x,n){
     var C = n * size;
     return -sqrt3*x + 2*C; 
  };
}
