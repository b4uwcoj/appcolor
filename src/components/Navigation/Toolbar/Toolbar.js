import React from 'react';
import classes from './Toolbar.css'
import NavigationItems from '../../Navigationitems';
import Logo from '../../Logo';
import DrawerToggle from '../../DrawerToogle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
