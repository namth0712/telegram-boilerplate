import { Context } from 'telegraf';
import sendMessage from './sendMessage';

export default (
  ctx: Context,
  message: string | Array<string>,
  isCodeBlock = false,
  extraParams = {},
) => {
  sendMessage(ctx, message, isCodeBlock, {
    reply_to_message_id: ctx.update.message.message_id,
    ...extraParams,
  });
};
