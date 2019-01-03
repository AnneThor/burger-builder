import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Model from "../../Components/UI/Model/Model";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7,
}
//capital letters for global variables

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert("You Continue!");
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount -1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients) //gives array of ingredient names
      .map(igKey => {
        return ingredients[igKey]
      }) //gets array of ingredient values
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      this.setState({purchaseable: sum > 0});
  } //add to end of add/remove methods

  render () {
    //created an object which is an immutable copy of the state ingredients
    const disabledInfo = {
      ...this.state.ingredients
    };
    //now we are making a new array that will list salad: true, meat: false to
    //indicate which buttons should be activated
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };
    return (
      <Aux>
        <Model show={this.state.purchasing}
               modelClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
                        totalCost = {this.state.totalPrice.toFixed(2)}
                         purchaseCanceled={this.purchaseCancelHandler}
                         purchaseContinued={this.purchaseContinueHandler}/>
        </Model>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
