import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'
import {Route,Redirect} from 'react-router-dom'


import { connect } from 'react-redux';

class Checkout extends Component {
   /* state = {
        ingredients:null,
        price:0
    }*/


    checkoutCancelHandler = ()=>{
        this.props.history.goBack();


    }

    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    

    render (){
        let summary = <Redirect to="/" />
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> :null

            summary = (
                <div>
                    {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings} 
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler} />
                <Route path={ this.props.match.path + '/contact-data'} component={ContactData } />


                </div>
               
            )
        }
        return (
            <div>
                { summary}

            </div>

        )
    }
}


const mapStateToProps = state =>{
    return {
         ings: state.burgerBuilder.ingredients,
         tp:state.burgerBuilder.totalPrice,
         purchased:state.order.purchased

    };
};



export default connect(mapStateToProps)(Checkout);