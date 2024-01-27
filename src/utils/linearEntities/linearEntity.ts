import { CommentData, IssueData } from "../types";
import { LinearEntityStrategy } from "./linearEntityStrategy";

export class LinearEntity {
  constructor(private readonly strategy: LinearEntityStrategy) { }

  async reSendToDiscord(entity: string, action: string, data: IssueData | CommentData, createdAt: string): Promise<boolean>{
    return this.strategy.reSendMessageToDiscord(entity, action, data, createdAt);
  }
}