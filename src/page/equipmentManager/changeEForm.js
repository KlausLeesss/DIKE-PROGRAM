import React from "react";
import { Form, DatePicker, Button , Select, Input,} from 'antd';
import MUtil from "../../util/tools";
import axios from "axios";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import url from "../../util/url";
import {withRouter} from "react-router-dom";

const _mm = new MUtil();

const { Option } = Select;

class EForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || '',
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const value = {
                    'eName':fieldsValue.eName,
                    'eManager':fieldsValue.eManager,
                    'eState':parseInt(fieldsValue.eState),
                    'id':parseInt(fieldsValue.id),
                    'ePrice':fieldsValue.ePrice,
                    'purchaser':fieldsValue.purchaser,
                };
                console.log(JSON.stringify(value));
                axios({
                    method:"post",
                    url:url+"/admin/updateEquipment",
                    data:JSON.stringify(value),
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    if(response.data.code === 0){
                        swal({
                            title: "成功提醒",
                            text: "设备信息修改"+response.data.msg,
                            type: "success",
                            showCancelButton: false,
                        },
                        function (isConfirm) {
                            window.location.reload();
                        }
                        );
                    }
                    else {
                        swal("错误提醒","设备信息修改"+response.data.msg,"warning");
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
                <Form.Item label="设备名称">
                    {getFieldDecorator('eName', {
                        rules: [{ required: true, message: 'Please input new eName!' }],
                        initialValue: this.props.eName
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="设备负责人">
                    {getFieldDecorator('eManager', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.props.eManager
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="设备购买人">
                    {getFieldDecorator('purchaser', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.props.purchaser
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="设备价值">
                    {getFieldDecorator('ePrice', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.props.ePrice
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="设备状态">
                    {getFieldDecorator('eState', {
                        rules: [{ required: true, message: 'Please select the state!' }],
                        initialValue:this.props.eState
                    })(
                        <Select
                            placeholder="Select a state"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="0">正常运行</Option>
                            <Option value="1">损坏</Option>
                            <Option value="2">维修中</Option>
                        </Select>,
                    )}
                </Form.Item>

                <Form.Item label="设备ID" style={{display:'none'}}>
                    {getFieldDecorator('id', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.props.id
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

const ChangeEForm = Form.create({ name: 'AddDetailForm' })(EForm);

export default withRouter(ChangeEForm);