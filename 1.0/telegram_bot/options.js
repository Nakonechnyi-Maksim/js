module.exports = {
  button: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Да", callback_data: "Да" },
          { text: "Нет", callback_data: "Нет" },
        ],
      ],
    }),
  },

  againButton: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Ещё раз?", callback_data: "/again" },
          //{text: }
        ],
      ],
    }),
  },
};
