import test from 'node:test';
import assert from 'node:assert/strict';
import { registerUser, loginUser } from '../src/services/authService.js';
import { db } from '../src/models/store.js';

const resetDb = () => {
  db.users.length = 0;
};

test('registerUser stores user with hashed password', async () => {
  resetDb();
  const user = await registerUser({
    fullName: 'Fatou Cisse',
    email: 'fatou@example.com',
    password: 'Secure123!',
    role: 'trainer',
  });

  assert.equal(user.email, 'fatou@example.com');
  assert.equal(db.users.length, 1);
  assert.notEqual(db.users[0].passwordHash, 'Secure123!');
});

test('loginUser returns JWT token', async () => {
  resetDb();
  await registerUser({
    fullName: 'Moussa Diallo',
    email: 'moussa@example.com',
    password: 'Secure123!',
    role: 'student',
  });

  const session = await loginUser({ email: 'moussa@example.com', password: 'Secure123!' });
  assert.ok(session.token);
  assert.equal(session.user.role, 'student');
});
