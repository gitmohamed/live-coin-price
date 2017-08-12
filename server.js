const Discordie = require('discordie');
const request = require('request');

const client = new Discordie();

function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

if (!Math.round10) {
  Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
  };
}

// Bot client connected using client token
client.connect({
  token: "MzQ1NDcxNTQ3NzU2MTE4MDE2.DG78Xg.9XqtyzhoXt5aEkhIsrtJHdzAq0c"
});

// Event for when bot client is ready
client.Dispatcher.on("GATEWAY_READY", e => {
  console.log(`${client.User.username} bot active`);
});

// Callback function that returns price of coin in first argument
let priceGetter = (coin, cb) => {
  request.get(`https://api.cryptonator.com/api/ticker/${coin}-usd`, (err, resp, body) => {
    if (err) {
      console.log(err);
      return;
    };
    cb(JSON.parse(body).ticker.price)
  });
}

// Event for when message is seen by the bot
client.Dispatcher.on("MESSAGE_CREATE", e => {
  switch (e.message.content.toUpperCase()) {
    case "$BTC":
      priceGetter('btc', (price) => {
        e.message.channel.sendMessage(`Live **Bitcoin** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$ETH":
      priceGetter('eth', (price) => {
        e.message.channel.sendMessage(`Live **Ethereum** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$LTC":
      priceGetter('ltc', (price) => {
        e.message.channel.sendMessage(`Live **LiteCoin** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$XRP":
      priceGetter('xrp', (price) => {
        e.message.channel.sendMessage(`Live **Ripple** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$BCC":
      priceGetter('bcc', (price) => {
        e.message.channel.sendMessage(`Live **Bitcoin Cash** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$DOGE":
      priceGetter('doge', (price) => {
        e.message.channel.sendMessage(`Live **DogeCoin** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$NEO":
      priceGetter('neo', (price) => {
        e.message.channel.sendMessage(`Live **Neo** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$ZEC":
      priceGetter('zec', (price) => {
        e.message.channel.sendMessage(`Live **Zcash** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$DASH":
      priceGetter('dash', (price) => {
        e.message.channel.sendMessage(`Live **DashCoin** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
    case "$ETC":
      priceGetter('etc', (price) => {
        e.message.channel.sendMessage(`Live **Ethereum Classic** price: ${"```javascript"}
$${price} ${"```"}`);
      });
      break;
  }
});
