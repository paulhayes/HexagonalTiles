namespace Hexagonal {
    using UnityEngine;

	public class HexagonalTiles {
        protected const float sqrt3 = 1.7320508075688772f;  // Mathf.Sqrt(3)
        protected const float angleIncrement = 1.0471975511965976f; //Mathf.PI/3
		protected float triangleWidth;
		protected float triangleHeight;
		protected float hexagonWidth;
		protected float hexagonHeight;
		protected Vector2[] vertexPositions;
		protected float _size;
		
		public HexagonalTiles(float size) {
			_size = size;
			init();
		}
		
		protected void init(){
			float angle = 0;
			int n;
			
			vertexPositions = new Vector2[6];
			
			triangleWidth = _size;
			triangleHeight = 0.5f * sqrt3 * _size;
			
			hexagonWidth = 2 * triangleWidth;
			hexagonHeight = 2 * triangleHeight;
			
			for(n=0;n<6;n++){
				angle+=angleIncrement;
				
				vertexPositions[n] = new Vector2( 
				    triangleWidth*Mathf.Cos(angle), 
					triangleWidth*Mathf.Sin(angle)
				);
			};
		}
		
		public void resizeHexagonWidth(float size){
			_size = size / 2;
			init();
		}
	  
		public void resize(float size){
			_size = size;
	    	init();
		}
	  
		public HexagonCoord positionToHexagonCoord(float x, float y){
			// a is the horizontal triangle coordinate
			float a = Mathf.Floor( y / triangleHeight );
			float b = Mathf.Floor( ( y - sqrt3*x ) / ( 2 * triangleHeight ) );
			float c = Mathf.Floor( ( y + sqrt3*x ) / ( 2 * triangleHeight ) );
			
			//find the vertical triangle coordinate 
			float d = ( 2*c - 2*b ) / (2);
			
			//convert from triangle coord to hex coord
			int xtri3 = Mathf.FloorToInt(d/3);
            int ytri2 = Mathf.FloorToInt((a-(xtri3%2))/2);
			
			return new HexagonCoord{
				i=xtri3,
				j=ytri2
			};
	  }
	  
        public HexagonCoord[] hexagonCoordNeighboors(int i,int j){
            return new HexagonCoord[]{
                new HexagonCoord{ i=i , j=j-1 },
                new HexagonCoord{ i=i , j=j+1 },
                new HexagonCoord{ i=i-1 , j=j },
                new HexagonCoord{ i=i+1 , j=j },
                new HexagonCoord{ i=i+1 , j=j+((i%2==1)?1:-1) },
                new HexagonCoord{ i=i-1 , j=j+((i%2==1)?1:-1) }
			};
		}
	    
		public Vector2 hexagonCoordToPosition(int i,int j){
			return new Vector2( 
			  triangleWidth * ( 1.5f * i + 0.5f), 
			  triangleHeight * ( 2 * (j+0.5f*(i%2)) + 1 )
			);
		}

		public Rect hexagonCoordToBoundingBox(int i,int j){
            Rect box = new Rect( hexagonCoordToPosition(i,j), new Vector2(hexagonWidth,hexagonHeight) );
		    
		    return box;
	  }

	    
	  public Vector2[] hexagonCoordToVertices(int i,int j){
	    var m = this.hexagonCoordToPosition(i,j);
	    Vector2[] positions;
	    
	    /*
	    positions = vertexPositions.map(function(vertex){
	      return { x : vertex.x + m.x, y : vertex.y + m.y };
	    });
	    */
	    
	    //unrolled for speed and to remove map function

	    positions = new Vector2[]{
			new Vector2( vertexPositions[0].x + m.x, vertexPositions[0].y + m.y ),
			new Vector2( vertexPositions[1].x + m.x, vertexPositions[1].y + m.y ),
			new Vector2( vertexPositions[2].x + m.x, vertexPositions[2].y + m.y ),
			new Vector2( vertexPositions[3].x + m.x, vertexPositions[3].y + m.y ),
			new Vector2( vertexPositions[4].x + m.x, vertexPositions[4].y + m.y ),
			new Vector2( vertexPositions[5].x + m.x, vertexPositions[5].y + m.y )
	    };
	   
	    return positions;
	  }
	  
	  public float lineA(float x,float n){ 
	     var C = n * triangleHeight;
	     return C ;
	  }
	  
	  public float lineB(float x,float n){ 
	     var C = n * triangleHeight;
	     return sqrt3*x + 2*C; 
	  }
	  
	  public float lineC(float x,float n){
	     var C = n * triangleHeight;
	     return -sqrt3*x + 2*C; 
	  }

	}

	public struct HexagonCoord {
		public int i;
		public int j;


        public bool Equals(HexagonCoord other)
        {
            return other.i == this.i && other.j == this.j;
        }

        override public bool Equals(System.Object obj){
            if( obj is HexagonCoord ){
                return Equals((HexagonCoord)obj );
            }

            return false;
        }

        override public int GetHashCode(){
            return i+(1<<16)*j;
        }

        public static bool operator ==(HexagonCoord h1, HexagonCoord h2) 
        {
            return h1.Equals(h2);
        }

        public static bool operator !=(HexagonCoord h1, HexagonCoord h2) 
        {
           return !h1.Equals(h2);
        }
	}

}
