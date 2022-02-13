import * as THREE from 'three';
import {initResize, initRenderer, initCamera, initStats} from "../../../utils";
import * as dat from 'dat.gui';

import React, {useEffect} from "react";

class MeshFaceMaterialDemo {
    #camera;
    #renderer;

    init() {
        let stats = initStats();
        this.#renderer = initRenderer(undefined, 'mesh-facematerial');
        this.#camera = initCamera();

        let scene = new THREE.Scene();

        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        let group = new THREE.Mesh();
        let mats = [];
        mats.push(new THREE.MeshBasicMaterial({color: 0x009e60}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffd500}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xc41e3a}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}));

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
                    let cube = new THREE.Mesh(cubeGeom, mats);
                    cube.position.set(x * 3 - 3, y * 3 - 3, z * 3 - 3);

                    group.add(cube);
                }
            }
        }

        group.scale.copy(new THREE.Vector3(2, 2, 2));
        scene.add(group);
        let step = 0;

        let controls = {
            rotationSpeed: 0.01,
            numberOfObjects: scene.children.length
        }

        let gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);

        let render = () => {
            stats.update();

            group.rotation.y = step += controls.rotationSpeed;
            group.rotation.x = step += controls.rotationSpeed;
            group.rotation.z = step -= controls.rotationSpeed;

            requestAnimationFrame(render);
            this.#renderer.render(scene, this.#camera);
        }

        render();
    }

    resize() {
        initResize(this.#camera, this.#renderer);
    }
}

export default function MeshFaceMaterialDom() {
    let myMeshFaceMaterial = new MeshFaceMaterialDemo();
    setTimeout(() => {
        myMeshFaceMaterial.init();
    }, 4);

    useEffect(() => {
        myMeshFaceMaterial.resize();
    });

    return <div id="mesh-facematerial" className="chart-class"/>
}