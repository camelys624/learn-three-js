import * as THREE from 'three';
import {initStats} from "../../../utils";
import * as dat from 'dat.gui';

import React, {Component} from "react";


class AmbientLightDemo {
    #scene;
    #camera;
    #renderer;
    #stats;

    init() {
        this.#stats = initStats();

        // create a scene, that will hold our elements such as objects, cameras and lights.
        this.#scene = new THREE.Scene();

        // create a camera, which defines where we're looking at
        this.#camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        this.#renderer = new THREE.WebGLRenderer();
        this.#renderer.setClearColor(new THREE.Color(0x000000));
        this.#renderer.setSize(window.innerWidth, window.innerWidth);
        this.#renderer.shadowMap.enabled = true;

        // create the ground plane
        let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(0, 0, 0);

        // add the plane to scene
        this.#scene.add(plane);

        // create a cube
        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.set(-4, 3, 0);

        // add the cube to the scene
        this.#scene.add(cube);

        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;

        // position the sphere
        sphere.position.set(20, 0, 2);

        // add the sphere to the scene
        this.#scene.add(sphere);

        // position and point the camera to the center of the scene
        this.#camera.position.set(-25, 30, 25);
        this.#camera.lookAt(new THREE.Vector3(10, 0, 0));

        // add subtle ambient lighting
        let ambiColor = '#0c0c0c';
        let ambientLight = new THREE.AmbientLight(ambiColor);
        this.#scene.add(ambientLight);

        // add spotlight for the shadows
        let spotlight = new THREE.SpotLight(0xffffff);
        spotlight.position.set(-40, 60, -10);
        spotlight.castShadow = true;
        this.#scene.add(spotlight);

        // add the output of the renderer to the html element
        document.getElementById('01-ambient-light').appendChild(this.#renderer.domElement);

        // call the render function
        let step = 0;
        let controls = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            ambientColor: ambiColor,
            disableSpotlight: false
        };

        let gui = new dat.GUI();
        gui.addColor(controls, 'ambientColor').onChange(e => {
            ambientLight.color = new THREE.Color(e);
        });
        gui.add(controls, 'disableSpotlight').onChange(e => {
            spotlight.visible = e;
        });

        let render = () => {
            this.#stats.update();

            // rotate the cube around its axes
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            // bounce the sphere up and down
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * Math.cos(step));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            // render using requestAnimationFrame
            requestAnimationFrame(render);
            this.#renderer.render(this.#scene, this.#camera);
        }
        render();

        this.resize();
    }

    resize() {
        this.#camera.aspect = window.innerWidth / window.innerHeight;
        this.#camera.updateProjectionMatrix();
        this.#renderer.setSize(window.innerWidth, window.innerHeight);

        let resize = this.resize.bind(this);
        window.addEventListener('resize', resize, false);
    }
}

export default class AmbientLightElement extends Component {
    componentDidMount() {
        let myAmbientLight = new AmbientLightDemo();
        myAmbientLight.init();
    }

    render() {
        return <div id="01-ambient-light"/>
    }
}