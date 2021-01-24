import React from "react";

export const Table = (props) => {
  const { data, children } = props;

  return (
    <div>
      {data.length && children ? (
        <>{data.map((d, i) => children({ data: d, index: i }))}</>
      ) : (
        <div>
          <h1>No data found</h1>
        </div>
      )}
    </div>
  );
};
