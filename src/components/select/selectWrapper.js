import React from "react";

export default function SelectWrapper({ children, title, ...props }) {
  return (
    <label className="select-box" {...props}>
      {title && <span>{title}</span>}
      <select className="select-box">{children}</select>
    </label>
  );
}
