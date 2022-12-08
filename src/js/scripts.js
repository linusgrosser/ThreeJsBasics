//SETUP:
//npm init
//npm install parcel -g
//create html and js files. Link Js to Html (use type module)
//npm install three

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Instantiating the Renderer
const renderer = new THREE.WebGLRenderer();
//Set size of renderer to size of the Screen
renderer.setSize(window.innerWidth, window.innerHeight);
//Add renderer to html
document.body.appendChild(renderer.domElement);

//Instantiate scene
const scene = new THREE.Scene();

//Instantiate Camera
//1. Field of View (usually between 40 - 80)
//2. Aspect Ratio (usually the Width divided by Height of window)
//3. Near Clipping Point
//4. Far Clipping Point (All Object between Near and Far Clipping Point are Visible)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Create Instance of OrbitControls
//Enables UserInteraction with Scene (Rotate Camera on MouseMove...)
const orbit = new OrbitControls(camera, renderer.domElement);

//Creating AmbientLight
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//Creating direcionalLight
const direcionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
scene.add(direcionalLight);
direcionalLight.position.set(0, 10, 5);

//Creating an AxesHelper & GridHelper to help orientate
//Parameter = Length of the Axes
const axesHelper = new THREE.AxesHelper(5);
//Parameter = Size of Grid
const gridHelper = new THREE.GridHelper(10);
//Parameter = Instance of the Directional Light
const dLightHelper = new THREE.DirectionalLightHelper(direcionalLight);
//Add Helpers to Scene
scene.add(axesHelper);
scene.add(gridHelper);
scene.add(dLightHelper);


//Adjusting Camera Position (x, y, z)
camera.position.set(0, 0, 10);
//Always update the orbit when changing the camera!
orbit.update();

//Creating BoxGeometry (1. Phase: Creating the Skeleton/Shape of the Object)
const boxGeometry = new THREE.BoxGeometry();
//Creating BoxMaterial (2. Phase: Creating Material (Skin) of the Object)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
//Creating a Box with BoxGeometry & BoxMaterial (3. Phase: Covering the Geometry with the Skin)
const box = new THREE.Mesh(boxGeometry, boxMaterial);
//Adding Box to Scene
scene.add(box);

//Adding a Sphere to the Scene
//1. Parameter = radius (Size), 2/3. Parameter = Height/Width of the Segments
//The more segments, the smoother the object
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x00FF00,
    wireframe: false //Shows the Mesh of the Object
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1, 4);
scene.add(sphere);


//Function to animate the rotation of the Box
function animate(time) {
    //Using time Parameter for setting speed of animation
    box.rotation.y = time / 5000;
    //Render scene and Camera
    renderer.render(scene, camera);
}

//Add animation to renderer
renderer.setAnimationLoop(animate);


