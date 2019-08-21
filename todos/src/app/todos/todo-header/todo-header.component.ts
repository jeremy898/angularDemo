import { Component, OnInit, Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output()
  addTodo = new EventEmitter()

  todoName:string = ''

  add(){
    if(this.todoName.trim() === ''){
      return
    }
    this.addTodo.emit(this.todoName)
    this.todoName = ''
  }
}
