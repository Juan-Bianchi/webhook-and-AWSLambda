export interface LinearService {
  reSendMessageToDiscord(data: string, type: string, createdAt: string): Promise<boolean>;
}