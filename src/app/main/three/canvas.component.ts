import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  NgZone,
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
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector2,
  WebGLRenderer,
  Color,
} from 'three';

import { RodinThinkerModelService } from './services/rodin-thinker';
import { WomanOnStairsModelService } from './services/woman-on-stairs';
import gsap from 'gsap';
import { ColumnModelService } from './services/column';

@Component({
  standalone: true,
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @Input() animationTimeline: gsap.core.Timeline;

  @Output() progressChange = new EventEmitter<number>();
  @Output() onLoadModelsComplete = new EventEmitter<boolean>();
  #camera: PerspectiveCamera;
  #renderer = new WebGLRenderer();
  #scene = new Scene();
  #subscription: Subscription;

  #viewContainerRef = inject(ViewContainerRef).element.nativeElement;
  #rodinThinkerModelService = inject(RodinThinkerModelService);
  #womanOnStairsModelService = inject(WomanOnStairsModelService);
  #columnService = inject(ColumnModelService);
  #ngZone = inject(NgZone);

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

    this.#ngZone.runOutsideAngular(() => {
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

      this.#columnService.load(this.#renderer, this.#scene, this.#camera);
    });

    this.#configRenderer();

    window.addEventListener('resize', () => this.#onResizeWindow());

    this.#subscription = this.onLoadModelsComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() => {
        this.#animateOnHardSkillsEntered();
        this.#animateOnProjectsSectionEntered();
        this.#animateOnContactSectionEntered();
      });
  }

  ngOnDestroy(): void {
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }

  #mountCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    this.#camera = new PerspectiveCamera(35, aspect, 0.1, 1000);
    this.#camera.position.set(0, 0.3, 2);
  }

  #onResizeWindow() {
    this.#camera.aspect = window.innerWidth / window.innerHeight;
    this.#camera.updateProjectionMatrix();
    this.#camera.updateMatrixWorld();
    this.#configRenderer();
  }

  #addGround() {
    const planeGeometry = new PlaneGeometry(2000, 2000);
    const planeMaterial = new MeshPhysicalMaterial({
      emissiveIntensity: 0.02,
      emissive: new Color(0xffffff),
    });

    const ground = new Mesh(planeGeometry, planeMaterial);

    ground.position.set(0.3, 0, 50);
    ground.rotation.x = 80.1;
    ground.receiveShadow = true;

    this.#scene.add(ground);
  }

  #mountLights() {
    const ambientLight = new AmbientLight();
    const shadowLight_1 = new DirectionalLight();

    shadowLight_1.position.set(-2, 2, 1);

    shadowLight_1.castShadow = true;

    shadowLight_1.shadow.bias = -0.001;
    shadowLight_1.shadow.mapSize = new Vector2(2048, 2048);
    shadowLight_1.shadow.camera.near = 0;
    shadowLight_1.shadow.camera.far = 100;

    this.#scene.add(ambientLight);
    this.#scene.add(shadowLight_1);
  }

  #configRenderer() {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
    this.#renderer.setPixelRatio(devicePixelRatio);
    this.#renderer.render(this.#scene, this.#camera);
  }

  #animateOnHardSkillsEntered(): gsap.core.Timeline {
    return gsap
      .timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top 68%',
          end: 'top 74%',
          scrub: 1.5,
        },
      })
      .to(this.#camera.rotation, {
        y: 5.4,
        z: 0,
      })
      .to(this.#camera.position, {
        y: 0.5 - this.#womanOnStairsModelService.getPosition().y,
      });
  }

  #animateOnProjectsSectionEntered(): gsap.core.Timeline {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: 'section.projects',
          start: 'top 75%',
          end: 'top 70%',
          scrub: 2,
        },
      })
      .to(this.#camera.position, {
        z: 100 - this.#columnService.getPosition().z,
        x: 13,
      });
  }

  #animateOnContactSectionEntered(): gsap.core.Timeline {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: 'section.contact',
          start: 'top 85%',
          end: 'top 80%',
          scrub: 1.5,
        },
      })
      .to(this.#camera.position, { x: '+=3', z: '-=2' });
  }
}
