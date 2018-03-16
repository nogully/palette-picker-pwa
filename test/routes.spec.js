const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Client Routes', () => {
  it('should return the homepage with text', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(err => {
      throw err;
    });
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/sad')
    .then(response => {
      response.should.have.status(404);
    })
    .catch(err => {
      throw err;
    });
  });
});

describe('API Routes', () => {
  beforeEach( (done) => {
    database.migrate.rollback()
      .then( () => {
        database.migrate.latest()
      .then( () => {
        return database.seed.run()
        .then( () => {
          done();
        })
      })
    })
  });

  describe('GET /api/v1/projects', () => {
    it('should return all of the projects', () => {
      return chai.request(server)
      .get('/api/v1/projects')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('GET /api/v1/projects/:id/palettes', () => {
    it('should return all of the palettes for a given project', () => {
      return chai.request(server)
      .get('/api/v1/projects/1/palettes')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('name');
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should create a new project', () => {
      return chai.request(server)
      .post('/api/v1/projects') 
      .send({             
        name: 'Lisa Frank Fan Page'
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.name.should.equal('Lisa Frank Fan Page');
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should return all of the palettes', () => {
      return chai.request(server)
      .get('/api/v1/palettes')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('name');
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('POST /api/v1/palettes', () => {
    it('should create a new palette', () => {
      return chai.request(server)
      .post('/api/v1/palettes') 
      .send({             
        name: 'Sad Testing Face', 
        colors: ['#DCDCDD', '#C5C3C6', '#46494C', '#4C5C68', '#1985A1'], 
        project_id: 1
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.name.should.equal('Sad Testing Face');
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('GET /api/v1/palettes/:id', () => {
    it('should return the palette with given id', () => {
      return chai.request(server)
      .get('/api/v1/palettes/1')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Unicorns');
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should delete the palette with given id', () => {
      return chai.request(server)
      .delete('/api/v1/palettes/2')
      .then(response => {
        response.should.have.status(202);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(1);
      })
      .catch(err => {
        throw err;
      });
    });
  });

});