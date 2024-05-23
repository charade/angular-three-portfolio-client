import { Injectable } from '@angular/core';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable()
export class WomanOnStairsModelService {
  #position = new Vector3(0, 0, 0);

  getPosition() {
    return this.#position;
  }

  load(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.WOMAN_ON_STAIRS,
      ({ scene: _scene }) => {
        _scene.position.set(5.8, -0.7, -2);
        this.#position = _scene.position;

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
