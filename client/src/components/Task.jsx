import React from "react";
import './Task.css';

const Task = () => {

    return (
        <div className="task-card">
            <div className="title-desc">
                <h2>Task Title</h2>
                <p>Task Desc</p>
            </div>
            <div className="task-status">
                <p>Status</p>
            </div>
            <div className="edit-delete">
                <button className="edit-btn">
                    <span class="glyphicon glyphicon-pencil" /> Edit
                </button>
                
                <button className="delete-btn">
                    <span class="glyphicon glyphicon-trash" />
                    Delete
                </button>
            </div>
        </div>
    )

}

export default Task;