import { Context } from 'telegraf';
import { ChatAction } from 'telegraf/typings/telegram-types';
export default (ctx: Context, action: ChatAction) => {
  const chatId = ctx.update.message.chat.id;
  ctx.telegram.sendChatAction(chatId, action);
};
