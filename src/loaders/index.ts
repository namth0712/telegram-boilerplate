import telegramLoader from './telegram';
import general from '../apps/general';
import corona from '../apps/corona';

export default async () => {
  const bot = telegramLoader();
  console.info('✌️ Telegram loaded');

  general(bot);
  corona(bot);

  return bot;
};
