const TelegramApi = require("node-telegram-bot-api");

const { button, againButton } = require("./options.js");

const { token } = require("./token.js");

const bot = new TelegramApi(token, { polling: true });

const sequelize = require("./db");

const UserModel = require("./models");

bot.setMyCommands([
  { command: "/start", description: "Приветствие" },
  { command: "/info", description: "Информация что может этот бот" },
  { command: "/like", description: "Ставишь лайк?" },
  { command: "/amount", description: "Сколько лайков" },
]);

const func = async (chatId) => {
  await bot.sendMessage(chatId, "Ставишь лайк?", button);
};

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log("Ошибка емае");
  }

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        await UserModel.create({ chatId });
        await bot.sendMessage(chatId, `Привет, ${msg.from.first_name}`);
        await bot.sendSticker(
          chatId,
          `https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/7.webp`
        );
      }
      if (text === "/info") {
        await bot.sendMessage(chatId, "Этот бот считает количество лайков");
      }
      if (text === "/like") {
        return func(chatId);
      }
      if (text === "/amount") {
        await bot.sendMessage(chatId, `Количество Да ${User.amount_Yes}`);
      }
      bot.on("callback_query", async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === "/again") {
          return func(chatId);
        }

        await bot.sendMessage(chatId, `Ты сделал свой выбор`, againButton);
      });
    } catch (error) {
      return bot.sendMessage(chatId, "Ошибка емае");
    }
  });
};

start();
