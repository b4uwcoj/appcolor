import React from 'react';
import ColorBoxes from './ColorBoxes';
// import classes from './Box.css';
// import Controls from './BuildControls/Controls';
// import Aux from '../hoc/Auxilary';

const page = (props) => {
    let dynamicboxes = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
               return <ColorBoxes key={igKey + i} type={igKey}/>;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
            }, []);

    console.log(dynamicboxes);

    if (dynamicboxes.length === 0) {
     dynamicboxes = <p>Please start adding colors!</p>
    }

    return (

            <div>
                {dynamicboxes}
            </div>

    );
}

export default page;
