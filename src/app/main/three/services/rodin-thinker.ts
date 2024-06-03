import {
  EventEmitter,
  Injectable,
  WritableSignal,
  signal,
} from '@angular/core';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import {
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable()
export class RodinThinkerModelService {
  load(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera,
    onLoadModelsComplete: EventEmitter<boolean>,
    progressChange: EventEmitter<number>
  ) {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.THINKER,
      ({ scene: _scene }) => {
        _scene.position.set(1, -0.5, -3.7);
        scene.add(_scene);
        _scene.traverse((node) => {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
          onLoadModelsComplete.emit(true); // set model loading fully complete
        });
      },
      (event) => {
        const progress = Math.floor((event.loaded * 100) / event.total);
        progressChange.emit(progress);
      }
    );
  }
}
