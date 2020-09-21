import React, { Component } from 'react';
import classes from './Front.css';
import PropTypes from 'prop-types';

class ColorBoxes extends Component {
    render () {

        let colorbox = null;

    switch (this.props.type) {
        case ('box1'):
            colorbox = <div className={classes.Box1}></div>;
            break;
        case ('box2'):
            colorbox = <div className={classes.Box2}></div>;
            break;
        case ('box3'):
            colorbox = <div className={classes.Box3}></div>;
            break;
        case ('box4'):
            colorbox = <div className={classes.Box4}></div>;
            break;
        case ('box5'):
            colorbox = <div className={classes.Box5}></div>;
            break;
        default:
            colorbox = null;
    }   
    return colorbox;
    }
}

ColorBoxes.propTypes = {
    type: PropTypes.string.isRequired
};

export default ColorBoxes;