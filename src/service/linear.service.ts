import { dataType } from "./linear.service.impl";

export interface LinearService {
  reSendMessageToDiscord(data: dataType, type: string, createdAt: string): Promise<boolean>;
}