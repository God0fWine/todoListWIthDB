import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './newtodo.css';


export default class Newtodo extends Component {

    state = {
        todo: ''
    };

    onLabelChange = (event) => {
        event.persist()
        this.setState(({ todo }) => {
            return { todo: event.target.value }
        })
    }

    onSubmit = () => {
        let rB = {'text': this.state.todo};
        if(this.state.todo === '') return 
        fetch('http://localhost:3001/task/newtodo', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(rB)
        })
        this.setState(() => {
            return {todo : ''}
        })
        this.props.onAdd(this.state.todo)
    }

    render() {
        return (
            <div className="container">
                <TextField
                    id="outlined-name"
                    className="textbox"
                    label="What U want to do"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onLabelChange}
                    value={this.state.todo}
                />
                <Fab color="primary" aria-label="Add" size="small" onClick={this.onSubmit}>
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}