import React from "react";

const ColorSelectionButton = ({ bgColor, setBgColor }) => {
  return (
    <div>
      <button
        onClick={() => {
          setBgColor(bgColor);
        }}
        className={`bg-${bgColor}-400 hover:bg-${bgColor}-500 rounded-lg
          w-15 h-12 flex cursor-pointer shadow-gray-500 shadow-md`}
      ></button>
    </div>
  );
};

export default ColorSelectionButton;
