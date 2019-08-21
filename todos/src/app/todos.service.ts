import { Injectable } from '@angular/core';
import {Todo} from './todoInterface'

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  todos:Todo[]

  getTodos() {
    const todos:Todo[] = [
      {id:1,name:'11111',done:true},
      {id:2,name:'22222',done:false},
      {id:3,name:'33333',done:false},
      {id:4,name:'44444',done:true}
    ]
    this.todos = todos
    return todos
  }
  add(todoName){
    let id:number = this.todos[this.todos.length - 1].id + 1
    this.todos.push(
      {
        id:id,
        name:todoName,
        done:false
      }
    )
  }
  changeTodos(id){
    let curTodo = this.todos.find(item => {
      return item.id === id
    })
    curTodo.done = !curTodo.done
  }
  remove(id){
    // this.todos = this.todos.filter(todo =>{
    //   return todo.id !== id
    // })
    let curIndex = this.todos.findIndex(item => {
      return item.id === id
    })
    this.todos.splice(curIndex,1)
  }
}
