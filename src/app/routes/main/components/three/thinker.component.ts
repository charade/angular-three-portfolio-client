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
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
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
    this.#renderer.shadowMap.enabled = true;
    this.#renderer.shadowMap.type = PCFSoftShadowMap;

    this.#mountCamera();
    this.#mountLights();
    this.#addGround();
    this.#loadThinkerModel();

    const effectComposer = new EffectComposer(this.#renderer);
    const renderScene = new RenderPass(this.#scene, this.#camera);
    const bloom = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1.6,
      0.1,
      0.1
    );
    effectComposer.addPass(renderScene);
    effectComposer.addPass(bloom);

    this.#configRenderer(effectComposer);

    window.addEventListener('resize', () =>
      this.#onResizeWindow(effectComposer)
    );
    window.addEventListener('mousemove', (event) => {
      gsap.to(this.#scene.rotation, { y: event.clientX / 1000 });
    });

    this.#subscription = this.onLoadThinkerComplete
      .pipe(skip(1), distinctUntilChanged())
      .subscribe(() =>
        this.animationTimeLine
          .to(this.#camera.position, {
            z: 3,
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

  #onResizeWindow(effectComposer: EffectComposer) {
    this.#camera.aspect =
      this.#viewContainerRef.offsetWidth / this.#viewContainerRef.offsetHeight;
    this.#camera.updateProjectionMatrix();
    this.#configRenderer(effectComposer);
  }

  #addGround() {
    const ground = new Mesh(
      new PlaneGeometry(5, 5, 10, 10),
      new MeshStandardMaterial({ color: 'rgb(254, 249, 245)' })
    );
    ground.rotation.x = 80;
    ground.castShadow = false;
    ground.receiveShadow = true;

    ground.position.set(0.3, -0.1, -1);
    this.#scene.add(ground);
  }

  #mountLights() {
    const ambientLight = new AmbientLight(0x101010);
    // const frontDownPointLight = new SpotLight(0xffffff);
    // const frontUpPointLight = new SpotLight(0xffff0);
    // frontDownPointLight.castShadow = true;
    // frontUpPointLight.castShadow = true;
    const light = new DirectionalLight(0xffffff);
    light.castShadow = true;

    light.position.set(-1, 2, 1); //default; light shining from top
    // frontDownPointLight.position.set(0, 0, 2);
    // frontUpPointLight.position.set(-0.5, 1, 2);

    light.shadow.mapSize = new Vector2(512, 512);
    light.shadow.camera.near = 0;
    light.shadow.camera.far = 100;
    // this.#scene.add(frontDownPointLight);
    // this.#scene.add(frontUpPointLight);
    this.#scene.add(ambientLight);
    this.#scene.add(light);
    this.#scene.add(new DirectionalLightHelper(light, 3, 0xfff));
  }

  #configRenderer(effectComposer: EffectComposer) {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
    this.#renderer.setPixelRatio(devicePixelRatio);
    effectComposer.render();
  }

  #loadThinkerModel() {
    new GLTFLoader().load(
      THREE_ENUMS.MODELS.THINKER,
      ({ scene }) => {
        this.#scene.add(scene);

        scene.traverse(function (node) {
          if (node.type === 'Mesh') {
            node.castShadow = true;
            // node.receiveShadow = true;
          }
        });

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
