import { CommentData, IssueData } from "../types";

export interface LinearEntityStrategy {
  reSendMessageToDiscord(entity: string, action: string, data: IssueData | CommentData, createdAt: string): Promise<boolean>;
}