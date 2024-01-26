import axios from "axios";
import { LinearService } from "./linear.service";

export class LinearServiceImpl implements LinearService {

  async reSendMessageToDiscord(data: string, type: string, createdAt: string): Promise<boolean> {
    const url = process.env.DISCORD_WEBHOOK_URL as string;
    return axios.post(url, {
        content: `A ${type} has been created on ${createdAt}, here is the content: ${data}`,
      }).then((discordResponse) => {
          console.log("Success!");
          return true;
        })
        .catch((err) => {
          console.error(`Error sending to Discord: ${err}`);
          return false;
        });
  }   
}