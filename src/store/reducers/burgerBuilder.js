import React from 'react';
import * as actionsType from '../actions/actionTypes';
import {updateObject} from '../utility'


const INGREDIENTS_PRICES = {
    salad:0.50,
    bacon:0.40,
    cheese:1.30,
    meat:0.70 
}

const inicialState = {
        ingredients:null,
        totalPrice:4,
        error:false
}



const addIngredient = (state, action)=>{
    const updateIngrediente={[action.ingredientName]:state.ingredients[action.ingredientName] +1}
            const uptdateIngredients = updateObject(state.ingredients,updateIngrediente)
            const updateState = {
                ingredients:uptdateIngredients,
                totalPrice:state.totalPrice+INGREDIENTS_PRICES[action.ingredientName]

            }
            return  updateObject(state,updateState) 

}
const removeIngredient = (state, action)=>{
    const updateIng={[action.ingredientName]:state.ingredients[action.ingredientName] -1}
    const uptdateIngs = updateObject(state.ingredients,updateIng)
    const updateS = {
        ingredients:uptdateIngs,
        totalPrice:state.totalPrice-INGREDIENTS_PRICES[action.ingredientName]

    }
    return  updateObject(state,updateS) 
}
const setIngredients = (state, action)=>{
    const updState = {
        ingredients:action.ingredients,
        error:false,
        totalPrice: inicialState.totalPrice
    }
    return updateObject(state,updState)
}
const fetchFailIngredients = (state, action)=>{
    return updateObject(state,{
        error:true

    }); 
}



const reducer = (state = inicialState ,action) => {

    switch (action.type){
        case actionsType.ADD_INGREDIENT: return addIngredient(state,action)  
        case actionsType.REMOVE_INGREDIENT:return removeIngredient(state,action)
        case actionsType.SET_INGREDIENTS:return setIngredients(state,action)
        case actionsType.FETCH_INGREDIENTS_FAIL:return fetchFailIngredients(state,action)      
        default: return state;

        
    }   
   
}


export default reducer;