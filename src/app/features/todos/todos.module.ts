import { NgModule } from '@angular/core';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './components/main/todos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodosFacadeService } from './services/todos-facade.service';
import { TodoAddComponent } from './components/todo-add/todo-add.component';


@NgModule({
  declarations: [TodosComponent, TodoDetailComponent, TodoEditComponent, TodoAddComponent],
  providers: [TodosFacadeService],
  imports: [
    SharedModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
