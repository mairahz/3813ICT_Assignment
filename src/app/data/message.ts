import { User } from './user';

export class Message {
  author: User;
  message: string;

  constructor(author, message){
    this.author = author;
    this.message = message;
  }
}
