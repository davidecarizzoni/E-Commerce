import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosComponent } from './components/main/todos.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';

const routes: Routes = [{
  path: '', component: TodosComponent, children: [
    {path: 'detail/:id', component: TodoDetailComponent},
    {path: 'edit/:id', component: TodoEditComponent},
    {path: 'add', component: TodoAddComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
