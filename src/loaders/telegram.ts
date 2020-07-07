import Telegraf from 'telegraf';
import teleArg from '../middlewares/teleArg';

export default () => {
  const botToken = process.env.TELE_BOT_TOKEN;
  const bot = new Telegraf(botToken);
  bot.use(teleArg());
  return bot;
};
