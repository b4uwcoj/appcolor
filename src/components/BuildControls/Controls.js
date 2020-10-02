import React from 'react';
import classes from './Controls.css';
import BuildControl from './BuildControl';

const buildcontrols = [
    { label: 'Salad', type: 'box2' },
    { label: 'Bacon', type: 'box3' },
    { label: 'Cheese', type: 'box4'},
    { label: 'Meat', type: 'box5' },
];


const controls = (props) => (
    <div className={classes.Controls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {buildcontrols.map(ctr => (
            <BuildControl 
            key={ctr.label} 
            label={ctr.label}
            added={() => props.colorAdded(ctr.type)}
            removed={() => props.colorRemoved(ctr.type)}
            disabled={props.disabled[ctr.type]} />
        ))}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
    </div>

);

export default controls;