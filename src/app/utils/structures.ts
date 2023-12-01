export class CustomMap<K, V> {
  #mapper = new Map<K, V>();
  constructor(private entries: [K, V][], private defaultValue?: V) {
    this.entries.forEach(([k, v]) => this.#mapper.set(k, v));
  }

  value(k: K) {
    return this.#mapper.has(k) ? this.#mapper.get(k) : this.defaultValue;
  }
}
