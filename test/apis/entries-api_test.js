/*var request = require('supertest');
var agent = request.agent(TestHelper.createApp);

describe('Entries API', function() {
  before(function() {
    return db.deleteEverything();
  });

  describe('User Signup', function() {
    it('errors if username is not provided for signup', function(done) {
      agent.post(signup)
      .send({ username: '', password: 'noots' })
      .end(function(err, res) {
        expect(res.body.signedUp).to.equal(false);
        expect(res.body.info.message).to.equal('Missing credentials');
        done();
      });
    });

    it('errors if password is not provided for signup', function(done) {
      agent.post(signup)
      .send({ username: 'nanner1', password: '' })
      .end(function(err, res) {
        expect(res.body.signedUp).to.equal(false);
        expect(res.body.info.message).to.equal('Missing credentials');
        done();
      });
    });

    it('signs up a user', function(done) {
      agent.post(signup)
      .send({ username: 'nanner12', password: 'nanner12' })
      .end(function(err, res) {
        expect(res.body.signedUp).to.equal(true);
        done();
      });
    });

    it('errors if user already exists', function(done) {
      agent.post(signup)
      .send({ username: 'nanner12', password: 'nanner' })
      .end(function(err, res) {
        expect(res.body.signedUp).to.equal(false);
        expect(res.body.info.message).to.equal('User Already exists');
        done();
      });
    });
  });

  describe('User Login', function() {
    it('errors if username is not provided for login', function(done) {
      agent.post(login)
      .send({ username: '', password: 'noots' })
      .end(function(err, res) {
        expect(res.body.loggedIn).to.equal(false);
        expect(res.body.noUser).to.equal(true);
        expect(res.body.info.message).to.equal('Missing credentials');
        done();
      });
    });

    it('errors if password is not provided for login', function(done) {
      agent.post(login)
      .send({ username: 'nanner1', password: '' })
      .end(function(err, res) {
        expect(res.body.loggedIn).to.equal(false);
        expect(res.body.noUser).to.equal(true);
        expect(res.body.info.message).to.equal('Missing credentials');
        done();
      });
    });

    it('errors if user does not exist', function(done) {
      agent.post(login)
      .send({ username: 'nanner1', password: 'nanner12' })
      .end(function(err, res) {
        expect(res.body.loggedIn).to.equal(false);
        expect(res.body.noUser).to.equal(true);
        expect(res.body.info.message).to.equal('Incorrect username');
        done();
      });
    });

    it('errors if password is incorrect', function(done) {
      agent.post(login)
      .send({ username: 'nanner12', password: 'nannerwrong' })
      .end(function(err, res) {
        expect(res.body.loggedIn).to.equal(false);
        expect(res.body.noUser).to.equal(true);
        expect(res.body.info.message).to.equal('Incorrect password');
        done();
      });
    });

  });
});*/
