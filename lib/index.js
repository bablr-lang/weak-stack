const parents = new WeakMap();
const depths = new WeakMap();

export class WeakStackFrame {
  static create(...args) {
    const root = new this(...args);

    depths.set(root, 0);
    parents.set(root, null);

    return root;
  }

  push(...args) {
    const { constructor } = this;
    const next = new constructor(...args);

    if (parents.has(next)) throw new Error('oh no!');

    parents.set(next, this);
    depths.set(next, this.depth + 1);

    return next;
  }

  replace(...args) {
    const frame = new this(...args);

    const { parent } = this;

    if (parent) {
      return parent.push(frame);
    } else {
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
