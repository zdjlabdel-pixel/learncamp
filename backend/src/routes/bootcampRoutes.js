import { Router } from 'express';
import {
  addReplay,
  addResource,
  createBootcamp,
  createMessage,
  createPayment,
  createSession,
  deleteBootcamp,
  listBootcamps,
  listMessagesBySession,
  listReplaysByBootcamp,
  listResourcesByBootcamp,
  listSessionsByBootcamp,
  updateBootcamp,
} from '../controllers/bootcampController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/bootcamps', requireAuth, listBootcamps);
router.post('/bootcamps', requireAuth, requireRole('trainer'), createBootcamp);
router.patch('/bootcamps/:id', requireAuth, requireRole('trainer'), updateBootcamp);
router.delete('/bootcamps/:id', requireAuth, requireRole('trainer'), deleteBootcamp);

router.post('/sessions', requireAuth, requireRole('trainer'), createSession);
router.get('/bootcamps/:bootcampId/sessions', requireAuth, listSessionsByBootcamp);

router.post('/payments', requireAuth, requireRole('student'), createPayment);

router.post('/chat/messages', requireAuth, createMessage);
router.get('/sessions/:sessionId/messages', requireAuth, listMessagesBySession);

router.post('/resources', requireAuth, requireRole('trainer'), addResource);
router.get('/bootcamps/:bootcampId/resources', requireAuth, listResourcesByBootcamp);

router.post('/replays', requireAuth, requireRole('trainer'), addReplay);
router.get('/bootcamps/:bootcampId/replays', requireAuth, listReplaysByBootcamp);

export default router;
