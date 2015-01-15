

function new_group(start,end){
	var that = this;
	that.options = {
			material : {
				color : 0xffffff,
				ambient : 0x222222,
				specular : 0,
				shininess : 0x222222,
				wireframe : false
			},
			position : {
				x : 0,
				y : 0,
				z : 0
			},
			scale : {
				x : 1,
				y : 1,
				z : 1
			},
			rotation : {
					x : 0,
					y : 0,
					z : 0
			},
			margin : {
				x : .5,
				y : 0,
				z : 0
			}

		};
		that.group = function(){
			var new_Group = new THREE.Object3D();
			return new_Group;
		};
		that.single = function(curr,options){
			var geometry = new THREE.BoxGeometry( options.scale.x, options.scale.y , options.scale.z );
	    var material = new THREE.MeshPhongMaterial(options.material);
	    var cube = new THREE.Mesh( geometry, material );
			    cube.position.x = (options.scale.x + options.margin.x)* curr;
					cube.position.y = options.position.y;
					cube.position.z = options.position.z;
					return cube;
		};
		that.init = function(count){
			var group = that.group();

			for(var i=0;i<count;i++){
				group.add(that.single(i,that.options));
			}
			group.time_to_show = -start;
			group.time_range = start-end;
			group.update = function(){
					this.position.z = this.time_on_screen();
			};
			group.remove = function(){
				scene.remove(this);
			};
			group.time_on_screen = function(){
				if(this.time_to_show<0){
					this.time_to_show++;
				}
				else{
					this.time_to_show = 0;
					this.time_range++;
				}
				if(this.time_range === 0){
					this.toMenu();
				}
				return this.time_to_show;
			};
			group.toMenu = function(){
				console.log('to menu')
				//camera.add(this);
				this.position.y = start;
			};
			group.position.z = this.time_to_show;
			return group;
		};
		
}



var obj = new new_group(100,200); // new_group.build.init(10);
var custom_element = obj.init(10);
		scene.add(custom_element);
//scene.add(obj);
