import React from "react";
import {withRouter} from "react-router-dom";
import {createHashHistory} from 'history'
import { Form, DatePicker, TimePicker, Button , Select, Input, Upload, Icon} from 'antd';
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import url from "../../util/url";
import axios from "axios";
import PageTitle from "../../component/page-title/page-title";
import qs from "qs"


const _mm = new MUtil();
const { Option } = Select;

const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});

let id = 0;

class AddEquipmentForm extends React.Component {

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
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const data = JSON.stringify({
                    'eName':fieldsValue.ename,
                    'eManager':fieldsValue.emanager,
                    'eState':parseInt(fieldsValue.estate),
                    'ePrice':fieldsValue.eprice,
                    'purchaser':fieldsValue.purchaser,
                });
                console.log(data);
                axios({
                    method:"post",
                    url:url+"/admin/addEquipment",
                    headers:{
                        "Authorization":this.state.token,
                        'Content-Type': 'application/json',
                    },
                    data:JSON.stringify({
                        'ename':fieldsValue.ename,
                        'emanager':fieldsValue.emanager,
                        'estate':parseInt(fieldsValue.estate),
                        'eprice':fieldsValue.eprice,
                        'purchaser':fieldsValue.purchaser,
                    }),
                }).then(response => {
                    if(response.data.code === 0 ){
                        swal("成功提醒","添加设备"+response.data.msg,"success")
                        history.push('/equipment');
                    }
                    else{
                        swal("错误提醒","添加设备"+response.data.msg,"warning")
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
        getFieldDecorator('keys', { initialValue: [] });
        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"新增设备"}/>
                    <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                            <Form.Item label="设备名称">
                                {getFieldDecorator('ename', {
                                    rules: [{ required: true, message: 'Please input new eName!' }],
                                })(<Input />)}
                            </Form.Item>

                            <Form.Item label="设备负责人">
                                {getFieldDecorator('emanager', {
                                    rules: [{ required: true, message: 'Please input the eManager!' }],
                                })(<Input />)}
                            </Form.Item>

                            <Form.Item label="设备状态">
                                {getFieldDecorator('estate', {
                                    rules: [{ required: true, message: 'Please select the state!' }],
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

                            <Form.Item label="设备价值">
                                {getFieldDecorator('eprice', {
                                    rules: [{ required: true, message: 'Please input the price!' }],
                                })(<Input />)}
                            </Form.Item>

                            <Form.Item label="设备购买人">
                                {getFieldDecorator('purchaser', {
                                    rules: [{ required: true, message: 'Please input the purchase!' }],
                                })(<Input />)}
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 12, offset: 5 }} style={{textAlign:'center'}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
            </div>
        );
    }
}

const AddEquipment = Form.create({ name: 'AddDetailForm' })(AddEquipmentForm);

export default withRouter(AddEquipment);
