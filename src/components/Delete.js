import React from "react";
import "../styles/App.scss";

const Delete = ({ deleteTask, taskID, togglePopup }) => {
    const handleDelete = () => {
        deleteTask(taskID);
    };

    return (
        <div className="flex flex-col">
            <h1 className="mb-3">Do you want to delete this ?</h1>
            <div className="flex flex-row justify-center items-center">
                <button className="button" onClick={handleDelete}>
                    Yes
                </button>
                <button className="button" onClick={() => togglePopup(true)}>
                    No
                </button>
            </div>
        </div>
    );
};

export default Delete;
