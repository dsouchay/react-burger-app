import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from  './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';



class Layout extends Component{
    state = {
        showSideDrawer:false
    }

    SideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer:false})

    }

    SideDrawerToogleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        })

    }

    render(){
        return(
            <Aux>
        
            <Toolbar toogle={ this.SideDrawerToogleHandler} isAuth={ this.props.isAuthenticate}/>
                <SideDrawer open={this.state.showSideDrawer} isAuth={ this.props.isAuthenticate} closed={this.SideDrawerClosedHandler} />
                <main className = { classes.Content } >
                  {this.props.children}
                </main>
            </Aux>
        );
    }

} 

const mapToStateProps = state =>{
    return {
        isAuthenticate:state.auth.token!==null
    }
}


export default connect(mapToStateProps)(Layout);