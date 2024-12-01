const parents = new WeakMap();
const depths = new WeakMap();

export class WeakStackFrame {
  static create(...args) {
    return new this(null, ...args);
  }

  constructor(parent) {
    depths.set(this, parent ? depths.get(parent) + 1 : 0);
    parents.set(this, parent);
  }

  push(...args) {
    const { constructor } = this;
    return new constructor(this, ...args);
  }

  replace(...args) {
    const { constructor } = this;

    const { parent } = this;

    if (parent) {
      return parent.push(...args);
    } else {
      const frame = new constructor(...args);

      depths.set(frame, 0);
      parents.set(frame, null);

      return frame;
    }
  }

  get parent() {
    return parents.get(this);
  }

  get depth() {
    return depths.get(this);
  }

  *ancestors(includeSelf) {
    let ancestor = this;

    if (includeSelf) yield ancestor;

    while ((ancestor = ancestor.parent)) {
      yield ancestor;
    }
  }
}

export { WeakStackFrame as WeakStack };

export default WeakStackFrame;
