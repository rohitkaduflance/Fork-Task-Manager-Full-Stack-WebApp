import React from "react";
import "./TaskList.css"

import Task from "./Task";

const TaskList = () => {
    

    return (
        <div className="tasklist-box">
            <div className="add-new-task">
                <button>Add New Task</button>
            </div>
            <Task />
        </div>
    )

}

export default TaskList;