import { Context } from 'telegraf';

const sendSingleMessage = (
  ctx: Context,
  message: string,
  isCodeBlock = true,
  extraParams = {},
) => {
  const extra = {
    disable_web_page_preview: true,
    ...extraParams,
  };

  if (isCodeBlock) {
    message = `<pre>${message}</pre>`;
  }
  ctx.replyWithHTML(message, extra);
};

export default (
  ctx: Context,
  message: string | Array<string>,
  isCodeBlock = false,
  extraParams = {},
) => {
  if (Array.isArray(message)) {
    let currentMess = '';
    for (let i = 0; i < message.length; i++) {
      const mess = message[i];
      if (currentMess.length > 3000) {
        sendSingleMessage(ctx, currentMess, isCodeBlock, extraParams);
        currentMess = '';
      }
      currentMess += mess;
    }
    if (currentMess.length) {
      sendSingleMessage(ctx, currentMess, isCodeBlock, extraParams);
      currentMess = '';
    }
  } else {
    sendSingleMessage(ctx, message, isCodeBlock, extraParams);
  }
};
