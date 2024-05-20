
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.css']
})
export class ParticlesComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {


    //Texture Loader
    const loader = new THREE.TextureLoader();
    const cross = loader.load('./assets/cross.png');

    //Canvas
    const canvas = document.getElementById('canvas-box');
    if(!canvas) {
      return;
    }
    const scene = new THREE.Scene;
    
    //Objects
    const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

    const particlesGeometry = new THREE.BufferGeometry;
    const particlesCnt = 5000;

    const posArray = new Float32Array(particlesCnt * 3);
    // xyz, xyz, xyz, xyz

    //assign the xyz position of every particle
    for(let i = 0; i < particlesCnt * 3; i++) {
      //posArray[i] = Math.random();
      
      //center the particles
      //posArray[i] = Math.random() - 0.5;
      
      posArray[i] = (Math.random() - 0.5) * 5 * Math.random();
    }

    //Assign positions to each particle
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.005,
    });

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.004,
      map: cross,
      transparent: true,
      //blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Points(geometry, material);
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

    scene.add(mesh, particlesMesh);

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //Light
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    
    //Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 2;
    scene.add(camera);

    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width , sizes.height);
    renderer.setPixelRatio(Math.min(2,window.devicePixelRatio));
    renderer.setClearColor(new THREE.Color('#21282a'), 1);

    //Controls

    //Resize
    window.addEventListener('resize', () => {
      //Update Sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      //Update Camera
      camera.aspect = sizes.width/sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(2,window.devicePixelRatio));
    });

    const clock = new THREE.Clock();

    //Mouse
    document.addEventListener('mousemove', animateParticles) 
    let mouseX = 0;
    let mouseY = 0;
    function animateParticles(event: { clientX: number; clientY: number; }) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    const loop = () => {
      const elapsedTime = clock.getElapsedTime();

      mesh.rotation.y = .5 * elapsedTime;
      particlesMesh.rotation.y = mouseX * elapsedTime * 0.0008;
      //controls.update();
      renderer.render(scene,camera);
      window.requestAnimationFrame(loop);
    }
    loop();
  }

}
