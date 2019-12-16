import React from "react";
import $ from 'jquery';
import axios from 'axios';
import { Form, Select, Input, Button } from 'antd';
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import url from "../../util/url";
const _mm   = new MUtil();
const { Option } = Select;

class CreatUserForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token :   _mm.getStorage('userInfo').token || ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    username:values.username,
                    role:parseInt(values.role)
                };
                console.log(JSON.stringify(data));
                axios({
                    method:"post",
                    url:"/admin/addUser",
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    },
                    data:JSON.stringify(data),
                }).then(response => {
                    console.log(response);
                    if(response.data.code === 0){
                        swal({
                                title: "成功提醒",
                                text: "添加用户"+response.data.msg,
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                window.location.reload();
                            }
                        );
                    }
                    else {
                        swal("错误提醒","添加用户"+response.data.msg,"warning");
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

                <Form.Item label="新用户姓名">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input new username!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="管理员权限">
                    {getFieldDecorator('role', {
                        rules: [{ required: true, message: 'Please select the role!' }],
                    })(
                        <Select
                            placeholder="Select a role"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="1">管理员</Option>
                            <Option value="0">普通用户</Option>
                        </Select>,
                    )}
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

const CreatForm = Form.create({ name: 'NewUserForm' })(CreatUserForm);

export default CreatForm;
