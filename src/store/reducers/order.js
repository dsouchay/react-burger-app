import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const inicialState = {
    orders:[],
    loading:false,
    purchased:false
}


const purchaseInit = (state,action)=>{
    return updateObject(state,{purchased:false})
}


const purchaseStart = (state,action)=>{
    return updateObject(state,{loading:true})
}

const  purchasedSuccess = (state,action)=>{
    const newOrder = updateObject (action.orderData,{id:action.orderId})
     
    return updateObject(state,{
        loading:false,
        purchased:true,
        orders:state.orders.concat(newOrder)
    })
}

const purchaseFail = (state,action)=>{
    return updateObject(state,{
        loading:false
    } )  
}

const orderStart=(state,action)=>{
    return updateObject(state,{
        loading:true
    } ) 
}

const orderSucces = (state,action)=>{
    return updateObject(state,{
        orders:action.orderData,
        loading:false            } ) 
         
}

const orderFail = (state,action)=>{
    return updateObject(state,{
        loading:false
    } ) 
}

const reducer = (state = inicialState,action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action)
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state,action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchasedSuccess(state,action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state,action) 
        case actionTypes.FETCH_ORDER_START: return orderStart(state,action)
        case actionTypes.FETCH_ORDER_SUCCESS: return orderSucces (state,action)                    
        case actionTypes.FETCH_ORDER_FAIL: return orderFail(state,action)
        default :return state;         
    }
    

};

export default reducer;