import React,{ Component } from "react";
import Btn from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

import {updateObject,checkValidity} from '../../../shared/utility'

import { connect } from 'react-redux';



class ContactData extends Component{
    state = {
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touch:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touch:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Code Postal'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touch:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touch:false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touch:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    option:[{value:'fastest',displayValue:'Fastest'},{value:'cheapest',displayValue:'Cheapest'}],
                },
                value:'fastest',
                validation:{},
                valid:true
            },
        },
        formIsValid:false,

    }



    orderHandler=(event)=>{
        event.preventDefault();
     //   this.setState({loading:true});
        const formData={};

        const order = {
            ingredients:this.props.ingredients,
            price: this.props.price,
            orderData:formData,
            userId:this.props.userId

        }
        for(let idElement in this.state.orderForm){
            formData[idElement] = this.state.orderForm[idElement].value;
        }
        order.orderData = formData;
        this.props.onOrderBurger(order,this.props.token);

            /*axios.post('/order.json',order)
            .then(
                (response)=>{
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch((error)=>{
                this.setState({loading:false});
            })*/
    }
    changedHandler = (event,InputIdentifier)=>{

        const updatedFormElement = updateObject(this.state.orderForm[InputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value,this.state.orderForm[InputIdentifier].validation),
            touch:true
        }) 
        const updateOrderForm = updateObject(this.state.orderForm,{
            [InputIdentifier]:updatedFormElement
        }) 

        let formIsValid = true;
        for (let inputId in updateOrderForm){
            formIsValid = updateOrderForm[inputId].valid && formIsValid;
        }        
        this.setState({orderForm:updateOrderForm,formIsValid:formIsValid}); // actualizo el estado con el nuevo objeto
    }

    render(){
        const formElementArray = []
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }


        let form =(

            <form onSubmit={this.orderHandler}>
                {
                    formElementArray.map((element)=>(<Input 
                    key={element.id} 
                    name={element.id} 

                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig} 
                    value={element.config.value}
                    invalid = {!element.config.valid}
                    shouldValidate = {element.config.validation}
                    isTouched={element.config.touch}
                    changed = {(event)=>this.changedHandler(event,element.id)} />))
                }
       
                
                <Btn btnTypes='Success' /*clicked={this.orderHandler}*/ disabled={!this.state.formIsValid} >ORDER</Btn>

            </form>)
        if (this.props.loading) form = <Spinner />
        return (
            <div className={ classes.ContactData}>
                <h4>Entry your Contact Data</h4>
                  { form }
            </div>
            
        )
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.burgerBuilder.ingredients,
         price:state.burgerBuilder.totalPrice,
         loading:state.order.loading,
         token:state.auth.token,
         userId: state.auth.userId



    };
};

const dispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData,token) =>dispatch(actions.puchaseBurger(orderData,token))

    }
};

export default connect(mapStateToProps,dispatchToProps)(withErrorHandler(ContactData,axios));
