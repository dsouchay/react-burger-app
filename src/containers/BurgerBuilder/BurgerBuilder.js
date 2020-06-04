import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionsCreators from '../../store/actions/index';



/*
const INGREDIENTS_PRICES = {
    salad:0.50,
    bacon:0.40,
    cheese:1.30,
    meat:0.70 
}*/
class BurgerBuilder extends Component{
    constructor (props){
        super();
        this.state = {
         /*   ingredients:null/*{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0 
            }*//*,
            totalPrice:4,*/

           // purchasable:false,
           /* purchasing:false,
            loading:false,
            error:false*/
        } 
    }


componentDidMount(){
    this.props.onSetIngredients();
}

updatePurchasable = (ingredients)=>{
    const sum = Object.values(ingredients).reduce((acc,num)=>{return num + acc;}, 0); 
    return sum>0;
} 

 purchasingHandler = ()=>{
     if (this.props.isAuthenticated){
        this.setState({purchasing:true})
     }else {
         this.props.onSetRedirectPah('/checkout')
         this.props.history.push('/auth')
     }
     
 }
 modalHandler = ()=>(this.setState({purchasing:false}))

 continueHandler = ()=>{
     this.props.onPurchaseInit();
     this.props.history.push(
        {
            pathname:'/checkout'

        }
  );
 }


    render(){
        const disableInfo = {
            ...this.props.ings
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;

        }
        let orderSummary = null; 
         let burger =(this.props.error)? <p> Ingredients can't be loaded!!</p> :<Spinner />
         if (this.props.ings) {
            orderSummary = <OrderSummary price={this.props.tp.toFixed(2)} ingredients={ this.props.ings} purshaseCancel={this.modalHandler} purshaseContinue={this.continueHandler}/>
            burger =(
                <Aux>
                        <div><Burger ingredients={ this.props.ings } /></div>
                        <div><BuildControls price = {this.props.tp.toFixed(2)} 
                        purchasabled = {!this.updatePurchasable(this.props.ings)}
                        disabled = {disableInfo } 
                        ingredientAdded = {this.props.onIngredientAdded } 
                        ingredientRemove = {this.props.onIngredientDeleted }
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchasingHandler} /> </div>

                </Aux>
            )  
         }
            
         if (this.state.loading) orderSummary = <Spinner />


         
          
        return(
            <Aux>
                                
                    <Modal show={this.state.purchasing} clicked={this.modalHandler}>
                        {orderSummary}
                    </Modal>
                    { burger } 
            </Aux>
               
        );
    }

}

const mapStateToProps = state =>{
    return {
         ings: state.burgerBuilder.ingredients,
         tp:state.burgerBuilder.totalPrice,
         error:state.burgerBuilder.error,
         isAuthenticated:state.auth.token!==null        

    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (value)=>dispatch(actionsCreators.addIngredient(value)),
        onIngredientDeleted:(value)=>dispatch(actionsCreators.deleteIngredient(value)),
        onSetIngredients:()=>dispatch(actionsCreators.initIngredients()),
        onPurchaseInit:()=>dispatch(actionsCreators.purchaseInit()),
        onSetRedirectPah: (path)=>dispatch(actionsCreators.setAuthRedirect(path))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));