import { loginSchema, registerSchema } from '../utils/schemas.js';
import { loginUser, registerUser } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const payload = registerSchema.parse(req.body);
    const user = await registerUser(payload);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const payload = loginSchema.parse(req.body);
    const response = await loginUser(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
