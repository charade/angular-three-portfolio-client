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
import { Subscription, distinctUntilChanged, skip } from 'rxjs';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  SpotLight,
  Vector2,
  WebGLRenderer,
} from 'three';

import { RodinThinkerModelService } from './services/rodin-thinker';
import { WomanOnStairsModelService } from './services/woman-on-stairs';
import gsap from 'gsap';

@Component({
  standalone: true,
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @Input() animationTimeLine: gsap.core.Timeline;

  @Output() progressChange = new EventEmitter<number>();
  @Output() onLoadModelsComplete = new EventEmitter<boolean>();
  #camera: PerspectiveCamera;
  #renderer = new WebGLRenderer();
  #scene = new Scene();
  #subscription: Subscription;
  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;
  #rodinThinkerModelService = inject(RodinThinkerModelService);
  #womanOnStairsModelService = inject(WomanOnStairsModelService);

  ngAfterViewInit(): void {
    this.#viewContainerRef.appendChild(this.#renderer.domElement);
    this.#scene.position.y = -0.8;
    this.#scene.position.x = -0.4;
    this.#renderer.shadowMap.enabled = true;
    this.#renderer.shadowMap.type = PCFSoftShadowMap;
    this.#renderer.setClearColor('rgb(255, 250, 243)');
    this.#mountCamera();
    this.#mountLights();
    this.#addGround();

    this.#rodinThinkerModelService.load(
      this.#renderer,
      this.#scene,
      this.#camera,
      this.onLoadModelsComplete,
      this.progressChange
    );

    this.#womanOnStairsModelService.load(
      this.#renderer,
      this.#scene,
      this.#camera
    );

    this.#configRenderer();

    window.addEventListener('resize', () => this.#onResizeWindow());

    this.#subscription = this.onLoadModelsComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() => {
        this.animationTimeLine.from(
          this.#scene.position,
          {
            z: -5,
            duration: 1,
            ease: 'sine',
          },
          '>-1.8'
        );

        gsap
          .timeline({
            ease: 'none',
            scrollTrigger: {
              trigger: 'section.soft-skills', // soft-skills section
              start: 'top 70%',
              end: 'top 60%',
              scrub: 4,
            },
          })
          .to(
            this.#camera.position,
            {
              z: this.#camera.position.z + 1,
            },
            'enter-soft-skills'
          )
          .to(
            this.#camera.rotation,
            {
              y: '-=0.8',
              // duration: 5,
            },
            'enter-soft-skills'
          );
      });
  }

  ngOnDestroy(): void {
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }

  #mountCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    this.#camera = new PerspectiveCamera(35, aspect, 0.1, 100);
    this.#camera.position.set(0, 0.5, 2)
  }

  #onResizeWindow() {
    this.#camera.aspect = window.innerWidth / window.innerHeight;
    this.#camera.updateProjectionMatrix();
    this.#camera.updateMatrixWorld();
    this.#configRenderer();
  }

  #addGround() {
    const planeGeometry = new PlaneGeometry(500, 500);
    const planeMaterial = new MeshStandardMaterial({
      emissiveIntensity: 0.007,
    });

    const ground = new Mesh(planeGeometry, planeMaterial);

    ground.position.set(0.3, 0, 50);
    ground.rotation.x = 80.1;
    ground.receiveShadow = true;

    this.#scene.add(ground);
  }

  #mountLights() {
    const ambientLight = new AmbientLight();
    const shadowLight = new DirectionalLight();
    const spotLight = new SpotLight(0xffffff, 0.5);
    const pointLight = new PointLight(0xffffff);

    shadowLight.position.set(-2, 2, 1);
    spotLight.position.set(2, 2, -this.#scene.position.z);
    pointLight.position.set(-1, 3, -1);

    shadowLight.castShadow = true;
    spotLight.castShadow = true;

    shadowLight.shadow.bias = -0.001;
    shadowLight.shadow.mapSize = new Vector2(2048, 2048);
    shadowLight.shadow.camera.near = 0;
    shadowLight.shadow.camera.far = 300;

    this.#scene.add(ambientLight);
    this.#scene.add(shadowLight);
    this.#scene.add(spotLight);
    this.#scene.add(pointLight);
    this.#scene.add(new PointLightHelper(pointLight));
  }

  #configRenderer() {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
    this.#renderer.setPixelRatio(devicePixelRatio);
    this.#renderer.render(this.#scene, this.#camera);
  }
}
