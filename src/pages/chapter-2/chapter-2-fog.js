import React, {Component} from "react"

import * as Three from 'three'
import {initStats} from "../../utils"
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
    this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setClearColor(new Three.Color((0x000000)));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    let planeGeometry = new Three.PlaneGeometry(60, 40, 1, 1);
    let planeMaterial = new Three.MeshLambertMaterial({
      color: 0xffffff
    });

    let plane = new Three.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;
    this.scene.add(plane);

    let ambientLight = new Three.AmbientLight(0x3c3c3c);
    this.scene.add(ambientLight);

    let spotLight = new Three.SpotLight(0xFFFFFF, 1.2, 150, 120);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    this.scene.add(spotLight);

    // add fog
    this.scene.fog = new Three.Fog(0xffffff, 0.015, 100);

    // position and point the camera to the center of the scene
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(this.scene.position);

    // add the output of the renderer to the html element
    document.getElementById('webgl-chart1').appendChild(this.renderer.domElement);

    // controls
    let scope = this;
    let controls = {
      rotationSpeed: 0.02,
      bouncingSpeed: 0.03,
      addCube: function() {
        let cubeSize = Math.ceil(Math.random() * 3);
        let cubeGeometry = new Three.BoxGeometry(cubeSize, cubeSize, cubeSize);
        let cubeMaterial = new Three.MeshLambertMaterial({color: Math.random() * 0xffffff});

        let cube = new Three.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = 'cube' + scope.scene.children.length;
        cube.position.x = -20 + Math.round(Math.random() * planeGeometry.parameters.width);
        cube.position.y = Math.round(Math.random() * 5);
        cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

        scope.scene.add(cube);
        this.numberOfObjects = scope.scene.children.length;
      },
      removeCube: function() {
        let allChildren = scope.scene.children;
        let lastObject = allChildren[allChildren.length - 1];
        if (lastObject instanceof Three.Mesh) {
          scope.scene.remove(lastObject);
          this.numberOfObjects = scope.scene.children.length;
        }
      },
      outputObjects: function() {
        console.log(scope.scene.children);
      }
    }
    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');

    // render the scene
    let renderScene = () => {
      stats.update();
      this.scene.traverse(function(obj) {
        if (obj instanceof Three.Mesh && obj !== plane) {
          obj.rotation.x += controls.rotationSpeed;
          obj.rotation.y += controls.rotationSpeed;
          obj.rotation.z += controls.rotationSpeed;
        }
      });

      requestAnimationFrame(renderScene);

      this.renderer.render(this.scene, this.camera);
    }
    renderScene();
  }

  render() {
    return <div id="webgl-chart1"/>
  }
}

