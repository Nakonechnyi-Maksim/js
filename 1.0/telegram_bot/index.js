const TelegramApi = require("node-telegram-bot-api");

const { button, againButton } = require("./options.js");

const { token } = require("./token.js");

const sequelize = require("./db");

const UserModel = require("./models");

const bot = new TelegramApi(token, { polling: true });

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
  await sequelize.authenticate();
  await sequelize.sync();

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
        await func(chatId);
      }
      if (text === "/amount") {
        const user = await UserModel.findOne({ chatId });
        await bot.sendMessage(
          chatId,
          `Количество Да ${user.amount_Yes} Нет ${user.amount_No}`
        );
      }
    } catch (error) {
      return bot.sendMessage(chatId, "Ашибочка");
    }
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      await func(chatId);
    }

    const user = await UserModel.findOne({ chatId });
    if (data == "Да") {
      user.amount_Yes += 1;
    }
    if (data == "Нет") {
      user.amount_No += 1;
    }
    await user.save();
    await bot.sendMessage(chatId, `Ты сделал свой выбор`, againButton);
  });
};

start();
