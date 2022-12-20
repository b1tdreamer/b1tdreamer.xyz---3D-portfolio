import './bootstrap.min.css'
import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';  

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0x622d4c, wireframe: true  } );
//const material = new THREE.MeshStandardMaterial( { color: 0x622d4c  } );
const torusKnot = new THREE.Mesh( geometry, material );
scene.add(torusKnot);


//Adding light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight); 

//Adding light helper
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//Adding camera movement with mouse
const controls = new OrbitControls(camera, renderer.domElement)

/*Create new star randomly located function
function addStar(){
  const geometry = new THREE.CapsuleGeometry( 1, 3.6, 1, 6 );
  const material = new THREE.MeshBasicMaterial({color:0x622d4c, wireframe: true})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x,y,z);
  scene.add(star);
}*/

/*Add stars
Array(80).fill().forEach(addStar)*/

//const spaceTexture = new THREE.TextureLoader().load('img/back.jpg');
const color = new THREE.Color( 0x242424 );
scene.background = color;

/*Avatar
const b1tTexture = new THREE.TextureLoader().load('img/b1tface.webp');

const b1tface = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: b1tTexture})
);
scene.add(b1tface);*/

//Moon
const moonTexture = new THREE.CubeTextureLoader().load('img/moon.jpg');
const normalTexture = new THREE.CubeTextureLoader().load('img/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

//Animate function, loop
function animate(){
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.005;
  torusKnot.rotation.y += 0.0005;
  torusKnot.rotation.z += 0.004;

  renderer.render(scene, camera);
}

animate();

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x = 0.05;
  moon.rotation.y = 0.075;
  moon.rotation.z = 0.05;

  //b1tface.rotation.y = 0.01
  //b1tface.rotation.z = 0.01

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

// Obtener la imagen del fondo
var background = document.getElementById("gl1tch");
// Crear un intervalo que se ejecute cada 50 milisegundos
setInterval(function() {
// Obtener un número aleatorio entre 0 y 1
var random = Math.random();

// Si el número aleatorio es menor que 0.1, cambiar la opacidad de la imagen al 50%
if (random < 0.1) {
  background.style.opacity = 0.5;
} else {
  // En caso contrario, establecer la opacidad en 1 (opaca)
  background.style.opacity = 1;

}}, 50);