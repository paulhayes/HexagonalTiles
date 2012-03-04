package
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	
	[SWF(width=640,height=480)]
	public class HexagonalTileExample extends Sprite
	{
		protected var tileManager : HexagonalTiles = new HexagonalTiles(100);
		protected var cols : int = 10;
		protected var rows : int = 10;
		protected var tiles : Vector.<MovieClip>=new Vector.<MovieClip>(cols*rows);
		
		public function HexagonalTileExample()
		{
			for(var i:int=0;i<cols;i++)
			{
				for(var j:int=0;j<rows;j++)
				{
					var hexagon : Array = tileManager.hexagonCoordToVertices(i,j);
					graphics.beginFill(0xff0000);
					graphics.lineStyle(1,0);
					graphics.moveTo(hexagon[0].x,hexagon[0].y);
					hexagon.forEach(function(o:Object,i:int,a:Array):void{
						graphics.lineTo(o.x,o.y);
					});
					graphics.endFill();
				}
			}
		}
		
		protected function getTileAt(i:int,j:int):void
		{
			
		}
		
		protected function setTileAt(i:int,j:int,tile:MovieClip):void
		{
		
		}
	}
}