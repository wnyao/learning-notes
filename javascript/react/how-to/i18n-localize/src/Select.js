import React from "react";

export const Select = (props) => {
  const { options = [], ...rest } = props;

  return (
    <select {...rest}>
      {options.map((x) => (
        <option value={x} key={x}>
          {x}
        </option>
      ))}
    </select>
  );
};
