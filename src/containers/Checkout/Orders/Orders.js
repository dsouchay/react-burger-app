import React, { Component } from "react";
import Order from '../../../components/Order/Order'
import axios from './../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/order.json')
              .then(res => {
                  this.setState({loading:false});
                  const fetchOrders =[];
                  for (let key in res.data){
                      fetchOrders.push({
                          ...res.data[key],
                          id:key
                        });

                  }
                  console.log(fetchOrders);
                  this.setState({orders:fetchOrders})

              }).catch(err => {
                  this.setState({loadin:false});
              })

    }

    render(){
        let orderList = this.state.orders.map((order)=>(<Order 
            key={order.id} 
            ingredients={order.ingredients} 
            customer={order.customer} 
            price={order.price}
            />))

        return(
            <div>
                { orderList}
                
            </div>
            
        )
    }
}

export default withErrorHandler(Orders,axios);