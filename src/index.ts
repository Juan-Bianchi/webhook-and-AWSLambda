import express, { Request, Response } from 'express'
import { Buffer } from 'buffer';
import cors from 'cors'
import { router } from './router';
import dotenv from 'dotenv';
import session from 'express-session';

export interface CustomRequest extends Request {
  rawBody?: Buffer;
}
dotenv.config();

const app = express();

app.use(express.json({
  // Save raw body buffer before JSON parsing
  verify: (req: CustomRequest, res: Response, buf: Buffer) => {
    req.rawBody = buf;
  },
}))
app.use(express.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded request bodies


app.use(
  cors({
    origin: `*`
  })
)

app.use(session({
  secret: process.env.CLIENT_SECRET as string,
  resave: false,
  saveUninitialized: false
}));

app.use('/api', router)

const port = 3030;

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
})

