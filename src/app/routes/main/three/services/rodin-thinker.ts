import {
  EventEmitter,
  Injectable,
  WritableSignal,
  signal,
} from '@angular/core';
import gsap from 'gsap';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import {
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

@Injectable()
export class RodinThinkerModelService {
  #position: WritableSignal<Vector3> = signal(new Vector3(0, 0, 0));

  getPosition(): Vector3 {
    return this.#position();
  }

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
        _scene.position.set(1, -0.5, -4.5);
        this.#position.set(_scene.position);
        scene.add(_scene);

        _scene.traverse((node) => {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        const effectComposer = new EffectComposer(renderer);
        const renderScene = new RenderPass(scene, camera);
        const filmPass = new FilmPass(1.2);
        const bloom = new UnrealBloomPass(
          new Vector2(window.innerWidth, window.innerHeight),
          0.2,
          0.01,
          0.01
        );
        effectComposer.addPass(renderScene);
        effectComposer.addPass(filmPass);
        effectComposer.addPass(bloom);

        window.addEventListener('mousemove', (event) => {
          gsap.to(_scene.rotation, { y: event.clientX / 1200 });
        });

        renderer.setAnimationLoop(() => {
          effectComposer.render();
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
