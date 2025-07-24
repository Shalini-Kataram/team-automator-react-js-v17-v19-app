import React from "react";

const Popup = ({ onClose, children, isFormVisible }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 flex justify-center items-center z-[1000]">
            <div className=" text-[#eeecda] p-5 rounded-lg shadow-gray-500 w-11/12 max-w-xl  ">
                {children}
            </div>
        </div>
    );
};

export default Popup;
