import { Component, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';

// @ts-ignore
import vertexShader from './shaders/vertex.glsl';
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl';

@Component({
  selector: 'app-reflections',
  templateUrl: './reflections.component.html',
  styleUrls: ['./reflections.component.css']
})
export class ReflectionsComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');
    if(!canvas) {
      return;
    }
    const scene = new THREE.Scene;

    function setupAttributes( geometry: THREE.IcosahedronGeometry ) {

      const vectors = [
        new THREE.Vector3( 1, 0, 0 ),
        new THREE.Vector3( 0, 1, 0 ),
        new THREE.Vector3( 0, 0, 1 )
      ];

      const position = geometry.attributes['position'];
      const centers = new Float32Array( position.count * 3 );

      for ( let i = 0, l = position.count; i < l; i ++ ) {

        vectors[ i % 3 ].toArray( centers, i * 3 );

      }

      geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

    }

    const icosahedron = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1,1),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        //wireframe: true,
        uniforms: {
          uTime: {value: 0},
        },
        alphaToCoverage: true
      })
    )
    setupAttributes(icosahedron.geometry);
    scene.add(icosahedron);

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //Light
    const ambientLight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(ambientLight);
    
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
      //const elapsedTime = clock.getElapsedTime();
      //torus.material.uniforms['uTime'].value = elapsedTime;
      composer.render();
      controls.update();
      requestAnimationFrame(loop);
    }
    loop();
  }

}

