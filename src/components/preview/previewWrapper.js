import React from "react";

function PreviewWrapper({ children, ...props }) {
  return (
    <section className="preview" {...props}>
      <center>
        <div className="preview-inner">{children}</div>
      </center>
    </section>
  );
}

export default PreviewWrapper;
