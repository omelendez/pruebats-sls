import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
});

export const getClient = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log('✅ Cliente Redis conectado');
  }
  return client;
};