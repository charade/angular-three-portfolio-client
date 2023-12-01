import { Injectable } from '@angular/core';
import {
  Scene,
  Camera,
  WebGLRenderer,
  AnimationMixer,
  AnimationClip,
  Clock,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { THREE_ENUMS } from 'src/app/utils/enums/three.enum';

interface LoadWorldType {
  world: Scene;
  renderer: WebGLRenderer;
  camera: Camera;
  clock: Clock;
  controls: OrbitControls;
}
@Injectable()
export class WorldService {
  load(avatarData: LoadWorldType): void {
    const { world, renderer, camera, clock, controls } = avatarData;

    const effectComposer = new EffectComposer(renderer);
    const renderScene = new RenderPass(world, camera);
    const glitchEffect = new GlitchPass();
    effectComposer.addPass(renderScene);
    effectComposer.addPass(glitchEffect);

    new GLTFLoader().load(
      THREE_ENUMS.MODELS.AVATAR,
      ({ scene, animations }) => {
        world.add(scene);
        const mixer = new AnimationMixer(scene);
        // set idle animation
        const idle_animation = AnimationClip.findByName(
          animations,
          THREE_ENUMS.AnimationActions.IDLE
        );
        const idleAction = mixer.clipAction(idle_animation);
        idleAction.play();
        // set hello animation
        const hello_animation = AnimationClip.findByName(
          animations,
          THREE_ENUMS.AnimationActions.HELLO
        );
        const helloAction = mixer.clipAction(hello_animation);
        // helloAction.play();
        // set mouth animation
        const mouth_animation = AnimationClip.findByName(
          animations,
          THREE_ENUMS.AnimationActions.MOUTH
        );
        const mouthAction = mixer.clipAction(mouth_animation);
        // mouthAction.play()

        const speak_animation = AnimationClip.findByName(
          animations,
          THREE_ENUMS.AnimationActions.TALKING
        );

        const speakAction = mixer.clipAction(speak_animation);
        // speakAction.play()
        renderer.setAnimationLoop(() => {
          this.#animate(
            renderer,
            world,
            camera,
            clock,
            mixer,
            controls,
            effectComposer
          );
        });
        // world env color
        renderer.setClearColor(0xffffff);
      }
    );
  }

  // launch animation actions
  #animate(
    renderer: WebGLRenderer,
    world: Scene,
    camera: Camera,
    clock: Clock,
    mixer: THREE.AnimationMixer,
    controls: OrbitControls,
    effectComposer: EffectComposer
  ) {
    if (mixer) {
      mixer.update(clock.getDelta());
      controls.update(clock.getDelta());

      // on entering scene
      if (clock.getElapsedTime() < 3.4 && clock.getElapsedTime() > 2.5) {
        effectComposer.render();
      } else {
        renderer.render(world, camera);
      }
    }
  }
}
