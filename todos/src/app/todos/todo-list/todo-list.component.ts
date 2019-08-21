import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input()
  todos

  @Output()
  del = new EventEmitter()
  @Output()
  changeTodo = new EventEmitter()


  trackByTodo(index , item){
    return item.id
  }

  changeType(e){
    this.changeTodo.emit(e)
  }
  remove(e,id){
    e.preventDefault()
    this.del.emit(id)
  }
  
}
