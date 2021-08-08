import React, { useState } from "react";
import { Label } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const YearRange = () => {
  const [value, setValue] = useState(0);

  const settings = {
    start: 0,
    min: 0,
    max: 40,
    step: 1,
    onChange: (value) => {
      setValue(value);
      localStorage.setItem("radius", value);
      //   localStorage.setItem("max_size_range", value[1]);
    },
  };

  return (
    <>
      <Label color="red">{value}Miles</Label>
      <Slider value={value} color="red" settings={settings} />
    </>
  );
};

export default YearRange;
