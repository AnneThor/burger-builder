import React from "react";
import Aux from "../../../HOC/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients) //makes array of keys
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: "capitalize"}}>
            {igKey}: {props.ingredients[igKey]}
          </span>
        </li>);
    });
  return(
    <Aux>
      <h3>Your order: </h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <h3>Total cost: ${props.totalCost}</h3>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
    </Aux>
  )
}

export default orderSummary;
