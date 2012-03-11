package
{

	public class HexagonalTiles {
		protected var sqrt3 : Number = Math.sqrt(3);
		protected var triangleWidth : Number;
		protected var triangleHeight : Number;
		protected var hexagonWidth : Number;
		protected var hexagonHeight : Number;
		protected var angleIncrement : Number = Math.PI/3;
		protected var vertexPositions : Array;
		protected var _size : Number;
		
		function HexagonalTiles(size:Number){
			_size = size;
			init();
		}
		
		protected function init():void{
			var angle : Number = 0;
			var n : int;
			
			vertexPositions = [];
			
			triangleWidth = _size;
			triangleHeight = 0.5 * sqrt3 * _size;
			
			hexagonWidth = 2 * triangleWidth;
			hexagonHeight = 2 * triangleHeight;
			
			for(n=0;n<6;n++){
				angle+=angleIncrement;
				
				vertexPositions.push( { 
					'x' : triangleWidth*Math.cos(angle), 
					'y' : triangleWidth*Math.sin(angle)
				});
			};
		};
		
		public function resizeHexagonWidth(size:Number):void{
			_size = size / 2;
			init();
		};
	  
		public function resize(size : Number):void{
			_size = size;
	    	init();
		};
	  
		public function positionToHexagonCoord(x:Number,y:Number):Object{
			// a is the horizontal triangle coordinate
			var a : Number = Math.floor( y / triangleHeight );
			var b : Number = Math.floor( ( y - sqrt3*x ) / ( 2 * triangleHeight ) );
			var c : Number = Math.floor( ( y + sqrt3*x ) / ( 2 * triangleHeight ) );
			
			//find the horizontal triangle coordinate 
			var d : Number = ( 2*c - 2*b ) / (2);
			
			//convert from triangle coord to hex coord
			var xtri3 : Number = Math.floor(d/3);
			var ytri2 : Number = Math.floor((a-(xtri3%2))/2);
			
			return {
				'i' : xtri3,
				'j' : ytri2,
				'a' : a,
				'b' : b,
				'c' : c
			};
	  };
	  
		public function hexagonCoordNeighboors(i:int,j:int):Array{
			return [
			  { 'i' : i , 'j' : j-1 },
			  { 'i' : i , 'j' : j+1 },
			  { 'i' : i-1 , 'j' : j },
			  { 'i' : i+1 , 'j' : j },
			  { 'i' : i+1 , 'j' : j+(i%2?1:-1) },
			  { 'i' : i-1 , 'j' : j+(i%2?1:-1) }
			];
		}
	    
		public function hexagonCoordToPosition(i:int,j:int):Object{
			return { 
			  'x' : triangleWidth * ( 1.5 * i + 0.5), 
			  'y' : triangleHeight * ( 2 * (j+0.5*(i%2)) + 1 )
			};
		}
	
		public function hexagonCoordToBoundingBox(i:int,j:int):Object{
			var hh : Number = hexagonHeight * 0.5;
			var hw : Number = hexagonWidth * 0.5;
			var box : Object = hexagonCoordToPosition(i,j);
		    
		    box.top = box.y - hh;
			box.left = box.x - hw;
		    box.bottom = box.y + hh;
		    box.right = box.x + hw;
		    box.width = hexagonWidth;
		    box.height = hexagonHeight;
		    
		    return box;
	  }
	
	    
	  public function hexagonCoordToVertices(i:int,j:int):Array{
	    var m : Object = this.hexagonCoordToPosition(i,j);
	    var positions : Array;
	    
	    /*
	    positions = vertexPositions.map(function(vertex){
	      return { x : vertex.x + m.x, y : vertex.y + m.y };
	    });
	    */
	    
	    //unrolled for speed and to remove map function
	    positions = [
			{ 'x' : vertexPositions[0].x + m.x, 'y' : vertexPositions[0].y + m.y },
			{ 'x' : vertexPositions[1].x + m.x, 'y' : vertexPositions[1].y + m.y },
			{ 'x' : vertexPositions[2].x + m.x, 'y' : vertexPositions[2].y + m.y },
			{ 'x' : vertexPositions[3].x + m.x, 'y' : vertexPositions[3].y + m.y },
			{ 'x' : vertexPositions[4].x + m.x, 'y' : vertexPositions[4].y + m.y },
			{ 'x' : vertexPositions[5].x + m.x, 'y' : vertexPositions[5].y + m.y }
	    ];
	   
	    return positions;
	  }
	  
	  public function lineA(x:Number,n:int):Number{ 
	     var C : Number = n * triangleHeight;
	     return C ;
	  }
	  
	  public function lineB(x:Number,n:int):Number{ 
	     var C : Number = n * triangleHeight;
	     return sqrt3*x + 2*C; 
	  }
	  
	  public function lineC(x:Number,n:int):Number{
	     var C : Number = n * triangleHeight;
	     return -sqrt3*x + 2*C; 
	  }
	
	}
	
}