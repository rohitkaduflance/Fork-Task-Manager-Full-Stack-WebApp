import React from "react";
import './Task.css';

const Task = ({ task, deleteTask, editTask }) => {
    return (
        <div className="task-card">
            <div className="title-desc">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </div>
            <div className={`task-status ${task.status.toLowerCase()}`}>
                {task.status === 'Pending' ? (
                    <>
                        <span className="status-icon">⏰</span> Pending
                    </>
                ) : (
                    <>
                        <span className="status-icon">✅</span> Completed
                    </>
                )}
            </div>
            <div className="edit-delete">
                <button className="edit-btn" onClick={() => editTask(task._id)}>
                    <span className="glyphicon glyphicon-pencil" /> Edit
                </button>
                
                <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                    <span className="glyphicon glyphicon-trash" />
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Task;
