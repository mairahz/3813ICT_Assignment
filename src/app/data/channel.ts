import { Message } from './message';
import { User } from './user';

export class Channel {
  name: string;
  members: User[];
  messages: Message[];

  constructor(name){
    this.name = name;
    this.members = [];
    this.messages = [];
  }
}
