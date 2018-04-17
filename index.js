const express = require('express');

const app = express();

const port = process.env.PORT || '2508';
app.set('port', port);
app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
}).listen(app.get('port'), () => {
  console.log('Web access view initiated.');
});
