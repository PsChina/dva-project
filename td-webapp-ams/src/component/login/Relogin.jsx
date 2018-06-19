import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import * as services from "../../services/component/login/Relogin";
import * as code from '../../utils/code';
import { bizMap } from '../../utils/i18n';
const bMap = bizMap('component/login/Relogin');
const FormItem = Form.Item;


class Relogin extends React.Component {
    constructor(props){
        const visible = {
            position:'fixed', 
            left:0, top:0, right:0, bottom:0, 
            background:'rgba(0,0,0,.8)', 
            zIndex:999, 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center'
        }
        const unvisible = {
            display:'none'
        }
        super(props);
        this.state = {
            style:props.visible ? visible : unvisible,
            visible,
            unvisible,
            zIndex:9999
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            style:nextProps.visible ? this.state.visible : this.state.unvisible
        })
        if(!nextProps.visible) {
            window.shouldRelogin = false;
        } else {
            window.infoBus.$emit('newOrderDisabnleVisible',false);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                services.login({
                    "usrName":this.props.userName ,
                    "usrPsw":code.encode(values['password'],"md5")
                })
                .then((resule)=>{
                    this.props.loginSuccess(resule)
                })
            }
          });
    }
    render(){
        const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 19 },
            },
          };
        return (
            <div style={ this.state.style }>
            <Form
            onSubmit={ this.handleSubmit.bind(this) }
            layout="horizontal"
            style={ { background:'white',padding:'20px',borderRadius:'5px' } }>
            <div style={ {marginBottom:'10px',textAlign:'center', fontSize:'16px'} }> { `${bMap['hello']}${this.props.userName ? this.props.userName : null },${ bMap['modelMsg']}` } </div>
            <FormItem
            { ...formItemLayout }
            validateStatus={(passwordError||this.props.error) ? 'error' : ''}
            help={ passwordError || this.props.msg }
            label={ bMap['password'] }
            >
            {getFieldDecorator('password', {
                rules: [{ required: true, message: bMap['passwordPlacehold'] }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={ bMap['passwordPlacehold'] } />
            )}
            </FormItem>
               
            <Button
                type="primary"
                htmlType="submit"
                style = { { width:'100%' } }
            >
                {bMap['login']}
            </Button>
               
            </Form>
            </div>
        )
    }
}

const ReloginEle = Form.create()(Relogin);

export default ReloginEle;