import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  inject,
} from '@angular/core';
import gsap from 'gsap';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

  ngAfterViewInit(): void {
    this.#viewContainer.appendChild(this.#render.domElement);
    this.#scene.position.set(-0.5, -0.7, 0);

    this.#configRenderer();
    this.#mountCamera();
    this.#mountLights();
    this.#loadButterFliesAnimation();
    // this.#mountControls();

    window.addEventListener('resize', () => this.#onResizeWindow());

    window.addEventListener('mousemove', (event) => {
      gsap.to(this.#scene.rotation, { y: event.clientX / 500 });
    });
  }

  #mountCamera() {
    const aspect =
      this.#viewContainer.offsetWidth / this.#viewContainer.offsetHeight;
    this.#camera = new PerspectiveCamera(75, aspect, 0.1, 100);
    this.#camera.position.set(0, 1, 4);

    // camera animation en entering scene
    // camera cinematic from top to initial position
    gsap.from(this.#camera.position, {
      y: 25,
      z: -25, // setting default position
      duration: 2,
      delay: 4,
    });
  }

  #mountControls() {
    const orbitControls = new OrbitControls(
      this.#camera,
      this.#render.domElement
    );
    orbitControls.addEventListener('change', () =>
      this.#render.render(this.#scene, this.#camera)
    );
  }

  #onResizeWindow() {
    const aspect =
      this.#viewContainer.offsetWidth / this.#viewContainer.offsetHeight;
    this.#camera.aspect = aspect;
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
            this.#render.setClearColor(0xffffff);
            mixer.update(this.#clock.getDelta());
            this.#render.render(this.#scene, this.#camera);
          }
        });
      }
    );
  }
}
