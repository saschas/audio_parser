var MATH_ROT = -Math.PI / 2;
var $loop;

function color(){ 
  var rgb =  'rgb(' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ',' + (Math.floor(Math.random() * 255)-150) + ')';
  return rgb + '';
}

function push_Faces(x,y,z){
  var pX = x ,
      pY = y * .05,
      pZ = z * .02;
  var face = new THREE.Face3(pX, pY, pZ);
    
    return face;
  }

function push_Vertices(x,y,z){
  var pX = x ,
      pY = y * .05,
      pZ = z * .02;
  var particle = new THREE.Vector3(pX, pY, pZ);
    
    return particle;
  }

function color_Vertices(r,g,b){
  var color = new THREE.Color(r,g,b);
  return color;
}



