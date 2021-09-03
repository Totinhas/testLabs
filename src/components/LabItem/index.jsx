import React from "react";
//import "./LabItem.css";

const LabItem = ({ title, tags, onClick, level }) => {
  return (
    <div className="LabItem" onClick={onClick}>
      <div>
        <h3>{title}</h3>

        <div className="levelInfo">
          {/* Icon? */}
          <p>{level}</p>
        </div>
      </div>

      <div>
        {tags.map((tag, index) => {
          return (
            <span key={index} className="tags">
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LabItem;
