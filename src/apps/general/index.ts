import { replyMessage } from '../../utils';
import Telegraf, { Context } from 'telegraf';

export default (bot: Telegraf<Context>) => {
  bot.command('help', (ctx) => {
    let message = '';
    message += 'Welcom to Telegram Bot';
    message += `
-------------------------
<b>General</b>
/help - Display help
/myid - Get your telegram info
/chatid - Get current chat info

<b>Coronavirus statistics</b>
/corona_help
`;
    replyMessage(ctx, message);
  });
  bot.command('myid', (ctx) => {
    let message = '';
    message += `ID: ${ctx.update.message.from.id}\n`;
    message += `Username: ${ctx.update.message.from.username}\n`;

    replyMessage(ctx, message, true);
  });

  bot.command('chatid', (ctx) => {
    let message = '';
    message += `ID: ${ctx.update.message.from.id}\n`;
    message += `Title: ${ctx.update.message.chat.title}\n`;
    replyMessage(ctx, message, true);
  });
};
