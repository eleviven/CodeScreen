import React from "react";

export default function Text({ as, children }) {
  const tag = React.createElement(as);
  return <tag.type>{children}</tag.type>;
}
