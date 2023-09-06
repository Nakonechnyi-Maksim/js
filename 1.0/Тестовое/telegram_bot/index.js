const TelegramApi = require("node-telegram-bot-api");

const token = "5771907863:AAHwcAE0lWdVev-ryEFi6yN8RlPVHzKQBqI";

const bot = new TelegramApi(token, { polling: true });

const button = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Ебал", callback_data: "Да" },
        { text: "Не ебал", callback_data: "Нет" },
      ],
    ],
  }),
};

const againButton = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Ещё раз?", callback_data: "/again" }]],
  }),
};

bot.setMyCommands([
  { command: "/start", description: "Приветствие" },
  { command: "/info", description: "Информация что может этот бот" },
  { command: "/ebal", description: "Ебал не?" },
]);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      `Привет, ${msg.from.first_name} ${msg.from.last_name} ты пидор`
    );
    await bot.sendSticker(
      chatId,
      `https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/7.webp`
    );
  }
  if (text === "/info") {
    await bot.sendMessage(
      chatId,
      "Этот бот считает количество половых партнёров побывавших в пещере мамы Рамиля Якхина"
    );
  }
  if (text === "/ebal") {
    await bot.sendMessage(
      chatId,
      "А теперь проверим ебал ты маму Рамиля Якхина или нет",
      button
    );
  }
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    await bot.sendMessage(chatId, `Ты выбрал`, againButton);
  });
});
