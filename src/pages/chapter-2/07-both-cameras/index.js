import React, {Component} from "react"
import {initStats} from "../../../utils"
import * as THREE from 'three'
import * as dat from 'dat.gui'

class BothCamerasDemo {
  #camera;
  #scene;
  #renderer;
  #stats;

  init() {
    this.#stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    this.#scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    this.#camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
    this.#camera.position.set(120, 60, 180);

    // create a render and set the size
    this.#renderer = new THREE.WebGLRenderer();

    this.#renderer.setClearColor(new THREE.Color(0x000000));
    this.#renderer.setSize(window.innerWidth, window.innerHeight);

    // create a ground plane
    let planeGeometry = new THREE.PlaneGeometry(180, 180);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);

    // add the plane to the scene
    this.#scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

    for (let j = 0; j < (planeGeometry.parameters.height / 5); j++) {
      for (let i = 0; i < planeGeometry.parameters.width / 5; i++) {
        let rnd = Math.random() * 0.75 + 0.25;
        let cubeMaterial = new THREE.MeshLambertMaterial();
        cubeMaterial.color = new THREE.Color(rnd, 0, 0);
        let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

        cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + (j * 5);
        cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + (i * 5);
        cube.position.y = 2;

        this.#scene.add(cube);
      }
    }

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    this.#scene.add(directionalLight);

    // add subtle ambient lighting
    let ambientLight = new THREE.AmbientLight(0x292929);
    this.#scene.add(ambientLight);

    // add the output of the renderer to the html element
    document.getElementById('both-cameras').appendChild(this.#renderer.domElement);

    // call the render function
    let controls = {
      perspective: 'Perspective',
      switchCamera: () => {
        if (this.#camera instanceof THREE.PerspectiveCamera) {
          this.#camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16,
              window.innerHeight / 16, window.innerHeight / -16, -200, 500);

          this.#camera.position.set(120, 60, 180);
          this.#camera.lookAt(this.#scene.position);
          controls.perspective = 'Orthographic';
        } else {
          this.#camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
          this.#camera.position.set(120, 60, 180);

          this.#camera.lookAt(this.#scene.position);
          controls.perspective = 'Perspective';
        }
      }
    };

    let gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();

    // make sure that for thr first time, the
    // camera is looking at the scene
    this.#camera.lookAt(this.#scene.position);
    this.render();
  }

  render() {
    this.#stats.update();

    // render using requestAnimationFrame
    let render = this.render.bind(this);
    requestAnimationFrame(render);
    this.#renderer.render(this.#scene, this.#camera);
  }

  resize() {
    this.#camera.aspect = window.innerWidth / window.innerHeight;
    this.#camera.updateProjectionMatrix();
    this.#renderer.setSize(window.innerWidth, window.innerHeight);

    let resize = this.resize.bind(this);
    window.addEventListener('resize', resize, false);
  }
}

export default class Chart02_07 extends Component {
  componentDidMount() {
    let myBothCameraDemo = new BothCamerasDemo();
    myBothCameraDemo.init();
    myBothCameraDemo.resize();
  }

  render() {
    return <div id="both-cameras"/>
  }
}