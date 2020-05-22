import React, { Component } from "react";
import Order from '../../../components/Order/Order'
import axios from './../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../components/UI/Spinner/Spinner'

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'


class Orders extends Component{
 

    componentDidMount(){
      
        this.props.onOrderStart()


    }

    render(){
        let orderList = null;
         orderList = !this.props.loading ? this.props.orders.map((order)=>(<Order 
            key={order.id} 
            ingredients={order.ingredients} 
            customer={order.orderData} 
            price={order.price.toFixed(2) }
            />))
          :   orderList = <Spinner />
  

        return(
            <div>
                { orderList}
                
            </div>
            
        )
    }
}


const mapStateToProps = state =>{
    return {
 
         orders:state.order.orders,
         loading:state.order.loading
    };
}

const dispatchToProps = dispatch =>{
    return {
        onOrderStart: () =>dispatch(actions.orderStart()),


    }
};

export default connect(mapStateToProps,dispatchToProps)(withErrorHandler(Orders,axios)) ;