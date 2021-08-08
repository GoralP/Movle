import React, { useState } from "react";

import { Slider } from "react-semantic-ui-range";

const RadiusRange = () => {
  const [multipleValues, setMultipleValues] = useState([0, 40]);

  const settings = {
    start: [1, 40],
    min: 0,
    max: 40,
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
          {i === 1 ? " - " : " "}
          {val}Miles
        </label>
      ))}

      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default RadiusRange;
