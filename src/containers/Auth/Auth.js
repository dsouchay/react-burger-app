import React, {Component} from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import {updateObject,checkValidity} from '../../shared/utility'



class Auth extends Component {
    state ={
        controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'texemailt',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touch:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touch:false
            }
        },
        isSignup:true
    }

    componentDidMount(){
        if (!this.props.building && this.props.path !=='/')
         this.props.onSetRedirectPah()

    }

    onSignupHandler = (event)=>{
        event.preventDefault()
        this.setState((prevState)=>{
          return{isSignup:!prevState.isSignup } 
        })
    }

    

    changedHandler = (event,InputIdentifier)=>{

        const updateOrderForm = updateObject(this.state.controls,{
            [InputIdentifier]:updateObject(this.state.controls[InputIdentifier],{
                value:event.target.value,
                touch:true,
                valid:checkValidity(event.target.value,this.state.controls[InputIdentifier].validation)
            })

            }
        )   

         
        this.setState({controls:updateOrderForm}); // actualizo el estado con el nuevo objeto
    }

    submitHandle = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }
    render(){
        const formElementArray = []
        for (let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        } 
        let form = formElementArray.map((element)=>(<Input 
            key={element.id} 
            name={element.id} 
            elementType={element.config.elementType} 
            elementConfig={element.config.elementConfig} 
            value={element.config.value}
            invalid = {!element.config.valid}
            shouldValidate = {element.config.validation}
            isTouched={element.config.touch}
            changed = {(event)=>this.changedHandler(event,element.id)} />))
        if (this.props.loading)
          form = <Spinner />
        
        let errorMessage = null 
        if (this.props.error){
            errorMessage=<p>{this.props.error.message}</p>;

        } 

        let auth=null
        if (this.props.isAuthenticated){
            auth = <Redirect to={this.props.path} />
        } 
        return (
            <div className={classes.Auth}>
                {auth}
                { errorMessage }
                <form onSubmit={this.submitHandle}>
                    {
                        form 
                    }
                    <Button btnTypes="Success" > SUBMIT </Button>
                    <Button clicked={this.onSignupHandler}
                    btnTypes="Danger" > SWITCH TO {!this.state.isSignup?'SIGNIN':'SIGNUP'} </Button>


                </form>
            </div>
        );
    }
}
const mapStateToProps = state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        building:state.burgerBuilder.building ,
        path:state.auth.pathRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) =>{
            dispatch(actions.auth(email,password,isSignup));            
        },
        onSetRedirectPah: ()=>dispatch(actions.setAuthRedirect('/'))




    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth) ;