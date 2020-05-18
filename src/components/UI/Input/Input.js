import React from 'react';
import classes from './Input.module.css';


const Input = (props) => { 

    let inputElement = null;
    const inputClasses = [classes.Input];

   if (props.invalid && props.shouldValidate && props.isTouched){
        inputClasses.push(classes.Invalid);
    } 
    switch (props.elementType){
        case ('input'):
            inputElement = <input  className={inputClasses.join(' ')}  {...props.elementConfig} value={ props.value} onChange={ props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea  className={inputClasses.join(' ')}  {...props.elementConfig} value={ props.value} onChange={ props.changed}/>;
            break;
        case ('select'):
            inputElement = <select  className={inputClasses.join(' ')}  value={ props.value} onChange={ props.changed}>
                {
                    props.elementConfig.option.map((op)=>(<option key={op.value} value={op.value}>{ op.displayValue}</option>)) 
                }

            </select>;
            break;                       
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={ props.value} onChange={ props.changed}/> ;               

    }

    let validationError = null;
    if (props.invalid && props.isTouched) { 
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.name}</p>;
    }
    return (
        <div  className={classes.Input} >
           <label  className={classes.label} >{ props.label }</label>
           { inputElement }
           { validationError }
        </div>

    )


}

export default Input;