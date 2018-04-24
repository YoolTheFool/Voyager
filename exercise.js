


let container; //a reference to the html element
var renderer, camera, scene;
var controls, loader;
var sphere1,sphere2;
var time = 0;
var mouse,raycaster;
var sceneObjects;
let d_light;
var loader2;
let voyager;
var mic, vol;
let temp_voy;
let isVoyager = false;
var voyager2;
let voyagerArray = [];
window.addEventListener('load', init); // first load and then init

function init(){

  //MIC
  mic = new p5.AudioIn();

  mic.start();


  container = document.querySelector('#sketch');

  let wid = window.innerWidth;
  let hei = window.innerHeight;

  renderer = new THREE.WebGLRenderer({});
  renderer.setSize(wid, hei);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  camera = new THREE.PerspectiveCamera(
    60,
    wid/hei,
    0.1,
    5000
  );
  camera.position.set(-200, 0, 0);

  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();
  loader = new THREE.TextureLoader();

  mouse = new THREE.Vector2();


  createEnvironment();

  //window.addEventListener('resize', windowResize, true);
  //window.addEventListener('mousemove', onMouseMove, false);
  //document.addEventListener('mousedown', onDocumentMouseDown, false)
//RAYCASTER

//raycaster = new THREE.Raycaster();
  // $('#sketch').on('dragenter dragstart dragend dragleave dragover drag drop', function(e){
  // e.preventDefault();
  // mouse.x =  (e.clientX / window.innerWidth) *2 -1;
  // mouse.y = -(e.clientY / window.innerHeight)*2 +1;
  // raycasting();
//});
  update()
}

// function onDocumentMouseDown(){
//   var loader2 = new THREE.JSONLoader();
//
//   loader2.load('./imgs/voyager1.json', handle_load);
//
//   function handle_load(voyager_geo, voyager_mat){
//     voyager_mat = new THREE.MeshNormalMaterial({
//       emmisive: 0xFFD700,
//     });
//     voyager = new THREE.Mesh(voyager_geo,voyager_mat);
//     scene.add(voyager);
//     //voyager.position.z = -100;
//     //voyager.position.x = -50;
//
//     voyager.scale = (0.1,0.1,0.1)
//   }
// }

// function onMouseMove(e){
//   //normalizing between -1, 1
//   mouse.x = (e.clientX/window.innerWidth)*2 -1;
//   mouse.y = (e.clientY/window.innerWidth)*2 +1;

//}

function moveCamera(){
  camera.position.x += 1;
  camera.position.y += 1;
  camera.position.z += 1;


}
function moveLight(){
  d_light.position.z = Math.sin(time)/2;
  d_light.position.x = Math.cos(time);
  d_light.position.y = Math.cos(time*2);

}
function moveSpheres(){
  //sphere1.rotation.z = Math.tan(time);
  sphere1.rotation.x = -Math.sin(time);
  sphere1.rotation.y = Math.cos(time)*2;


  //sphere2.position.x = Math.sin(time)*150;

}

  //d_light.position.y = Math.cos(time*2);
// function raycasting(){
//   //set Raycaster
//   raycaster.setFromCamera(mouse,camera);
//   //get intersecting
//   let intersects = raycaster.intersectObjects(sceneObjects);
//
//   for (let i =0; i < intersects.length; i++){
//
//     intersects[i].object.scale.set(1.0,1.0,1.0);
//   }
//   for (let i =0; i < intersects.length; i++){
//
//     intersects[i].object.scale.set(1.1,1.1,1.1);
//   }
// }

// OBJECTS CREATION
function createEnvironment(){

  sceneObjects = [];

  let sky_img = './imgs/spacePan2.jpg';
  loader.load(sky_img, function(texture){
    let sky_mat = new THREE.MeshBasicMaterial({
      map : texture,
      side: THREE.BackSide
    });

    let sky_geo = new THREE.SphereGeometry(1000,24,24);
    let sky_dome = new THREE.Mesh(sky_geo,sky_mat);
    scene.add(sky_dome);

  })
  // var text_normal = loader.load('./imgs/ven0aaa2_NRM.png')
  var texture = loader.load('./imgs/ven0aaa2.jpg');
  //texture.needsUpdate = true;

  var sphere = new THREE.SphereGeometry(20,24,24);
  var sphere1Material =   new THREE.MeshPhongMaterial( {
    map: texture
    //bumpMap: text_normal
  } );
  //var sphere1Material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('./imgs/jup1vuu2.jpg',THREE.SphericalRefractionMapping) } );

  // let sphere2Material = new THREE.MeshPhongMaterial({
  //   color:0x0000ff,
  //   emissive: 0x440044,
  //   specular: 0x99ff00
  // });

  sphere1 = new THREE.Mesh(sphere,sphere1Material);
  sphere1.overdraw = true;
  sphere1.position.set (0, 0, 0);
  sceneObjects.push(sphere1);
  // sphere2 = new THREE.Mesh(sphere,sphere2Material);
  // sphere2.position.set (0, 0, -200);
  // sceneObjects.push(sphere2);

  d_light = new THREE.DirectionalLight(0xffffff,2);
  let a_light = new THREE.AmbientLight(0x0000ff,6,100,2)
  //a_light.position.set(100,200,400)

//VOYAGER
    var loader2 = new THREE.JSONLoader();

    loader2.load('./imgs/voyager1.json', handle_load);

    function handle_load(voyager_geo, voyager_mat){
      voyager_mat = new THREE.MeshNormalMaterial();
      voyager = new THREE.Mesh(voyager_geo,voyager_mat);
      //voyager.position.z= -100 ;
      //scene.add(voyager);
      //voyager.position.x = -50;

    //  voyager.setSize(30)
      //voyager2 = voyager;
    }






  scene.add(a_light);
  scene.add(d_light);
  scene.add(sphere1);
  //scene.add(object);

}

//ANIMATION
function update(){

  time += 0.01;
  moveSpheres();
  var vol = mic.getLevel();
  // console.log(vol);
  if (vol > 0.45){
    // voyager.position.z = voyager.position.z + 20;
    let newVoyager = voyager.clone();
    voyagerArray.push(newVoyager);



    sphere1.add(voyagerArray[voyagerArray.length-1]);
    voyagerArray[voyagerArray.length-1].position.z = -100;
  //  moveCamera();

  }
voyagerArray.forEach((voy)=> {
  moveVoyager(voy);
})
  moveLight();

  controls.update();
  renderer.render(
    scene,
    camera
    );

  requestAnimationFrame(update);


}


// VOYAGER FUNCTIONS



function moveVoyager(voy){
  if(voy != null){
    //voy.position.z = Math.tan(time);
    voy.rotation.x = (time);
    voy.position.z += Math.sin(time);
    voy.position.x += Math.cos(time);

    //voyager.position.y = Math.cos(time)*2;
  }
}

// function moveVoyager(){
//   if(voyager != null)
//   voyager.position.x += 0.01;
// }
