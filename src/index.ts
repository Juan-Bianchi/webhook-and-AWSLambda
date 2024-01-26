import express from 'express'
import cors from 'cors'
import { router } from './router';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded request bodies


app.use(
  cors({
    origin: `*`
  })
)

app.use('/api', router)

const port = 3030;

app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
})


