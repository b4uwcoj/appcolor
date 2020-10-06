import React from 'react';
import classes from './Toolbar.css'
import NavigationItems from '../../Navigationitems';
import Logo from '../../Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
