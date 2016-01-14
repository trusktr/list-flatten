list-flatten
============

Flatten an array or array-like list (non-recursive implementation).

Usage
-----

Import list-flatten with your choice of module system:

```js
import flatten from 'list-flatten' // ES2015
// or
let flatten = require('list-flatten') // CommonJS
// or
define(['list-flatten'], function(flatten) {}) // AMD
```

then use it:

```js
let arr = [3,[3,4, [2,3]],5,3,[6,7]]
arr = flatten(arr)
console.log(arr)
// output:
// [3,3,4,2,3,5,3,6,7]
```

Todo
----

- [ ] Accept a depth argument.
