// Class used to wrap a large value that should be mutated for performance
// reasons, all while keeping changing references so that shallow equality
// can work on updates.
export default class Box<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  get(): T {
    return this.value;
  }

  set(value: T): Box<T> {
    return new Box(value);
  }

  mutate(mutator: (value: T) => void): Box<T> {
    mutator(this.value);
    return new Box(this.value);
  }

  static of<I>(value: I): Box<I> {
    return new Box(value);
  }
}
