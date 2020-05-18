import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Orders from './containers/Checkout/Orders/Orders'

class App extends Component {
   /*state = {
    show:true
  }

 componentDidMount() {
    setTimeout(()=> {
       this.setState({show:false});
       console.log(typeof(this.state.show),this.state.show);
   },5000);
  }*/

  render(){

    return (
      <div >
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path = '/' component={ BurgerBuilder } />
              <Route  path = '/checkout' component={ Checkout } />
              <Route  path = '/orders' component={ Orders } />

              <Route render={ ()=><h1> Not found</h1>} />
            </Switch>
            {/*this.state.show  ? <BurgerBuilder /> : null             <BurgerBuilder />
            <Checkout />*/}
          </Layout>
        </BrowserRouter>  
      </div>
    );
  }
}

export default App;
