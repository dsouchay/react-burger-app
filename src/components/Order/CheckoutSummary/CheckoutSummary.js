import React from 'react';
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props)=> {

        return ( 
            <div className={classes.CheckoutSummary }> 
                <h1> We hope it tastes well!!  </h1>
                <div style={{width:'100%', margin:'auto',overflow:'auto'}}>
                    <Burger ingredients = { props.ingredients}/>
                    <Button btnTypes='Danger' clicked={ props.checkoutCancel }>CANCEL</Button>
                    <Button btnTypes='Success'clicked={ props.checkoutContinue } >CONTINUE</Button>


                </div>
            </div>
          );
  
}


export default CheckoutSummary;