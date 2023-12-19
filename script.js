import * as THREE from "./Three JS/build/three.module.js";
import { GLTFLoader } from "./Three JS/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./Three JS/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  74,
  window.innerWidth / innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ 
  antialias: true, 
  canvas: canvas, 
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#222222");
// document.body.appendChild(renderer.domElement);?

// Handle window resize
window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  const aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
};

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", renderer);

// Load fatman model
const loader = new GLTFLoader();

loader.load("./fatman/scene.gltf", function (gltf) {
  const fatman = gltf.scene;
  fatman.rotation.y = Math.PI / -5;
  fatman.rotation.x = Math.PI / 5;
  fatman.position.set(0, -1, -10);
  fatman.scale.set(2, 2, 2);
  scene.add(fatman);

  // Animate fatman appearance
  // const targetPosition = new THREE.Vector3(0, 0, 0);
  // new TWEEN.Tween(fatman.position)
  //   .to(targetPosition, 3000)
  //   .easing(TWEEN.Easing.Quadratic.InOut)
  //   .start();

  // animate();
});

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

// Camera position
camera.position.z = 5;
camera.far = 1000;
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
  const fatman = scene.getObjectByName("Sketchfab_Scene");

  if (fatman) {
    fatman.rotation.y += 0.01;
    if(fatman.position.y <= 1)
    {
      fatman.position.y += 0.1
    }
  }



  // renderer.autoClear = false;
  // renderer.clear();
  renderer.render(scene, camera);

  if (fatman && fatman.position.z < 0) {
    fatman.position.z += 0.008;
  }

  requestAnimationFrame(animate);
}

animate();
