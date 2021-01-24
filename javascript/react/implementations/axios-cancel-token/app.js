import React, { useState } from "react";
import request from "./utils";

const App = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState("");

  const searchMembers = async (keyword) => {
    const api = `https://apis.eatgether.com/admin/members?keyword=${keyword}`;
    const res = await request(api);
    setResults(res);
  };

  const onChange = async (e) => {
    const { value } = e.target;
    setValue(value);
    searchMembers(value);
  };

  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        placeholder="Type something to search"
      />
    </div>
  );
};

export default App;
