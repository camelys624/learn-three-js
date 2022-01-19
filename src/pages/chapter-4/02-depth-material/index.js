import * as THREE from 'three';
import * as dat from 'dat.gui';
import {initResize, initRenderer, initStats, addBasicMaterialSetting} from "../../../utils";

import React, {useEffect} from "react";

class DepthMaterialDemo {
    init() {
        let stats = initStats();
        let renderer = initRenderer(undefined, 'depth-material');
        let scene = new THREE.Scene();
        scene.overrideMaterial = new THREE.MeshDepthMaterial();

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 50, 110);
        camera.position.set(-50, 40, 50);
        camera.lookAt(scene.position);

        let step = 0;

        let controls = {
            cameraNear: camera.near,
            cameraFar: camera.far,
            rotationSpeed: 0.02,
            numberOfObjects: scene.children.length,

            removeCube() {
                let allChildren = scene.children;
                let lastObject = allChildren[allChildren.length - 1];
                if (lastObject instanceof THREE.Mesh) {
                    scene.remove(lastObject);
                    this.numberOfObjects = scene.children.length;
                }
            },
            addCube() {
                let cubeSize = Math.ceil(3 + Math.random() * 3);
                let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                let cubeMaterial = new THREE.MeshLambertMaterial({
                    color: Math.random() * 0xffffff
                });
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;

                cube.position.x = -60 + Math.round(Math.random() * 100);
                cube.position.y = Math.round(Math.random() * 10);
                cube.position.z = -100 + Math.round(Math.random() * 150);

                scene.add(cube);
                this.numberOfObjects = scene.children.length;
            },
            outputObjects() {
                console.log(scene.children);
            }
        }

        let gui = new dat.GUI();
        addBasicMaterialSetting(gui, controls, scene.overrideMaterial);
        let spGui = gui.addFolder('THREE.MeshDepthMaterial');
        spGui.add(scene.overrideMaterial, 'wireframe');
        spGui.add(scene.overrideMaterial, 'wireframeLinewidth', 0, 20);

        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'cameraNear', 0, 100).onChange(e => {
            camera.near = e;
            camera.updateProjectionMatrix();
        });
        gui.add(controls, 'cameraFar', 50, 200).onChange(e => {
            camera.far = e;
            camera.updateProjectionMatrix();
        });

        let i = 0;
        while (i < 10) {
            controls.addCube();
            i++;
        }

        let render = function () {
            stats.update();

            scene.traverse(e => {
                if (e instanceof  THREE.Mesh) {
                    e.rotation.x += controls.rotationSpeed;
                    e.rotation.y += controls.rotationSpeed;
                    e.rotation.z += controls.rotationSpeed;
                }
            });

            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        render();

        initResize(camera, renderer);
    }
}

export default function DepthMaterialDom() {
    useEffect(() => {
        let myDepthMaterial = new DepthMaterialDemo();
        myDepthMaterial.init();
    });

    return <div className="chart-class" id="depth-material"/>
}