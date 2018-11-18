import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  keyframes,
  style,
  animate,
  stagger,
  query
} from '@angular/animations';
import { AppService } from '../../service/app.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('removeAnimate', [
      transition('* => *', [
        query(':leave', stagger('300ms', [
          animate('0.2s ease-in', keyframes([
            style({ transform: 'scale(1.02)', }),
            style({ transform: 'scale(0.85)' }),
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  addNew = false;

  todoList: Array<any> = [];

  constructor(private _apiService: AppService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this._apiService.getList().subscribe(result => {
      this.todoList = result;
    });
  }
  addItem(e) {
    if (e.keyCode === 13) {
      if (e.target.value) {
        this._apiService.addList({ item: e.target.value })
          .subscribe((val) => {
            this.getItems();
            this.toggleAdd();
          }, err => this._apiService.errHandler(err));
      }
    }
  }

  removeTodo(index) {
    this._apiService.removeList(this.todoList[index]['_id']).subscribe(val => {
      this.todoList.splice(index, 1);
    });
  }
  updateItem(index) {
    this.todoList[index]['isDone'] = !this.todoList[index]['isDone'];
    this._apiService.updateList(this.todoList[index]['_id'], { isDone: this.todoList[index]['isDone'] }).subscribe(val => {
      this.getItems();
    });
  }
  toggleAdd() {
    this.addNew = !this.addNew;
  }
}
