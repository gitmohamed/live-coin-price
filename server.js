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
  request.get(`https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10000`, (err, resp, body) => {
    if (err) {
      console.log(err);
      return;
    };
    let coinLoad = JSON.parse(body);
    for (var i = 0; i < coinLoad.length; i++) {
      if (coinLoad[i].symbol === coin) {
        console.log(coinLoad[i].price_usd, coinLoad[i].symbol);
        cb(coinLoad[i].price_usd, coinLoad[i].symbol, coinLoad[i].percent_change_24h);
      }
    };
  });
}

// Event for when message is seen by the bot
client.Dispatcher.on("MESSAGE_CREATE", e => {
  let userCoin = e.message.content.toUpperCase();
  userCoin = userCoin.substr(1);
  priceGetter(userCoin, (price, symbol, change) => {
    let diffSym = `${change.charAt(0) == "-" ? change : "+" + change}`;
    let discordMessage = ` **${symbol}** Value in USD:
                             ${"```diff"}
                             (${ diffSym }${"%```"})
                            $${ price }`;
    // console.log(price, symbol);
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
