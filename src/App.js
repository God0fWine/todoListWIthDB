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
        let todos = await fetch("http://localhost:3001/task/alltodo")
            .then((res) => {
                return res.json();
            })
        this.setState(() => {
            return { todos: todos }
        })
    }

    deletedItem = (todoId) => {
        let arr = this.state.todos;
        let newArr = arr.filter((item) => item.id !== todoId);
        this.setState(({ todos }) => {
            return { todos: newArr }
        })
    }

    onImportant = (todoId) => {
        let arr = this.state.todos;
        let idx = arr.findIndex((item) => item.id === todoId);
        arr[idx].important = !arr[idx].important;
        this.setState(({ todos }) => {
            return {todos: arr}
        })
    }

    addedItem = (id, text) => {
        let item = { id: id, text: text }
        this.setState(({ todos }) => {
            return { todos: [...todos, item] }
        })
    }

    viewTodos() {
        for (let item in this.state.todos) {
            this.setState((prevState) => {
                let todo = <Todo todo={this.state.todos[item].text} todoId={this.state.todos[item].id} imp={this.state.todos[item].important} onDelete={this.deletedItem} onImportant={this.onImportant} key={this.state.todos[item].id} />
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
                    <Newtodo onAdd={this.addedItem} />
                </div>
            </div >
        );
    }

}

