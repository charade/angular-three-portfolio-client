import { Injectable } from '@angular/core';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable()
export class ColumnModelService {
  #position = new Vector3(0, 0, 0);

  getPosition() {
    return this.#position;
  }

  load(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera): void {
    new GLTFLoader().load(THREE_ENUMS.MODELS.COLUMN, ({ scene: _scene }) => {
      // _scene.position.set(150, -5, -300);
      _scene.scale.set(0.07, 0.07, 0.07);
      _scene.position.set(20, -0.04, 48);
      this.#position = _scene.position;

      _scene.rotation.y = Math.PI / 3;
      scene.add(_scene);

      renderer.setAnimationLoop(() => renderer.render(scene, camera));
    });
  }
}
