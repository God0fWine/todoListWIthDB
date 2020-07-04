import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './newtodo.css';


export default class Newtodo extends Component {

    state = {
        todo: '',
        id: ''
    };

    onLabelChange = (event) => {
        event.persist()
        this.setState(({ todo }) => {
            return { todo: event.target.value }
        })
    }

    getNewId = async () => {
        let rB = { 'text': this.state.todo };

        let newId = await fetch('http://localhost:3001/task/newtodo', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(rB)
        }).then((res) => {
            let result = res.text();
            return result;
        })
        this.setState(({id}) => {
            return {id: +newId}
        })
    }

    onSubmit = async () => {
        if (this.state.todo === '') return;
        await this.getNewId();
        this.props.onAdd(this.state.id, this.state.todo)
        this.setState(() => {
            return { todo: '' }
        })
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