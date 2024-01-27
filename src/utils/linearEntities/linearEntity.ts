import { CommentData, IssueData } from "../types";
import { LinearEntityStrategy } from "./linearEntityStrategy";

export class LinearEntity {
  constructor(private readonly strategy: LinearEntityStrategy) { }

  async reSendToDiscord(action: string, data: IssueData | CommentData, createdAt: string): Promise<boolean>{
    return this.strategy.reSendMessageToDiscord(action, data, createdAt);
  }
}