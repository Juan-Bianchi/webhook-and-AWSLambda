import axios from "axios";
import { IssueContent, IssueData } from "../types";
import { LinearEntityStrategy } from "./linearEntityStrategy";

export class IssueEntity implements LinearEntityStrategy {

  async reSendMessageToDiscord(action: string, data: IssueData, createdAt: string): Promise<boolean> {
    const url = process.env.DISCORD_WEBHOOK_URL as string;
    const contentObject: IssueContent = {
      title: data.title,
      team: data.team.name,
      assignee: data.assignee?.name ? data.assignee.name: 'Not assigned',
      action: action,
      state: data.state.name,
      date: createdAt,
    }
    const content = Object.values(contentObject)
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