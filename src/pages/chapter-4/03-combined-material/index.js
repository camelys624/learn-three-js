import * as THREE from 'three';
import * as dat from 'dat.gui';
import {initResize, initStats, initRenderer} from "../../../utils";
import {SceneUtils} from "three/examples/jsm/utils/SceneUtils";

import React, {useEffect} from "react";

class CombinedMaterialDemo {
    init() {
        let stats = initStats();
        let renderer = initRenderer(undefined, 'combine-material');

        let scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 50, 110);
        camera.position.set(-50, 40, 50);
        camera.lookAt(scene.position);

        let controls = {
            cameraNear: camera.near,
            cameraFar: camera.far,
            rotationSpeed: 0.02,
            numberOfObjects: scene.children.length,
            color: 0x00ff00,

            removeCube() {
                let allChildren = scene.children;
                let lastObject = allChildren[allChildren.length - 1];
                if (lastObject instanceof THREE.Group) {
                    scene.remove(lastObject);
                    this.numberOfObjects = scene.children.length;
                }
            },
            addCube() {
                let cubeSize = Math.ceil(3 + Math.random() * 3);
                let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

                let cubeMaterial = new THREE.MeshDepthMaterial();
                let colorMaterial = new THREE.MeshBasicMaterial({
                    color: controls.color,
                    transparent: true,
                    blending: THREE.MultiplyBlending
                });
                let cube = new SceneUtils.createMultiMaterialObject(cubeGeometry, [colorMaterial, cubeMaterial]);
                cube.children[1].scale.set(0.99, 0.99, 0.99);
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
        };

        let gui = new dat.GUI();
        gui.addColor(controls, 'color');
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'cameraNear', 0, 50).onChange(e => {
            camera.near = e;
            camera.updateProjectionMatrix();
        });
        gui.add(controls, 'cameraFar', 50, 200).onChange(e => {
            camera.far = e;
            camera.updateProjectionMatrix();
        });

        for (let i = 0; i < 10; i++) {
            controls.addCube();
        }

        let render = function () {
            stats.update();

            // rotate the cubes around its axes
            scene.traverse(function (e) {
                if (e instanceof THREE.Group) {
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

export default function CombinedMaterialDom() {
    useEffect(() => {
        let myCombinedMaterial = new CombinedMaterialDemo();
        myCombinedMaterial.init();
    })

    return <div id="combine-material" className="chart-class"/>
}