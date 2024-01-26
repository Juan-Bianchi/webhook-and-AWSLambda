import { Router, Request, Response } from 'express'

export const linearRouter = Router()

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

linearRouter.post('/', (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  res.status(200).json(data)
})