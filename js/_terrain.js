function terrain_obj(data,count){
  
  data.stripes(count);
  if(!data.get_next_stripe()){

  }
  this.terrain_geometry =  new THREE.PlaneGeometry(100, å.data.length * 1.5, 63,å.data.length);
  this.terrain_material = new THREE.MeshLambertMaterial({
	  color: 0x222222
	});
  this.terrain_wire_material = new THREE.MeshBasicMaterial({
	  color: 0x222222, 
	  wireframe: true, 
	  transparent: true
	});
  this.total = 0;
  this.stripe_count = count;
  this.color_count = 0;
  this.set_vertices = true;
  this.colors = [];
  this.terrain_wire = null;
  this.generate = function(){
   
    this.stripes = data.get_next_stripe();
    if(this.stripes){  
    	console.log('generate : if');
      for(var i=0;i<this.stripes.length;i++){
       	for(var j=32;j>0;j--){
          this.total++;
           this.terrain_geometry.vertices[this.total].z = this.stripes[i][j] * .05;
        }       
        for(var k=0;k<32;k++){
          this.total++;
           this.terrain_geometry.vertices[this.total].z = this.stripes[i][k] * .05;
        }
      }
      this.generate();
    }
    else{
    	console.log('generate : else');
      this.terrain =  new THREE.Mesh(this.terrain_geometry,this.terrain_material);
     // this.terrain_wire =  new THREE.Mesh(this.terrain_geometry.clone(),this.terrain_wire_material);
      this.terrain.rotation.x = -Math.PI / 2;
     // this.terrain_wire.rotation.x = -Math.PI / 2;
     // this.terrain_wire.position.y = .01;
      scene.add(this.terrain);
      return this;
    }

  //  console.log(this.total);
  };

  

  this.update = function(){   
  };
  this.generate();
  return this;
}

