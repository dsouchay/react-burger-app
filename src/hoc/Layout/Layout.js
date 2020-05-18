import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from  './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class layout extends Component{
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
        
            <Toolbar toogle={ this.SideDrawerToogleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
                <main className = { classes.Content } >
                  {this.props.children}
                </main>
            </Aux>
        );
    }

} 

      

export default layout;