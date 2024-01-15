import { EventEmitter, Injectable } from '@angular/core';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

@Injectable()
export class RodinThinkerModelService {
  load(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera,
    onLoadThinkerComplete: EventEmitter<boolean>,
    progressChange: EventEmitter<number>
  ) {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.THINKER,
      ({ scene: _scene }) => {
        scene.add(_scene);

        scene.traverse(function (node) {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        renderer.setClearColor('#fff');

        const effectComposer = new EffectComposer(renderer);
        const renderScene = new RenderPass(scene, camera);
        const filmPass = new FilmPass(1, true);
        const bloom = new UnrealBloomPass(
          new Vector2(window.innerWidth, window.innerHeight),
          0.2,
          0.01,
          0.01
        );
        effectComposer.addPass(renderScene);
        effectComposer.addPass(filmPass);
        effectComposer.addPass(bloom);
        renderer.setAnimationLoop(() => {
          effectComposer.render();
          onLoadThinkerComplete.emit(true); // set model loading fully complete
        });
      },
      (event) => {
        const progress = Math.floor((event.loaded * 100) / event.total);
        progressChange.emit(progress);
      }
    );
  }
}
