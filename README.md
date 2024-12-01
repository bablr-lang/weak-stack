# @bablr/weak-stack

An immutable stack implementation which uses weakMaps to track frames. Usage is slightly easier than a something like `@iter-tools/imm-stack` because the frame with the data is the stack reference you hold.

## Usage

A weak stack is intended to be used by creating classes derived from `WeakStackFrame`

```js
import { WeakStackFrame } from '@bablr/weak-stack';

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

assert(s.path.coverType === 'Fragment');
assert(s.path.depth === 0);

s.path = s.path.push('children', 'Expression');

assert(s.path.coverType === 'Expression');
assert(s.path.depth === 1);

s.path = s.path.pop();

assert(s.path.coverType === 'Fragment');
assert(s.path.depth === 0);
```

See the source code for additional methods
