import { User } from './user';

export class Message {
  author: string;
  message: string;

  constructor(author, message){
    this.author = author;
    this.message = message;
  }
}
