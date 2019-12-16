import React from "react";
import {withRouter} from "react-router-dom";
import {createHashHistory} from 'history'
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import { Form, Select, Input, Button } from 'antd';
import MUtil from "../../util/tools";
import User from "../../service/userservice";
import url from "../../util/url";
import axios from 'axios'

const _mm   = new MUtil();

const _user = new User();
const { Option } = Select;
const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});

class PwChangeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            values = {
                username : values.username,
                oldPassword     : values.oldPassword,
                newPassword    : values.newPassword,
            };
            let data = JSON.stringify(values);
             axios({
                    method:"post",
                    url:url+"/user/updatePw",
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    },
                    data:data,
                }).then(response => {
                    if(response.data.code === 0){
                        swal({
                                title: "成功提醒",
                                text: "修改密码"+response.data.msg,
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                _mm.removeStorage("userInfo");
                                history.push('/login');
                            }
                        );
                    }
                    else {
                        swal("错误提醒","修改密码"+response.data.msg,"warning");
                    }
            })
                .catch(error => {
                    console.log(error);
                })

        });
    };


    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

                <Form.Item label="用户姓名">
                    {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input the username!' }],
                })(<Input />)}
                </Form.Item>

                <Form.Item label="旧密码">
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: 'Please input the old password!' }],
                    })(<Input.Password/>)}
                </Form.Item>


                <Form.Item label="新密码">
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: 'Please input the new password!' }],
                    })(<Input.Password/>)}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 5 }} style={{textAlign:'center'}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const ChangeForm = Form.create({ name: 'NewPwForm' })(PwChangeForm);


export default withRouter(ChangeForm);
