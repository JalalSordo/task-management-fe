import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  dueDate: string;
  minDate : string =moment().format('YYYY-MM-DDTHH:mm');
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}
  
   ngOnDestroy() {
        // Unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask: Task = {
      text: this.text,
      dueDate: new Date(this.dueDate),
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.dueDate = null;
    this.reminder = false;
  }
}
