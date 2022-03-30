// Экспортируем модуль телеграф
const { Telegraf, Markup } = require("telegraf");

// Создаем константу с токеном бота
const BOT_TOKEN = "";
// Создаем экземпляр класса телеграф
const bot = new Telegraf(BOT_TOKEN);

// Команда для запуска бота
bot.start((ctx) => ctx.reply("Welcome"));
// Команда для получения помощи
bot.help((ctx) => ctx.reply("Send me a sticker"));
// Команда для бота, писать со / в чате
bot.command("oldschool", (ctx) => ctx.reply("Hello"));
// Бот отвечает на определенный текст
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
// Ответ на отправленный стикер
bot.on("sticker", (ctx) => ctx.reply("Ok"))
// Отправка документа боту, и ответ
bot.on("document", (ctx) => ctx.reply("Ты отправил документ"))

// Команда для бота, будет выполнена функция
// Синхронная функция, ответы будут в разном порядке
bot.command("sync", (ctx) => {
    try {
        // Отправка HTML разметки
        ctx.replyWithHTML("<b>1 Some text</b>");
        ctx.replyWithHTML("<i>2 Some text</i>");
        ctx.replyWithHTML("<u>3 Some text</u>");
        ctx.replyWithHTML("<s>4 Some text</s>");
        ctx.replyWithHTML("<code>5 Some text</code>");
        ctx.replyWithHTML("<a href='https://google.com'>6 Some text</a>");
    } catch (error) {
        console.log(error);
    }
})

// Команда для бота, будет выполнена функция
// Ассинхронная функция, ответы будут в порядке
bot.command("async", async (ctx) => {
    try {
        // Отправка HTML разметки
        await ctx.replyWithHTML("<b>1 Some text</b>");
        await ctx.replyWithHTML("<i>2 Some text</i>");
        await ctx.replyWithHTML("<u>3 Some text</u>");
        await ctx.replyWithHTML("<s>4 Some text</s>");
        await ctx.replyWithHTML("<code>5 Some text</code>");
        await ctx.replyWithHTML("<a href='https://google.com'>6 Some text</a>");
    } catch (error) {
        console.log(error);
    }
})

// Отправка команды боту, и ответ с кнопками
bot.command("buttons", (ctx) => {
    // Ответ в котором есть кнопки, в ответ добавляем массив с кнопками
    // Параметр text это то что будет написано в кнопке
    // Параметр data это то на что бот будет реагировать в action
    ctx.reply("Кнопки", Markup.inlineKeyboard([
        [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")]
    ]))
})

// Экшн на который бот реагирует, к примеру на параметр data в кнопке
// Для удаления превью ссылки, добавляем объект в котором определяем поле disable_web_page_preview с параметром true
bot.action("yes", (ctx) => {
    ctx.replyWithHTML(`<a href="https://yandex.kz">Link</a>`, { disable_web_page_preview: true })
})

// Экшн на который реагирует бот
bot.action("no", (ctx) => {
    ctx.reply("No")
})


// Запускаем бота
bot.launch();