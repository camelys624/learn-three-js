import * as THREE from 'three';
import * as dat from 'dat.gui';
import {addBasicMaterialSetting, initRenderer, initResize, initStats, loadGopher} from "../../../utils";
import React,{useEffect} from "react";

class MeshNormalMaterialDemo {
    init() {
        let stats = initStats();
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-20, 30, 40);
        camera.lookAt(new THREE.Vector3(10, 0, 0));

        let renderer = initRenderer(undefined, 'mesh-normal-material');

        let groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
        let groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({
            color: 0x777777
        }));
        groundMesh.rotation.x = -0.5 * Math.PI;
        groundMesh.position.y = -20;
        scene.add(groundMesh);

        let sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
        let cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
        let planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

        let meshMaterial = new THREE.MeshNormalMaterial();
        let sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
        let cube = new THREE.Mesh(cubeGeometry, meshMaterial);
        let plane = new THREE.Mesh(planeGeometry, meshMaterial);

        let selectedMesh = cube;

        // position the sphere
        sphere.position.x = 0;
        sphere.position.y = 3;
        sphere.position.z = 2;

        for (let f = 0; f < sphere.geometry.faces.length; f ++) {
            let face = sphere.geometry.faces[f];
            let centroid = new THREE.Vector3(0, 5, 5);
            centroid.add(sphere.geometry.vertices[face.a]);
            centroid.add(sphere.geometry.vertices[face.b]);
            centroid.add(sphere.geometry.vertices[face.c]);
            centroid.divideScalar(3);

            let arrow = new THREE.ArrowHelper(
                face.normal,
                centroid,
                2,
                0x3333ff,
                0.5,
                0.5
            )
            scene.add(arrow);
        }

        cube.position.copy(sphere.position);
        plane.position.copy(sphere.position);

        scene.add(cube);

        let ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);

        let step = 0;

        let controls = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            selectedMesh: 'cube'
        }

        let gui = new dat.GUI();
        addBasicMaterialSetting(gui, controls, meshMaterial);

        loadGopher(meshMaterial).then(gopher => {
            gopher.scale.x = 4;
            gopher.scale.y = 4;
            gopher.scale.z = 4;
            gui.add(controls, 'selectedMesh', ['cube', 'sphere', 'plane', 'gopher']).onChange(e => {
                scene.remove(plane);
                scene.remove(cube);
                scene.remove(sphere);
                scene.remove(gopher);

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
            });
        });

        let render = function () {
            stats.update();
            step += 0.01;
            selectedMesh.rotation.y = step;

            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        render();
        initResize(camera, renderer);
    }
}

export default function MeshNormalMaterialDom() {
    useEffect(() => {
        let myMeshNormalMaterial = new MeshNormalMaterialDemo();
        myMeshNormalMaterial.init();
    });

    return <div className="chart-class" id="mesh-normal-material"/>
}