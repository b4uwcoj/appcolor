import React from 'react';
import classes from './Toolbar.css'
import NavigationItems from '../../Navigationitems';
import Logo from '../../Logo';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
