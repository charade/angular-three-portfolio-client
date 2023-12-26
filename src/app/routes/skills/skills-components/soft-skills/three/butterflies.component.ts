import {
  AfterViewInit,
  Component,
  Input,
  ViewContainerRef,
  inject,
} from '@angular/core';
import gsap from 'gsap';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  BoxGeometry,
  Clock,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

@Component({
  standalone: true,
  selector: 'app-butterflies',
  templateUrl: './butterflies.component.html',
  styleUrls: ['./butterflies.component.scss'],
})
export class ButterfliesComponent implements AfterViewInit {
  #viewContainer: HTMLElement = inject(ViewContainerRef).element.nativeElement;

  #render = new WebGLRenderer({ antialias: true });
  #clock = new Clock();
  #camera = new PerspectiveCamera();

  #scene = new Scene();
  #bloomEffect = new BloomPass();
  #effectComposer: EffectComposer;

  ngAfterViewInit(): void {
    this.#viewContainer.appendChild(this.#render.domElement);

    this.#scene.position.set(-0.5, -0.7, 0);

    this.#configRenderer();
    this.#mountCamera();
    this.#mountLights();
    this.#loadButterFliesAnimation();

    window.addEventListener('resize', () => this.#onResizeWindow());
  }

  #mountCamera() {
    const aspect =
      this.#viewContainer.offsetWidth / this.#viewContainer.offsetHeight;
    this.#camera = new PerspectiveCamera(75, aspect, 0.1, 100);
    this.#camera.position.set(0, 1, 4);

    // camera animation en entering scene
    // camera cinematic from top to initial position
    gsap.from(this.#camera.position, {
      ...{ y: 25, z: -25 }, // setting default position
      duration: 3,
    });
  }

  #onResizeWindow() {
    const aspect =
      this.#viewContainer.offsetWidth / this.#viewContainer.offsetHeight;
    this.#camera.aspect = aspect;
    // this.#camera.lookAt(this.#scene.position);
    this.#camera.updateProjectionMatrix();
    
    this.#configRenderer();
    this.#render.render(this.#scene, this.#camera);
  }

  #mountLights() {
    const ambientLight = new AmbientLight();
    this.#scene.add(ambientLight);
  }

  #configRenderer() {
    this.#render.setSize(window.innerWidth, window.innerHeight);
    this.#render.setPixelRatio(devicePixelRatio);
  }

  #loadButterFliesAnimation() {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.BUTTERFLIES,
      ({ scene, animations }) => {
        this.#scene.add(scene);
        const mixer = new AnimationMixer(this.#scene);

        const actionAnimation = AnimationClip.findByName(
          animations,
          THREE_ENUMS.AnimationActions.BUTTERFLIES
        );

        const animation = mixer.clipAction(actionAnimation);
        animation.play();
        this.#render.setAnimationLoop(() => {
          if (mixer) {
            this.#render.setClearColor(0xFFFFFF);
            mixer.update(this.#clock.getDelta());
            this.#render.render(this.#scene, this.#camera);
          }
        });
      }
    );
  }
}
