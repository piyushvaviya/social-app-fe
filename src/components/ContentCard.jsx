import React from "react";

const ContentCard = ({ title, titleClass = "", subContent, subClass = "" }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className={`text-sm font-semibold leading-none text-start ${titleClass}`}
      >
        {title}
      </h2>
      <span
        className={`text-xs leading-none text-coolGray-400 text-start ${subClass}`}
      >
        {subContent}
      </span>
    </div>
  );
};

export default ContentCard;
