import React, { useState } from "react";
import { Label } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const AgeSlider = () => {
  const [value, setValue] = useState(1);

  const settings = {
    start: 1,

    min: 0,
    max: 200,
    step: 1,
    onChange: (value) => {
      setValue(value);
      localStorage.setItem("age_range", value);
    },
  };

  return (
    <>
      <Label color="red">
        {value}
        {value >= 200 ? "+" : ""}
      </Label>
      <Slider value={value} color="red" settings={settings} />
    </>
  );
};

export default AgeSlider;
