import Stats from "three/examples/jsm/libs/stats.module";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
import * as THREE from 'three';

/**
 *
 * @param {Number} type 0: fps, 1: ms, 3+: custom
 * @returns {Stats}
 */
export function initStats(type) {
  let panelType = (typeof type !== "undefined" && type) && (!isNaN(type)) ? parseInt(type) : 0;
  let stats = new Stats();

  stats.showPanel(panelType);
  document.body.appendChild(stats.dom);
  return stats;
}

/**
 * Initialize a simple default renderer and binds it to the "webgl-output" dom element.
 * @param {Object} additionalProperties Additional properties to pass into the renderer
 * @param {String} id dom_id
 */
export function initRenderer(additionalProperties, id) {
  let props = (typeof additionalProperties !== 'undefined' && additionalProperties) ? additionalProperties : {};
  let renderer = new THREE.WebGLRenderer(props);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById(id).appendChild(renderer.domElement);

  return renderer;
}

/**
 * Initialize a simple camera and point it at the center of a scene
 * @param {THREE.Vector3} initialPosition
 */
export function initCamera(initialPosition) {
  let position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);

  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(position);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  return camera;
}

export function initDefaultLighting(scene, initialPosition) {
  let position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-10, 30, 40);

  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.copy(position);
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.fov = 15;
  spotLight.castShadow = true;
  spotLight.decay = 2;
  spotLight.penumbra = 0.05;
  spotLight.name = 'spotLight';

  scene.add(spotLight);

  let ambientLight = new THREE.AmbientLight(0x343434);
  ambientLight.name = 'ambientLight';
  scene.add(ambientLight);
}

export function initDefaultDirectionalLighting(scene, initialPosition) {
  let position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(100, 200, 200);

  let dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.copy(position);
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.castShadow = true;

  dirLight.shadow.camera.left = -200;
  dirLight.shadow.camera.right = 200;
  dirLight.shadow.camera.top = 200;
  dirLight.shadow.camera.bottom = -200;

  scene.add(dirLight);

  let ambientLight = new THREE.AmbientLight(0x343434);
  ambientLight.name = 'ambientLight';
  scene.add(ambientLight);
}

/**
 * Initialize trackball controls to control the scene
 * @param {THREE.Camera} camera
 * @param {THREE.Renderer} renderer
 */
export function initTrackballControls(camera, renderer) {
  let trackballControls = new TrackballControls(camera, renderer.domElement);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.8;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
  trackballControls.keys = [65, 83, 68];

  return trackballControls;
}

/**
 * Apply a simple standard material to the passed in geometry and return the mesh
 * @param {*} geometry
 * @param {*} material if provided use this meshnormal material instead of creating a new material
 *                     this material will only be used if it is a meshnormal material.
 */
export function applyMeshStandardMaterial(geometry, material) {
  if (!material || material.type !== 'MeshStandardMaterial') {
    let material = new THREE.MeshStandardMaterial({color: 0xff0000});
    material.side = THREE.DoubleSide;
  }

  return new THREE.Mesh(geometry, material);
}

/**
 * Apply meshnormal material to the geometry, optionally specifying whether
 * we want to see a wireframe as well
 *
 * @param {*} geometry
 * @param {*} material if provided use this meshnormal material instead of creating a new material
 *                     this material will only be used if it is a meshnormal material.
 */
export function applyMeshNormalMaterial(geometry, material) {
  if (!material || material.type !== 'MeshNormalMaterial') {
    material = new THREE.MeshNormalMaterial();
    material.side = THREE.DoubleSide;
  }

  return new THREE.Mesh(geometry, material);
}

/**
 * Add a simple cube and sphere to the provided scene
 *
 * @param {THREE.Scene} scene
 */
export function addDefaultCubeAndSphere(scene) {
  // create a cube
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  return {
    cube,
    sphere
  }
}

/**
 * Add a simple ground plane to the provided scene
 *
 * @param {THREE.Scene} scene
 */
export function addGroupPlane(scene) {
  // create the ground plane
  let planeGeometry = new THREE.PlaneGeometry(60, 20, 120, 120);
  let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  return plane;
}

/**
 * Add a simple ground plane to provided scene
 *
 * @param {THREE.Scene} scene
 * @param useTexture
 */
export function addLargeGroundPlane(scene, useTexture) {
  let withTexture = (useTexture !== undefined) ? useTexture : false;

  // create the ground plane
  let planeGeometry = new THREE.PlaneGeometry(10000, 10000);
  let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});

  if (withTexture) {
    let textureLoader = new THREE.TextureLoader();
    planeMaterial.map = textureLoader.load('../../assets/texture/general/floor-wood.jpg');
    planeMaterial.map.wrapS = THREE.RepeatWrapping;
    planeMaterial.map.wrapT = THREE.RepeatWrapping;
    planeMaterial.map.repeat.set(80, 80);
  }

  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  return plane;
}

export function addHouseAndTree(scene) {
  let createBoundingWall = function (scene) {
    let wallLeft = new THREE.BoxGeometry(70, 2, 2);
    let wallRight = new THREE.BoxGeometry(70, 2, 2);
    let wallTop = new THREE.BoxGeometry(2, 2, 50);
    let wallBottom = new THREE.BoxGeometry(2, 2, 50);

    let wallMaterial = new THREE.MeshLambertMaterial({color: 0xa0522d});

    let wallLeftMesh = new THREE.Mesh(wallLeft, wallMaterial);
    let wallRightMesh = new THREE.Mesh(wallRight, wallMaterial);
    let wallTopMesh = new THREE.Mesh(wallTop, wallMaterial);
    let wallBottomMesh = new THREE.Mesh(wallBottom, wallMaterial);

    wallLeftMesh.position.set(15, 1, -25);
    wallRightMesh.position.set(15, 1, 25);
    wallTopMesh.position.set(-19, 1, 0);
    wallBottomMesh.position.set(49, 1, 0);

    scene.add(wallLeftMesh);
    scene.add(wallRightMesh);
    scene.add(wallTopMesh);
    scene.add(wallBottomMesh);
  }

  let createGroundPlane = function (scene) {
    //create the ground plane
    let planeGeometry = new THREE.PlaneGeometry(70, 50);
    let planeMaterial = new THREE.MeshPhongMaterial({color: 0x9acd32});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);
  }

  let createHouse = function (scene) {
    let roof = new THREE.ConeGeometry(5, 4);
    let base = new THREE.CylinderGeometry(5, 5, 6);

    // create the mesh
    let roofMesh = new THREE.Mesh(roof, new THREE.MeshPhongMaterial({color: 0x8b7213}));
    let baseMesh = new THREE.Mesh(base, new THREE.MeshPhongMaterial({color: 0xffe4c4}));

    roofMesh.position.set(25, 8, 0);
    baseMesh.position.set(25, 3, 0);

    roofMesh.receiveShadow = true;
    baseMesh.receiveShadow = true;
    roofMesh.castShadow = true;
    baseMesh.castShadow = true;

    scene.add(roofMesh);
    scene.add(baseMesh);
  }

  let createTree = function (scene) {
    let trunk = new THREE.BoxGeometry(1, 8, 1);
    let leaves = new THREE.SphereGeometry(4);

    // create the mesh
    let trunkMesh = new THREE.Mesh(trunk, new THREE.MeshPhongMaterial({color: 0x8b4513}));
    let leavesMesh = new THREE.Mesh(leaves, new THREE.MeshPhongMaterial({color: 0x00ff00}));

    // position the trunk, set y half of height of trunk
    trunkMesh.position.set(-10, 4, 0);
    leavesMesh.position.set(-10, 12, 0);

    trunkMesh.castShadow = true;
    trunkMesh.receiveShadow = true;
    leavesMesh.castShadow = true;
    leavesMesh.receiveShadow = true;

    scene.add(trunkMesh);
    scene.add(leavesMesh);
  }

  createBoundingWall(scene);
  createGroundPlane(scene);
  createHouse(scene);
  createTree(scene);
}

export function createGhostTexture() {
  let canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;

  let ctx = canvas.getContext('2d');
  // the body
  ctx.translate(-81, -84);

  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();

  // the eyes
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();

  // the pupils
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();

  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}