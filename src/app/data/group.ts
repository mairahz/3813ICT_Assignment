import { User } from './user';
import { Channel } from './channel';

export class Group {
  name: string;
  channels: Channel[];
  members: User[];

  constructor(name) {
    this.name = name;
    this.channels = [];
    this.members = [];
  }
}
