import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const INGREDIENTS_PRICES = {
    salad:0.50,
    bacon:0.40,
    cheese:1.30,
    meat:0.70 
}
class BurgerBuilder extends Component{
    constructor (props){
        super();
        this.state = {
            ingredients:null/*{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0 
            }*/,
            totalPrice:4,
            purchasable:false,
            purchasing:false,
            loading:false,
            error:false
        } 
    }


componentDidMount(){
    console.log(this.props);
    axios.get('/ingredients.json')
        .then(response => { this.setState({ingredients:response.data});})
        .catch(error=> this.setState({error:true}));
}

updatePurchasable (ingredients){
   // const ingredients = { ...this.state.ingredients}
    const sum = Object.values(ingredients).reduce((acc,num)=>{return num + acc;}, 0); 
    this.setState({purchasable:sum>0});
} 

 addIngredientHandler = (type)=>{

     const prevState = this.state.ingredients[type];
     const newState = prevState +1;
     const updateIngredients = { ...this.state.ingredients };
     updateIngredients[type] = newState;
     const priceAdition = INGREDIENTS_PRICES[type];
     const oldPrice = this.state.totalPrice; 
     const newPrice = oldPrice + priceAdition;
     console.log(typeof(newPrice));
     this.setState({ingredients:updateIngredients,totalPrice:newPrice});
     this.updatePurchasable(updateIngredients);


 };
 removeIngredientHandler = (type)=>{
    const prevState = this.state.ingredients[type];
    if (prevState <=0 ) return;
    const newState = prevState -1;
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type] = newState;
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice; 
    const newPrice = oldPrice - priceDeduction;
   this.setState({ingredients:updateIngredients,totalPrice:newPrice});
   this.updatePurchasable(updateIngredients);
 };
 purchasingHandler = ()=>(this.setState({purchasing:true}))
 modalHandler = ()=>(this.setState({purchasing:false}))

 continueHandler = ()=>{
//      this.setState({loading:true});

//     const order = {
//         ingredients:this.state.ingredients,
//         price: this.state.totalPrice,
//         customer:{
//             name: 'Dania Souchay',
//             address:{
//                 street: 'testStreet',
//                 zipCode:'28007',
//                 country:'Spain'
//             },
//             email: 'dsouchay@gmail.com',
//         },
//         deliveryMethod: 'fastest'
//     }
//      axios.post('/order.json',order)
//      .then(
//          (response)=>{
//          this.setState({loading:false,purchasing:false});
//      })
//      .catch((error)=>{
//          this.setState({loading:false,purchasing:false});

    
//      }
//    )

const queryParam = [];
for(let i in this.state.ingredients){
    queryParam.push(encodeURI(i) +'='+encodeURI(this.state.ingredients[i]));
}
queryParam.push('price='+this.state.totalPrice.toFixed(2));
const queryString = queryParam.join('&');

this.props.history.push(

    {
        pathname:'/checkout',
        search:'?'+queryString

    }
  );
 }


    render(){
        const disableInfo = {
            ... this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0;

        }
        let orderSummary = null; 

         let burger =(this.state.error)? <p> Ingredients can't be loaded!!</p> :<Spinner />
         if (this.state.ingredients) {
            orderSummary = <OrderSummary price={this.state.totalPrice.toFixed(2)} ingredients={ this.state.ingredients} purshaseCancel={this.modalHandler} purshaseContinue={this.continueHandler}/>
            burger =(
                <Aux>
                        <div><Burger ingredients={ this.state.ingredients } /></div>
                        <div><BuildControls price = {this.state.totalPrice.toFixed(2)} 
                        purchasabled = {!this.state.purchasable}
                        disabled = {disableInfo } 
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemove = {this.removeIngredientHandler}
                        ordered={this.purchasingHandler} /> </div>

                </Aux>
            )  
         }
            
         if (this.state.loading) orderSummary = <Spinner />


         
          
        return(
            <Aux>
                                
                    <Modal show={this.state.purchasing} clicked={this.modalHandler}>
                        {orderSummary}
                    </Modal>
                    { burger } 
            </Aux>
               
        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);