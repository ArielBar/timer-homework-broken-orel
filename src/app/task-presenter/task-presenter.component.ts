import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TaskModel } from '../models/task-model';

@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss']
})
export class TaskPresenterComponent {
  @Input() task: TaskModel;
  @Output() clicked = new EventEmitter<TaskModel>();

  public click() {
    this.clicked.emit(this.task);
  }
}
