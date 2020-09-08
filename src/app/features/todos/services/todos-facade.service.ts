import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { insertTodo, editTodo, initTodos, postTodo, updateTodo, retrieveAllTodos, deleteTodo} from 'src/app/redux/todos/todos.actions';
import { Router } from '@angular/router';
import { Todo } from 'src/app/core/model/todo.interface';


@Injectable()
export class TodosFacadeService {

  constructor(private router: Router, private store: Store) { }

  addTodo(todo: Todo) {
    this.store.dispatch(postTodo({todo}))
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(updateTodo({todo}))
  }

  removeTodo(todo: Todo){
    this.store.dispatch(deleteTodo({todo}));
    this.store.dispatch(retrieveAllTodos());
  }

  initTodo(){
    this.store.dispatch(retrieveAllTodos());
  }

 

  goToTodosHome() {
    this.router.navigateByUrl('/todos');
  }

  goToDetail(id: number) {
    this.router.navigateByUrl('/todos/detail/' + id);
  }
  
  goToEdit(id: number) {
    this.router.navigateByUrl('/todos/edit/' + id);
  }

  goToHome(){
    this.router.navigateByUrl('/todos');
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }


}