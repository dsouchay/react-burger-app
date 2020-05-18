import React from 'react';
import burderLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burderLogo} alt="My Burguer Logo" />
    </div>
);

export default Logo;
