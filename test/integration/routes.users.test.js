process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('../../src/server/app');
const knex = require('../../src/server/db/knex')

describe('routes : users', function() {

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

  describe('GET /api/v1/users', function() {
    it('should respond with all users', function(done) {
      chai.request(server)
      .get('/api/v1/users')
      .end(function(err, res) {
        res.redirects.length.should.equal(0);
        res.status.should.equal(200);
        res.type.should.equal('application/json');
        console.log(res.body);
        res.body.status.should.eql('success');
        res.body.data.length.should.eql(3);
        done();
      });
    });
  });

  describe('GET /404', function() {
    it('should throw an error', function(done) {
      chai.request(server)
      .get('/404')
      .end(function(err, res) {
        res.redirects.length.should.equal(0);
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        res.body.message.should.eql('Not Found');
        done();
      });
    });
  });

});
