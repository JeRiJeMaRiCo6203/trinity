console.log("connected");

import * as THREE from "./Three JS/build/three.module.js";
import { GLTFLoader } from "./Three JS/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./Three JS/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
let fatman, littleBoy;
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// const cubeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000
// })
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// scene.add(cube)

const gltfLoader = new GLTFLoader();

// Fatman
gltfLoader.load("./fatman/scene.gltf", function (gltf) {
  fatman = gltf.scene;
  fatman.rotation.y = Math.PI / -5;
  fatman.rotation.x = Math.PI / 5;
  fatman.position.set(0, 2, -10);
  fatman.scale.set(2, 2, 2);
  scene.add(fatman);

  // Animate fatman appearance
  const targetPosition = new THREE.Vector3(0, 0, 0);
  new TWEEN.Tween(fatman.position)
    .to(targetPosition, 7000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();

  animate();
});

// Little Boy
gltfLoader.load("./little boy/scene.gltf", function (gltf) {
  littleBoy = gltf.scene;
  littleBoy.rotation.y = Math.PI / 4;
  littleBoy.rotation.x = Math.PI / 8;
  littleBoy.position.set(0, 2, -30);
  littleBoy.scale.set(1, 1, 1);
  // scene.add(littleBoy);

  // Animate littleboy appearance
  const targetPosition = new THREE.Vector3(0, 0, 0);
  new TWEEN.Tween(littleBoy.position)
    .to(targetPosition, 7000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();

  animate();
});

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / innerHeight,
);

camera.position.x = 0
camera.position.y = 0
camera.position.z = 5;
camera.lookAt(0, 0, 0)
scene.add(camera);

let scrollY = window.scrollY;
let currentSection = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  const newSection = Math.random(scrollY / window.innerHeight);
  console.log(newSection);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#222222");
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", renderer);

function animate() {
  requestAnimationFrame(animate);
  if (fatman) {
    fatman.rotation.y += 0.001;
  }

  if (littleBoy) {
    littleBoy.rotation.y += 0.001;
  }

  if (fatman && fatman.position.z < -2) {
    fatman.position.z += 0.0008;
  }

  if (littleBoy && littleBoy.position.z < -25) {
    littleBoy.position.z += 0.0008;
  }

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  const aspect = width / height;
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
};

// Orbit Mode
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    fatman.position.set(0, 0, 0)
    fatman.scale.set(2, 2, 2)
    littleBoy.position.set(0, 0, -30)
    const zIndexMain = -1;
    const zIndexCanvas = 1;

    if (!audio.paused) {
      audio.pause();
      isSectionTwoVisible = false;
      console.log(isSectionTwoVisible);
      console.log("Audio Pause");
    }

    let guide = document.querySelector(".guide > h3");
    guide.innerHTML = 'Press "Space" to Enter View Mode';

    canvas.style.zIndex = zIndexCanvas;
    document.querySelector(".main").style.zIndex = zIndexMain;
  }
});

// Reverse Action
let isOrbitMode = false;

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    const zIndexMain = -1;
    const zIndexCanvas = 1;

    if (isOrbitMode) {
      canvas.style.zIndex = zIndexMain;
      document.querySelector(".main").style.zIndex = zIndexCanvas;
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 5;
      camera.lookAt(0, 0, 0);
      // fatman.rotation.y = Math.PI / -5;
      // fatman.rotation.x = Math.PI / 5;
      // fatman.position.set(0, 1, 50);
      // fatman.scale.set(8, 8, 8);
      // littleBoy.rotation.y = Math.PI / 3.9;
      // littleBoy.rotation.x = Math.PI / 5;
      // littleBoy.position.set(0, 1, -500);
      // littleBoy.scale.set(1, 1, 1);
     
      let guide = document.querySelector(".guide > h3");
      guide.innerHTML = 'Press "Space" to Enter Orbit Mode';
    } else {
      canvas.style.zIndex = zIndexCanvas;
      document.querySelector(".main").style.zIndex = zIndexMain;
    }

    isOrbitMode = !isOrbitMode;
  }
});

function showLittleBoy() {
  if (littleBoy) {
    scene.add(littleBoy);
    scene.remove(fatman);
    // orbitMode()
  } 
}

function showFatman() {
  if (fatman) {
    scene.add(fatman);
    scene.remove(littleBoy);
    // orbitMode()
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const littleBoyElement = document.querySelector(".little_boy");
  const fatmanElement = document.querySelector(".fatman");

  littleBoyElement.addEventListener("click", showLittleBoy);
  fatmanElement.addEventListener("click", showFatman);
});
