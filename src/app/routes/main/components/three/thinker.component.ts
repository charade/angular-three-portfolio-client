import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import gsap from 'gsap';
import { Subscription, distinctUntilChanged, skip } from 'rxjs';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import {
  BasicShadowMap,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  SpotLight,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  standalone: true,
  selector: 'app-thinker',
  templateUrl: './thinker.component.html',
  styleUrls: ['./thinker.component.scss'],
})
export class ThinkerModelComponent implements AfterViewInit, OnDestroy {
  @Input() animationTimeLine: gsap.core.Timeline;

  @Output() progressChange = new EventEmitter<number>();
  @Output() onLoadThinkerComplete = new EventEmitter<boolean>();

  #renderer = new WebGLRenderer();
  #camera = new PerspectiveCamera();
  #scene = new Scene();
  #subscription: Subscription;
  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;

  ngAfterViewInit(): void {
    this.#viewContainerRef.appendChild(this.#renderer.domElement);

    this.#scene.position.set(0.35, -1, 0);

    this.#mountCamera();
    this.#mountLights();
    this.#loadThinkerModel();

    this.#subscription = this.onLoadThinkerComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() =>
        this.animationTimeLine
          .to(this.#camera.position, {
            z: 2,
            delay: 0.2,
            duration: 1,
          })
          .to(this.#scene.rotation, {
            y: '+=2.5',
            scrollTrigger: {
              scrub: true,
              trigger: this.#viewContainerRef,
              start: '60% center',
            },
          })
      );

    this.#configRenderer();
    window.addEventListener('resize', () => this.#onResizeWindow());
    window.addEventListener('mousemove', (event) => {
      gsap.to(this.#scene.rotation, { y: event.clientX / 1000 });
    });
  }

  ngOnDestroy(): void {
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }

  #mountCamera() {
    const aspect =
      this.#viewContainerRef.offsetWidth / this.#viewContainerRef.offsetHeight;
    this.#camera.aspect = aspect;

    this.#camera = new PerspectiveCamera(75, aspect, 0.1, 100);
    this.#camera.position.set(0, 0, -5);
  }

  #onResizeWindow() {
    this.#camera.aspect =
      this.#viewContainerRef.offsetWidth / this.#viewContainerRef.offsetHeight;
    this.#camera.updateProjectionMatrix();
    this.#configRenderer();
  }

  #mountLights() {
    const hemisphereLight = new HemisphereLight();
    const frontDownPointLight = new SpotLight(0xffffff);
    const frontUpPointLight = new SpotLight(0xffff0);
    frontDownPointLight.castShadow = true;
    frontUpPointLight.castShadow = true;

    frontDownPointLight.position.set(0, 0, 2);
    frontUpPointLight.position.set(-0.5, 1, 2);
    this.#scene.add(frontDownPointLight);
    this.#scene.add(frontUpPointLight);
    this.#scene.add(hemisphereLight);
  }

  #configRenderer() {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
    this.#renderer.setPixelRatio(devicePixelRatio);
    this.#renderer.shadowMap.enabled = true;
    this.#renderer.shadowMap.type = BasicShadowMap;
    this.#renderer.render(this.#scene, this.#camera);
  }

  #loadThinkerModel() {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.THINKER,
      ({ scene }) => {
        scene.traverse(function (node) {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        this.#scene.add(scene);

        this.#renderer.setClearColor('rgb(254, 249, 245)');
        this.#renderer.setAnimationLoop(() => {
          this.#renderer.render(this.#scene, this.#camera);
          this.onLoadThinkerComplete.emit(true);
        });
      },
      (event) => {
        const progress = Math.floor((event.loaded * 100) / event.total);
        this.progressChange.emit(progress);
      }
    );
  }
}
