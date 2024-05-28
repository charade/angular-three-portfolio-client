import { ComponentType } from '@angular/cdk/portal';
import { CryptrendsDetailsComponent } from './projects-details/cryptrends-details/cryptrends-details.component';
import { FlexDateDetailsComponent } from './projects-details/flex-date-details/flex-date-details.component';
import { MemoDetailsComponent } from './projects-details/memo-details/memo-details.component';
import { SiteflowDetailsComponent } from './projects-details/siteflow-details/siteflow-details.component';

class CustomMap<K, V> {
  #map = new Map();
  constructor(entries: [K, V][]) {
    entries.forEach(([k, v]) => this.#map.set(k, v));
  }

  value(k: K): V | undefined {
    return this.#map.has(k) ? this.#map.get(k) : undefined;
  }
}

export namespace ProjectsUtils {
  export type ProjectNameType =
    | 'Cryptrends'
    | 'Flex-date'
    | 'Memo'
    | 'Siteflow';

  export const list: ProjectNameType[] = [
    'Cryptrends',
    'Flex-date',
    'Memo',
    'Siteflow',
  ];
  export const getProjectDetails = new CustomMap<
    ProjectNameType,
    ComponentType<any>
  >([
    ['Cryptrends', CryptrendsDetailsComponent],
    ['Flex-date', FlexDateDetailsComponent],
    ['Memo', MemoDetailsComponent],
    ['Siteflow', SiteflowDetailsComponent],
  ]);

  export const getProjectLinks = new CustomMap<ProjectNameType, string>([
    ['Cryptrends', ''],
    ['Flex-date', ''],
    ['Memo', ''],
    ['Siteflow', ''],
  ]);
}
