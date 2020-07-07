import {
  replyMessage,
  getLimitFromArgs,
  sendChatAction,
  formatNumber,
} from '../../utils';
import Telegraf from 'telegraf';
import getCoronaData from './services/getCoronaData';
import { MContext } from '../../types/ctx';

export default (bot: Telegraf<MContext>) => {
  bot.command('corona_help', async (ctx: MContext) => {
    let message = '';
    message += 'Welcom to Coronavirus Stats section';
    message += `
-------------------------
/corona - Get top 3 countries.
/corona <code>n</code> - Get top <code>n</code>(number) countries. Use <code>all</code> to print all countries.
/coronastats - Check summary statistics
/coronavn - Check statistics in Vietnam
`;

    replyMessage(ctx, message);
  });
  bot.command('corona', async ctx => {
    sendChatAction(ctx, 'typing');
    const limit = getLimitFromArgs(ctx, 3);
    const listCountries = await getCoronaData(limit);
    if (!listCountries.length) {
      return replyMessage(ctx, 'System error, please try again later.');
    }
    const messages: Array<string> = [];
    let total = 0;
    let totalActive = 0;
    let totalDeath = 0;
    let totalPopulation = 0;
    listCountries.map(country => {
      let message = '';
      if (messages.length) {
        message += '\n';
      }
      message += `[${country.index}] - <b>${
        country.name
      }</b> total <i>${formatNumber(country.total)}</i>\n`;
      message += `🤕 ${formatNumber(country.active)} 💀 ${formatNumber(
        country.totalDeath,
      )}\n`;
      messages.push(message);
      total += country.total;
      totalActive += country.active;
      totalDeath += country.totalDeath;
      totalPopulation += country.totalPopulation;
    });

    if (listCountries.length > 1) {
      let message = '';
      message += `\n`;
      message += `📊 <b>${
        listCountries.length
      }</b> countries total ${formatNumber(total)}\n`;
      message += `🤕 ${formatNumber(totalActive)} 💀 ${formatNumber(
        totalDeath,
      )}\n`;
      message += `Population: ${formatNumber(totalPopulation)}\n`;
      messages.push(message);
    }
    replyMessage(ctx, messages);
  });

  bot.command('coronastats', async ctx => {
    sendChatAction(ctx, 'typing');
    const listCountries = await getCoronaData();
    if (!listCountries.length) {
      return replyMessage(ctx, 'System error, please try again later.');
    }
    let total = 0;
    let totalActive = 0;
    let totalDeath = 0;
    let totalPopulation = 0;
    listCountries.map(country => {
      total += country.total;
      totalActive += country.active;
      totalDeath += country.totalDeath;
      totalPopulation += country.totalPopulation;
    });

    let message = '';
    message += `📊 <b>${
      listCountries.length
    }</b> countries total ${formatNumber(total)}\n`;
    message += `🤕 ${formatNumber(totalActive)} 💀 ${formatNumber(
      totalDeath,
    )}\n`;
    message += `Population: ${formatNumber(totalPopulation)}\n`;
    replyMessage(ctx, message);
  });

  bot.command('coronavn', async ctx => {
    sendChatAction(ctx, 'typing');
    const listCountries = await getCoronaData();
    let message = '';
    if (!listCountries.length) {
      return replyMessage(ctx, 'System error, please try again later.');
    }
    listCountries.map(country => {
      if (country.name === 'Vietnam') {
        message += `[${country.index}] - <b>${
          country.name
        }</b> total <i>${formatNumber(country.total)}</i>\n`;
        message += `🤕 ${formatNumber(country.active)} 💀 ${formatNumber(
          country.totalDeath,
        )}\n`;
        message += `Population: ${formatNumber(country.totalPopulation)}\n`;
        return false;
      }
    });
    replyMessage(ctx, message);
  });
};
