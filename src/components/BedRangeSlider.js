import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";

const BedRange = (props) => {
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

      var id = window.setTimeout(function () {}, 0);

      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      setTimeout(function () {
        props.handleChangeRangeSlider(value, "min_bed_no", "max_bed_no");
      }, 1000);
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
      <Slider
        multiple
        color="red"
        value={multipleValues}
        inverted={false}
        settings={settings}
      />
    </>
  );
};

export default BedRange;
