import React from "react";
import "./login.css";
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import User from "../../service/userservice";
import {Form,Button,Icon,Input} from "antd";
import {withRouter} from "react-router-dom";
import {createHashHistory} from "history";
import qs from "qs";
import axios from "axios";
import url from "../../util/url";

const _mm   = new MUtil();
const _user = new User();
const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
        _mm.setStorage('loginFlag',false);

    }

    componentWillMount() {
        document.title = "登录-DIKE Project";
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    method:"post",
                    url:url+"/anon/login",
                    data:qs.stringify({
                        username:values.username,
                        password:values.password
                    }),
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    if(response.data.code === 0){
                        console.log(response);
                        _mm.setStorage('userInfo',response.data.data);
                        _mm.setStorage('loginFlag',true);
                        this.props.history.push(this.state.redirect);
                    }
                    else{
                        swal("错误提醒","登录"+response.data.msg,"warning");
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"  style={{width:'100%'}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}


const LoginForm = Form.create({ name: 'AddDetailForm' })(Login);
export default withRouter(LoginForm);
