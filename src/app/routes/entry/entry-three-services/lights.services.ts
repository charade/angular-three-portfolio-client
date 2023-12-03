import { Injectable } from '@angular/core';
import { HemisphereLight, PointLight, Scene, SpotLight } from 'three';

@Injectable()
export class LightsService {
  mount(scene: Scene) {
    const hemisphereLight = new HemisphereLight(0xffffff, 0xffffff);

    const point_light_back = new PointLight('rgb(255, 20, 200)');
    const point_light_left = new PointLight('rgb(230, 20, 200)');
    const point_light_right = new PointLight('rgb(255, 20, 200)', 0.3);
    const spotLight_front_down = new PointLight('rgb(255, 20, 200)');
    const spotLight_front_up = new SpotLight(0xffffff);
    const spotLight_back = new SpotLight(0xffffff);

    point_light_back.position.set(0, 1, 0);
    point_light_left.position.set(-0.5, 1, 0);
    point_light_right.position.set(0.5, 1, 0);
    spotLight_front_down.position.set(0, 2, 1);
    spotLight_front_up.position.set(0, 2, 0.5);
    spotLight_back.position.set(0, 1, -4);

    scene.add(hemisphereLight);
    scene.add(point_light_back);
    scene.add(point_light_left);
    scene.add(point_light_right);
    scene.add(spotLight_front_down);
    scene.add(spotLight_front_up);
    scene.add(spotLight_back);
  }
}
