import { CommentData, DataType, IssueData } from "../utils/types";

export interface LinearService {
  reSendMessageToDiscord(action: string, data: IssueData | CommentData, type: DataType, createdAt: string): Promise<boolean>;
}