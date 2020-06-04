import React,{ Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrapComponent,axios) => { 
     return class extends Component {
        state = {
            error:null
        }

         componentWillMount(){
             this.reqInterceptor = axios.interceptors.response.use(res=>res, error=>{
                 this.setState({error:error})
             });
             this.resInterceptor =  axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })

         }

         componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor); 
            axios.interceptors.response.eject(this.resInterceptor);

         }

         errorConfirmedHandle = ( ) =>  this.setState({error:null});
         render (){ 
            return (
                <Aux>
                    <Modal show={ this.state.error} clicked = {this.errorConfirmedHandle}> 
                    {  this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapComponent {...this.props} />
                </Aux>
            );
        }

     }
}


export default withErrorHandler;
