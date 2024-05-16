import { Component, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'

// @ts-ignore
import vertexShader from './shaders/vertex.glsl';
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl';

@Component({
  selector: 'app-cartoon',
  templateUrl: './cartoon.component.html',
  styleUrls: ['./cartoon.component.css']
})
export class CartoonComponent implements OnInit {
  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');
    if(!canvas) {
      return;
    }
    const scene = new THREE.Scene;
    
    const MOTION_BLUR_AMOUNT = 0.25;
    
    const solidify = (mesh: THREE.Mesh<THREE.TorusKnotGeometry, THREE.MeshToonMaterial, THREE.Object3DEventMap>) => {
      const geometry = mesh.geometry;
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.BackSide
      });
      const outline = new THREE.Mesh(geometry, material);
      scene.add(outline);
    }

    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 100);
    const material = new THREE.MeshToonMaterial({
      color: '#4e62f9',
    });
    const torus = new THREE.Mesh(geometry, material);
    const outline = solidify(torus);

    scene.add(torus);

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    //Light
    const dirLight = new THREE.DirectionalLight('#ffffff', 1.5);
    const dirLight2 = new THREE.DirectionalLight('#ffffff', 1.5);
    dirLight2.position.y += 5;
    const dirLight3 = new THREE.DirectionalLight('#ffffff', 1.5);
    dirLight2.position.x -= 5;
    const ambientLight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(dirLight, dirLight3, ambientLight);
    
    //Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 10;
    scene.add(camera);
    scene.background = new THREE.Color( 0x636363 );

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

    // postprocessing
    const renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
    }

    // save pass
    const savePass = new SavePass(new THREE.WebGLRenderTarget(sizes.width , sizes.height, renderTargetParameters));

    // blend pass
    const blendPass = new ShaderPass(BlendShader, 'tDiffuse1');
    blendPass.uniforms['tDiffuse2'].value = savePass.renderTarget.texture;
    blendPass.uniforms['mixRatio'].value = MOTION_BLUR_AMOUNT;

    // output pass
    const outputPass = new ShaderPass(CopyShader);
    outputPass.renderToScreen = true;

    // adding passes to composer
    composer.addPass(blendPass);
    composer.addPass(savePass);
    composer.addPass(outputPass);

      const loop = () => {
        composer.render();
        controls.update();
        requestAnimationFrame(loop);
      }
      loop();
    }
}
