import { db } from '../models/store.js';
import {
  bootcampSchema,
  messageSchema,
  paymentSchema,
  replaySchema,
  resourceSchema,
  sessionSchema,
} from '../utils/schemas.js';

export const listBootcamps = (_req, res) => res.json(db.bootcamps);

export const createBootcamp = (req, res) => {
  try {
    const payload = bootcampSchema.parse(req.body);
    const bootcamp = {
      id: db.createId(),
      trainerId: req.user.id,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    db.bootcamps.push(bootcamp);
    return res.status(201).json(bootcamp);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateBootcamp = (req, res) => {
  const bootcamp = db.bootcamps.find((item) => item.id === req.params.id);
  if (!bootcamp) return res.status(404).json({ error: 'Bootcamp not found' });
  if (bootcamp.trainerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  Object.assign(bootcamp, req.body);
  return res.status(200).json(bootcamp);
};

export const deleteBootcamp = (req, res) => {
  const index = db.bootcamps.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Bootcamp not found' });

  const bootcamp = db.bootcamps[index];
  if (bootcamp.trainerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  db.bootcamps.splice(index, 1);
  return res.status(204).send();
};

export const createSession = (req, res) => {
  try {
    const payload = sessionSchema.parse(req.body);
    const bootcamp = db.bootcamps.find((item) => item.id === payload.bootcampId);
    if (!bootcamp) return res.status(404).json({ error: 'Bootcamp not found' });
    if (bootcamp.trainerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const session = {
      id: db.createId(),
      ...payload,
      trainerId: req.user.id,
      createdAt: new Date().toISOString(),
    };
    db.sessions.push(session);
    return res.status(201).json(session);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listSessionsByBootcamp = (req, res) => {
  const sessions = db.sessions.filter((session) => session.bootcampId === req.params.bootcampId);
  return res.status(200).json(sessions);
};

export const createPayment = (req, res) => {
  try {
    const payload = paymentSchema.parse(req.body);
    const payment = {
      id: db.createId(),
      studentId: req.user.id,
      status: 'confirmed',
      reference: `MM-${Date.now()}`,
      ...payload,
      paidAt: new Date().toISOString(),
    };
    db.payments.push(payment);
    return res.status(201).json(payment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createMessage = (req, res) => {
  try {
    const payload = messageSchema.parse(req.body);
    const message = {
      id: db.createId(),
      senderId: req.user.id,
      senderName: req.user.fullName,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    db.messages.push(message);
    return res.status(201).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listMessagesBySession = (req, res) => {
  const messages = db.messages.filter((message) => message.sessionId === req.params.sessionId);
  return res.status(200).json(messages);
};

export const addResource = (req, res) => {
  try {
    const payload = resourceSchema.parse(req.body);
    const bootcamp = db.bootcamps.find((item) => item.id === payload.bootcampId);
    if (!bootcamp) return res.status(404).json({ error: 'Bootcamp not found' });
    if (bootcamp.trainerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const resource = {
      id: db.createId(),
      uploadedBy: req.user.id,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    db.resources.push(resource);
    return res.status(201).json(resource);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listResourcesByBootcamp = (req, res) => {
  const resources = db.resources.filter((resource) => resource.bootcampId === req.params.bootcampId);
  return res.status(200).json(resources);
};

export const addReplay = (req, res) => {
  try {
    const payload = replaySchema.parse(req.body);
    const session = db.sessions.find((item) => item.id === payload.sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    if (session.trainerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const replay = {
      id: db.createId(),
      storageProvider: 's3',
      ...payload,
      createdAt: new Date().toISOString(),
    };
    db.replays.push(replay);
    return res.status(201).json(replay);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listReplaysByBootcamp = (req, res) => {
  const bootcampSessions = db.sessions
    .filter((session) => session.bootcampId === req.params.bootcampId)
    .map((session) => session.id);

  const replays = db.replays.filter((replay) => bootcampSessions.includes(replay.sessionId));
  return res.status(200).json(replays);
};
