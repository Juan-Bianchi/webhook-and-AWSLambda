import { Router, Request, Response } from 'express'

export const linearRouter = Router()

linearRouter.post('/', (req: Request, res: Response) => {
  const data = req.body;

  console.log(data);
})