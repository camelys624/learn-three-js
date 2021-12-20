import React, {Component} from "react"

import * as THREE from 'three';
import {initStats} from "../../../utils";
import * as dat from 'dat.gui';

class MeshProperties {
  camera;
  scene;
  renderer;

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
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);

    // add the plane to the scene
    this.scene.add(plane);

    // position and point the camera to the center of the scene
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(this.scene.position);

    // add subtle ambient lighting
    let ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(ambientLight);

    // add spotlight for the shadows
    let spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(-40, 60, 20);
    spotlight.castShadow = true;
    this.scene.add(spotlight);

    // add the output of the renderer to the html element
    document.getElementById('webgl-mesh-properties').appendChild(this.renderer.domElement);

    // call the render function
    let controls = {
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      visible: true,
    };

    let material = new THREE.MeshLambertMaterial({color: 0x44ff44});
    let geom = new THREE.BoxGeometry(5, 8, 3);
    let cube = new THREE.Mesh(geom, material);
    cube.position.y = 4;
    cube.castShadow = true;
    this.scene.add(cube);

    controls.translate = function() {
      cube.translateX(controls.translateX);
      cube.translateY(controls.translateY);
      cube.translateZ(controls.translateZ);

      controls.positionX = cube.position.x;
      controls.positionY = cube.position.y;
      controls.positionZ = cube.position.z;
    };

    let gui = new dat.GUI();

    let guiScale = gui.addFolder('scale');
    guiScale.add(controls, 'scaleX', 0, 5);
    guiScale.add(controls, 'scaleY', 0, 5);
    guiScale.add(controls, 'scaleZ', 0, 5);

    let guiPosition = gui.addFolder('position');
    let contX = guiPosition.add(controls, 'positionX', -10, 10);
    let contY = guiPosition.add(controls, 'positionY', -4, 20);
    let contZ = guiPosition.add(controls, 'positionZ', -10, 10);

    contX.listen();
    contX.onChange(val => {
      cube.position.x = controls.positionX;
    });

    contY.listen();
    contY.onChange(val => {
      cube.position.y = controls.positionY;
    });

    contZ.listen();
    contZ.onChange(val => {
      cube.position.z = controls.positionZ;
    });

    let guiRotation = gui.addFolder('rotation');
    guiRotation.add(controls, 'rotationX', -4, 4);
    guiRotation.add(controls, 'rotationY', -4, 4);
    guiRotation.add(controls, 'rotationZ', -4, 4);

    let guiTranslate = gui.addFolder('translate');
    guiTranslate.add(controls, 'translateX', -10, 10);
    guiTranslate.add(controls, 'translateY', -10, 10);
    guiTranslate.add(controls, 'translateZ', -10, 10);
    guiTranslate.add(controls, 'translate');

    gui.add(controls, 'visible');

    let render = () => {
      stats.update();

      cube.visible = controls.visible;

      cube.rotation.x = controls.rotationX;
      cube.rotation.y = controls.rotationY;
      cube.rotation.z = controls.rotationZ;

      cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);

      requestAnimationFrame(render);
      this.renderer.render(this.scene, this.camera);
    }

    render();
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export default class Chart1 extends Component {

  componentDidMount() {
    let meshProperties = new MeshProperties();
    meshProperties.init();

    window.addEventListener('resize', meshProperties.resize, false);
  }

  render() {
    return <div id="webgl-mesh-properties"/>
  }
}

