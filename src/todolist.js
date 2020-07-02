import React from 'react';
import { List } from '@material-ui/core';


export default function TodoList({ todos }) {
    return (
        <List >
            {todos}
        </List>
    );
}