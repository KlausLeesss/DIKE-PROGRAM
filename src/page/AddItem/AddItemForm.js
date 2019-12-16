import React from "react";
import {Form, Input, Icon, Button, Select} from 'antd';
const {Option} = Select;
const PeopleArr = ['李沛键','林钟煇','张泰焱','高百万','曹宝玉'];
let id = 0;
class AddItemForm extends React.Component {
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
                const { keys, names, works } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => [ names[key], works[key] ]));
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const People = PeopleArr.map((item,index) => {
            return <Option value={item} key={index}>{item}</Option>
        });
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
                label={'成员'}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input  name or delete this field.",
                        },
                    ],
                })(<Select placeholder="成员" style={{ width: '60%', marginRight: 8 }}>
                    {People}
                </Select>)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const formItems2 = keys.map((k, index) => (
            <Form.Item
                {...(formItemLayout)}
                label={'职责'}
                required={false}
                key={k}
            >
                {getFieldDecorator(`works[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input  or delete this field.",
                        },
                    ],
                })(<Input placeholder="成员职责" style={{ width: '60%', marginRight: 8 }} />)}
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
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '85%',marginLeft:'-80px'}}>
                                <Icon type="plus" /> 增加项目成员与职责
                            </Button>
                        </Form.Item>
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="primary" htmlType="submit" style={{marginLeft:'-80px'}}>
                                Submit
                            </Button>
                        </Form.Item>
                        </div>
                    </Form>

        );
    }
}

const AddForm = Form.create({ name: 'NewItemForm' })(AddItemForm);

export default AddForm;

