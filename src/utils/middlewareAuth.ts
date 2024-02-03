import { Response } from "express"
import crypto from 'crypto';
import { CustomRequest } from "..";


export const middlewareAuth = (secret: string | undefined, req: CustomRequest, res: Response, next: () => any): void => {
  if(req.rawBody === undefined){
    res.sendStatus(400);
  }
  else {
    // Verify signature
    const signature = crypto.createHmac("sha256", secret as string).update(req.rawBody).digest("hex");
    if (signature !== req.headers['linear-signature']) {
      res.sendStatus(400);
    }
  }
 
  next()
}