import { CommentData, DataType, IssueData } from "../types";

export interface LinearEntityStrategy {
  reSendMessageToDiscord(action: string, data: IssueData | CommentData, createdAt: string): Promise<boolean>;
}