const TelegramApi = require("node-telegram-bot-api");

const { button, againButton } = require("./options.js");

const { token } = require("./token.js");

const bot = new TelegramApi(token, { polling: true });

const DB = {};

bot.setMyCommands([
  { command: "/start", description: "Приветствие" },
  { command: "/info", description: "Информация что может этот бот" },
  { command: "/labe", description: "Проверка" },
]);

const func = async (chatId) => {
  await bot.sendMessage(chatId, "А теперь проверим", button);
};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}`);
      await bot.sendSticker(
        chatId,
        `https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/7.webp`
      );
    }
    if (text === "/info") {
      await bot.sendMessage(chatId, "Этот бот считает количество ");
    }
    if (text === "/labe") {
      return func(chatId);
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    await bot.sendMessage(chatId, `Ты сделал свой выбор`, againButton);
    DB[chatId] = msg.data;
    if (data === "/again") {
      return func(chatId);
    }
    console.log(msg);
    console.log(DB);
  });
};

start();
