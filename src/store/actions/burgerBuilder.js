import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (value)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:value
    }
};

export const deleteIngredient = (value)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT ,
        ingredientName:value
    }
};

export const setIngredients = (ings)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ings

    }
}

export const fetchIngredientsFailed = ()=>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL

    }
}

export const initIngredients = ()=>{
    return dispatch =>{
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error=> {
            console.log(error);
            dispatch(fetchIngredientsFailed())
        });
    }
}