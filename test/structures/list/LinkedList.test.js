'use strict';
let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number() + 1;
let arbitraryElement = 'Bunny';

let genericTests = require('../../lib/genericList.test')('LinkedList');
