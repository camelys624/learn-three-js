import * as THREE from 'three';
import * as dat from 'dat.gui';
import {initStats, initCamera, initTrackballControls, initRenderer, initResize} from "../../../utils";

import React, {Component} from "react";

class AreaLightDemo {
    #camera;
    #renderer;

    init () {
        let stats = initStats();
        this.#renderer = initRenderer({antialias: true}, 'area-light');
        this.#camera = initCamera();
        this.#camera.position.set(-50, 30, 50);

        let trackballControls = initTrackballControls(this.#camera, this.#renderer);
        let clock = new THREE.Clock();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        let scene = new THREE.Scene();

        // create the ground plane
        let planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
        let planeMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.044676705160855,    //calculated from shininess = 1000
            metalness: 0.0
        });
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;

        // add the plane to the scene
        scene.add(plane);

        // call the render function
        let spotlight0 = new THREE.SpotLight(0xcccccc);
        spotlight0.position.set(-40, 60, -10);
        spotlight0.intensity = 0.1;
        spotlight0.lookAt(plane.position);
        scene.add(spotlight0);

        let areaLight1 = new THREE.RectAreaLight(0xff0000, 500, 4, 10);
        areaLight1.position.set(-10, 10, -35);
        areaLight1.lookAt(plane.position);
        scene.add(areaLight1);

        let areaLight2 = new THREE.RectAreaLight(0x00ff00, 500, 4, 10);
        areaLight2.position.set(0, 10, -35);
        areaLight2.lookAt(plane.position)
        scene.add(areaLight2);

        let areaLight3 = new THREE.RectAreaLight(0x0000ff, 500, 4, 10);
        areaLight3.position.set(10, 10, -35);
        areaLight3.lookAt(plane.position)
        scene.add(areaLight3);

        let planeGeometry1 = new THREE.BoxGeometry(4, 10, 0);
        let planeGeometry1Mat = new THREE.MeshBasicMaterial({color: 0xff0000});
        let plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
        plane1.position.copy(areaLight1.position);
        scene.add(plane1);

        let planeGeometry2 = new THREE.BoxGeometry(4, 10, 0);
        let planeGeometry2Mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
        let plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
        plane2.position.copy(areaLight2.position);
        scene.add(plane2);

        let planeGeometry3 = new THREE.BoxGeometry(4, 10, 0);
        let planeGeometry3Mat = new THREE.MeshBasicMaterial({color: 0x0000ff});
        let plane3 = new THREE.Mesh(planeGeometry3, planeGeometry3Mat);
        plane3.position.copy(areaLight3.position);
        scene.add(plane3);

        let controls = {
            rotationSpeed: 0.02,
            color1: 0xff0000,
            intensity1: 500,
            color2: 0x00ff00,
            intensity2: 500,
            color3: 0x0000ff,
            intensity3: 500
        }

        let gui = new dat.GUI();
        gui.addColor(controls, 'color1').onChange(e => {
            areaLight1.color = new THREE.Color(e);
            planeGeometry1Mat.color = new THREE.Color(e);
            scene.remove(plane1);
            plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
            plane1.position.copy(areaLight1.position);
            scene.add(plane1);
        });
        gui.add(controls, 'intensity1', 0, 1000).onChange(e => {
            areaLight1.intensity = e;
        });
        gui.addColor(controls, 'color2').onChange(e => {
            areaLight2.color = new THREE.Color(e);
            planeGeometry2Mat.color = new THREE.Color(e);
            scene.remove(plane2);
            plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
            plane2.position.copy(areaLight2.position);
            scene.add(plane2);
        });
        gui.add(controls, 'intensity2', 0, 1000).onChange(e => {
           areaLight2.intensity = e;
        });
        gui.addColor(controls, 'color3').onChange(e => {
            areaLight3.color = new THREE.Color(e);
            planeGeometry3Mat.color = new THREE.Color(e);
            scene.remove(plane3);
            plane3 = new THREE.Mesh(planeGeometry3, planeGeometry3Mat);
            plane3.position.copy(areaLight3.position);
            scene.add(plane3)
        });
        gui.add(controls, 'intensity3', 0, 1000).onChange(e => {
            areaLight3.intensity = e;
        });

        let render = () => {
            stats.update();
            trackballControls.update(clock.getDelta());

            // render use requestAnimationFrame
            requestAnimationFrame(render);
            this.#renderer.render(scene, this.#camera);
        }

        render();

        initResize(this.#camera, this.#renderer);
    }
}

export default class AreaLightDom extends Component {
    componentDidMount() {
        let myAreaLight = new AreaLightDemo();
        myAreaLight.init();
    }

    render() {
        return <div id="area-light"/>
    }
}