import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodosFacadeService } from '../../services/todos-facade.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { filter, mergeMap, switchMap } from 'rxjs/operators';
import { getTodoById } from 'src/app/redux/todos';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  todo: Todo;

  constructor(private todosFacadeService: TodosFacadeService, private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      filter(params => params != null && params['id'] != null),
      switchMap(params => this.store.pipe(select(getTodoById, { id: Number(params['id']) }))),
    ).subscribe(todo => {
      this.todo = todo;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  edit(todo: Todo) {
    this.todosFacadeService.goToEdit(todo.id);
  }

}