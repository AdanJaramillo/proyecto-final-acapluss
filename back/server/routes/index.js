const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./pedido'));
app.use(require('./upload'));
app.use(require('./imagen'));
app.use(require('./producto'));
app.use(require('./categoria'));


module.exports = app;