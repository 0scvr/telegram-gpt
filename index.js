import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { ChatGPTAPI } from 'chatgpt';

const api = new ChatGPTAPI({
    apiKey: process.env.CHATGPT_API_KEY
})

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.on(message('text'), async (ctx) => {
    console.log("Asking Chat GPT...");
    await ctx.sendChatAction("typing");
    const res = await api.sendMessage(ctx.message.text);

    await ctx.reply(res.text);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));