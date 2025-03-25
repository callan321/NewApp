import request from 'supertest';
import app from '../src/app'; 

describe('Auth Routes', () => {
  const testUser = {
    user_name: 'testuser123',
    email: 'test@example.com',
    password: 'StrongP@ssw0rd!'
  };

  it('should register a new user', async () => {
    console.log('Registering user with payload:', testUser);
    const res = await request(app)
      .post('/api/register')
      .send(testUser)
      .expect('Content-Type', /json/)
      .expect(201);

    console.log('Register response:', res.body);
    expect(res.body).toHaveProperty('status', true);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should login with correct credentials and return token', async () => {
    const loginPayload = {
      email: testUser.email,
      password: testUser.password,
    };
    console.log('Logging in with payload:', loginPayload);
    const res = await request(app)
      .post('/api/login')
      .send(loginPayload)
      .expect('Content-Type', /json/)
      .expect(200);

    console.log('Login response:', res.body);
    expect(res.body).toHaveProperty('token');
  });
});
