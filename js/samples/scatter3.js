(function() {

  pi = 3.141593

  window.samples.scatter3 = {

    //Draw axis ticks

    initialize: function(canvas) {

      //Load in data 
      var parameters = [ [1.0, 1.0, 1.0], [0.95, 1, 1], [0.90, 1, 1], [0.85, 1, 1], [0.80, 1, 1] ];

      var scene = new THREE.Scene();
      var theta = 0;
      var radius = 11;
      var speed = 0.004;

      var camera = new THREE.PerspectiveCamera( 30, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.y = 3;
      camera.position.x = radius*Math.cos(theta);
      camera.position.z = radius*Math.sin(theta);
      camera.lookAt( new THREE.Vector3(0,0,0));

      var texture = THREE.ImageUtils.loadTexture(
            'images/checker_large.gif',
            {},
            function() {
              animate();
            }
      );

      var material = new THREE.MeshPhongMaterial({ map: texture, antialias:true, transparent: true, opacity: 0.8 });
      var scale = 2.5;
      var geometry = new THREE.CubeGeometry( scale, scale, scale );
      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      //Draw axes
      var geometry = new THREE.PlaneGeometry( 4, 4, 5, 5 );
      var material = new THREE.MeshBasicMaterial( {   color: 0xffffff,
        linewidth: 1, wireframe: true }
      );
      var planeX = new THREE.Mesh( geometry, material );
      var planeY = new THREE.Mesh( geometry, material );
      var planeZ = new THREE.Mesh( geometry, material );
      planeX.rotation.x = -pi/2;
      planeX.position.y -= 2;
      planeY.rotation.y = -pi/2;
      planeY.position.x += 2;
      planeZ.position.z += 2;
      scene.add( planeX );
      scene.add( planeY );
      scene.add( planeZ );

      //Draw text
      //var options = {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 100,'curveSegments' : 300};
      //var firstLetter = true;
      //var text = {"three.js",
      //  height = 20,
      //  size = 70,
      //  hover = 30,
      //  curveSegments = 4,
      //  bevelThickness = 2,
      //  bevelSize = 1.5,
      //  bevelSegments = 3,
      //  bevelEnabled = true,
      //  font = undefined,
      //  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
      //  fontWeight = "bold"}; // normal bold
      //
      //  var fontMap = {
      //    "helvetiker": 0,
      //    "optimer": 1,
      //    "gentilis": 2,
      //    "droid/droid_sans": 3,
      //    "droid/droid_serif": 4
      //  };

      var directionalLight = new THREE.DirectionalLight ( 0xffffffff );
      directionalLight.position.set( 0, 3, 7);
      scene.add( directionalLight );

      var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
      renderer.setSize( sample_defaults.width, sample_defaults.height );

      //Setup mouse inputs 
      var controls = new THREE.OrbitControls( camera, renderer.domElement );

      //Setup keyboard controls (toggle rotation)
      var keyboard = new KeyboardState();

      var instance = { active: false };
      var rotate = true;
      var tog = true;

      //Draw points

      function update()
      {
        keyboard.update();
        if ( keyboard.pressed("A") ) {
          if (tog) {
            if (rotate)
              rotate = false;
            else
              rotate = true;
          }
          tog = false;
        }
        else
          tog = true;
      }

      function animate() {
        requestAnimationFrame( animate, canvas );
        if(!instance.active || sample_defaults.paused) return;

        if (rotate) {
          theta += speed;
          camera.position.x = radius*Math.cos(theta);
          camera.position.z = radius*Math.sin(theta);
          camera.lookAt( new THREE.Vector3(0,0,0));
        }

        update();
        renderer.render( scene, camera );
      }

      animate();
      return instance;
    }
  };
})();
