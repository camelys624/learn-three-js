import {initStats, initRenderer, initCamera, initTrackballControls} from "../../../utils";
import * as THREE from 'three';
import * as dat from 'dat.gui';

import React, {Component} from "react";

class DirectionalLightDemo {
    #stats;
    #scene;
    #camera;
    #renderer;

    init() {
        // use the defaults
        this.#stats = initStats();
        this.#renderer = initRenderer(undefined, 'directional-light');
        this.#camera = initCamera();
        this.#camera.position.set(-80, 80, 80);

        let trackballControls = initTrackballControls(this.#camera, this.#renderer);
        let clock = new THREE.Clock();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        this.#scene = new THREE.Scene();

        // create the ground plane
        let planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = -5;
        plane.position.z = 0;

        // add the plane to the scene
        this.#scene.add(plane);

        // create a cube
        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff3333});
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        this.#scene.add(cube);

        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        //position the sphere
        sphere.position.x = 20;
        sphere.position.y = 0;
        sphere.position.z = 2;
        sphere.castShadow = true;

        // add the sphere to the scene
        this.#scene.add(sphere);

        // add subtle ambient lighting
        let amiColor = '#1c1c1c';
        let ambientLight = new THREE.AmbientLight(amiColor);
        this.#scene.add(ambientLight);

        let target = new THREE.Object3D();
        target.position.copy(new THREE.Vector3(5, 0, 0));

        let pointColor = '#ff5808';
        let directionalLight = new THREE.DirectionalLight(pointColor);
        directionalLight.position.set(-40, 60, -10);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 2;
        directionalLight.shadow.camera.far = 80;
        directionalLight.shadow.camera.left = -30;
        directionalLight.shadow.camera.right = 30;
        directionalLight.shadow.camera.top = 30;
        directionalLight.shadow.camera.bottom = -30;

        directionalLight.intensity = 0.5;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = -1024;
        this.#scene.add(directionalLight);

        let shadowCamera = new THREE.CameraHelper(directionalLight.shadow.camera);

        // add a small sphere simulating the pointlight
        let sphereLight = new THREE.SphereGeometry(0.2);
        let sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
        let sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
        sphereLightMesh.castShadow = true;

        sphereLightMesh.position.copy(new THREE.Vector3(3, 20, 3));
        this.#scene.add(sphereLightMesh);

        // call the render function
        let step = 0;
        let invert = 1;
        let phase = 0;

        let controls = {
            rotationSpeed: 0.03,
            bouncingSpeed: 0.03,
            ambientColor: amiColor,
            pointColor: pointColor,
            intensity: 0.5,
            debug: false,
            castShadow: true,
            onlyShadow: true,
            target: 'Plane'
        }

        let gui = new dat.GUI();
        gui.addColor(controls, 'ambientColor').onChange(e => {
            ambientLight.color = new THREE.Color(e);
        });
        gui.addColor(controls, 'pointColor').onChange(e => {
            directionalLight.color = new THREE.Color(e);
        });
        gui.add(controls, 'intensity', 0, 5).onChange(e => {
            directionalLight.intensity = e;
        });
        gui.add(controls, 'debug').onChange(e => {
            e ? this.#scene.add(shadowCamera) : this.#scene.remove(shadowCamera);
        });
        gui.add(controls, 'castShadow').onChange(e => {
            directionalLight.castShadow = e;
        });
        gui.add(controls, 'onlyShadow').onChange(e => {
            directionalLight.onlyShadow = e;
        });
        gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(e => {
            switch (e) {
                case 'Plane':
                    directionalLight.target = plane;
                    break;
                case 'Sphere':
                    directionalLight.target = sphere;
                    break;
                case  'Cube':
                    directionalLight.target = cube;
                    break;
            }
        });

        let render = () => {
            this.#stats.update();
            trackballControls.update(clock.getDelta());

            // rotate the cube around its axes
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            // bounce the sphere up and down
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * Math.cos(step));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            sphereLightMesh.position.z = -8;
            sphereLightMesh.position.y = 27 * Math.sin(step / 3);
            sphereLightMesh.position.x = 10 + (26 * Math.cos(step / 3));

            directionalLight.position.copy(sphereLightMesh.position);

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

export default class DirectionalLightElement extends Component {
    componentDidMount() {
        let myDirectionalLight = new DirectionalLightDemo();
        myDirectionalLight.init();
    }

    render() {
        return <div id="directional-light"/>
    }
}