/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Plane
/////////////////////////////////////////////////////////////////////////////////////////////////

var plane_options = {
	width : window.innerWidth,
	height : window.innerHeight,
	position : {
		x : 0,
		y : -.25,
		z : 0
	}
}


var plane_geometry = new THREE.PlaneGeometry( plane_options.width, plane_options.height, 32 );
var plane_material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide}); 
var plane = new THREE.Mesh( plane_geometry, plane_material ); 
	plane.rotation.x = MATH_ROT;
	plane.position.x = plane_options.position.x;
	plane.position.y = plane_options.position.y;
	plane.position.z = plane_options.position.z;
	plane.receiveShadow = true;
	scene.add( plane );