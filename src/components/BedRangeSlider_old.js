import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";

const BedRange = () => {
  const [multipleValues, setMultipleValues] = useState([1, 5]);

  const settings = {
    start: [1, 5],
    min: 1,
    max: 5,
    step: 1,
    onChange: (value) => {
      setMultipleValues(value);
      localStorage.setItem("min_bed_no", value[0]);
      localStorage.setItem("max_bed_no", value[1]);
    },
  };

  return (
    <>
      {multipleValues.map((val, i) => (
        <label key={i}>
          {i === 1 ? "-" : " "}

          {val}
          {val >= 5 ? "+" : ""}
        </label>
      ))}
      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default BedRange;
