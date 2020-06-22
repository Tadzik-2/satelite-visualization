import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
 
var camera, scene, renderer, controls;
var geometry, material, mesh;
let skybox, earth, sun, moon;
 
init();
animate();
 
function init() {
 
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 35 );
    camera.position.z = 1;
 
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    document.body.appendChild( renderer.domElement );
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxZoom = 5;
    controls.maxDistance = 5;
    
    // skybox = makeSkybox();
    earth = makeEarth();
    sun = makeSun();
    moon = makeMoon();

    scene.add(earth,sun,moon)

    loadGLTFObject();

    addAmbientLight();
    
    let light = makePointLight(0x404040, 3, 10, [0,0, -3]);
    scene.add(light);
 

    window.addEventListener('resize', () => updateRendererSize(), false);
}

function updateRendererSize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
}

function makePointLight(color, intensity, distance, position) {
    let light = new THREE.PointLight(color, intensity, distance, 2);
    light.position.set(position[0],position[1], position[2]);
    return light;
}

function makeLensFlare() {
    let TextureLoader = new THREE.TextureLoader();
    let textureFlare1 = TextureLoader.load('../assets/textures/sun_lensflare_01.png');
    let textureFlare2 = TextureLoader.load('../assets/textures/sun_lensflare_02.png');

    let lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement( textureFlare1, 300, 0, new THREE.Color(0xffffff)));
    lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.6 ) );
    lensflare.addElement( new LensflareElement( textureFlare2, 70, 0.7 ) );
    lensflare.addElement( new LensflareElement( textureFlare2, 120, 0.9 ) );
    lensflare.addElement( new LensflareElement( textureFlare2, 70, 1 ) );

    return lensflare;
}

function addAmbientLight(){
    let light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
}

function makeSkybox(){
    let skyboxGeometry = new THREE.BoxGeometry(10,10,10);
    let skyboxTextures = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../assets/textures/void.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../assets/textures/void.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../assets/textures/void.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../assets/textures/void.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../assets/textures/void.png"), side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../assets/textures/earth.jpg"), side: THREE.DoubleSide}),
      ]
    let skyboxMaterial = new THREE.MeshFaceMaterial( skyboxTextures );
 
    let skyboxMesh = new THREE.Mesh( skyboxGeometry, skyboxMaterial );
    return skyboxMesh;
}

function makeSun() {
    let sunlight = makePointLight(0xffffff, 2, 0, [-3,2,4]);
    let lensflare = makeLensFlare();
    sunlight.add( lensflare );
    return sunlight;
}

function makeMoon() {
    let moonGeometry = new THREE.SphereGeometry(0.1,20,20);
    let moonTexture = new THREE.TextureLoader().load( '../assets/textures/moon_texture.jpg' );
    let moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
 
    let moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
    moonMesh.position.set(3,0,3)
    return moonMesh;
}


function makeEarth() {
    let earthGeometry = new THREE.SphereGeometry(7,128,128);
    let earthTexture = new THREE.TextureLoader().load( '../assets/textures/earth_texture.jpg' );
    let earthMaterial = new THREE.MeshBasicMaterial( { map: earthTexture, emissive: 0x87b5ff, emissiveMap: earthTexture} );
 
    let earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
    earthMesh.position.set(0,0,-8.3)
    return earthMesh;
}

function loadGLTFObject() {
    let loader = new GLTFLoader;
    loader.load(
        // resource URL
        '../assets/models/Aura_27.glb',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.01,0.01,0.01)
            scene.add( gltf.scene );
            console.log(gltf)
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

}
 
function animate() {
 
    requestAnimationFrame( animate );

    moon.rotation.y += 0.005;
    earth.rotation.y += 0.0005;
    renderer.render( scene, camera );
 
}