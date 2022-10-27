export default class Box<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  get(): T {
    return this.value;
  }

  mutate(mutator: (value: T) => void): Box<T> {
    mutator(this.value);
    return new Box(this.value);
  }
}
