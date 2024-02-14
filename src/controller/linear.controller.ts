import { Router, Request, Response } from 'express'
import { LinearServiceImpl } from '../service/linear.service.impl'
import { middlewareAuth } from '../utils/middlewareAuth';
import { LinearClient, LinearFetch, User} from '@linear/sdk'
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

linearRouter.get('/token', async (req:Request, res: Response) => {
  const authUrl = `https://linear.app/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${process.env.SCOPE}`;
  res.redirect(authUrl);
})

linearRouter.get('/oauth/callback', async (req: Request, res: Response) => {
  console.log('hola')
  const { code, state } = req.query;
  const code1 = code as string

  try {
    // Paso 3: Intercambiar código por un token de acceso
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

    // Paso 5: Hacer una solicitud a la API de Linear
    /*const apiResponse = await axios.get('https://api.linear.app/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });*/

    const linearClient = new LinearClient({
      apiKey: access_token
  })
  
  async function getCurrentUser(): LinearFetch<User> {
      return linearClient.viewer;
  }
  
  const currentUser = getCurrentUser();
  console.log(currentUser)
  
  async function getMyIssues() {
      const org = await linearClient.organization;
      // console.log(org)
      //const me = await linearClient.viewer;
      //const myIssues = await me.assignedIssues();
      const id: string = "3972c82b-1fe6-4a31-a113-d9758969fcd5"
      const team = await linearClient.team(id);
      console.log(team)
      const teams = await linearClient.teams()
      teams.nodes.forEach(team => console.log(team))
      const members  = await team.members();
      // members.nodes.forEach(member => console.log(member))
      //const issues = await me.assignedIssues()
      //const issue = issues.nodes.filter(issue => issue.id === "0eed9c50-81d5-488e-b10b-2cdb7d938b5f");
      //const history = await issue[0].history()
      /*history.nodes.sort((nodeA, nodeB): number => {
          return nodeA.updatedAt < nodeB.updatedAt? 0: 1;
      }).map(node => console.log(node) )*/
  
      /*const event = history.nodes.sort((nodeA, nodeB): number => {
          return nodeA.updatedAt < nodeB.updatedAt? 0: 1;
      })[history.nodes.length - 3]
  
      const state = await event.toState*/
  
      // console.log(state)
  
      /*if (myIssues.nodes.length) {
          myIssues.nodes.map(issue => {
              console.log(`${me.displayName} has issue: ${issue.id}, ${issue.title}`);
          });
      } else {
          console.log(`${me.displayName} has no issues`);
      }*/
  }
  
    getMyIssues();

    res.status(200);

  } catch (error) {
    console.error('Error:', error);
  }
});