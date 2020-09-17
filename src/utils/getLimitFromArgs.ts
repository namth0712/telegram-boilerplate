import { MContext } from '../types/ctx';

export default (ctx: MContext, defaultLimit = 0) => {
  let limit = defaultLimit;
  if (ctx.state.command.args && ctx.state.command.args.length) {
    const limitParam = ctx.state.command.args[0].trim();
    if (limitParam === 'all') {
      limit = 0;
    } else {
      limit = parseInt(limitParam);
      limit = Math.max(1, limit);
    }
  }
  return limit;
};
