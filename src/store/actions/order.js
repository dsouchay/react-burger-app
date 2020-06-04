import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'




export const purchaseBurgerSuccess = (id,orderData)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}


export const purchaseBurgerFail = (error)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error

    }
}

export const puchaseBurgerStart = ()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const puchaseBurger = (orderData,token) => {
    return dispatch =>{
        dispatch(puchaseBurgerStart());
        axios.post('/order.json?auth='+token,orderData)
        .then(
            (response)=>{
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch((error)=>{
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}


export const orderFetchStart = ()=>{
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (fetchOrders)=>{

    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orderData:fetchOrders
    }
}
export const fetchOrderFail = (error)=>{
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
export const orderStart = (token,userId) => {
    return dispatch =>{
        dispatch(orderFetchStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/order.json'+queryParams)
        .then(res => {
            const fetchOrders =[];
            for (let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                    id:key
                  });
            }
            dispatch(fetchOrderSuccess(fetchOrders))

        }).catch(err => {
            dispatch(fetchOrderFail(err))
        })

    }
}
