import { Injectable } from '@angular/core';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

Injectable();
export class RedWallModelService {
  load(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera): void {
    new GLTFLoader().load(THREE_ENUMS.MODELS.RED_WALL, ({ scene: _scene }) => {
      _scene.position.set(43, -10, 8);
      _scene.rotation.y = -Math.PI / 3;
      scene.add(_scene);
      renderer.setAnimationLoop(() => renderer.render(scene, camera));
    });
  }
}
