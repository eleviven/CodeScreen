import React from "react";

export default function selectItem({ title, value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {title || children}
    </option>
  );
}
