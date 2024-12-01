import { WeakStackFrame } from '@bablr/weak-stack';
import { expect } from 'expect';

class Path extends WeakStackFrame {
  constructor(parent, reference, coverType) {
    super(parent);
    this.reference = reference;
    this.coverType = coverType;
  }
}

let s = {
  path: Path.create('root', 'Fragment'),
};

describe('WeakStack', () => {
  it('Executes README example', () => {
    expect(s.path.coverType).toBe('Fragment');
    expect(s.path.depth).toBe(0);

    s.path = s.path.push('children', 'Expression');

    expect(s.path.coverType).toBe('Expression');
    expect(s.path.depth).toBe(1);

    s.path = s.path.pop();

    expect(s.path.coverType).toBe('Fragment');
    expect(s.path.depth).toBe(0);
  });
});
