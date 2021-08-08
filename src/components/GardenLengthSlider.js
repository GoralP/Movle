import React, { useState } from "react";

import { Slider } from "react-semantic-ui-range";

const GardenLength = () => {
  const [multipleValues, setMultipleValues] = useState([0, 200]);

  const settings = {
    start: [0, 200],
    min: 0,
    max: 200,
    step: 1,
    onChange: (value) => {
      setMultipleValues(value);
      localStorage.setItem("min_size_range", value[0]);
      localStorage.setItem("max_size_range", value[1]);
    },
  };

  return (
    <>
      {multipleValues.map((val, i) => (
        <label key={i}>
          {i === 1 ? "-" : " "}

          {val}
          {val >= 200 ? "+" : ""}
        </label>
      ))}
      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default GardenLength;
