import React from "react";
import { Form, DatePicker, Button , Select, Input,} from 'antd';
import MUtil from "../../util/tools";
import axios from "axios";
import qs from "qs";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import moment from "moment";
import {withRouter} from "react-router-dom";

const _mm = new MUtil();
const { Option } = Select;
class TForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || '',
            task: '',
        }

    }

    componentDidMount() {
        this.loadAllTask();
    }

    loadAllTask(){
        axios({
            method:"post",
            url:"/user/getAllTask",
            data:qs.stringify({pid:this.props.pid}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    task : response.data.data
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
                const finishTime = fieldsValue.finishTime.format('YYYY-MM-DD');
                const isFinished = fieldsValue.isFinished;
                const taskArr = Object.values(this.state.task);
                taskArr[index].task = task;
                taskArr[index].finishTime = finishTime;
                taskArr[index].isFinished = isFinished;
                console.log(taskArr);
                axios({
                    method:"post",
                    url:"/user/updateTask",
                    data:JSON.stringify(taskArr),
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    if(response.data.code === 0){
                        swal({
                                title: "成功提醒",
                                text: "阶段任务修改"+response.data.msg,
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                window.location.reload();
                            }
                        );
                    }
                    else {
                        swal("错误提醒","阶段任务修改"+response.data.msg,"warning");
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
                <Form.Item label="阶段任务">
                    {getFieldDecorator('task', {
                        rules: [{ required: true, message: 'Please input new task!' }],
                        initialValue: this.props.task
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="完成时间">
                    {getFieldDecorator('finishTime', {
                        rules: [{ required: true, message: 'Please input the Time!' }],
                        initialValue: moment(this.props.finishTime, 'YYYY-MM-DD')
                    })(
                        <DatePicker style={{width:'100%'}}/>
                    )}
                </Form.Item>

                <Form.Item label="完成状态">
                    {getFieldDecorator('isFinished', {
                        rules: [{ required: true, message: 'Please select the Type!' }],
                        initialValue: this.props.isFinished//(this.state.data.type === 1?"横向项目":(this.state.data.type === 2?"纵向项目":"实验项目"))
                    })(
                        <Select
                            placeholder="Select a Type"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="1">已完成</Option>
                            <Option value="0">未完成</Option>
                        </Select>,
                    )}
                </Form.Item>

                <Form.Item label="数组下标" style={{display:'none'}}>
                    {getFieldDecorator('index', {
                        rules: [{ required: true, message: 'Please input the index!' }],
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

const ChangeTForm = Form.create({ name: 'AddDetailForm' })(TForm);

export default withRouter(ChangeTForm);