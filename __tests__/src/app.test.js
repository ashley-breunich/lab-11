'use strict';

import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
let mongoServer;

const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, (err) => {
        if(err) {console.log(err);}
    });
});

afterAll( () => {
    mongoose.disconnect();
    mongoServer.stop();
});

describe('API Server', () => {
    it('should respond with a 404 on an invalid model', () => {
        return mockRequest
        .get('/hellothere')
        .then(results => {
            expect(results.status).toBe(404);
        })
        .catch(err => {
            expect(err).not.toBeDefined();
        });
    });

    it('should respond with a 404 on an invalid method', () => {

        return mockRequest
        .post('/api/v1/foo/12')
        .then(results => {
          expect(results.status).toBe(404);
        })
        .catch(err => {
          expect(err).not.toBeDefined();
        });
    
      });

    it('should respond with a 200 on an valid model', () => {
        return mockRequest
        .get('/api/v1/categories')
        .then(results => {
            expect(results.status).toBe(200);
        })
        .catch(err => {
            expect(err).not.toBeDefined();
        });
    });

    it('should be able to post to api/v1/categories', () => {
        let obj = {name:'Shoes', display_name:'Jimmy Choo', description:'These are Jimmy Choo Shoes.'};
        return mockRequest
        .post('/api/v1/categories')
        .send(obj)
        .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.title).toEqual(obj.title);
            expect(results.body._id).toBeDefined();
        })
        .catch(err => {
            expect(err).not.toBeDefined();
        });
    })

    it('should be able to post to api/v1/categories again - this will be to test the count below.', () => {
        let obj = {name:'Pumps', display_name:'Gucci', description:'These are Shoes.'};
        return mockRequest
        .post('/api/v1/categories')
        .send(obj)
        .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.title).toEqual(obj.title);
            expect(results.body._id).toBeDefined();
        })
        .catch(err => {
            expect(err).not.toBeDefined();
        });
    })

    it('following multiple posts, should return the correct count', () => {
        return mockRequest
        .get('/api/v1/categories')
        .then(results => {
          expect(results.body.count).toEqual(2);
          expect(results.status).toBe(200);
        })
        .catch(err => {
          expect(err).not.toBeDefined();
        });
    
    });

    it('following a put, should update a single record', () => {

        let obj = {name:'Pumps', display_name:'Manolo Blahnik Pumps', description:'These are shoes.'};
      
        return mockRequest
        .post('/api/v1/categories')
        .send(obj)
        .then(results => {
          return mockRequest.put(`/api/v1/categories/${results.body._id}`)
          .send({name:'Heels', display_name:'Manolo Blahnik Pumps', description:'These are shoes.',_id:`${results.body._id}`})
          .then(list => {
            expect(list.status).toBe(200);
            expect(results.body.name).toEqual(obj.name);
            expect(results.body._id).toBeDefined();
          })
        })
        .catch( err => console.error('err', err) );
      });
      
      it('following a patch, should update a single record', () => {

        let obj = {name:'Pumps', display_name:'Manolo Blahnik Pumps', description:'These are shoes.'};
      
        return mockRequest
        .post('/api/v1/categories')
        .send(obj)
        .then(results => {
          return mockRequest.patch(`/api/v1/categories/${results.body._id}`)
          .send({name:'Heels', display_name:'Manolo Blahnik Pumps', description:'These are shoes.',_id:`${results.body._id}`})
          .then(list => {
            expect(list.status).toBe(200);
            expect(results.body.name).toEqual(obj.name);
            expect(results.body._id).toBeDefined();
          })
        })
        .catch( err => console.error('err', err) );
      });

      it('following a delete, the record will be removed', () => {

        let obj = {name:'Sneakers', display_name:'Nike Sneakers', description:'These are shoes.'};
      
        return mockRequest
        .post('/api/v1/categories')
        .send(obj)
        .then(results => {
          return mockRequest.delete(`/api/v1/categories/${results.body._id}`)
          .then(list => {
            expect(list.status).toBe(200);
          })
        })
        .catch( err => console.error('err', err) );
      });
});