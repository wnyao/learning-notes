import React from "react";
import { Spinner } from "components";

export const Boundary = (props) => {
  const { loading, error, children } = props;

  return (
    <>
      <div className="row text-center align-items-center center">
        <div className="column">
          {loading && <Spinner />}
          {error && (
            <h3>
              <b>Something went wrong</b>
            </h3>
          )}
        </div>
      </div>
      {children}
    </>
  );
};
