import { User } from './user';

export class Group {
  name: string;
  channels: string[];
  members: User[];

  constructor(name) {
    this.name = name;
    this.channels = [];
    this.members = [];
  }

  public addMem(mem: User){
    this.members.push(mem);
  }
}
