var å = {
  data: {},
  size: 10,
  store_data : function(data){
    this.data = data;
  },
  calculate_stripes : function(count){
    if(!count){
      console.warn('Missing Number! How many stripes do you wanna have?')
      return false;
    }
    var i,j,single_stripe,chunk = count;
      var stripes = [];

      for (i=0,j= this.data.length; i<j; i+=chunk) {
        single_stripe = this.data.slice(i,i+chunk);
        stripes.push(single_stripe);
      }
    return stripes;
  },
  stripes_count : 0,
  stripes_data : [],
  ////////////////////////////////////////
  ///// Get the audio data in smaller chunks
  ////////////////////////////////////////
  stripes : function(slice){
    if(!stripes){
      if(slice){
        if(slice != last_slice){
          last_slice = slice;
        }
        else{
          var last_slice = slice;
        }        
      }
      else{
        var last_slice = this.size;
      }
      var stripes = this.calculate_stripes(last_slice);
      this.stripes_count = stripes.length;
      this.stripes_data = stripes;
      console.log('stripes count: '+ this.stripes_count)
      return false;
    }
    else{
      return false;
    }
  },
  loop : false,
  // Get the next stripes of data
  get_next_stripe : function () {
    var curr = 0;
    if(this.stripes_count != 0){
      curr = this.stripes_data.length - this.stripes_count;
     // console.log(curr, this.stripes_data.length,this.stripes_count,this.stripes_data[curr]);
      this.stripes_count--;
      if(this.stripes_data[curr]){
        return this.stripes_data[curr];
      }
      else{
        console.log('there are no prev data stripes');
        return false;
      }
    }
    else{
      if(this.loop){        
        this.stripes_count = this.stripes_data.length;
        if(!this.stripes_data[0]){
          console.warn('No stripes! Generate new .stripes() first!');
          return false;
        }
        else{
          console.log('looop')
          return this.stripes_data[0];
        }
      }
      else{
        console.log('ende');
        return false;
      }
    }   
  },
  // Get the prev stripes of data
  get_prev_stripe : function () {
    if(this.stripes_count != 0){
      if(this.stripes_count === this.stripes_data.length ){
        console.warn('there are no prev data stripes');
      }
      else{
        this.stripes_count++;
        var curr = this.stripes_data.length-this.stripes_count;
        //console.log(this.stripes_data[curr]);
        return this.stripes_data[curr];
      }
    }
    else{
      console.warn('run .stripes() first!');
    }   
  }
}

var userOpts	= {
  ready       : false,
  play        : false,
  range		: 1,
  duration	: 2500,
  delay		: 200,
  easing		: 'Elastic.EaseInOut',
  camera : {
    x : 0,
    y : 20,
    z : 50,
    target : {
     x : 0,
     y : 10,
     z : -40,
   },
   orbit : {
    rotateSpeed : 0.1,
    keyPanSpeed : 0.001,
    maxPolarAngle : Math.PI/2,
    center : new THREE.Vector3(0,0,0)
  },
  fly : {
    movementSpeed : 1,
    rollSpeed : 0.01,
    autoForward : false,
    dragToLook : true
  }
},

};