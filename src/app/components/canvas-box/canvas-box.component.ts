import { Component, OnInit } from '@angular/core';
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

@Component({
  selector: 'app-canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.css']
})

export class CanvasBoxComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');
    if(!canvas) {
      return;
    }
    const scene = new THREE.Scene;
  
    //const geometry = new THREE.IcosahedronGeometry(3, 10);
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: '#00ff83',
      roughness: 0.5,
    })
    const mesh = new THREE.Mesh(geometry, material);

    /*
    const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
    let wireframe = new THREE.Mesh( geometry, wireframeMaterial );
    mesh.add( wireframe );
    */

    scene.add(mesh);

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //Light
    const light = new THREE.PointLight(0xffffff, 200, 100);
    light.position.set(0, 10, 10);
    scene.add(light);
    
    //Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width , sizes.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);

    //Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

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

    const loop = () => {
      controls.update();
      renderer.render(scene,camera);
      window.requestAnimationFrame(loop);
    }
    loop();

    //Timeline
    const t1 = gsap.timeline({defaults: {duration: 1}});
    t1.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
    t1.fromTo('nav', {y: '-100%'}, {y: '0%'});
    t1.fromTo('.title', {opacity: 0}, {opacity: 1});

    //Mouse Animation Color
    let mouseDown = false;
    let rgb = [];
    window.addEventListener("mousedown", () => (mouseDown = true));
    window.addEventListener("mouseup", () => (mouseDown = false));

    window.addEventListener('mousemove', (e) => {
      if(mouseDown) {
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.height) * 255),
          150,
        ]
        //Animation
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
          r:newColor.r,
          g:newColor.g,
          b:newColor.b
        })
      }
    });
  }

}
