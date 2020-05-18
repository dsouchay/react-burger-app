import React from 'react'
import classes from './Order.module.css'

const Order = (props)=>{
    let ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push(
            {
                name:ingredientName, 
                amount:props.ingredients[ingredientName]
            }
        )
    }

    const ingredientOut = ingredients.map(ig => {
    return <span 
        style={{textTransform:'capitalize',
    display:'inline-block', margin:'0 8px', border:'1px solid gray', padding:'5px'}}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return(
        <div className={ classes.Order}>

      
       <p>Ingredients: {ingredientOut}</p>
       <p>Price:<strong>{props.price}</strong></p>
   </div>

    )
}



export default Order; 