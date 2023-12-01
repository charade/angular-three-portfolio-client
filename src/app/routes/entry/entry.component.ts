import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WorldService } from './entry-three-services/world.service';
import { LightsService } from './entry-three-services/lights.services';
import { AppIconComponent } from 'src/app/shared-components/icon/icon.component';
import { IconEnum } from 'src/app/shared-components/icon/icon.enums';
import { OverlayService } from 'src/app/shared-services/overlay/overlay.service';
import { LanguageMenuComponent } from './entry-components/language-menu/language-menu.component';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule, AppIconComponent],
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  providers: [WorldService, LightsService, OverlayService],
})
export class EntryComponent implements AfterViewInit {
  IconEnum = IconEnum;
  #scene: THREE.Scene;
  #camera: THREE.PerspectiveCamera;
  #orbitControls: OrbitControls;

  #clock = new THREE.Clock();
  #renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  // defining camera position for entering scene animation
  #DEFAULT_CAMERA_POS = { y: 25, z: -25 };

  #worldService = inject(WorldService);
  #lightsService = inject(LightsService);
  #viewContainerElement: HTMLElement =
    inject(ViewContainerRef).element.nativeElement;
  #overlayService = inject(OverlayService);
  #viewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit(): void {
    this.#renderer.shadowMap.enabled = true;
    this.#viewContainerElement.appendChild(this.#renderer.domElement);
    this.#configRenderer();
    this.#initScene();

    this.#worldService.load({
      world: this.#scene,
      renderer: this.#renderer,
      camera: this.#camera,
      clock: this.#clock,
      controls: this.#orbitControls,
    });

    window.addEventListener('resize', () => this.#onResizeWindow());
  }

  get #viewContainer() {
    return {
      width: this.#viewContainerElement.clientWidth,
      height: this.#viewContainerElement.clientHeight,
    };
  }

  #onResizeWindow() {
    this.#camera.aspect =
      this.#viewContainer.width / this.#viewContainer.height;
    this.#camera.updateProjectionMatrix();
    this.#configRenderer();
    this.#renderer.render(this.#scene, this.#camera);
  }

  // world
  #initScene(): void {
    this.#scene = new THREE.Scene();
    this.#scene.position.set(0, -1.5, 1);
    this.#mountCameras();
    this.#setControls();
    this.#initGround();
    this.#lightsService.mount(this.#scene);
    this.#scene.fog = new THREE.Fog(0xffffff, 0.8, 16);
  }

  // world ground
  #initGround() {
    const ground = new THREE.GridHelper(30, 25, 0xdedede, 0xdedede);
    this.#scene.add(ground);
  }

  // camera
  #mountCameras() {
    const aspect = this.#viewContainer.width / this.#viewContainer.height;
    this.#camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
    this.#camera.position.set(0, 1.8, -3);
    this.#scene.add(this.#camera);
    this.#camera.lookAt(0, 1.5, 0);
    // camera animation en entering scene
    this.#cameraEnteringAnimation();
  }

  // camera cinematic from top to initial position
  #cameraEnteringAnimation() {
    gsap.fromTo(this.#camera.position, this.#DEFAULT_CAMERA_POS, {
      ...this.#camera.position,
      duration: 3.5,
      ease: 'power2.inOut',
    });
  }

  // controls
  #setControls() {
    this.#orbitControls = new OrbitControls(
      this.#camera,
      this.#renderer?.domElement
    );

    this.#orbitControls.enableDamping = true;
    this.#orbitControls.minDistance = 2.1;
    // lock vertical camera rotation
    this.#orbitControls.maxPolarAngle = this.#orbitControls.minPolarAngle =
      Math.PI / 3;

    this.#orbitControls.addEventListener('change', () => {
      this.#renderer.render(this.#scene, this.#camera);
    });
  }
  //renderer
  #configRenderer() {
    this.#renderer.setSize(
      this.#viewContainer.width,
      this.#viewContainer.height
    );
    this.#renderer.setPixelRatio(
      this.#viewContainer.width / this.#viewContainer.height
    );
  }
  openLangSettings(origin: any) {
    this.#overlayService.open(
      LanguageMenuComponent,
      origin,
      this.#viewContainerRef
    );
  }
}
