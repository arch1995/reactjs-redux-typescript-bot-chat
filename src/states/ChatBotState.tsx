export interface Tabs {
  key: string;
  title: string;
  code: string;
}

export interface Chat {
  message: string;
  createdAt: string;
  isBotSender?: boolean;
}

export interface ChatBotState {
  isLoading: boolean;
  error: any;
  tabs: Tabs[];
  chat: Chat[];
};