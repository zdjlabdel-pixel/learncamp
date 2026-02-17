import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['trainer', 'student']),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bootcampSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(20),
  startDate: z.string(),
  endDate: z.string(),
  durationWeeks: z.number().int().positive(),
  priceXOF: z.number().int().positive(),
});

export const sessionSchema = z.object({
  bootcampId: z.string(),
  title: z.string().min(4),
  scheduledAt: z.string(),
  durationMinutes: z.number().int().positive(),
  liveRoomCode: z.string().min(4),
});

export const paymentSchema = z.object({
  bootcampId: z.string(),
  provider: z.enum(['wave', 'orange_money', 'mtn_momo', 'airtel_money']),
  phoneNumber: z.string().min(8),
  amountXOF: z.number().int().positive(),
});

export const messageSchema = z.object({
  sessionId: z.string(),
  content: z.string().min(1).max(1000),
});

export const resourceSchema = z.object({
  bootcampId: z.string(),
  title: z.string().min(3),
  type: z.enum(['pdf', 'slide', 'zip', 'other']),
  url: z.string().url(),
});

export const replaySchema = z.object({
  sessionId: z.string(),
  title: z.string().min(3),
  videoUrl: z.string().url(),
  durationMinutes: z.number().int().positive(),
});
