(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ \"./node_modules/three/examples/jsm/loaders/GLTFLoader.js\");\n/* harmony import */ var three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/DRACOLoader */ \"./node_modules/three/examples/jsm/loaders/DRACOLoader.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\n/* harmony import */ var three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/objects/Lensflare */ \"./node_modules/three/examples/jsm/objects/Lensflare.js\");\n\n\n\n\n\n\nvar camera, scene, renderer, controls, raycaster, mouse;\nvar geometry, material, mesh;\nvar skybox, earth, sun, moon, sentinel;\nvar INTERSECTED;\nvar r = 422;\nvar theta = 0;\nvar dTheta = 0.15 * Math.PI / 1000;\ninit();\nanimate();\n\nfunction init() {\n  camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](70, window.innerWidth / window.innerHeight, 0.01, 7000);\n  camera.position.z = 0.5;\n  scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n  renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  renderer.setClearColor(0x000000);\n  renderer.setPixelRatio(window.devicePixelRatio);\n  document.body.appendChild(renderer.domElement);\n  controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__[\"OrbitControls\"](camera, renderer.domElement);\n  controls.maxZoom = 5;\n  controls.maxDistance = 2000;\n  controls.enableDamping = true;\n  raycaster = new three__WEBPACK_IMPORTED_MODULE_0__[\"Raycaster\"]();\n  mouse = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]();\n  earth = makeEarth();\n  sun = makeSun();\n  moon = makeMoon();\n  earth.rotation.x = 0.15;\n  earth.rotation.y = 3.4;\n  scene.add(earth, sun, moon);\n  loadGLTFObject();\n  addAmbientLight();\n  var light = makePointLight(0x404040, 3, 10, [0, 0, -3]);\n  scene.add(light);\n  makeStars(2000); // // update the picking ray with the camera and mouse position\n  // raycaster.setFromCamera( mouse, camera );\n  // // calculate objects intersecting the picking ray\n  // var intersects = raycaster.intersectObjects( sentinel.children );\n  // for ( var i = 0; i < intersects.length; i++ ) {\n  // \tintersects[ i ].object.material.color.set( 0xff0000 );\n  // }\n\n  window.addEventListener('mousemove', onMouseMove, false);\n  window.addEventListener('resize', function () {\n    return updateRendererSize();\n  }, false);\n}\n\nfunction updateRendererSize() {\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  camera.aspect = window.innerWidth / window.innerHeight;\n  camera.updateProjectionMatrix();\n}\n\nfunction makePointLight(color, intensity, distance, position) {\n  var light = new three__WEBPACK_IMPORTED_MODULE_0__[\"PointLight\"](color, intensity, distance, 2);\n  light.position.set(position[0], position[1], position[2]);\n  return light;\n}\n\nfunction makeLensFlare() {\n  var TextureLoader = new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]();\n  var textureFlare1 = TextureLoader.load('../assets/textures/sun_lensflare_01.png');\n  var textureFlare2 = TextureLoader.load('../assets/textures/sun_lensflare_02.png');\n  var lensflare = new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__[\"Lensflare\"]();\n  lensflare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__[\"LensflareElement\"](textureFlare1, 300, 0, new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](0xffffff)));\n  lensflare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__[\"LensflareElement\"](textureFlare2, 60, 0.6));\n  lensflare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__[\"LensflareElement\"](textureFlare2, 70, 0.7));\n  lensflare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__[\"LensflareElement\"](textureFlare2, 120, 0.9));\n  lensflare.addElement(new three_examples_jsm_objects_Lensflare__WEBPACK_IMPORTED_MODULE_4__[\"LensflareElement\"](textureFlare2, 70, 1));\n  return lensflare;\n}\n\nfunction addAmbientLight() {\n  var light = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0x404040); // soft white light\n\n  scene.add(light);\n}\n\nfunction makeSkybox() {\n  var skyboxGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"BoxGeometry\"](10, 10, 10);\n  var skyboxTextures = [new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n    map: new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load(\"../assets/textures/void.png\"),\n    side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n  }), new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n    map: new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load(\"../assets/textures/void.png\"),\n    side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n  }), new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n    map: new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load(\"../assets/textures/void.png\"),\n    side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n  }), new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n    map: new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load(\"../assets/textures/void.png\"),\n    side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n  }), new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n    map: new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load(\"../assets/textures/void.png\"),\n    side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n  }), new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n    map: new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load(\"../assets/textures/earth.jpg\"),\n    side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"]\n  })];\n  var skyboxMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshFaceMaterial\"](skyboxTextures);\n  var skyboxMesh = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](skyboxGeometry, skyboxMaterial);\n  return skyboxMesh;\n}\n\nfunction makeSun() {\n  var sunlight = makePointLight(0xffffff, 1, 0, [-3, 350, 900]);\n  var lensflare = makeLensFlare();\n  sunlight.add(lensflare);\n  return sunlight;\n}\n\nfunction makeMoon() {\n  var moonGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"SphereGeometry\"](1.75, 20, 20);\n  var moonTexture = new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load('../assets/textures/moon_texture.jpg');\n  var moonMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshPhongMaterial\"]({\n    map: moonTexture,\n    shininess: 5\n  });\n  var moonMesh = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](moonGeometry, moonMaterial);\n  moonMesh.position.set(3, 0, 3);\n  return moonMesh;\n}\n\nfunction makeEarth() {\n  var earthGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"SphereGeometry\"](70, 48, 48);\n  var earthTexture = new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load('../assets/textures/8k_earth_daymap.jpg');\n  var earthLightmap = new three__WEBPACK_IMPORTED_MODULE_0__[\"TextureLoader\"]().load('../assets/textures/8k_earth_specular_map.tif');\n  earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();\n  var earthMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshPhongMaterial\"]({\n    map: earthTexture,\n    shininess: 2,\n    specular: 0xa8a8a8,\n    specularMap: earthLightmap\n  });\n  earthMaterial.map.minFilter = three__WEBPACK_IMPORTED_MODULE_0__[\"LinearFilter\"];\n  var earthMesh = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](earthGeometry, earthMaterial);\n  earthMesh.position.set(0, 0, -71.3);\n  return earthMesh;\n}\n\nfunction makeStars(starsQuantity) {\n  for (var i = 0; i < starsQuantity; i++) {\n    var minStarScale = 0.1;\n    var maxStarScale = 1;\n    var randomStarScale = Math.random() * (maxStarScale - minStarScale) + minStarScale;\n    var starGeometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"SphereGeometry\"](randomStarScale, 10, 10);\n    var starMaterial = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshPhongMaterial\"]({\n      color: 0xffffff,\n      emissive: 0xffffff\n    });\n    var starMesh = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](starGeometry, starMaterial);\n    var min = -360;\n    var max = 360;\n    var minRadius = 400;\n    var maxRadius = 5000;\n    var randomX = Math.random() * (max - min) + min;\n    var randomY = Math.random() * (max - min) + min;\n    var randomRadius = Math.random() * (maxRadius - minRadius) + minRadius;\n    starMesh.position.setFromSphericalCoords(randomRadius, three__WEBPACK_IMPORTED_MODULE_0__[\"Math\"].degToRad(randomX), three__WEBPACK_IMPORTED_MODULE_0__[\"Math\"].degToRad(randomY));\n    scene.add(starMesh);\n  }\n}\n\nfunction onMouseMove(evt) {\n  evt.preventDefault(); // calculate mouse position in normalized device coordinates\n  // (-1 to +1) for both components\n\n  mouse.x = evt.clientX / window.innerWidth * 2 - 1;\n  mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1;\n}\n\nfunction loadGLTFObject() {\n  var loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_1__[\"GLTFLoader\"]();\n  loader.load( // resource URL\n  '../assets/models/sentinel.glb', // called when the resource is loaded\n  function (gltf) {\n    gltf.scene.scale.set(0.001, 0.001, 0.001);\n    gltf.scene.traverse(function (node) {\n      if (node.isMesh) {\n        node.castShadow = true;\n      } // if (node.isMesh){\n      //     node.material = new MeshPhongMaterial({color: 0x000000, specular:0xf0c91f});\n      // }\n\n    });\n    sentinel = gltf.scene;\n    console.log(sentinel);\n    scene.add(gltf.scene);\n  }, // called while loading is progressing\n  function (xhr) {\n    console.log(xhr.loaded / xhr.total * 100 + '% loaded');\n  }, // called when loading has errors\n  function (error) {\n    console.log('An error happened', error);\n  });\n}\n\nfunction animate() {\n  requestAnimationFrame(animate); //Set moon orbit and rotation\n\n  moon.rotation.y += 0.005;\n  theta += dTheta;\n  moon.position.x = r * Math.cos(theta);\n  moon.position.z = -8.3 + r * Math.sin(theta); //Set earth rotation\n\n  earth.rotation.y += 0.00003;\n  earth.rotation.x += 0.00003; //Required when damping enabled\n\n  controls.update();\n  render();\n}\n\nfunction render() {\n  // find intersections\n  raycaster.setFromCamera(mouse, camera);\n  var intersects = raycaster.intersectObjects(sentinel.children, true);\n\n  if (intersects.length > 0) {\n    console.log(intersects[0]);\n\n    if (INTERSECTED != intersects[0].object) {\n      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);\n      INTERSECTED = intersects[0].object;\n      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();\n      INTERSECTED.material.emissive.setHex(0xff0000);\n    }\n  } else {\n    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);\n    INTERSECTED = null;\n  }\n\n  renderer.render(scene, camera);\n}\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ })

},[[0,"runtime","vendors"]]]);