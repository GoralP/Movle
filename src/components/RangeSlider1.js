import React from "react";

import { Slider } from "react-semantic-ui-range";

const Range = () => {
  const [value, setValue] = useState([1, 1000]);
  const settings = {
    start: [2, 4],
    min: 0,
    max: 4,
    step: 1,
  };
  return (
    <>
      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default Range;
