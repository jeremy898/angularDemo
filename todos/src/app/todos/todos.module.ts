import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule} from '@angular/forms'
import { MissionService } from '../mission.service'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';

@NgModule({
  declarations: [TodoComponent, TodoHeaderComponent, TodoListComponent, TodoFooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  exports:[TodoComponent],
  providers:[MissionService]
})
export class TodosModule { }
