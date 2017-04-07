let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')('Sync');
let List = dataHolder.Queue;

describe('Queue behaviour', () => {
  
});
