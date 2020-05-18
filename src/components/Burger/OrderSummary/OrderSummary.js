import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Btn from '../../UI/Button/Button'

class orderSummary extends Component{

//This must be a funtional component


render(){

    const ingredientSummary = Object.keys(this.props.ingredients).map(
        (value)=>{
           return <li key={value}><span style={{textTransform:'capitalize'}}>{value}</span>:{ this.props.ingredients[value] }</li>
        } 
        );
      return (
        <Aux>
        <h3>Your Order</h3>
        <p> A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
      <p> <strong> Total Price</strong>: {this.props.price}</p>
        <p>Continue to Checkout?</p>
        <Btn btnTypes='Danger' clicked={this.props.purshaseCancel} >Cancel</Btn>
        <Btn btnTypes='Success' clicked={this.props.purshaseContinue} >Continue</Btn>
    </Aux>
      )
    

}

};

export default orderSummary;