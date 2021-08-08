import React, { useState } from "react";

import { Slider } from "react-semantic-ui-range";

const RadiusRange = (props) => {
  const [multipleValues, setMultipleValues] = useState([0, 40]);
  const settings = {
    start: [1, 40],
    min: 0,
    max: 40,
    step: 1,
    onChange: (value) => {
      setMultipleValues(value);
      localStorage.setItem("min_length", value[0]);
      localStorage.setItem("max_length", value[1]);

      props.handleChangeRangeSlider(value, "min_length", "max_length");
      var id = window.setTimeout(function () {}, 0);

      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      setTimeout(function () {
        props.handleChangeRangeSlider(value, "min_length", "max_length");
      }, 1000);
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

export default RadiusRange;
