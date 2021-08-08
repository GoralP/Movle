import React, { useState } from "react";
import { BiPound } from "react-icons/bi";
import { Slider } from "react-semantic-ui-range";

const Range = (props) => {
  const [multipleValues, setMultipleValues] = useState([0, 20000000]);

  // const settings = {
  //   start: [0, 20000000],
  //   min: 0,
  //   max: 20000000,
  //   step: 1,
  //   onChange: (value) => {
  //     setMultipleValues(value);
  //     localStorage.setItem("min_size_range", value[0]);
  //     localStorage.setItem("max_size_range", value[1]);
  //   },
  // };

  const settings = {
    start: [0, 20000000],
    min: 0,
    max: 20000000,
    step: 1,
    onChange: (value) => {
      setMultipleValues(value);
      localStorage.setItem("min_price", value[0]);
      localStorage.setItem("max_price", value[1]);

      var id = window.setTimeout(function () {}, 0);

      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      setTimeout(function () {
        props.handleChangeRangeSlider(value, "min_price", "max_price");
      }, 1000);
    },
  };

  return (
    <>
      {multipleValues.map((val, i) => (
        <label key={i}>
          {i === 1 ? "-" : " "}
          <BiPound className="pound-icon" />
          {/* <span className=" font-weight-bold">£</span> */}
          {val.toLocaleString()}
        </label>
      ))}
      <Slider multiple color="red" inverted={false} settings={settings} />
    </>
  );
};

export default Range;

// import React, { useState } from "react";

// import { Slider } from "react-semantic-ui-range";

// const ValueRange = (props) => {
//   const [multipleValues, setMultipleValues] = useState([1, 5000]);

//   const settings = {
//     start: [1, 5000],
//     min: 1,
//     max: 5000,
//     step: 1,
//     onChange: (value) => {
//       setMultipleValues(value);
//       localStorage.setItem("min_value_range", value[0]);
//       localStorage.setItem("max_value_range", value[1]);

//       var id = window.setTimeout(function () {}, 0);

//       while (id--) {
//         window.clearTimeout(id); // will do nothing if no timeout with id is present
//       }
//       setTimeout(function () {
//         props.handleChangeRangeSlider(
//           value,
//           "min_value_range",
//           "max_value_range"
//         );
//       }, 1000);
//     },
//   };

//   return (
//     <>
//       {multipleValues.map((val, i) => (
//         <label key={i}>
//           {i === 1 ? " - " : " "}
//           {val}
//         </label>
//       ))}
//       <Slider multiple color="red" inverted={false} settings={settings} />
//     </>
//   );
// };

// export default ValueRange;
