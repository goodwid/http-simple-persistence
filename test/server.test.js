const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('test',() => {
  const request = chai.request(server);

  it('passes', () => {
    assert(true);
  });

});
