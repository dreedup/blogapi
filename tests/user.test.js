const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
const { token } = require('morgan')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

// afterAll((done) => done())

describe('Test the users endpoints', () => {
    let token

    beforeAll(async () => {
        // Log in a user and obtain the token
        const response = await request(app)
          .post('/login')
          .send({ email: 'test@example.com', password: 'password123' });
          
        token = response.body.token;
      });

    test('it should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .set('Authoruzation', `Bearer ${token}`)
            .send({ name: 'andre', email: 'adr@gmail.com', password: 'pass' })

        expect(response.body.user.name).toEqual('andre')
        expect(response.body.user.email).toEqual('adr@gmail.com')
        expect(response.body).toHaveProperty('token')
    })

})
test('Should update user', async () => {
    const user = new User ({
        name: 'andre',
        email: 'adr@gmail.com',
        password: 'pass'
    })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'graehm',
            email: 'adrupdate@gmail.com',
            password: 'pass'
        })
        expect(response.statusCode).toBe(200)
})

test('Should delete user', async () => {
    const user = new User ({
        name: 'andre',
        email: 'adr@gmail.com',
        password: 'pass'
    })
    await user.save()
    const token = await user.generateAuthToken()

    const response = await request(app)
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(204)
})

test('Should logout user', async () => {
    const user = new User({
      name: 'andre',
      email: 'adr@gmail.com',
      password: 'pass'
    });
  
    await user.save();
  
    const token = await user.generateAuthToken();
  
    const response = await request(app)
      .post(`/users/logout/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
  
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Youre Out!');
  });
  
