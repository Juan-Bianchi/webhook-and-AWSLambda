import axios from "axios";
import { CommentContent, CommentData } from "../types";
import { LinearEntityStrategy } from "./linearEntityStrategy";

export class CommentEntity implements LinearEntityStrategy {

  async reSendMessageToDiscord(entity: string, action: string, data: CommentData, createdAt: string): Promise<boolean> {
    const url = process.env.DISCORD_WEBHOOK_URL as string;
    const contentObject: CommentContent = {
      entity: entity,
      body: data.body,
      user: data.user.name,
      issue: data.issue.title,
      date: createdAt,
      action: action
    }
    const content = Object.entries(contentObject)
      .map(([key, value]) => `${String(key)}:   ${String(value)}`)
      .join(',\n');
    return axios.post(url, {
        content: content,
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