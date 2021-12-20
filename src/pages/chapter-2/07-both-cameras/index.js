import React, {Component} from "react"
import {initStats} from "../../../utils"
import * as THREE from 'three'

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
    let planeMaterial
  }

}