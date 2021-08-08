import React, { useState } from "react";
import { Label } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const SingleSlider = () => {
  const [value, setValue] = useState(1);

  const settings = {
    start: 1,

    min: 0,
    max: 5,
    step: 1,
    onChange: (value) => {
      setValue(value);
      localStorage.setItem("single_range", value);
    },
  };

  return (
    <>
      <Label color="red">
        {value}
        {value >= 5 ? "+" : ""}
      </Label>
      <Slider value={value} color="red" settings={settings} />
    </>
  );
};

export default SingleSlider;
