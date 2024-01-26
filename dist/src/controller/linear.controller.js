"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearRouter = void 0;
const express_1 = require("express");
exports.linearRouter = (0, express_1.Router)();
exports.linearRouter.get('/', (req, res) => {
    res.send(`
    <html>
      <head><title>Success!</title></head>
      <body>
        <h1>You did it!</h1>
        <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
      </body>
    </html>
  `);
});
exports.linearRouter.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
});
