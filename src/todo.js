import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './todo.css';

export default function (todos) {

    return (
        <ListItem className="list-item">
            <ListItemText
                primary={todos.todo}
            />
            <IconButton aria-label="Delete" color='secondary' >
                <i className="material-icons">warning</i>
            </IconButton>
            <IconButton aria-label="Delete" color='primary' onClick={() => {
                fetch(`http://localhost:3001/task/${todos.todoId}`, {
                    method: 'delete'
                })
                todos.updateState(todos.todoId);
            }
            }>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )

}