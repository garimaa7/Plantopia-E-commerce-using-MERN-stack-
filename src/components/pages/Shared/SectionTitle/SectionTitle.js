import React from "react";
import "./SectionTitle.css";

const SectionTitle = ({ title, children, color }) => {
  return (
    <div className={`section-title ${color}`}>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
};

export default SectionTitle;
