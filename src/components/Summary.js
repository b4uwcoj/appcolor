import React, { Component } from 'react';
import Aux from '../hoc/Auxilary';
import Button from './Button';

class Summary extends Component {
    componentDidUpdate () {
        console.log('[Summary] DidUpdate');
    }

    render () {
            const ingredientSummary = Object.keys( this.props.ingredients )
        .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li> );
        } );

        return (
                    <Aux>
            <h3>Your Colors</h3>
            <p>A burger color</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancled}>Cancle</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default Summary;

