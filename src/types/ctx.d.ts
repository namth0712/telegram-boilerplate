import { ContextMessageUpdate } from 'telegraf';

export interface MContext extends ContextMessageUpdate {
  state?: {
    command: {
      raw?: string;
      command?: string;
      args?: Array<string>;
    };
  };
  wizard?: {
    state?: {
      apiData?: {
        key?: string;
        secret?: string;
        passphrase?: string;
        chatId?: string;
      };
      userData?: {
        apiData?: {
          key?: string;
          secret?: string;
          passphrase?: string;
          chatId?: string;
        };
      };
      userRef?: any;
    };
    next: any;
    prev: any;
  };
  scene?: {
    leave: any;
    enter: any;
  };
}

export type Next = () => any;
