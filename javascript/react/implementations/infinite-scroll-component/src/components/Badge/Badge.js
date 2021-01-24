import React from "react";

export const Badge = (props) => {
  const { children, className = "badge-primary" } = props;
  return <span className={`badge ${className}`}>{children}</span>;
};
