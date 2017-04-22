[![Stories in Ready](https://badge.waffle.io/malpercio/data-holder.png?label=ready&title=Ready)](https://waffle.io/malpercio/data-holder)
[![Build Status](https://travis-ci.org/malpercio/data-holder.svg?branch=master)](https://travis-ci.org/malpercio/data-holder)
[![Build Status](https://david-dm.org/malpercio/data-holder.svg)](https://travis-ci.org/malpercio/data-holder)
[![DevDependencies](https://david-dm.org/malpercio/data-holder/dev-status.svg)](https://david-dm.org/malpercio/data-holder)
[![npm version](https://badge.fury.io/js/data-holder.svg)](https://badge.fury.io/js/data-holder)

# data-holder
A NodeJS package that provides asynchronous implementations for some data structures, with the flexibility needed in this cruel world divided by callbacks and promises.

You can find the complete docs in **[here](https://github.com/malpercio/data-holder/wiki/)**.

## Implemented structures
* Linked list
* Double linked list
* Ordered List
* Stack
* Queue

## A little introduction
Let's start simple, say you want a semi **synchronous** process (recommended mostly for short lived experiments and tests).

```js
let structures = require(data-holder)('Sync');
let List = structures.List;

//Blah, blah, blah...

let l = new List();                                        // []
l.add(13);                                                 // [13]

//Another important thing

l.unshift(42);                                             // [42, 13]

//Here you must put code that is definitively not going to crash.

console.log(l.pop());                                      // [42]
```

But... what about **callbacks**?
```js
let structures = require(data-holder)();
let List = structures.List;

//Blah, blah, blah...

//You simply pass the callback as an extra parameter.
let l = new List();                                        // []
l.add(13, () => {                                          // [42, 13]
    l.unshift(42, () => {
      l.pop((err, element) => {                            // [42]
        console.log(element);
      });                                      
    });
});
```
And do not panic, I won't forget about **promises**.
If you want to use the ones implemented by default on Node, this example is for you.
```js
let structures = require(data-holder)();
let List = structures.List;

//Blah, blah, blah...

//You simply pass the callback as an extra parameter.
let l = new List();                                        // []
let p1 = l.add(13);                                        // [13]
let p2 = p1.then(() => {
  return l.unshift(42);                                    // [42, 13]
});
let p3 = p2.then(() => {
  return l.pop();                                          // [42]
});

p3
  .then((element) => {
    console.log(element);
  })
  .catch(() => {
    console.log("):");
  });
```
Just as a pro-tip, you can also pass the string `default` or `Default` and get the same behaviour (callbacks and Node's promise).


But maybe, you are already using a promise library, then send the function through parameter. Don't worry, I'm pretty bad at explaining, let's see it it action (with **Bluebird**)
```js
let Promise = require('bluebird');
let structures = require(data-holder)(Promise);
let List = structures.List;

//Blah, blah, blah...

//You simply pass the callback as an extra parameter.
let l = new List();                                        // []
let p1 = l.add(13);                                        // [13]
let p2 = p1.then(() => {
  return l.unshift(42);                                    // [42, 13]
});
let p3 = p2.then(() => {
  return l.pop();                                          // [42]
});

p3
  .then((element) => {
    console.log(element);
  })
  .catch(() => {
    console.log("):");
  });
```
And that's how you use it with Bluebird. And, yes, I didn't bothered to change the example.

Also, you don't need to import all of the structures (which we have been doing on the previous examples). Let's say you only need a **list with callbacks**; the second parameter must be a string with the name of the structure. Be careful, this returns the structure directly.
```js
let List = require(data-holder)('Default', 'List');

//Blah, blah, bla

//You simply pass the callback as an extra parameter.
let l = new List();                                        // []
l.add(13, () => {                                          // [42, 13]
    l.unshift(42, () => {
      l.pop((err, element) => {                            // [42]
        console.log(element);
      });                                      
    });
});
```

Also, you might need **more than one structure at the same time**, to require them is as simple as passing an array of strings. It gives you the same arrangement as if you imported all of the structures available.
```js
let data-holder = require(data-holder)('Default', 'List', 'OrderedList');
let List = structures.List;
let OrderedList = structures.OrderedList;

//Blah, blah, blah...

//You simply pass the callback as an extra parameter.
let l = new List();                                        // []
let l2 = new OrderedList();                                // []
l.add(13, () => {                                          // [42, 13]
    l.unshift(42, () => {
      l.pop((err, element) => {                            // [42]
        console.log(element);
      });                                      
    });
});
```
