[![Stories in Ready](https://badge.waffle.io/malpercio/data-holder.png?label=ready&title=Ready)](https://waffle.io/malpercio/data-holder)
[![Build Status](https://travis-ci.org/malpercio/data-holder.svg?branch=master)](https://travis-ci.org/malpercio/data-holder)
[![Dependencies](https://david-dm.org/malpercio/data-holder.svg](https://david-dm.org/malpercio/data-holder)
[![DevDependencies](https://david-dm.org/malpercio/data-holder/dev-status.svg](https://david-dm.org/malpercio/data-holder)

# data-holder
A NodeJS package that provides asynchronous implementations for some data structures, with the flexibility in this world divided by callbacks and promises.

# Installation

```
npm install data-holder
```

# Usage
Let's start simple, say you want a semi **synchronous** process (recommended mostly for short lived experiments and tests).

```js
let structures = require(data-holder)('Sync');
let List = structures.List;

//Blah, blah, blah...

let l = new List();                                        // []
l.add(23);                                                 // [23]

//Another important thing

l.unshift(42);                                             // [42, 23]

//Here you must put code that is definitively not going to crash.

console.log(l.pop());                                      // [23]
```

But... what about **callbacks**?
```js
let structures = require(data-holder)();
let List = structures.List;

//Blah, blah, blah...

//You simply pass the callback as an extra parameter.
let l = new List();                                        // []
l.add(23, () => {                                          // [42, 23]
    l.unshift(42, () => {
      l.pop((err, element) => {                            // [23]
        console.log(element);
      });                                      
    });
});
```
And do not panic, I won't forget about **promises**
