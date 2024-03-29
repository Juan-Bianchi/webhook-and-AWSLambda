import axios, { AxiosResponse } from "axios";
import { LinearService } from "./linear.service";
import { CommentData, DataType, IssueData } from "../utils/types";
import { IssueEntity } from "../utils/linearEntities/issueEntity";
import { LinearEntity } from "../utils/linearEntities/linearEntity";
import { CommentEntity } from "../utils/linearEntities/commentEntity";

interface CustomError extends Error {
  response?: AxiosResponse<unknown, any> | undefined;
}

export class LinearServiceImpl implements LinearService {

  async reSendMessageToDiscord(action: string, data: IssueData | CommentData, type: DataType, createdAt: string): Promise<boolean> {
    let hasBeenSent: boolean;
    if (type == DataType.Issue || type == DataType.Comment) {
      const strategy = type === DataType.Issue? new IssueEntity(): new CommentEntity();
      const linearEntity = new LinearEntity(strategy);
      hasBeenSent = await linearEntity.reSendToDiscord(type, action, data, createdAt);
    }
    else {
      const url = process.env.DISCORD_WEBHOOK_URL as string;
      return axios.post(url, {
          content: `Entity name:  ${type}\nDate: ${createdAt}, \nAction: ${action}`,
        }).then((discordResponse) => {
            console.log("Success!");
            return true;
          })
          .catch((err: CustomError) => {
            console.error(`Error sending to Discord: ${err}`);
            console.log('Encabezados de la Respuesta:', err.response?.headers);
            return false;
          });
    }
    return hasBeenSent;
  }   
}