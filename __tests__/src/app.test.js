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
    it('should respond with a 500 on an invalid model', () => {
        return mockRequest
        .get('/hellothere')
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

    // it('should be able to post to api/v1/categories', () => {
    //     let obj = {title:'foobar', text:'bazbaz'};
    //     return mockRequest
    //     .post('/api/v1/categories')
    //     .send(obj)
    //     .then(results => {
    //         expect(results.status).toBe(200);
    //         expect(results.body.title).toEqual(obj.title);
    //         expect(results.body._id).toBeDefined();
    //     })
    //     .catch(err => {
    //         expect(err).not.toBeDefined();
    //     });
    // })
});