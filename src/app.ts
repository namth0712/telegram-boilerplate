import dotenv from 'dotenv';
import { User } from 'telegraf/typings/telegram-types';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
async function startBot() {
  const bot = await require('./loaders').default();

  bot.telegram.getMe().then((botInfo: User) => {
    bot.options.username = botInfo.username;
  });
  bot.startPolling();
}
startBot();
