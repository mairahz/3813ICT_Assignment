let User = require('../../src/app/data/user.ts');
let app = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();


chai.use(chaiHttp);

describe('Test routes', () => {
  describe('/addCh Test 1', () => {
    it('should get User details', (done) => {
      user = new User('moo', 'moo');
      chai.request(app).post('/api/login').type('form')
      .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  // describe('/addCh Test 1', () => {
  //   it('should GET all products', (done) => {
  //     chai.request(app)
  //       .get('/api/read')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         done();
  //       });
  //   });
  // });

  // describe('/read Test 2', () => {
  //   it('should GET all products', (done) => {
  //     chai.request(app)
  //       .get('/api/read')
  //       .end((err, res) => {
  //         chai.expect(res).to.exist;
  //         done();
  //       });
  //   });
  // });

  // describe('/add Test 1', () => {
  //   it('should insert a product', (done) => {
  //     chai.request(app).post('/api/add').type('form')
  //     .send({'id': 1, 'name' : 'Cat', 'desc': 'A small cat', 'price': 150, 'units': 1})
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('num');
  //         res.body.should.have.property('err');
  //         done();
  //       });
  //   });
  // });

  // describe('/add Test 2', () => {
  //   it('should FAIL to insert a product', (done) => {
  //     chai.request(app).post('/api/add').type('form')
  //     .send({'id': 1, 'name' : 'Cat', 'desc': 'A small cat', 'price': 150, 'units': 1})
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.have.property('num', 0);
  //         res.body.should.have.property('err', "duplicate item");
  //         done();
  //       });
  //   });
  // });

  // describe('/delete Test 1', () => {
  //   it('it should delete a product', (done) => {
  //       chai.request(app)
  //       .post('/api/delete')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });

  // describe('/delete Test 2', () => {
  //   it('it should delete a product given the id', (done) => {
  //       chai.request(app)
  //       .post('/api/delete')
  //       .end((err, res) => {
  //         res.body.should.be.a('array');
  //         done();
  //       });
  //   });
  // });

  // describe('/update Test 1', () => {
  //   it('it should update a product', (done) => {
  //     chai.request(app).post('/api/update').type('form')
  //     .send({'id': 1, 'name' : 'Dog', 'desc': 'A small cat', 'price': 150, 'units': 1})
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.have.property('ok');
  //       done();
  //     });
  //   });
  // });

  // describe('/update Test 2', () => {
  //   it('it should update a product', (done) => {
  //     chai.request(app).post('/api/update').type('form')
  //     .send({'id': 1, 'name' : undefined, 'desc': 'A small cat', 'price': 150, 'units': 1})
  //     .end((err, res) => {
  //       res.body.should.have.property('error', 'A field is missing');
  //       done();
  //     });
  //   });
  // });

});