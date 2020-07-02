import React, { Component } from 'react';
import TodoList from './todolist';
import Newtodo from './newtodo';
import Todo from './todo';

import './App.css';


export default class App extends Component {

    state = {
        todos: [],
        listItems: []
    };

    getTodos = async () => {
        let todos = await fetch("http://localhost:3001/task/alltodo", {
        }).then((res) => {
            return res.json();
        })
        this.setState(() => {
            return { todos: todos }
        })
    }

    deletedItem = (todoId) => {
        let arr = this.state.todos;

        for (let item in arr) {
            if (arr[item].id === todoId) {
                let arr1 = arr.slice(0, item);
                let arr2 = arr.slice(item + 1)

                this.setState(({ todos }) => {
                    return { todos: [...arr1, ...arr2] }
                })
            }
        }
    }

    addedItem = (text) => {
        let todo = this.state.todos;

        // let newId = todo.length ? (todo[todo.length - 1].id + 1) : 1;
        let item = {id: todo[todo.length -1] + 1, text: text}
        this.setState(({todos}) => {
            return {todos: [...todos, item]}
        })
    }

    viewTodos() {
        for (let item in this.state.todos) {
            this.setState((prevState) => {
                let todo = <Todo todo={this.state.todos[item].text} todoId={this.state.todos[item].id} updateState={this.deletedItem} key={this.state.todos[item].id} />
                return {
                    listItems: [...prevState.listItems, todo]
                }
            })
        }
    }

    componentDidMount = async () => {
        await this.getTodos();

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.todos) {
            if (prevState.todos.length !== this.state.todos.length) {
                this.getTodos();
                this.setState((listItems) => {
                    return { listItems: [] }
                })
                this.viewTodos();

            }
        }
    }

    render() {
        return (
            <div className="todo-app">
                <div>
                    <h2> My Todo List</h2>
                    <TodoList todos={this.state.listItems} />
                    <Newtodo onAdd={this.addedItem}/>
                </div>
            </div >
        );
    }

}

