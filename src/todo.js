import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './todo.css';

export default class Todo extends Component {

    state = {
        classes: 'list-item'
    }

    componentDidMount() {
        if (this.props.imp && !this.state.classes.includes('imp')) {
            console.log('change')
            this.setState(({classes}) => {
                return {classes: classes + ' imp'}
            })
        }
    }

    render() {
        return (
            <ListItem className={this.state.classes} >
                <ListItemText
                    primary={this.props.todo}
                />
                <IconButton aria-label="Delete" color='secondary' onClick={() => {
                    fetch(`http://localhost:3001/task/imp/${this.props.todoId}`, {
                        method: 'post'
                    })
                    console.log(this.state.classes.length > 10)
                    // setClass("item-list")
                    if (this.state.classes.length > 9) {
                        this.setState((classes) => {
                            return {classes: 'list-item'}
                        })
                    } else {
                        this.setState(({classes}) => {
                            return { classes: classes + ' imp'}
                        })
                    }

                    console.log(this.state.classes)
                    this.props.onImportant(this.props.todoId);
                }}>
                    <i className="material-icons">warning</i>
                </IconButton>
                <IconButton aria-label="Delete" color='primary' onClick={() => {
                    fetch(`http://localhost:3001/task/del/${this.props.todoId}`, {
                        method: 'delete'
                    })
                    this.props.onDelete(this.props.todoId);
                }
                }>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        )
    }
}