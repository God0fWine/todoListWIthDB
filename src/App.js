import React from 'react';
import './App.css';
import TodoList from './todolist';
import Newtodo from './newtodo';


function App() {
    return (
        <div className="todo-app">
            <div>
                <h2> My Todo List</h2>
                <TodoList />
                <Newtodo />
            </div>
        </div >
    );

}

export default App;
