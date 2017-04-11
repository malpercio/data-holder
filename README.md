[![Stories in Ready](https://badge.waffle.io/malpercio/data-holder.png?label=ready&title=Ready)](https://waffle.io/malpercio/data-holder)
[![Build Status](https://travis-ci.org/malpercio/data-holder.svg?branch=master)](https://travis-ci.org/malpercio/data-holder)
[![Build Status](https://david-dm.org/malpercio/data-holder.svg)](https://travis-ci.org/malpercio/data-holder)
[![DevDependencies](https://david-dm.org/malpercio/data-holder/dev-status.svg)](https://david-dm.org/malpercio/data-holder)

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


# Structures

Let's talk about what it's already been implemented. To access any of these, you must call the corresponding constructor located in the object returned from the function that is brought by `require`.
```js
let structures = require('data-holder')();
let list = new structures.List();
let stack = new structures.Stack();
// etc.
```

## List (a.k.a. DoubleLinkedList)
The default implementation for List is a double linked list. Can be iterated with a `for...of`.

### Available Methods
* **contains(element)**

  Verifies if certain element belongs in a list.

  Parameters:
  - element : a comparable object
  - cb : callback to be executed

  Returns: boolean / Promise

* **toString()**

  Processes a string representation of a list.

  Returns: string

* **add(element[, cb])**

  Adds an element to the end of a list.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **unshift(element[, cb])**

  Adds an element to the start of a list.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **pop([, cb])**

  Removes the last item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **shift([, cb])**

  Removes the first item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **splice(n[, cb])**

  Removes the item in the n-th place from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

## LinkedList
Not recommended, but there also exists a one way linked list. Can be iterated with a `for...of`.
### Available Methods
* **contains(element)**

  Verifies if certain element belongs in a list.

  Parameters:
  - element : a comparable object
  - cb : callback to be executed

  Returns: boolean / Promise

* **toString()**

  Processes a string representation of a list.

  Returns: string

* **add(element[, cb])**

  Adds an element to the end of a list.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **unshift(element[, cb])**

  Adds an element to the start of a list.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **pop([, cb])**

  Removes the last item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **shift([, cb])**

  Removes the first item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **splice(n[, cb])**

  Removes the item in the n-th place from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

## OrderedList
As the name implies, it's always ordered. Can be iterated with a `for...of`.

### Available Methods
* **contains(element)**

  Verifies if certain element belongs in a list.

  Parameters:
  - element : a comparable object
  - cb : callback to be executed

  Returns: boolean / Promise

* **toString()**

  Processes a string representation of a list.

  Returns: string

* **add(element[, cb])**

  Adds an element to a list.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **pop([, cb])**

  Removes the last item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **shift([, cb])**

  Removes the first item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **splice(n[, cb])**

  Removes the item in the n-th place from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

## Stack
FILO structure.

### Available Methods

* **toString()**

  Processes a string representation.

  Returns: string

* **push(element[, cb])**

  Adds an element to the structure.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **pop([, cb])**

  Removes the last item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **hasNext()**

  Decides if there are any items left.
  Returns: boolean

* **empty([, cb])**

  Empties the structure.

  Parameters:
  - cb : callback to be executed

  Returns: nothing

## Queue
FIFO structure.

### Available Methods

* **toString()**

  Processes a string representation.

  Returns: string

* **push(element[, cb])**

  Adds an element to the structure.

  Parameters:
  - element : an object to be added
  - cb : callback to be executed

  Returns: nothing

* **pop([, cb])**

  Removes the last item from the list.

  Parameters:
  - cb : callback to be executed

  Returns: obj; the removed item

* **hasNext()**

  Decides if there are any items left.
  Returns: boolean

* **empty([, cb])**

  Empties the structure.

  Parameters:
  - cb : callback to be executed

  Returns: nothing
