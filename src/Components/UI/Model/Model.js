import React from 'react';
import Aux from "../../../HOC/Aux";
import classes from "./Model.css";
import Backdrop from "../Backdrop/Backdrop";

const model = (props) => (
  <Aux>
    <Backdrop show={props.show}
              clicked={props.modelClosed}/>
    <div
      className={classes.Model}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}>
        {props.children}
    </div>
  </Aux>
);

export default model;
