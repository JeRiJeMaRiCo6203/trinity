import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  74,
  window.innerWidth / innerHeight,
  0.1,
  1000
);
const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
const backgroundscene = new THREE.Scene();
const backgroundcamera = new THREE.Camera();
backgroundscene.add(backgroundcamera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
  fatman.rotation.y = Math.PI / 5;
  fatman.position.set(0, 0, -10); // Set initial position far away
  fatman.scale.set(2, 2, 2);
  scene.add(fatman);

  // Animate fatman appearance
  const targetPosition = new THREE.Vector3(0, 0, 0);
  new TWEEN.Tween(fatman.position)
    .to(targetPosition, 3000) // Adjust the duration as needed
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();

  animate();
});

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

// Camera position
camera.position.z = 5;
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
  const fatman = scene.getObjectByName("Sketchfab_Scene");

  if (fatman) {
    fatman.rotation.y += 0.01;
  }

  renderer.autoClear = false;
  renderer.clear();
  renderer.render(scene, camera);

  if (fatman && fatman.position.z < 0) {
    fatman.position.z += 0.09;
  }

  requestAnimationFrame(animate);
}

animate();
