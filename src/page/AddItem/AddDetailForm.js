import React from "react";
import {withRouter} from "react-router-dom";
import {createHashHistory} from 'history'
import $ from 'jquery';
import { Form, DatePicker, TimePicker, Button , Select, Input, Upload, Icon} from 'antd';
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import url from "../../util/url";
import axios from "axios";


const _mm = new MUtil();
const { RangePicker } = DatePicker;

const { Option } = Select;

const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});

let id = 0;

class AddDetailForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || ''
        }

    }

    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const rangeValue = fieldsValue['StartEndTime'];
                const values = {
                    'startTime':rangeValue[0].format('YYYY-MM-DD'),
                    'endTime':rangeValue[1].format('YYYY-MM-DD'),
                    'name':fieldsValue.name,
                    'manager':fieldsValue.manager,
                    'type':fieldsValue.type
                };
                const data = JSON.stringify(values);
                console.log(data);
                axios({
                    method:"post",
                    url:url+"/user/addProject",
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    },
                    data:data,
                }).then(response => {
                    if(response.data.code === 0){
                        swal({
                                title: "成功提醒",
                                text: "创建项目"+response.data.msg,
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                history.push('/AddItem-details?id='+response.data.data.id+'&type='+response.data.data.type);
                            }
                        );
                    }
                    else {
                        swal("错误提醒","创建项目"+response.data.msg,"warning");
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    };



    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        const formItemLayout = {
            labelCol: {
                sm: { span: 4,offset: 0 },
            },
            wrapperCol: {
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                sm: { span: 20, offset: 5 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });

        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="项目名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input new projectName!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="项目类型">
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Please select the Type!' }],
                    })(
                        <Select
                            placeholder="Select a Type"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="2">纵向项目</Option>
                            <Option value="1">横向项目</Option>
                            <Option value="0">内部实验</Option>
                            <Option value="3">专利</Option>
                            <Option value="4">文章</Option>
                            <Option value="5">外包实验</Option>
                            <Option value="6">代理实验</Option>
                        </Select>,
                    )}
                </Form.Item>

                <Form.Item label="项目负责人">
                    {getFieldDecorator('manager', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="起止时间">
                    {getFieldDecorator('StartEndTime', rangeConfig)(<RangePicker style={{width:'100%'}}/>)}
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

const DetailForm = Form.create({ name: 'AddDetailForm' })(AddDetailForm);

export default withRouter(DetailForm);
