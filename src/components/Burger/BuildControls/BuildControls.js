import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},

];


const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>{props.price}</strong> </p>
        {controls.map((el,index)=>  <BuildControl  label={el.label} key={index} 
        added = {() => {props.ingredientAdded(el.type)} } 
        removed = {() => {props.ingredientRemove(el.type)} }
        disabled = { props.disabled[el.type] } />)}
        <button className={classes.OrderButton} disabled={props.purchasabled} onClick={props.ordered}> ORDER NOW </button>
       
    </div>
  
);



export default BuildControls;