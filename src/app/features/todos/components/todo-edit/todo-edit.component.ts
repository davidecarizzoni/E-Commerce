import { TodosFacadeService } from './../../services/todos-facade.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, switchMap } from 'rxjs/operators';
import { getTodoById } from 'src/app/redux/todos';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription();
  todo: Todo;

  constructor(private todosFacadeService: TodosFacadeService, private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      filter(params => params != null && params['id'] != null),
      switchMap(params => this.store.pipe(select(getTodoById, { id: Number(params['id']) })))
    ).subscribe(todo => {
      this.todo = todo;
    }));
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editForm(todo: Todo) {
    this.todosFacadeService.updateTodo(todo);
  }

  undo(todo: Todo) {
    this.todosFacadeService.goToDetail(todo.id);
  }

}
