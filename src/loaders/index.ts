import telegramLoader from './telegram';
import general from '../apps/general';

export default async () => {
  const bot = telegramLoader();
  console.info('✌️ Telegram loaded');

  general(bot);

  return bot;
};
