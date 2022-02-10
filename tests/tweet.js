

let chai = require('chai');
let chaiHttp = require('chai-http');
//let app = require('../app');
var express = require('express');
var app = express();
let should = chai.should();

chai.use(chaiHttp);
          
    describe('/GET status', ()=>{
        it('it should GET all the statuses', (done) =>{
            chai.request(app).get('statuses/home_timeline')
               .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
               });
        });
    });

    describe('/POST status', () => {
        it('it should not POST a tweet without text', (done) => {
            let status = {
                id: "1436460330700263488",
                text: "Good Morning",
                name: "AISHWARYA RAVI"
            }
          chai.request(app)
              .post('statuses/update')
              .send(status)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('text');
                    res.body.errors.pages.should.have.property('name').eql('AISHWARYA RAVI');
                done();
              });
        });
    });

    describe('/DELETE/:id status', () => {
        it('it should DELETE a status given the id', (done) => {
          let status = new Status({id: "1436460330700263488", text: "Good Morning!", name: "AISHWARYA RAVI"})
          status.save((err, status) => {
                  chai.request(app)
                  .delete('statuses/destroy/' + status.id)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Status successfully deleted!');
                      res.body.result.should.have.property('ok').eql(1);
                    done();
                  });
            });
        });
    });
