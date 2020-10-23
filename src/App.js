import React, { Component } from 'react';
import Aux from './hoc/Auxilary';
import Box from './components/Box';
import Controls from './components/BuildControls/Controls';
import classes from './components/Box.css';
import Modal from './components/Modal';
import Summary from './components/Summary';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer';
import axios from './components/axios-orders';
import Spinner from './components/Spinner';
import WithErrorHandler from './components/withErrorHandler';

const INGREDIENT_PRICES = {
  box2: 0.5,
  box3: 0.4,
  box4: 1.3,
  box5: 0.7
};

class App extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    showSideDrawer: false,
    loading: false,
    error: false,
  }

    componentDidMount () {
      axios.get('https://colorburger.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({ingredients: response.data});
        })
        .catch(error => {
          this.setState({error: true});
        });
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
    this.setState({loading:true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max Schwarcmuller',
        address: {
          street: 'Teststreet 1',
          zipCode: '654654',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading:false, purchasing:false})
      })
      .catch(error => {
        this.setState({loading:false, purchasing:false})
      });
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary= null;

    let burger = this.state.error ? <p>Can't load colors!</p> : <Spinner />;

    if(this.state.ingredients) {
      burger = <div className={classes.Div2}>
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
        </div>;

      orderSummary = <Summary 
        ingredients={this.state.ingredients}
        purchaseCancled={this.purchaseCancleHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice} />;
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    const colorBuilder = 
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler} />
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Aux>;
      
    return (
      <Aux>
        {colorBuilder}
      </Aux>
    );
  }
}

export default WithErrorHandler(App, axios);
