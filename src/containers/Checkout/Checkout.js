import React,{Component} from 'react';
import classes from './Checkout.module.css'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'
import {Route} from 'react-router-dom'
class Checkout extends Component {
    state = {
        ingredients:null,
        price:0
    }

componentWillMount(){
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price=0

    for (let params of query.entries()){
        //['salad','1']
        if (params[0] ==='price') {
            price=params[1];
            continue;
        }
        ingredients[params[0]] = +params[1];
    }
   this.setState({ingredients:ingredients,price:price});
}

    checkoutCancelHandler = ()=>{
        this.props.history.goBack();


    }

    checkoutContinueHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    

    render (){
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={ this.props.match.path + '/contact-data'} render={ (props)=>( <ContactData ingredients={this.state.ingredients} price={ this.state.price} { ...props} />)}   /*component={ ContactData}*/ />
            </div>

        )
    }
}


export default Checkout;