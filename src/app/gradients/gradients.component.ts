import { Component, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';

// @ts-ignore
import vertexShader from './shaders/vertex.glsl';
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl';

@Component({
  selector: 'app-gradients',
  templateUrl: './gradients.component.html',
  styleUrls: ['./gradients.component.css']
})
export class GradientsComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');
    if(!canvas) {
      return;
    }
    const scene = new THREE.Scene;
    
    const geometry = new THREE.PlaneGeometry()
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //Light
    const dirLight = new THREE.DirectionalLight('#ffffff', 1);
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
    scene.add(dirLight, ambientLight);
    
    //Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 10;
    scene.add(camera);

    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width , sizes.height);
    renderer.setPixelRatio(2);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
  

    //Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    //controls.enableZoom = false;

    //Resize
    window.addEventListener('resize', () => {
      //Update Sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      //Update Camera
      camera.aspect = sizes.width/sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    const clock = new THREE.Clock();

    const loop = () => {
      composer.render();
      controls.update();
      requestAnimationFrame(loop);
    }
    loop();
  }

}
