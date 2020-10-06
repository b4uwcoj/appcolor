import React from 'react';
import classes from './SideDrawer.css';
import Logo from './Logo';
import NavigationItems from './Navigationitems';

const sideDrawer = (props) => {

    return (
        <div className={classes.SideDrawer}>
            <Logo height="11%"
                    margin-bottom="32px"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
}

export default sideDrawer;