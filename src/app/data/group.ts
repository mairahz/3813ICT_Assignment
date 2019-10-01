export class Group {
  name: string;
  channels: string[];

  constructor(name) {
    this.name = name;
    this.channels = [];
  }
}
