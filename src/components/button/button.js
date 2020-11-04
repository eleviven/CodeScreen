import React from "react";

export default function Button({
  title,
  variant = "primary",
  square = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${className} ${square ? "btn-icon" : ""}`}
      {...props}
    >
      {title || children}
    </button>
  );
}
