'use strict';

var app = require('../server');
var config = require('../config/config.js'),
    postJson = config.get('test.post');
var request = require('supertest').agent(app.listen());


describe('Api Operations', function(){
  this.timeout(10*1000);


  it('Should dash encode all movie media, with status 200', function(done){

    request
        .get('/')
        .expect(200, done);

  });



  it('Should return parsed response, with status 200', function(done){

    request
      .post('/test')
      .send({ "username" : "baz" })
      .expect(200)
      .end(function(err, res) {
        done();
      });

  });


});

