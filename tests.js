'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const app = require('./index');

process.env.APP_ENV = 'testing';

describe('Test Suite', () => {
  it('should give the correct response', async () => {
    let response = '';

    app.handle({}, {}, (error, stdout) => {
      response = JSON.parse(stdout.body);
    });

    expect(response.elixir).to.eql('1.8.0');
  });
});
