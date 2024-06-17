import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
const textureLoader = new THREE.TextureLoader();
const frontTexture = textureLoader.load('./cv2.jpg');
const backTexture = textureLoader.load('./cv2.jpg');

const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
frontTexture.anisotropy = maxAnisotropy;
const geometry = new THREE.BoxGeometry( 0.05, 5, 3 ); 

const materials = [
  new THREE.MeshBasicMaterial({ map: frontTexture }), // right face
  new THREE.MeshBasicMaterial({ map: backTexture }), // left face
  new THREE.MeshBasicMaterial({ color: 0xcccccc }), // top face
  new THREE.MeshBasicMaterial({ color: 0xcccccc }), // bottom face
  new THREE.MeshBasicMaterial({ map: frontTexture }), // front face
  new THREE.MeshBasicMaterial({ map: backTexture })  // back face
];
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.x = 5;

let mouseX = 0;
let mouseY = 0;

// Hàm cập nhật vị trí chuột
function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Lắng nghe sự kiện chuột di chuyển
document.addEventListener('mousemove', onMouseMove, false);

export default function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    // cube.rotation.x = mouseX * Math.PI; // Xoay theo trục Y
    // cube.rotation.y = mouseY * Math.PI; // Xoay theo trục X
    controls.update();
	renderer.render( scene, camera );

}