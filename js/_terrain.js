/*var terrain;
var terrainLoader = new THREE.TerrainLoader();
terrainLoader.load('js/audioData_4.json', function(terrain_data) {
  //console.log(terrain_data);

  var terrain_geometry = new THREE.PlaneGeometry(60, 60, 199, 199);
	for (var i = 0, l = terrain_geometry.vertices.length; i < l; i++) {
	  terrain_geometry.vertices[i].z = terrain_data[i] / 272311 * 32;
	}
	var terrain_material = new THREE.MeshLambertMaterial({
	  color: 0xcccccc
	});
	terrain = new THREE.Mesh(terrain_geometry, terrain_material);
	terrain.castShadow = true;
	terrain.receiveShadow = true;
	terrain.rotation.x = Math.PI / 2;
	terrain.position.y = 4;
	scene.add(terrain);
});*/