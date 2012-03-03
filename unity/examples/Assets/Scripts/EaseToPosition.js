
var movementSpeed : float = 1;
var colorSpeed : float = 1;
public var position : Vector3;
public var color : Color;

function Start () {
	
}

function Update () {
	if( position == null ) position = this.transform.localPosition;
	//if( color == null ) color = this.GetComponent(MeshRenderer).material.GetColor('_Color');

	this.transform.localPosition = Vector3.Lerp( this.transform.localPosition, position, Mathf.Min(1,movementSpeed * Time.deltaTime) );
	
	this.GetComponent(MeshRenderer).material.SetColor( '_Color', Color.Lerp( this.GetComponent(MeshRenderer).material.GetColor('_Color'), color, colorSpeed ) );
	
}

function jump() {
	this.transform.localPosition = position;
	this.GetComponent(MeshRenderer).material.SetColor('_Color',color);
	
}