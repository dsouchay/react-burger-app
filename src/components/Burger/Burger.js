import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
//import { withRouter } from 'react-router-dom'

const burger = (props) => {
    console.log('burguer:',props)

   const shuffle = (array)=>{
        return array.sort(()=>Math.random() - 0.5);
    } 

    let transformIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_,i) => {
                    return <BurgerIngredient key={igKey + i} type={ igKey } />
                })
            }).reduce((arr,el)=>{

                return arr.concat(el);
            },[]); 
    if (!transformIngredients.length) transformIngredients = <p> Please start adding ingredients!</p> ;
     else transformIngredients = shuffle(transformIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}
export default burger;
//export default withRouter(burger);