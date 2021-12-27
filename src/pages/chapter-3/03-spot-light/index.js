import * as THREE from 'three';
import * as dat from 'dat.gui';
import {initStats} from "../../../utils";

import React, {Component} from "react";

class PointLightDemo {
    #stats;
    #scene;
    #camera;
    #renderer;

    init() {
        this.#stats = initStats();

        // create a scene, that will hold all our elements such as objects, camera and lights.
        this.#scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        this.#camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        this.#renderer = new THREE.WebGLRenderer();
        this.#renderer.setClearColor(new THREE.Color(0x000000));
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        this.#renderer.shadowMap.enabled = true;
        this.#renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // create the ground plane
        let planeGeometry = new THREE.PlaneGeometry(60, 20, 20, 20);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(15, 0, 0);

        this.#scene.add(plane);

        // create a cube
        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff7777});
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.set(-4, 3, 0);

        this.#scene.add(cube);

        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.set(20, 0, 2);
        sphere.castShadow = true;

        this.#scene.add(sphere);

        // position and point the camera to the center of the scene
        this.#camera.position.set(-35, 30, 25);
        this.#camera.lookAt(new THREE.Vector3(10, 0, 0));

        // add subtle ambient lighting
        let ambiColor = '#1c1c1c';
        let ambientLight = new THREE.AmbientLight(ambiColor);
        this.#scene.add(ambientLight);

        // add spotlight for a bit of light
        let spotLight0 = new THREE.SpotLight(0xcccccc);
        spotLight0.position.set(-40, 30, -10);
        spotLight0.lookAt(plane);
        this.#scene.add(spotLight0);

        let target = new THREE.Object3D();
        target.position.set(5, 0, 0);

        let pointColor = '#ffffff';
        let spotLight = new THREE.SpotLight(pointColor);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 2;
        spotLight.shadow.camera.far = 200;
        spotLight.shadow.camera.fov = 30;
        spotLight.target = plane;
        spotLight.distance = 0;
        spotLight.angle = 0.4;

        this.#scene.add(spotLight);

        // add a small sphere simulating the pointlight
        let sphereLight = new THREE.SphereGeometry(0.2);
        let sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
        let sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
        sphereLightMesh.castShadow = true;

        sphereLightMesh.position.set(3, 0, 3);
        this.#scene.add(sphereLightMesh);

        // create camera helper
        let debugCamera = new THREE.CameraHelper(spotLight.shadow.camera);
        this.#scene.add(debugCamera);

        let helper = new THREE.SpotLightHelper(spotLight);
        this.#scene.add(helper);

        // add the output of the renderer to the html element
        document.getElementById('02-spot-light').appendChild(this.#renderer.domElement);

        // call the render function
        let step = 0;
        // used to determine the switch point for the light animation
        let phase = 0;
        let invert = 1;

        let controls = {
            rotationSpeed: 0.03,
            bouncingSpeed: 0.03,
            ambientColor: ambiColor,
            pointColor: pointColor,
            intensity: 1,
            penumbra: 1,
            distance: 0,
            exponent: 30,
            angle: 0.1,
            debug: false,
            castShadow: true,
            onlyShadow: false,
            target: 'Plane',
            stopMovingLight: false
        };

        let gui = new dat.GUI();
        gui.addColor(controls, 'ambientColor').onChange(e => {
            ambientLight.color = new THREE.Color(e);
        });
        gui.addColor(controls, 'pointColor').onChange(e => {
            spotLight.color = new THREE.Color(e);
        });
        gui.add(controls, 'angle', 0, Math.PI * 2).onChange(e => {
            spotLight.angle = e;
        });
        gui.add(controls, 'intensity', 0, 5).onChange(e => {
            spotLight.intensity = e;
        });
        gui.add(controls, 'penumbra', 0, 5).onChange(e => {
            spotLight.penumbra = e;
        });
        gui.add(controls, 'distance', 0, 200).onChange(e => {
            spotLight.distance = e;
        });
        gui.add(controls, 'exponent', 0, 100).onChange(e => {
            spotLight.exponent = e;
        });
        gui.add(controls, 'debug').onChange(e => {
            spotLight.shadow.camera.visible = e;
        });
        gui.add(controls, 'castShadow').onChange(e => {
            spotLight.castShadow = e;
        });
        gui.add(controls, 'onlyShadow').onChange(e => {
            spotLight.onlyShadow = e;
        });

        gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(e => {
            console.log(e);
            switch (e) {
                case 'Plane':
                    spotLight.target = plane;
                    break;
                case 'Sphere':
                    spotLight.target = sphere;
                    break;
                case 'Cube':
                    spotLight.target = cube;
                    break;
            }
        });

        gui.add(controls, 'stopMovingLight').onChange(e => {
            spotLight.stopMovingLight = e;
        })

        let render = () => {
            this.#stats.update();
            helper.update();

            // rotate the cube around its axes
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            // bounce the sphere up and down
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * Math.cos(step));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            // move the light simulation
            if (phase > 2 * Math.PI) {
                invert = invert * -1;
                phase -= 2 * Math.PI;
            } else {
                phase += controls.rotationSpeed;
            }
            sphereLightMesh.position.z = 7 * Math.sin(phase);
            sphereLightMesh.position.x = 14 * Math.cos(phase);
            sphereLightMesh.position.y = 10;

            if (invert < 0) {
                let pivot = 14;
                sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
            }

            spotLight.position.copy(sphereLightMesh.position);

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

export default class PointLightElement extends Component {
    componentDidMount() {
        let myPointLight = new PointLightDemo();
        myPointLight.init();
    }

    render() {
        return <div id="02-spot-light"/>
    }
}