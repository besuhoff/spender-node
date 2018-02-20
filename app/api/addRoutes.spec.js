const { expect, use } = require('chai');
const { spy } = require('sinon');
const sinonChai = require('sinon-chai');

const addRoutes = require('./addRoutes');

use(sinonChai);

let prefix;
let result;

describe('addRoutes', () => {
  before(() => {
    prefix = 'my-entities';
    result = addRoutes([{}], prefix);
  });

  it('should be a function', () => {
    expect(addRoutes).to.be.a('function');
  });

  describe('should provide interface to register a hapi plugin', () => {
    it('should expose registering function', () => {
      expect(result[0].register).to.be.a('function');
    });

    it('should set a name for registered routes', () => {
      expect(result[0].name).to.equal(`routes_${prefix}`);
    });

    it('should add routes to the server on plugin registration', async () => {
      const server = {
        route: spy(),
      };

      await result[0].register(server, {});
      expect(server.route).to.have.been.calledWith([{ config: {} }]);
    });
  });

  it('should set the following prefix for routes: /prefix', () => {
    const expectedResultRoutes = {
      routes: {
        prefix: `/${prefix}`,
      },
    };

    expect(result[1]).to.deep.equal(expectedResultRoutes);
  });
});