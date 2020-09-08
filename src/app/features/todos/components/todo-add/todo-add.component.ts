import { TodosFacadeService } from './../../services/todos-facade.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  constructor(private todosFacadeService: TodosFacadeService) { }

  ngOnInit(): void {
  }

  undo() {
    this.todosFacadeService.goToTodosHome();
  }

  addTodo(todo: Todo) {
    this.todosFacadeService.addTodo(todo);
  }

}
