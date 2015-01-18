function particle_obj(data,count){
  this.particles =  new THREE.Geometry();
  this.pMaterial = new THREE.PointCloudMaterial({
      color: 0xffffff,
      
      transparent : true,
      opacity: 0.7,
      vertexColors: THREE.VertexColors,
      size: 1,
      map : THREE.ImageUtils.loadTexture(
        "./assets/img/bars.png"
      )
    });
  
  data.stripes(count);
  if(!data.get_next_stripe()){

  }
  var total = 0;
  this.stripe_count = count;
  this.color_count = 0;
  this.set_vertices = true;
  this.colors = [];
  this.generate = function(){
   
    this.stripes = data.get_next_stripe();
    if(this.stripes){  
      for(var i=0;i<this.stripes.length;i++){        
        for(var j=0;j<25;j++){
          total++;           
            this.colors.push(color_Vertices(Math.random(), 0, 0 ));
            this.particles.vertices.push(push_Vertices(j,this.stripes[i][j],-total));
        }

      }
      this.generate();
    }
    else{
      this.particles.colors = this.colors;
      this.particleSystem = new THREE.PointCloud(this.particles,this.pMaterial);
      scene.add(this.particleSystem);
      this.color_count = this.particleSystem.geometry.colors.length;
      return this;
    }
  };
  this.currColor = 0;
  this.changeColor = function(){
    this.currColor++;

     this.stripes = data.get_next_stripe();
     console.log(this.currColor);
      for(var i=this.currColor;i<this.currColor+(32*this.currColor);i++){

          total++;
          this.particleSystem.geometry.colors[i] = new THREE.Color(1,1,1); 

      }
      this.particleSystem.geometry.colorsNeedUpdate = true;
     
  };
  

  this.update = function(){
    this.set_vertices = false;

   if(!data.get_next_stripe()){
      this.total = 0;
      data.stripes(100);
   }   
    else{
       this.changeColor();
    }
   
  };
  this.generate();
  return this;
}

