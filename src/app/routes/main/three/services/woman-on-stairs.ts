import { Injectable } from '@angular/core';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable()
export class WomanOnStairsModelService {
  load(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.WOMAN_ON_STAIRS,
      ({ scene: _scene }) => {
        _scene.position.set(7.2, -0.4, -3);
        _scene.rotation.y = -Math.PI / 2.8;
        scene.add(_scene);

        _scene.traverse((node) => {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        renderer.setAnimationLoop(() => renderer.render(scene, camera));
      }
    );
  }
}
