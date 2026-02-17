export const env = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'learncamp-dev-secret',
  tokenExpiry: '12h',
};
