import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' ; 
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial( {color:0xFF6347} );
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);


const josephTexture = new THREE.TextureLoader().load('assets/images/Joseph.jpg');

const joseph = new THREE.Mesh(
  new THREE.BoxGeometry(7,7,7),
  new THREE.MeshBasicMaterial({ map: josephTexture })
);

scene.add(joseph);

const text = "assets/fonts/Hello World";
let textMesh;

const loader = new FontLoader();

loader.load( '/threeJS-website/Roboto_Bold.json', function ( font ) {

  const textGeometry = new TextGeometry( text, {
    font: font,
    size: 10,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
  } );

  const codeTexture = new THREE.TextureLoader().load('assets/images/code.jpg');

	codeTexture.wrapS = codeTexture.wrapT = THREE.RepeatWrapping;
	codeTexture.repeat.set( 0.05, 0.05 );

  textMesh = new THREE.Mesh(textGeometry, new THREE.MeshStandardMaterial({ map:codeTexture}));

  scene.add(textMesh);
  textMesh.position.set(-40,15,5)


} );



const controls = new OrbitControls(camera,renderer.domElement)

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  
  joseph.rotation.y += 0.01;
  joseph.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25 , 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();



  renderer.render(scene, camera);
}

animate()