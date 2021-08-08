import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { BsPlusSquareFill } from "react-icons/bs";

const FaqAccord = (props) => {
  const [isOpenAccord, setIsOpenAccord] = useState(false);

  const toggle = () => setIsOpenAccord(!isOpenAccord);

  return (
    <div className="container-fluid">
      <div className="row faq-accord-border">
        <div className="col-sm-12">
          <div className="wrapper ">
            <div className={isOpenAccord ? "open-faq" : ""} onClick={toggle}>
              <div className="faq-title">
                <span className={isOpenAccord ? "minus" : "arrow"}>
                  <BsPlusSquareFill className="mr-2" />
                </span>
                {props.title}
              </div>
            </div>
            <Collapse isOpen={isOpenAccord}>
              <p className="faq-accord-contain">{props.text}</p>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccord;
