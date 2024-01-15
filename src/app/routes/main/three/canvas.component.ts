import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
  inject,
} from '@angular/core';
import gsap from 'gsap';
import { Subscription, distinctUntilChanged, skip } from 'rxjs';
import { THREE_ENUMS } from 'src/app/common-utils/enums/three.enum';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SpotLight,
  Vector2,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { RodinThinkerModelService } from './services/rodin-thinker';

@Component({
  standalone: true,
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @Input() animationTimeLine: gsap.core.Timeline;

  @Output() progressChange = new EventEmitter<number>();
  @Output() onLoadThinkerComplete = new EventEmitter<boolean>();

  #renderer = new WebGLRenderer();
  #camera = new PerspectiveCamera();
  #scene = new Scene();
  #subscription: Subscription;
  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;
  #rodinThinkerModelService = inject(RodinThinkerModelService);

  ngAfterViewInit(): void {
    this.#viewContainerRef.appendChild(this.#renderer.domElement);
    this.#scene.position.y = -0.8;
    this.#renderer.shadowMap.enabled = true;
    this.#renderer.shadowMap.type = PCFSoftShadowMap;

    this.#mountCamera();
    this.#mountLights();
    this.#addGround();

    this.#rodinThinkerModelService.load(
      this.#renderer,
      this.#scene,
      this.#camera,
      this.onLoadThinkerComplete,
      this.progressChange
    );

    this.#configRenderer();

    window.addEventListener('resize', () => this.#onResizeWindow());
    window.addEventListener('mousemove', (event) => {
      gsap.to(this.#scene.rotation, { y: event.clientX / 1200 });
    });

    this.#subscription = this.onLoadThinkerComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() =>
        this.animationTimeLine
          .to(
            this.#camera.position,
            {
              z: 2,
              duration: 1,
              ease: 'sine',
            },
            '>-2.5'
          )
          .to(this.#scene.rotation, {
            y: '+=1.2',
            scrollTrigger: {
              scrub: true,
              trigger: this.#viewContainerRef,
              start: '50% center',
              end: '95% 5%',
            },
          })
      );
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
    this.#camera.position.set(0, 0.8, 8);
  }

  #onResizeWindow() {
    this.#camera.aspect =
      this.#viewContainerRef.offsetWidth / this.#viewContainerRef.offsetHeight;
    this.#camera.updateProjectionMatrix();
    this.#configRenderer();
  }

  #addGround() {
    const ground = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshStandardMaterial({
        emissive: 'rgb(254, 249, 245)',
        emissiveIntensity: 0.01,
      })
    );

    ground.rotation.x = 80.1;
    ground.receiveShadow = true;
    ground.position.set(0.3, -0.1, -1);
    this.#scene.add(ground);
  }

  #mountLights() {
    const ambientLight = new AmbientLight();
    const shadowLight = new DirectionalLight();
    const spotLight = new SpotLight(0xffffff, 0.5);

    shadowLight.position.set(-2, 2, 1);
    spotLight.position.set(2, 2, -this.#scene.position.z);
    spotLight.target.position.set(2, 0.5, -2);
    shadowLight.target.position.set(0.02, -0.4, -0.2);

    shadowLight.castShadow = true;
    spotLight.castShadow = true;

    shadowLight.shadow.bias = -0.001;
    shadowLight.shadow.mapSize = new Vector2(2048, 2048);
    shadowLight.shadow.camera.near = 0;
    shadowLight.shadow.camera.far = 300;

    this.#scene.add(ambientLight);
    this.#scene.add(shadowLight);
    this.#scene.add(spotLight);
  }

  #configRenderer() {
    this.#renderer.setSize(
      this.#viewContainerRef.offsetWidth,
      this.#viewContainerRef.offsetHeight
    );
    this.#renderer.setPixelRatio(devicePixelRatio);
    this.#renderer.render(this.#scene, this.#camera);
  }

  #loadThinkerModel() {}
}
