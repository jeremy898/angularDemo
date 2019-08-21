import { Component, OnInit,OnChanges } from '@angular/core';
import { TodosService } from '../../todos.service'
import {Todo} from '../../todoInterface'
 
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit,OnChanges {

  constructor(private todoService :TodosService ) { }
  
  todos:Todo[] = [];

  ngOnInit() {
    this.todos = this.todoService.getTodos()
  }
  ngOnChanges(){
    console.log('123')
  }
  
  add(todoName){
    this.todoService.add(todoName)
  }
  changeTodos(id){
    this.todoService.changeTodos(id)
  }

  remove(id){
    this.todoService.remove(id)
  }
}
