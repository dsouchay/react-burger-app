import React,{ Component } from "react";
import Btn from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'


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
        loading:false

    }


    checkValidity = (value,rules)=>{
        let isValid = true;
        if (!rules) return true
        if ( rules.required) {
            isValid = value.trim()!=='' && isValid;
        }
        if ( rules.minLength) {
            isValid = value.length>=rules.minLength && isValid;
        }  
        if ( rules.maxLength) {
            isValid = value.length<=rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});

            const order = {
                ingredients:this.props.ingredients,
                price: this.props.price

            }
            const formData={};
            for(let idElement in this.state.orderForm){
                formData[idElement] = this.state.orderForm[idElement].value;
            }
            order.orderData = formData;

             axios.post('/order.json',order)
             .then(
                 (response)=>{
                 this.setState({loading:false});
                 this.props.history.push('/');
             })
             .catch((error)=>{
                 this.setState({loading:false});
                })
    }
    changedHandler = (event,InputIdentifier)=>{

        const updateOrderForm = { ...this.state.orderForm } //Copio objeto del estado
        const updatedFormElement = {...updateOrderForm[InputIdentifier]} // El ogjeto tiene propiedades que son objetos y las copio para acceder al valor que quiero modificar
        updatedFormElement.value = event.target.value; //actualizo el valor dentro del subobjeto copiado
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)

        updatedFormElement.touch = true;
        updateOrderForm[InputIdentifier]=updatedFormElement;
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
        if (this.state.loading) form = <Spinner />
        return (
            <div className={ classes.ContactData}>
                <h4>Entry your Contact Data</h4>
                  { form }
            </div>
            
        )
    }
}


export default ContactData;
