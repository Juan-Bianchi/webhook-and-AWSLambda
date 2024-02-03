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

linearRouter.post('/', middlewareAuth.bind(null, process.env.WEBHOOK_SECRET), (req: Request, res: Response) => {
  console.log("\n\n\nIssue webhook\n\n") 
  const payload = req.body;
  const { action, data, type, createdAt } = payload;
  console.log(payload);
  const sentToDiscord = service.reSendMessageToDiscord(action, data, type, createdAt);
  if(!sentToDiscord) {
    res.status(403)
  }

  res.status(200)
})

linearRouter.post('/cycle', middlewareAuth.bind(null, process.env.CYCLE_SECRET), (req: Request, res: Response) => {
  console.log("\n\n\nCycle webhook\n\n") 
  const payload = req.body;
  console.log(req.headers)
  console.log(payload);

  res.status(200)
})

linearRouter.post('/project', middlewareAuth.bind(null, process.env.PROJECT_SECRET), (req: Request, res: Response) => {
  console.log("\n\n\nProject webhook\n\n") 
  const payload = req.body;
  console.log(req.headers)
  console.log(payload);

  res.status(200)
})

linearRouter.post('/comment', middlewareAuth.bind(null, process.env.COMMENT_SECRET), (req: Request, res: Response) => {
  console.log("\n\n\nComment webhook\n\n") 
  const payload = req.body;
  console.log(req.headers)
  console.log(payload);

  res.status(200)
})

linearRouter.post('/label', middlewareAuth.bind(null, process.env.LABEL_SECRET), (req: Request, res: Response) => {
  console.log("\n\n\nLabel webhook\n\n") 
  const payload = req.body;
  console.log(req.headers)
  console.log(payload);

  res.status(200)
})

linearRouter.post('/projectUpdate', middlewareAuth.bind(null, process.env.PROJECT_UPDATE), (req: Request, res: Response) => {
  console.log("\n\n\nProject update webhook\n\n") 
  const payload = req.body;
  console.log(req.headers)
  console.log(payload);

  res.status(200)
})