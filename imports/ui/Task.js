import React, { Component } from 'react';
import { Tasks } from '../../lib/collections.js';

export default class Task extends Component {

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.tasks._id, {
            $set: { checked: !this.props.tasks.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.tasks._id);
    }

    render() {

        const taskClassName = this.props.tasks.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>

                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.tasks.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <span className="text">{this.props.tasks.text}</span>
            </li>
        );
    }
};