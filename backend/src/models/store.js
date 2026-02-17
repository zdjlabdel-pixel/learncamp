let nextId = 1;
const createId = () => String(nextId++);

export const db = {
  users: [],
  bootcamps: [],
  sessions: [],
  resources: [],
  replays: [],
  payments: [],
  messages: [],
  createId,
};
