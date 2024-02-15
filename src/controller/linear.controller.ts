import { Router, Request, Response } from 'express'
import { LinearServiceImpl } from '../service/linear.service.impl'
import { middlewareAuth } from '../utils/middlewareAuth';
import { LinearClient } from '@linear/sdk'
import axios from 'axios';
import * as querystring from 'querystring';

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

linearRouter.get('/token', async (req: Request, res: Response) => {
  try {
    const authUrl = `https://linear.app/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${process.env.SCOPE}&state=${process.env.STATE}`;
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error al generar la URL de autorización:', error);
    res.status(500).send('Error interno del servidor');
  }
});

linearRouter.get('/oauth/callback', async (req: Request, res: Response) => {
  try {
    console.log('Callback recibido');
    const { code, state } = req.query;
    const code1 = code as string;

    if (!code1) {
      throw new Error('Código de autorización no válido');
    }
    if(process.env.STATE !== state) {
      throw new Error('Estado no valido')
    }

    const postData = querystring.stringify({
      code: code1,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const tokenResponse = await axios.post('https://api.linear.app/oauth/token', postData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = tokenResponse.data;

    const linearClient = new LinearClient({
      accessToken: access_token
    });

    async function getMyIssues() {
      try {
        const me = await linearClient.viewer;
        console.log(me)
        const teams = await linearClient.teams();
        const org = await linearClient.organization;
        console.log(org)
        teams.nodes.forEach(team => console.log(team));
      } catch (error) {
        console.error('Error al obtener los problemas:', error);
      }
    }

    await getMyIssues();

    res.status(200).send('Solicitud completada exitosamente');
  } catch (error) {
    console.error('Error en el callback de OAuth:', error);
    res.status(500).send('Error interno del servidor');
  }
});