const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('./../app');
const expect = chai.expect;

describe('Resources: ', () => {
    it('should return HTML page', async () => {
        const response = await chai.request(app).get('/');
        expect(response).to.have.status(200);
        expect(response).to.have.header('content-type', 'text/html; charset=UTF-8');
    });
});