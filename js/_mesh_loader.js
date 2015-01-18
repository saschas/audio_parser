// instantiate a loader
var loader = new THREE.JSONLoader();

// load hirsch
loader.load(
	// resource URL
	"js/models/hirsch.js",
	// Function when resource is loaded
	function ( geometry, materials ) {
		var material = new THREE.MeshLambertMaterial( materials );
		var hirsch = new THREE.Mesh( geometry, material );
			hirsch.scale.set(3,3,3);
			hirsch.position.set(-25,10,-150);
			hirsch.rotation.set(0,MATH_ROT * -1,0);
		scene.add( hirsch );
	}
);


// load ape
loader.load(
	// resource URL
	"js/models/ape.js",
	// Function when resource is loaded
	function ( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial( materials );
		var ape = new THREE.Mesh( geometry, material );
			ape.scale.set(3,3,3);
			ape.position.set(50,0,-100);
		scene.add( ape );
	}
);

// load ape
loader.load(
	// resource URL
	"js/models/haus.js",
	// Function when resource is loaded
	function ( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial( materials );
		var haus = new THREE.Mesh( geometry, material );
			haus.scale.set(3,3,3);
			haus.position.set(-50,0,-100);
		scene.add( haus );
	}
);
