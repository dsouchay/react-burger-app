import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {BrowserRouter,Route,Switch , Redirect} from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'

import { connect} from 'react-redux'
import * as actions from './store/actions/index'

import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Checkout/Orders/Orders')
})

class App extends Component {


 componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render(){
    let routes =(
      <Switch>
              <Route  path = '/auth' component={ asyncAuth } />
              <Route exact path = '/' component={ BurgerBuilder } />
              <Redirect to="/" />
            </Switch>

    )

    if (this.props.isAtuthenticated){
      routes = (
        <Switch>
              <Route exact path = '/' component={ BurgerBuilder } />
              <Route  path = '/checkout' component={ asyncCheckout } />
              <Route  path = '/orders' component={ asyncOrders } />
              <Route  path = '/auth' component={ asyncAuth } />
              <Route  path = '/logout' component={ Logout } />
              <Redirect to="/" />

              <Route render={ ()=><h1> Not found</h1>} />
            </Switch>

      )
    }

    return (
      <div >
        <BrowserRouter>
          <Layout>
              {routes}
          </Layout>
        </BrowserRouter>  
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAtuthenticated:state.auth.token!==null
  }
}

const mapDispathToProps = dispatch =>{
  return{
    onTryAutoSignup:()=> dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispathToProps)(App);
