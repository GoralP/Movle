import React, { useState } from "react";
import { Label } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const YearRange = () => {
  const [value, setValue] = useState(1980);

  const settings = {
    start: 1980,
    min: 1980,
    max: 2022,
    step: 1,
    onChange: (value) => {
      setValue(value);
      //   localStorage.setItem("min_size_range", value[0]);
      //   localStorage.setItem("max_size_range", value[1]);
    },
  };

  return (
    <>
      <Label color="red">{value}</Label>
      <Slider value={value} color="red" settings={settings} />
    </>
  );
};

export default YearRange;
