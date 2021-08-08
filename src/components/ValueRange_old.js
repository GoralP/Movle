import React, { useState } from "react";

import { Slider } from "react-semantic-ui-range";

const ValueRange = () => {
  const [multipleValues, setMultipleValues] = useState([1, 5000]);

  const settings = {
    start: [1, 5000],
    min: 1,
    max: 5000,
    step: 1,
    onChange: (value) => {
      setMultipleValues(value);
      localStorage.setItem("min_value_range", value[0]);
      localStorage.setItem("max_value_range", value[1]);
    },
  };

  return (
    <>
      {multipleValues.map((val, i) => (
        <label key={i}>
          {i === 1 ? " - " : " "}
          {val}
        </label>
      ))}
      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default ValueRange;
