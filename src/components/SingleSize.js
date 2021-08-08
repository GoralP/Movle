import React, { useState } from "react";
import { Label } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";

const SingleSize = () => {
  const [value, setValue] = useState(1);

  const settings = {
    start: 1,

    min: 0,
    max: 5010,
    step: 1,
    onChange: (value) => {
      setValue(value);
      localStorage.setItem("range", value);
    },
  };

  return (
    <>
      <Label color="red">
        {value}
        {value >= 5000 ? "+" : ""}
      </Label>
      <Slider value={value} color="red" settings={settings} />
    </>
  );
};

export default SingleSize;
