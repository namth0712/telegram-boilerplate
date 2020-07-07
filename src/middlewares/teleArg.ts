import { MContext, Next } from '../types/ctx';
export default () => (ctx: MContext, next: Next) => {
  if (ctx.updateType === 'message' && ctx.updateSubTypes.includes('text')) {
    const text = ctx.update.message.text.toLowerCase();
    if (text.startsWith('/')) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/);
      let args: Array<string> = [];
      let command: string;
      if (match !== null) {
        if (match[1]) {
          command = match[1];
        }
        if (match[2]) {
          args = match[2].split(' ');
        }
      }
      ctx.state.command = {
        raw: text,
        command,
        args,
      };
    }
  }
  return next();
};
