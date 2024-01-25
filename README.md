# @bablr/weak-stack

An immutable stack implementation which uses weakMaps to track frames. Usage is slightly easier than a something like `@iter-tools/imm-stack` because the frame with the data is the stack reference you hold.

## Usage

```js
import { WeakStackFrame } from '@bablr/weak-stack';

class Path extends WeakStackFrame {
  constructor(reference, coverType) {
    this.reference = reference;
    this.coverType = coverType;
  }
}

let s = {
  path: Path.create('root', 'Fragment'),
};

assert(s.path.coverType === 'Fragment');

s.path = s.path.push('children', 'Expression');

assert(s.path.coverType === 'Expression');

s.path = s.path.pop();

assert(s.path.coverType === 'Fragment');
```
