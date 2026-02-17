import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../models/store.js';
import { env } from '../config/env.js';

export const registerUser = async ({ fullName, email, password, role }) => {
  const existing = db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) throw new Error('Email already in use');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: db.createId(),
    fullName,
    email,
    role,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  return { ...user, passwordHash: undefined };
};

export const loginUser = async ({ email, password }) => {
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error('Invalid credentials');

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.tokenExpiry,
  });

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};
