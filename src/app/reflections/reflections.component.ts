import { Component, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';

// @ts-ignore
import vertexShader from './shaders/vertex.glsl';
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl';

// @ts-ignore
import backgroundVertexShader from './shaders/backgroundVertex.glsl';
// @ts-ignore
import backgroundFragmentShader from './shaders/backgroundFragment.glsl';


// @ts-ignore
//import vertexShader from './shaders/test2.glsl';
// @ts-ignore
//import fragmentShader from './shaders/test.glsl';

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
      new THREE.IcosahedronGeometry(1, 2),
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

    // Inspired by https://discourse.threejs.org/t/change-vertex-position-over-time/31309
    let radius = 2;
    let nPos = [];
    let v3 = new THREE.Vector3();
    let pos = icosahedron.geometry.attributes['position'];
    for (let i = 0; i < pos.count; i++){
      v3.fromBufferAttribute(pos, i).normalize();
      nPos.push(v3.clone());
    }
    icosahedron.geometry.userData['nPos'] = nPos;

    scene.add(icosahedron);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
      new THREE.ShaderMaterial({
        vertexShader: backgroundVertexShader,
        fragmentShader: backgroundFragmentShader
      }));
    plane.position.setZ(-5);
    scene.add(plane);

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
    /*
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.35,
      0.0001,
      0.1
    );
    composer.addPass(bloomPass);
    */
  

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
    let noise = new ImprovedNoise();

    const loop = () => {
      const elapsedTime = clock.getElapsedTime();
      icosahedron.geometry.userData['nPos'].forEach((p: THREE.Vector3, idx: number) => {
        let ns = noise.noise(p.x + elapsedTime * 0.25, p.y + elapsedTime * 0.25, p.z + elapsedTime * 0.25);
        v3.copy(p).multiplyScalar(radius).addScaledVector(p, ns);
        pos.setXYZ(idx, v3.x, v3.y, v3.z);
      })
      icosahedron.geometry.computeVertexNormals();
      pos.needsUpdate = true;
      composer.render();
      controls.update();
      requestAnimationFrame(loop);
    }
    loop();
  }

}

