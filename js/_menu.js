var geometry = new THREE.BoxGeometry( 100,1,1 );
var material = new THREE.MeshPhongMaterial({color:0xff0000});
var menu = new THREE.Mesh( geometry, material );

	camera.add(menu);