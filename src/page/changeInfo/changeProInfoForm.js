import React from "react";
import {withRouter} from "react-router-dom";
import { Form, DatePicker, Button , Select, Input, Upload, Icon} from 'antd';
import MUtil from "../../util/tools";
import url from "../../util/url";
import axios from "axios";
import qs from "qs";
import moment from "moment";

const _mm = new MUtil();
const { Option } = Select;

class ChangeProForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || '',
            data  : ''
        }

    }

    componentDidMount() {
        this.loadOneProject();
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const values = {
                    'startTime':fieldsValue.startTime.format('YYYY-MM-DD'),
                    'endTime':fieldsValue.endTime.format('YYYY-MM-DD'),
                    'name':fieldsValue.name,
                    'manager':fieldsValue.manager,
                    'type':fieldsValue.type
                };
                let thing = this.state.data;
                thing.type = fieldsValue.type;
                thing.manager = fieldsValue.manager;
                thing.name = fieldsValue.name;
                thing.endTime = fieldsValue.endTime.format('YYYY-MM-DD');
                thing.startTime = fieldsValue.startTime.format('YYYY-MM-DD');
                console.log(JSON.stringify(thing));
                axios({
                    method:"post",
                    url:"/user/updateProject",
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    },
                    data:JSON.stringify(thing),
                }).then(response => {
                    console.log(response);
                    alert(response.data.msg)
                })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });
    };


    loadOneProject(){
        axios({
            method:"post",
            url:"/user/getOneProject",
            data:qs.stringify({id:this.props.pid}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    data:response.data.data,
                });
            }
        }).catch(error => {
            console.log(error);
        })
    };



    render() {
        const { getFieldDecorator} = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="项目名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input new projectName!' }],
                        initialValue: this.state.data.name
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="项目类型">
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Please select the Type!' }],
                        initialValue: this.state.data.type//(this.state.data.type === 1?"横向项目":(this.state.data.type === 2?"纵向项目":"实验项目"))
                    })(
                        <Select
                            placeholder="Select a Type"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="2">纵向项目</Option>
                            <Option value="1">横向项目</Option>
                            <Option value="0">实验项目</Option>
                            <Option value="3">专利</Option>
                            <Option value="4">文章</Option>
                        </Select>,
                    )}
                </Form.Item>

                <Form.Item label="项目负责人">
                    {getFieldDecorator('manager', {
                        rules: [{ required: true, message: 'Please input the manager!' }],
                        initialValue: this.state.data.manager
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="起始时间">
                    {getFieldDecorator('startTime', {
                        rules: [{ required: true, message: 'Please input the Time!' }],
                        initialValue: moment(this.state.data.startTime, 'YYYY-MM-DD')
                    })(
                        <DatePicker style={{width:'100%'}}/>
                    )}
                </Form.Item>

                <Form.Item label="结束时间">
                    {getFieldDecorator('endTime', {
                        rules: [{ required: true, message: 'Please input the Time!' }],
                        initialValue: moment(this.state.data.endTime, 'YYYY-MM-DD')
                    })(
                        <DatePicker style={{width:'100%'}}/>
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

const ChangeProInfoForm = Form.create({ name: 'AddDetailForm' })(ChangeProForm);

export default withRouter(ChangeProInfoForm);
