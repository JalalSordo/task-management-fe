export class Task{
  id?: number;
  text: string;
  dueDate: Date;
  reminder: boolean;
  constructor(id: number, text: string, dueDate: string, reminder: boolean){
    this.id = id;
    this.text = text;
    this.dueDate = new Date(JSON.parse(dueDate));
    this.reminder = reminder;
  }
}
