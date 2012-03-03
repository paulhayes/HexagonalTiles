import HexagonalTiles;

var buttonPrefab : GameObject;
var plane : GameObject;
var rollOverColor : Color;
var rollOutColor : Color;
var size : Number = 1.7;
var cols : int = 10;
var rows : int = 10;

protected var tileManager: HexagonalTiles;
protected var tiles:GameObject[,] = new GameObject[cols,rows];
protected var lastSelected : GameObject;
protected var selecting : boolean = false;

function Start(){
	tileManager = new HexagonalTiles(size);
	
	for(var i:int=0;i<cols;i++){
		for(var j:int=0;j<rows;j++){
			var pos:Object=tileManager.hexagonCoordToPosition(i,j);
			var go : GameObject = Instantiate( buttonPrefab, Vector3.up,  Quaternion.Euler(270, 0, 0) );
			go.transform.parent = this.transform;
			go.GetComponent(EaseToPosition).position = new Vector3(pos['x'],0,pos['y']);
			go.GetComponent(EaseToPosition).color = rollOutColor;
			go.GetComponent(EaseToPosition).jump();
			tiles[i,j] = go;
		}
	}
}

function Update () {
	

	var hit : RaycastHit;
	var mousePos : Vector3;
    var mouseRay : Ray = Camera.mainCamera.ScreenPointToRay( Input.mousePosition );
    
    if( plane.GetComponent(MeshCollider).Raycast( mouseRay, hit, 500) ){
		mousePos = hit.point;
    }
    
    
    
    try {
    	var pos : Vector3 = this.transform.InverseTransformPoint( mousePos );
    	
	    var coord : Hashtable = tileManager.positionToHexagonCoord(pos.x,pos.z);
	    
	    var hexagon : GameObject = tiles[coord['i'],coord['j']];
    }
    catch(e)
    {
    	// wasn't able to find hexagon, nevermind
    	
    }
    
    if( hexagon ) {
    	var currentRenderer : MeshRenderer = hexagon.GetComponent(MeshRenderer);
    	var n:int;
    	
    	if( lastSelected != hexagon ) {
    		
	    	hexagon.GetComponent(EaseToPosition).position.y = 10;
	    	hexagon.GetComponent(EaseToPosition).color = rollOverColor;
	    	
    	}
    	
    	if( Input.GetMouseButtonDown(0) ) {
	    	Destroy( hexagon.GetComponent(EaseToPosition) );
	    	hexagon.GetComponent(Rigidbody).isKinematic = false;
	    	
	    	var direction : Vector3 = Quaternion.Euler(Random.Range(-1f,1f),Random.Range(-1f,1f),Random.Range(-1f,1f)) * Vector3.up;
	    	
	    	hexagon.GetComponent(Rigidbody).AddForceAtPosition(direction*Random.Range(50f,60f),hexagon.transform.position+(direction*3f), ForceMode.Impulse);
	    	Destroy( hexagon, 5 );
	    	hexagon = null;
	    	tiles[coord['i'],coord['j']] = null;
		}
	
	    
    }
    
    if( ( lastSelected != null ) && ( lastSelected != hexagon ) ) {
	    	currentRenderer = lastSelected.GetComponent(MeshRenderer);
	    	lastSelected.GetComponent(EaseToPosition).position.y = 0;
	    	lastSelected.GetComponent(EaseToPosition).color = rollOutColor;
	    		
	}
	
	
	lastSelected = hexagon;
    
    
}