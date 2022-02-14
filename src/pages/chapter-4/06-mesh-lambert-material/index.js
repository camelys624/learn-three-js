import * as THREE from 'three';
import * as dat from 'dat.gui';
import {initResize, initCamera, initStats, initRenderer, addBasicMaterialSetting, loadGopher} from "../../../utils";

import React, {useEffect} from "react";

class MeshLambertMaterialDemo {
    init () {
        let stats = initStats();
        let renderer = initRenderer(undefined, 'mesh-lambert-material');
        let camera = initCamera();

        // create a scene, that will hold our elements such as objects, cameras and lights
        let scene = new THREE.Scene();

        let groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
        let groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({
            color: 0x555555
        }));
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.position.y = -20;
        scene.add(groundMesh);

        let sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
        let cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
        let planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

        let meshMaterial = new THREE.MeshLambertMaterial({
            color: 0x7777ff
        });
        let sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
        let cube = new THREE.Mesh(cubeGeometry, meshMaterial);
        let plane = new THREE.Mesh(planeGeometry, meshMaterial);

        let selectedMesh = cube;

        // position the sphere
        sphere.position.x = 0;
        sphere.position.y = 3;
        sphere.position.z = 2;

        cube.position.copy(sphere.position);
        plane.position.copy(sphere.position);

        scene.add(cube);

        // add subtle ambient lighting
        let ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        // add spotlight for the shadows
        let spotLight = new THREE.SpotLight();
        spotLight.position.set(-30, 60, 60);
        spotLight.castShadow = true;
        scene.add(spotLight);

        // call the render function
        let step = 0;

        let controls = {
            opacity: meshMaterial.opacity,
            transparent: meshMaterial.transparent,
            overdraw: meshMaterial.overdraw,
            visible: meshMaterial.visible,
            emissive: meshMaterial.emissive.getHex(),
            side: 'front',
            color: meshMaterial.color.getStyle(),
            wrapAround: false,
            wrapR: 1,
            wrapG: 1,
            wrapB: 1,
            selectedMesh: 'cube'
        };

        let gui = new dat.GUI();
        addBasicMaterialSetting(gui, controls, meshMaterial);
        let spGui = gui.addFolder('THREE.MeshLambertMaterial');
        spGui.addColor(controls, 'color').onChange(e => {
            meshMaterial.color.setStyle(e);
        });
        spGui.addColor(controls, 'emissive').onChange(e => {
            meshMaterial.emissive = new THREE.Color(e);
        });
        spGui.add(meshMaterial, 'wireframe');
        spGui.add(meshMaterial, 'wireframeLinewidth', 0, 20);

        loadGopher(meshMaterial).then(gopher => {
            gopher.scale.x = 4;
            gopher.scale.y = 4;
            gopher.scale.z = 4;

            gui.add(controls, 'selectedMesh', ['cube', 'sphere', 'plane', 'gopher']).onChange(e => {

                scene.remove(selectedMesh);

                switch (e) {
                    case 'cube':
                        scene.add(cube);
                        selectedMesh = cube;
                        break;
                    case 'sphere':
                        scene.add(sphere);
                        selectedMesh = sphere;
                        break;
                    case 'plane':
                        scene.add(plane);
                        selectedMesh = plane;
                        break;
                    case 'gopher':
                        scene.add(gopher);
                        selectedMesh = gopher;
                        break;
                }
            })
        });

        let render = function () {
            stats.update();

            selectedMesh.rotation.y = step += 0.01;

            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        render();
        initResize(camera, renderer);
    }
}

export default function MeshLambertMaterialDom() {
    useEffect(() => {
        let myMeshLambertMaterial = new MeshLambertMaterialDemo();
        myMeshLambertMaterial.init();
    });


    return <div id="mesh-lambert-material" className="chart-class"/>
}