import React, { Component } from 'react';
import Aux from './hoc/Auxilary';
import Box from './components/Box';
import Controls from './components/BuildControls/Controls';
import classes from './components/Box.css';
import Modal from './components/Modal';
import Summary from './components/Summary';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

const INGREDIENT_PRICES = {
  box2: 0.5,
  box3: 0.4,
  box4: 1.3,
  box5: 0.7
};

class App extends Component {

  state = {
    ingredients: {
      box2: 0,
      box3: 0,
      box4: 0,
      box5: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

    updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
      .map(IgKey => {
        return ingredients[IgKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 })
  }

  addColorHadler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeColorHadler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({purchasing:true});
  }

  purchaseCancleHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('You Continue!');
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return (
      <Aux>
        <Toolbar />
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
          <Summary 
          ingredients={this.state.ingredients}
          purchaseCancled={this.purchaseCancleHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice} />
        </Modal>
        <div className={classes.Div2}>
          <div className={classes.Div}>
            <Box ingredients={this.state.ingredients} />
          </div>
          <div className={classes.Color}>
            <Controls
              colorAdded={this.addColorHadler}
              colorRemoved={this.removeColorHadler}
              disabled={disableInfo}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}
              ordered={this.purchaseHandler} />
          </div>
          <div className={classes.Text}>
            <p>TEXT TEXT TEXT</p>
          </div>
        </div>
      </Aux>
    );
  }
}

export default App;
