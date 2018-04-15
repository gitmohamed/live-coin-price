const Discordie = require('discordie');
const request = require('request');

const client = new Discordie();

// Bot client connected using client token
client.connect({
  token: "MzQ1NDcxNTQ3NzU2MTE4MDE2.DG78Xg.9XqtyzhoXt5aEkhIsrtJHdzAq0c"
});

// Event for when bot client is ready
client.Dispatcher.on("GATEWAY_READY", e => {
  console.log(`Ready to serve coin prices!`);
});

// Callback function that returns price of coin in first argument
let priceGetter = (coin, cb) => {
  request.get(`https://api.coinmarketcap.com/v1/ticker/?start=0&limit=1000`, (err, resp, body) => {
    if (err) {
      console.log(err);
      return;
    };
    // console.log(JSON.parse(body)[0]);
// for (var c in JSON.parse(body)) {
//   if (JSON.parse(body).hasOwnProperty(c)) {
//     console.log(c.symbol);
//   }
// }
for (var i = 0; i < JSON.parse(body).length; i++) {
  console.log(JSON.parse(body)[i].symbol);
};
    // cb(JSON.parse(body).price_usd ,JSON.parse(body).symbol);
  });
}

// Event for when message is seen by the bot
client.Dispatcher.on("MESSAGE_CREATE", e => {

  let userCoin = e.message.content.toUpperCase();
  userCoin = userCoin.substr(1);
  priceGetter(userCoin, (price, symbol) => {
    let discordMessage = `Live ${symbol} price: ${"```javascript"} $${(price)} ${"```"}`;
    e.message.channel.sendMessage(discordMessage);
    return;
  });
//   switch (e.message.content.toUpperCase()) {
//     case "$BTC":
//       priceGetter('btc', (price) => {
//         e.message.channel.sendMessage(`Live **Bitcoin** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$ETH":
//       priceGetter('eth', (price) => {
//         e.message.channel.sendMessage(`Live **Ethereum** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$LTC":
//       priceGetter('ltc', (price) => {
//         e.message.channel.sendMessage(`Live **LiteCoin** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$XRP":
//       priceGetter('xrp', (price) => {
//         e.message.channel.sendMessage(`Live **Ripple** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$BCC":
//       priceGetter('bcc', (price) => {
//         e.message.channel.sendMessage(`Live **Bitcoin Cash** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$DOGE":
//       priceGetter('doge', (price) => {
//         e.message.channel.sendMessage(`Live **DogeCoin** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$NEO":
//       priceGetter('neo', (price) => {
//         e.message.channel.sendMessage(`Live **Neo** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$ZEC":
//       priceGetter('zec', (price) => {
//         e.message.channel.sendMessage(`Live **Zcash** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$DASH":
//       priceGetter('dash', (price) => {
//         e.message.channel.sendMessage(`Live **DashCoin** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//     case "$ETC":
//       priceGetter('etc', (price) => {
//         e.message.channel.sendMessage(`Live **Ethereum Classic** price: ${"```javascript"}
// $${price} ${"```"}`);
//       });
//       break;
//   }
});
