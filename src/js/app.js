import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import { MeshPhongMaterial } from 'three';
 
var camera, scene, renderer, controls, raycaster, mouse;
var geometry, material, mesh;
let skybox, earth, sun, moon, sentinel;
var INTERSECTED;

const r = 422;
let theta = 0;
let dTheta = 0.15 * Math.PI / 1000;

 
init();
animate();
 
function init() {
 
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 7000 );
    camera.position.z = 0.5;
 
    scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    // renderer.gammaOutput = true;
    // renderer.gammaFactor = 2.2;
    document.body.appendChild( renderer.domElement );
    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxZoom = 5;
    controls.maxDistance = 2000;
    controls.enableDamping = true;

    raycaster = new THREE.Raycaster();

    mouse = new THREE.Vector2();


    //earth = makeEarth();
    sun = makeSun();
    //moon = makeMoon();

    // earth.rotation.x = 0.15;
    // earth.rotation.y = 3.4;

    scene.add(/*earth,*/sun/*,moon*/)

    loadGLTFObject();

    addAmbientLight();
    
    let light = makePointLight(0x404040, 3, 10, [0,0, -3]);
    let light2 = makePointLight(0x404040, 3, 10, [0,1, 1]);
    scene.add(light,light2);

    makeStars(2000);

    // // update the picking ray with the camera and mouse position
    // raycaster.setFromCamera( mouse, camera );
    
    // // calculate objects intersecting the picking ray
    // var intersects = raycaster.intersectObjects( sentinel.children );

	// for ( var i = 0; i < intersects.length; i++ ) {

	// 	intersects[ i ].object.material.color.set( 0xff0000 );

	// }
 

    window.addEventListener( 'mousemove', onMouseMove, false );
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
    let light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
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
    let sunlight = makePointLight(0xffffff, 1, 0, [-3,350,900]);
    let lensflare = makeLensFlare();
    sunlight.add( lensflare );
    return sunlight;
}

function makeMoon() {
    let moonGeometry = new THREE.SphereGeometry(1.75,20,20);
    let moonTexture = new THREE.TextureLoader().load( '../assets/textures/moon_texture.jpg' );
    let moonMaterial = new THREE.MeshPhongMaterial( { map: moonTexture, shininess:5 } );
 
    let moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
    moonMesh.position.set(3,0,3)
    return moonMesh;
}


function makeEarth() {
    let earthGeometry = new THREE.SphereGeometry(70,48,48);
    let earthTexture = new THREE.TextureLoader().load( '../assets/textures/8k_earth_daymap.jpg' );
    let earthLightmap = new THREE.TextureLoader().load( '../assets/textures/8k_earth_specular_map.tif' );
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    let earthMaterial = new THREE.MeshPhongMaterial( { map: earthTexture, shininess:0, specular:0x0, specularMap: earthLightmap} );
    earthMaterial.map.minFilter = THREE.LinearFilter;
 
    let earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
    earthMesh.position.set(0,0,-71.3)
    
    return earthMesh;
}

function makeStars(starsQuantity){
    for(let i=0;i<starsQuantity;i++){
        let minStarScale = 0.1;
        let maxStarScale = 1;
        let randomStarScale = Math.random() * (maxStarScale - minStarScale) + minStarScale;
        let starGeometry = new THREE.SphereGeometry(randomStarScale ,10,10);
        let starMaterial = new THREE.MeshPhongMaterial({color:0xffffff, emissive:0xffffff})
        let starMesh = new THREE.Mesh(starGeometry, starMaterial);
        let min = -360;
        let max = 360;
        let minRadius = 400;
        let maxRadius = 5000;
        let randomX = Math.random() * (max - min) + min;
        let randomY = Math.random() * (max - min) + min;
        let randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;
        starMesh.position.setFromSphericalCoords(randomRadius, THREE.Math.degToRad(randomX),THREE.Math.degToRad(randomY));

        scene.add(starMesh);
    }
}

function onMouseMove(evt){
    evt.preventDefault();
    // calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;
}

function loadGLTFObject() {
    let loader = new GLTFLoader;
    loader.load(
        // resource URL
        '../assets/models/sentinel.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.scale.set(0.001,0.001,0.001)
            
            gltf.scene.traverse( function( node ) {

                if ( node.isMesh ) { node.castShadow = true; }

                if (node.isMesh && node.name === "HUSK"){
                }
        
            } );

            sentinel = gltf.scene;
            console.log(sentinel);
            scene.add( gltf.scene );
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' , error);
    
        }
    );

}
 
function animate() {
 
    requestAnimationFrame( animate );

    //Set moon orbit and rotation
    // moon.rotation.y += 0.005;
    // theta += dTheta;
    // moon.position.x = r * Math.cos(theta);
    // moon.position.z = -8.3 + r * Math.sin(theta);
    
    //Set earth rotation
    // earth.rotation.y += 0.00003;
    // earth.rotation.x += 0.00003;
    
    //Required when damping enabled
    controls.update();
   
    render();
 
}

function render(){
    // find intersections

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( sentinel.children, true);

    if ( intersects.length > 0 ) {
        console.log(intersects[ 0 ])
        if ( INTERSECTED != intersects[ 0 ].object && intersects[0].object.material.name === "Solar-cell") {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );

        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;

    }
    
    renderer.render( scene, camera );
}

