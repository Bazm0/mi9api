'use strict';

var app = require('../server');
var config = require('../config/config.js'),
    postJson = config.get('test.post');
var request = require('supertest').agent(app.listen());


describe('Api Operations', function(){
  this.timeout(10*1000);


  it('Get Should fail response, with status 400', function(done){

    request
        .get('/')
        .expect(400, done);

  });

  it('Put Should fail response, with status 400', function(done){

    request
        .put('/')
        .expect(400, done);

  });


  it('Delete Should fail response, with status 400', function(done){

    request
        .delete('/')
        .expect(400, done);

  });


  it('Head Should fail response, with status 400', function(done){

    request
        .head('/')
        .expect(400, done);

  });

  it('Should return parsed response, with status 200', function(done){

    request
      .post('/')
      .send(postJson)
      .expect(200)
      .end(function(err, res) {
        done();
      });

  });


});

