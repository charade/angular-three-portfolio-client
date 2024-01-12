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
  BasicShadowMap,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SpotLight,
  SpotLightHelper,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

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
    this.#scene.position.set(0.35, -0.6, 0);
    this.#renderer.shadowMap.enabled = true;
    this.#renderer.shadowMap.type = PCFSoftShadowMap;

    this.#mountCamera();
    this.#mountLights();
    this.#addGround();
    this.#loadThinkerModel();
    this.#configRenderer();

    window.addEventListener('resize', () => this.#onResizeWindow());
    window.addEventListener('mousemove', (event) => {
      gsap.to(this.#scene.rotation, { y: event.clientX / 1200 });
    });

    this.#subscription = this.onLoadThinkerComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() =>
        this.animationTimeLine
          .to(this.#camera.position, {
            z: 3,
            duration: 1,
          })
          .to(this.#scene.rotation, {
            y: '+=1.5',
            scrollTrigger: {
              scrub: true,
              trigger: this.#viewContainerRef,
              start: '50% center',
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
        color: 'rgb(254, 249, 245)',
        emissive: 'rgb(254, 249, 245)',
        emissiveIntensity: 0.08,
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
    const spotLight = new SpotLight();

    shadowLight.position.set(-2, 2, 1);
    spotLight.position.set(-2, 2, this.#scene.position.z);
    spotLight.target.position.set(2, 0.5, -2);
    shadowLight.target.position.set(0.03, -0.4, -0.2);

    shadowLight.castShadow = true;
    spotLight.castShadow = true;

    shadowLight.shadow.bias = -0.001;
    shadowLight.shadow.mapSize = new Vector2(512, 512);
    shadowLight.shadow.camera.near = 0;
    shadowLight.shadow.camera.far = 100;

    this.#scene.add(ambientLight);
    this.#scene.add(shadowLight);
    this.#scene.add(spotLight);
  }

  #configRenderer() {
    this.#renderer.setSize(this.#viewContainerRef.offsetWidth, this.#viewContainerRef.offsetHeight);
    this.#renderer.setPixelRatio(devicePixelRatio);
    this.#renderer.render(this.#scene, this.#camera);
  }

  #loadThinkerModel() {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.THINKER,
      ({ scene }) => {
        this.#scene.add(scene);

        scene.traverse(function (node) {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        this.#renderer.setClearColor('#fff');

        const effectComposer = new EffectComposer(this.#renderer);
        const renderScene = new RenderPass(this.#scene, this.#camera);
        const bloom = new UnrealBloomPass(
          new Vector2(window.innerWidth, window.innerHeight),
          0.24,
          0.01,
          0.04
        );
        effectComposer.addPass(renderScene);
        effectComposer.addPass(bloom);
        this.#renderer.setAnimationLoop(() => {
          effectComposer.render();
          this.onLoadThinkerComplete.emit(true); // set model loading fully complete
        });
      },
      (event) => {
        const progress = Math.floor((event.loaded * 100) / event.total);
        this.progressChange.emit(progress);
      }
    );
  }
}
