import React, { Component } from 'react';
import BillingProcessor from './component/BillingProcessor';
import { setCookie, getCookie, setToken, getToken  } from './utils/storage';
import { Modal, message } from 'antd';
import Relogin from './component/login/Relogin';
import { bizMap } from './utils/i18n';
import formatForm from './utils/formatForm';
import { decode } from './utils/code';
const bMap = bizMap('component/login/Relogin');

class App extends Component {
  constructor(props){
    super(props);
    const data = window.location.href.split('?')[1];
    let par = { user: '', tk: '' };
    if (data) {
      const base64Params = data.split('=')[1];
      const params = decode(base64Params, 'base64');
      if (params) {
        par = formatForm(params);
      }
    }
    setToken(par.user, par.tk);
    let userName = par.user;
    this.state = {
      userName,
      token:par.tk,
      visible:false,
      loginMsg:null,
    }
  }
  relogin(){
    window.shouldRelogin = true;
    this.setState({
      visible:true
    })
  }
  componentWillMount(){
    
    window.infoBus.$on('relogin',()=>{
      this.relogin()
    })

    if( !this.state.token ) {
      // 弹出登录
      this.relogin()
    }
    
  }
  componentWillUnmount(){
    window.infoBus.$off('relogin');
  }
  render() {
    // if(this.state.visible){
    //   console.log();
    // }else {

    // }
    const ReloginProps = {
      visible:this.state.visible,
      loginSuccess:(msg)=>{
        console.log( msg )
        const code = Number(msg.data.rspCod);
        let token = null;
        if('rspData' in msg.data){
          token = msg.data.rspData.token;
        }
        switch(code){
          case 200:
            this.setState({
              visible:false,
              token,
              loginMsg:bizMap['success'],
              error:false
            })
            setToken(this.state.userName, token)
            message.success( bMap['success'] )
            window.infoBus.$emit('getOrderList');
          break;
          case 999:
            let rspMsg =  msg.data.rspMsg
            let errrorMessage = ''
            if( rspMsg.indexOf('锁定')!==-1 ){
              errrorMessage = bMap['locked'].replace('[d]',rspMsg.replace(/[^\d]/g,''))
            } else if( rspMsg.indexOf('错误')!==-1 ) {
              errrorMessage = bMap['passwordWrong'].replace('[d]',rspMsg.replace(/[^\d]/g,''))
            } else {
              errrorMessage = rspMsg
            }
            this.setState({
              loginMsg:errrorMessage,
              error:true
            })
            // 清除 反馈信息。
            setTimeout(()=>{
              this.setState({
                loginMsg:null,
                error:false
              })
            },1500);
          break;
          default:
            this.setState({
              loginMsg:`${bMap['networkError']}${code}`,
              error:true
            })            
          break;
        }
      },
      msg:this.state.loginMsg,
      userName:this.state.userName,
      error:this.state.error
    }

    return (
      <div className="appClass">
        <Relogin { ...ReloginProps } />
        <BillingProcessor/>
      </div>
    );
  }
}

export default App;
