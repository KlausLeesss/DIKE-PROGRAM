import React from "react";
import { Form, DatePicker, Button , Select, Input,} from 'antd';
import MUtil from "../../util/tools";
import axios from "axios";
import qs from "qs";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import {withRouter} from "react-router-dom";

const _mm = new MUtil();
class MForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || '',
            member: '',
        }

    }

    componentDidMount() {
        this.loadAllMember();
    }

    loadAllMember(){
        axios({
            method:"post",
            url:"/user/getAllMember",
            data:qs.stringify({pid:this.props.pid}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    member : response.data.data.data
                })
            }
        }).catch(error => {
            console.log(error);
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const index = fieldsValue.index;
                const task = fieldsValue.task;
                const name = fieldsValue.name;
                const memberArr = Object.values(this.state.member);
                memberArr[index].memberName = name;
                memberArr[index].memberTask = task;
                console.log(memberArr);
                axios({
                    method:"post",
                    url:"/user/updateMember",
                    data:JSON.stringify(memberArr),
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    console.log(response);
                    if(response.data.code === 0){
                        swal({
                                title: "成功提醒",
                                text: "成员职责修改"+response.data.msg,
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                window.location.reload();
                            }
                        );
                    }
                    else {
                        swal("错误提醒","成员职责修改"+response.data.msg,"warning");
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        });
    };



    render() {
        const { getFieldDecorator } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });

        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit} style={{marginLeft:'80px',marginTop:'20px'}}>
                <Form.Item label="成员名">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input new projectName!' }],
                        initialValue: this.props.name
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="成员职责">
                    {getFieldDecorator('task', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.props.task
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="数组下标" style={{display:'none'}}>
                    {getFieldDecorator('index', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.props.index
                    })(<Input />)}
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

const ChangeMForm = Form.create({ name: 'AddDetailForm' })(MForm);

export default withRouter(ChangeMForm);