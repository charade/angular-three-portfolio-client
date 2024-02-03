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
  AxesHelper,
  DirectionalLightHelper,
  Color,
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

    this.#ngZone.runOutsideAngular((arg) => {
      console.log(arg);

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
      this.#columnService.load(this.#renderer, this.#scene, this.#camera);
    });

    this.#configRenderer();

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
    const shadowLight_2 = new DirectionalLight(0xffffff, 1.5);

    shadowLight_1.position.set(-2, 2, 1);
    shadowLight_2.position.set(105, 5, -290);

    shadowLight_2.target.position.set(172, -1, -304);

    // const axes = new AxesHelper(100);
    // axes.setColors('red', 'green', 'blue');
    // axes.position.set(80, 0, -300);
    // this.#scene.add(axes);

    shadowLight_1.castShadow = true;
    shadowLight_2.castShadow = true;

    shadowLight_1.shadow.bias = -0.001;
    shadowLight_1.shadow.mapSize = new Vector2(2048, 2048);
    shadowLight_1.shadow.camera.near = 0;
    shadowLight_1.shadow.camera.far = 100;

    // shadowLight_2.shadow.bias = -0.001;
    shadowLight_2.shadow.mapSize = new Vector2(2048, 2048);
    shadowLight_2.shadow.camera.near = 0;
    shadowLight_2.shadow.camera.far = 300;

    this.#scene.add(ambientLight);
    this.#scene.add(shadowLight_1);
    this.#scene.add(shadowLight_2);
    this.#scene.add(shadowLight_2);
    // this.#scene.add(new DirectionalLightHelper(shadowLight_2));
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
          start: 'top 75%',
          end: 'top 70%',
          scrub: 4,
        },
      })
      .to(
        this.#camera.position,
        {
          z: this.#camera.position.z - 190,
          x: '+=68',
        },
        '+=0.1'
      )
      .to(this.#camera.rotation, {
        y: this.#camera.rotation.y - 0.5,
      })
      .to(this.#camera.position, {
        y: this.#camera.position.y + 25,
      })
      .to(this.#camera.rotation, { z: 0.12 });
  }
}
