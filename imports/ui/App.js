import React, {Component} from 'react';
import Task from './Task.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../../lib/collections.js';

class App extends Component {

    renderTasks(){
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) =>
            (<Task key={task._id} tasks={task}/>));
    }

    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        if(text.length > 0){
            Tasks.insert({
                text,
                createAt: new Date(),
            });
        }

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List uncompleted: ({this.props.incompleteCount})</h1>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add tasks"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
})(App);