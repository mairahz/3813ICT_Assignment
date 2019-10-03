export class Message {
  author: string;
  message: string;
  path: string;

  constructor(author, message, path){
    this.author = author;
    this.message = message;
    this.path = path;
  }
}
