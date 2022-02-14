import React, {Component} from "react"

import * as Three from 'three'
import {initStats} from "../../../utils"
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

    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setClearColor(new Three.Color((0x000000)));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    let axes = new Three.AxesHelper(20);
    this.scene.add(axes);

    let planeGeometry = new Three.PlaneGeometry(60, 20);
    // MeshBasicMaterial grid
    // let planeMaterial = new Three.MeshBasicMaterial({
    //   color: 0xAAAAAA
    // });
    let planeMaterial = new Three.MeshLambertMaterial({
      color: 0xffffff
    });

    let plane = new Three.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;
    this.scene.add(plane);

    let spotLight = new Three.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new Three.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    this.scene.add(spotLight);

    // create a cube
    let cubeGeometry = new Three.BoxGeometry(4, 4, 4);
    let cubeMaterial = new Three.MeshLambertMaterial({ // MeshBasicMaterial
      color: 0xff0000
    });
    let cube = new Three.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    cube.castShadow = true;
    this.scene.add(cube);

    // create a sphere
    let sphereGeometry = new Three.SphereGeometry(4, 20, 20);
    let sphereMaterial = new Three.MeshLambertMaterial({  // MeshBasicMaterial
      color: 0x7777ff
    });
    let sphere = new Three.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    sphere.castShadow = true;
    this.scene.add(sphere);

    // position and point the camera to the center of the scene
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(this.scene.position);

    // add the output of the renderer to the html element
    document.getElementById('webgl-chart1').appendChild(this.renderer.domElement);

    // controls
    let controls = {
      rotationSpeed: 0.02,
      bouncingSpeed: 0.03
    }
    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    // render the scene
    let step = 0;
    let renderScene = () => {
      stats.update();
      requestAnimationFrame(renderScene);
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;

      step += controls.bouncingSpeed;
      sphere.position.x = 20 + 10 * (Math.cos(step));
      sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

      this.renderer.render(this.scene, this.camera);
    }
    renderScene();
  }

  render() {
    return <div id="webgl-chart1"/>
  }
}

