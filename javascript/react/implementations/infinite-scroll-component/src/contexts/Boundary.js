import React, { useState, createContext } from "react";
import { Boundary } from "components";

export const BoundaryContext = createContext({});

export const BoundaryProvider = (props) => {
  const { children } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <BoundaryContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      <Boundary loading={loading} error={error}>
        {children}
      </Boundary>
    </BoundaryContext.Provider>
  );
};
