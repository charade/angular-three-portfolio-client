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
  Color,
  DirectionalLight,
  Mesh,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SpotLight,
  Vector2,
  WebGLRenderer,
  AxesHelper,
} from 'three';

import { RodinThinkerModelService } from './services/rodin-thinker';
import { WomanOnStairsModelService } from './services/woman-on-stairs';
import gsap from 'gsap';
import { RedWallModelService } from './services/red-wall';
import { ColumnModelService } from './services/column';

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
  #redWallModelService = inject(RedWallModelService);
  #columnService = inject(ColumnModelService);

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

    this.#redWallModelService.load(this.#renderer, this.#scene, this.#camera);
    this.#configRenderer();

    this.#columnService.load(this.#renderer, this.#scene, this.#camera);

    window.addEventListener('resize', () => this.#onResizeWindow());

    this.#subscription = this.onLoadModelsComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() => {
        this.animationTimeLine.add(this.#animateOnSceneEntered());
        this.animationTimeLine.add(this.#animateOnSoftSkillsEntered());
        this.animationTimeLine.add(this.#animateOnHardSkillsEntered());
        this.animationTimeLine.add(this.#animateOnProjectsSectionEntered());
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
      emissiveIntensity: 0.04,
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
    const shadowLight = new DirectionalLight();
    const spotLight = new SpotLight(0xffffff, 0.5);

    shadowLight.position.set(-2, 2, 1);
    spotLight.position.set(2, 2, -this.#scene.position.z);

    shadowLight.castShadow = true;
    spotLight.castShadow = true;

    shadowLight.shadow.bias = -0.001;
    shadowLight.shadow.mapSize = new Vector2(2048, 2048);
    shadowLight.shadow.camera.near = 0;
    shadowLight.shadow.camera.far = 100;

    this.#scene.add(ambientLight);
    this.#scene.add(shadowLight);
    this.#scene.add(spotLight);
  }

  #configRenderer() {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
    this.#renderer.setPixelRatio(devicePixelRatio);
    this.#renderer.render(this.#scene, this.#camera);
  }

  #animateOnSceneEntered(): gsap.core.Timeline {
    return gsap.timeline().from(
      this.#scene.position,
      {
        z: -5,
        duration: 1,
        ease: 'sine',
      },
      '>-1.5'
    );
  }

  #animateOnSoftSkillsEntered(): gsap.core.Timeline {
    return gsap
      .timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: 'section.soft-skills', // soft-skills section
          start: 'top 70%',
          end: 'top 68%',
          scrub: 3,
        },
      })
      .to(this.#camera.rotation, {
        y: '-=0.8',
      })
      .to(this.#camera.position, {
        z: this.#camera.position.z + 1,
        y: '+=1',
      });
  }

  #animateOnHardSkillsEntered(): gsap.core.Timeline {
    return gsap
      .timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: 'section.hard-skills',
          start: 'top 80%',
          end: 'top 78%',
          scrub: 3,
        },
      })
      .to(this.#camera.rotation, { y: '-=0.66' })
      .to(this.#camera.position, {
        x: '+=2',
        z: '-=1',
      })
      .to(this.#camera.position, { y: '+=21' });
  }

  #animateOnProjectsSectionEntered(): gsap.core.Timeline {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: 'section.projects',
          start: 'top 80%',
          end: 'top 70%',
          scrub: 3,
        },
      })
      .to(this.#camera.rotation, {
        y: this.#camera.rotation.y - 0.5,
      })
      .to(
        this.#camera.position,
        {
          z: this.#camera.position.z - 190,
          x: '+=68',
          // y: this.#camera.position.y - 20,
        },
        '+=0.1'
      );
  }
}
