package
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.StageScaleMode;
	
	[SWF(width=640,height=480)]
	public class HexagonalTileExample extends Sprite
	{
		protected var tileManager : HexagonalTiles = new HexagonalTiles(50);
		protected var cols : int = 10;
		protected var rows : int = 10;
		
		/**
		 * Please make sure you add ../src ( i.e actionscript/src ) as a source directory to the project
		 * 
		 */
		public function HexagonalTileExample()
		{
			stage.scaleMode = StageScaleMode.NO_BORDER;
			for(var i:int=0;i<cols;i++)
			{
				for(var j:int=0;j<rows;j++)
				{
					var hexagon : Array = tileManager.hexagonCoordToVertices(i,j);
					var box : Object = tileManager.hexagonCoordToBoundingBox(i,j);
					graphics.beginFill(0xff0000,0.5);
					graphics.lineStyle(1,0);
					graphics.moveTo(hexagon[0].x,hexagon[0].y);
					hexagon.forEach(function(o:Object,i:int,a:Array):void{
						graphics.lineTo(o.x,o.y);
					});
					graphics.endFill();
				}
			}
		}
		
	}
}