const request = require('request');
const cachedRequest = require('cached-request')(request);
const cacheDirectory = "/tmp/cache";
const Discordie = require('discordie');
const client = new Discordie();

console.log(process.env.TOKEN)

// Bot client connected using client token
client.connect({
  token: process.env.TOKEN
});

// Event for when bot client is ready
client.Dispatcher.on("GATEWAY_READY", e => {
  console.log(`Ready to serve coin prices!`);
});

// Callback function that returns price of coin in first argument
let priceGetter = (coin, cb) => {
  cachedRequest({
   url: "https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10000",
   ttl: 3000 //3 seconds
  }, (err, resp, body) => {
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
  if (userCoin.charAt(0) === "$") {
    userCoin = userCoin.substr(1);
    priceGetter(userCoin, (price, symbol, change) => {
      let diffSym = `${change.charAt(0) == "-" ? "- " + change.substr(1) : "+ " + change}`;
      let discordMessage = ` **${symbol}** Value in USD:
${"```diff"}
$${ price }
${ diffSym }% (24hr)
${"```"}`;
    // console.log(price, symbol);
      e.message.channel.sendMessage(discordMessage);
      return;
    });
  }
});
