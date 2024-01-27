import { Router, Request, Response } from 'express'
import { LinearServiceImpl } from '../service/linear.service.impl'
import { middlewareAuth } from '../utils/middlewareAuth';

export const linearRouter = Router()
const service = new LinearServiceImpl();

linearRouter.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <head><title>Success!</title></head>
      <body>
        <h1>You did it!</h1>
        <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
      </body>
    </html>
  `)
})

linearRouter.post('/',middlewareAuth, (req: Request, res: Response) => {
  const payload = req.body;
  const { action, data, type, createdAt } = payload;
  console.log(payload);
  const sentToDiscord = service.reSendMessageToDiscord(action, data, type, createdAt);
  if(!sentToDiscord) {
    res.status(403)
  }

  res.status(200)
})