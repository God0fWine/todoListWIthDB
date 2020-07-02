import React, { Component } from 'react';
import { List } from '@material-ui/core';
import Todo from './todo'


export default class TodoList extends Component {

    state = {
        todos: [],
        listItems: [],
    };

    getTodos = async () => {
        let todos = await fetch("http://localhost:3001/task/alltodo", {
        }).then((res) => {
            const result = res.json();
            // console.log(result);
            return result;

        })
        this.setState(() => {
            return { todos: todos }
        })


    }

    deletedItem = (todoId) => {
        let arr = this.state.todos;
        
        for(let item in arr){
            if(arr[item].id === todoId){
                let arr1 = arr.splice(item, 1);
                
                this.setState(({todos}) => {
                    return { todos: arr1}
                }) 
            }
        }
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
    componentDidMount = async() => {
        await this.getTodos();
        
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.todos) {
            if (prevState.todos.length !== this.state.todos.length) {
                this.getTodos();
                this.setState((listItems) => {
                    return {listItems: []}
                })
                this.viewTodos();
                
            }
        }
    }


    render() {

        
        return (

            <List >
                {this.state.listItems}
            </List>

        );
    }
}