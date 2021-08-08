import React, { useState } from "react";

import { Slider } from "react-semantic-ui-range";

const SizeRange = () => {
  const [multipleValues, setMultipleValues] = useState([0, 5000]);

  const settings = {
    start: [0, 5000],
    min: 0,
    max: 5000,
    step: 1,
    onChange: (value) => {
      setMultipleValues(value);
      localStorage.setItem("min_size", value[0]);
      localStorage.setItem("max_size", value[1]);
    },
  };

  return (
    <>
      {multipleValues.map((val, i) => (
        <label key={i}>
          {i === 1 ? "-" : " "}
          {val}
          {val >= 5000 ? "+" : ""}
        </label>
      ))}
      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default SizeRange;
