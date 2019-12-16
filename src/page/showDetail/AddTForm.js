import React from "react";
import {Form, Input, Icon, Button, Select, DatePicker} from 'antd';
import axios from "axios";
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
const {Option} = Select;
const _mm = new MUtil();
let id = 0;
class TForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            token  : _mm.getStorage("userInfo").token || ''
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, datepicker, aims} = values;
                console.log('Received values of form: ', values);
                let all = keys.map(key => [ datepicker[key], aims[key] ]);
                const NewAll = all.map(item => ({finishTime:item[0].format('YYYY-MM-DD'),task : item[1],isFinished:0,pid : this.props.pid,type : this.props.type}));
                console.log(JSON.stringify(NewAll));
                axios({
                    method:"post",
                    url:"/user/insertTask",
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    },
                    data:JSON.stringify(NewAll),
                }).then(response => {
                    if(response.data.code === 0){
                        swal({
                                title: "成功提醒",
                                text: "添加阶段任务"+response.data.msg,
                                type: "success",
                                showCancelButton: false,
                            },
                            function (isConfirm) {
                                window.location.reload();
                            }
                        );
                    }
                    else {
                        swal("错误提醒","添加阶段任务"+response.data.msg,"warning");
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
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const formItemLayout = {
            labelCol: {
                sm: { span: 4, offset : 0 },
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
        const keys = getFieldValue('keys');
        const formItems1 = keys.map((k, index) => (
            <Form.Item
                {...(formItemLayout)}
                label={'时间'}
                required={false}
                key={k}
            >
                {getFieldDecorator(`datepicker[${k}]`, config)(<DatePicker style={{width:'60%'}}/>)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        style={{marginLeft:'5px'}}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const formItems2 = keys.map((k, index) => (
            <Form.Item
                {...(formItemLayout)}
                label={'目标'}
                required={false}
                key={k}
            >
                {getFieldDecorator(`aims[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input  or delete this field.",
                        },
                    ],
                })(<Input placeholder="阶段任务" style={{ width: '60%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        return (

            <Form onSubmit={this.handleSubmit}  style={{margin:'0 5%',textAlign:'center'}}>
                <div className={'row'} style={{textAlign:'center',marginTop:'20px'}}>
                    <div className={'col-md-6'}>
                        {formItems1}
                    </div>
                    <div className={'col-md-6'}>
                        {formItems2}
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <Form.Item >
                        <Button type="dashed" onClick={this.add}>
                            <Icon type="plus" /> 增加项目阶段性任务
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>

        );
    }
}

const AddTForm = Form.create({ name: 'NewItemForm' })(TForm);

export default AddTForm;

