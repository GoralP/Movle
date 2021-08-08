import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { IoIosArrowForward } from "react-icons/io";

const Accord = (props) => {
  const [isOpenAccord, setIsOpenAccord] = useState(false);

  const toggle = () => setIsOpenAccord(!isOpenAccord);

  return (
    <div className="container-fluid accord-box">
      <div className="row mb-3">
        <div className="col-sm-12 ">
          <div className="wrapper ">
            <div className={isOpenAccord ? "open" : ""} onClick={toggle}>
              <div className="title cursor-pointer">
                <span className={isOpenAccord ? "arrow-dw" : "arrow"}>
                  <IoIosArrowForward className="mr-2" />
                </span>
                {props.title}
              </div>
            </div>
            <Collapse isOpen={isOpenAccord}>
              <p className="accord-contain m-4">{props.head}</p>
              <p className="accord-contain ml-4">{props.text}</p>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accord;
