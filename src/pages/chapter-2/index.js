import React, {Component} from "react"

import * as THREE from 'three'
import {initStats} from "../../utils"
import {SceneUtils} from 'three/examples/jsm/utils/SceneUtils';
import * as dat from 'dat.gui';

export default class Chart1 extends Component {
  // constructor(prop) {
  //   super(prop);
  // }
  camera;
  scene;
  renderer;

  componentDidMount() {
    this.init();

    let resize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize, false);
  }

  init() {
    let stats = initStats();

    // create a scene,that will hold all our elements such as object, cameras and lights.
    this.scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(0x000000));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    // create the ground plane
    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);

    this.scene.add(plane);

    // position and point the camera to the center of the scene
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(new THREE.Vector3(5, 0, 0));

    // let ambientLight = new THREE.AmbientLight(0x3c3c3c);
    // this.scene.add(ambientLight);

    // add spotlight for the shadows
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    // add the output of the renderer to the html element
    document.getElementById('webgl-chart1').appendChild(this.renderer.domElement);

    // call the render function
    // let step = 0;

    let vertices = [
      new THREE.Vector3(1, 3, 1),
      new THREE.Vector3(1, 3, -1),
      new THREE.Vector3(1, -1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 3, -1),
      new THREE.Vector3(-1, 3, 1),
      new THREE.Vector3(-1, -1, -1),
      new THREE.Vector3(-1, -1, 1)
    ];

    let faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(2, 3, 1),
      new THREE.Face3(4, 6, 5),
      new THREE.Face3(6, 7, 5),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(7, 6, 2),
      new THREE.Face3(6, 3, 2),
      new THREE.Face3(5, 7, 0),
      new THREE.Face3(7, 2, 0),
      new THREE.Face3(1, 3, 4),
      new THREE.Face3(3, 6, 4),
    ];

    let geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();

    let materials = [
      new THREE.MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true}),
      new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
    ];

    let mesh = SceneUtils.createMultiMaterialObject(geom, materials);
    mesh.children.forEach(e => {
      e.castShadow = true;
    });

    this.scene.add(mesh);

    // controls
    let scope = this;

    const controlPoints = [
      {x: 3, y: 5, z: 3},
      {x: 3, y: 5, z: 0},
      {x: 3, y: 0, z: 3},
      {x: 3, y: 0, z: 0},
      {x: 0, y: 5, z: 0},
      {x: 0, y: 5, z: 3},
      {x: 0, y: 0, z: 0},
      {x: 0, y: 0, z: 3}
    ];

    let gui = new dat.GUI();
    gui.add({
      clone() {
        let cloneGeometry = mesh.children[0].geometry.clone();
        let materials = [
          new THREE.MeshLambertMaterial({opacity: 0.6, color: 0xff44ff, transparent: true}),
          new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
        ];

        let mesh2 = SceneUtils.createMultiMaterialObject(cloneGeometry, materials);
        mesh2.children.forEach(e => {
          e.castShadow = true;
        });
        mesh2.translateX(5);
        mesh2.translateZ(5);
        mesh2.name = 'clone';
        scope.scene.remove(scope.scene.getObjectByName('clone'));
        scope.scene.add(mesh2);
      }
    }, 'clone');

    for (let i = 0; i < 8; i++) {
      let f1 = gui.addFolder('Vertices ' + (i + 1));
      f1.add(controlPoints[i], 'x', -10, 10);
      f1.add(controlPoints[i], 'y', -10, 10);
      f1.add(controlPoints[i], 'z', -10, 10);
    }

    // render the scene
    let renderScene = () => {
      stats.update();

      let vertices = [];
      for (let i = 0; i < 8; i++) {
        vertices.push(new THREE.Vector3(controlPoints[i].x, controlPoints[i].y, controlPoints[i].z));
      }
      mesh.children.forEach(e => {
        e.geometry.vertices = vertices;
        e.geometry.verticesNeedUpdate = true;
        e.geometry.computeFaceNormals();
        // e.castShadow = true;
      });

      // render using requestAnimationFrame
      requestAnimationFrame(renderScene);
      this.renderer.render(this.scene, this.camera);
    }
    renderScene();
  }

  render() {
    return <div id="webgl-chart1"/>
  }
}

