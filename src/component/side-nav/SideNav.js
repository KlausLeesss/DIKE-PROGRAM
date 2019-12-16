import React from "react";
import {Link,NavLink} from "react-router-dom";
import {Card, Button, Modal, Form, Input} from "antd";
import MUtil from "../../util/tools";
import url from "../../util/url";
import axios from "axios";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import qs from 'qs';

const _mm = new MUtil();
const {TextArea} = Input;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="更新公告"
                    okText="New"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="公告">
                            {getFieldDecorator('notice', {
                                rules: [{ required: true, message: 'Please input the new notice!' }],
                            })(<TextArea rows={4} />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class SideNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notice : '公告',
            token : _mm.getStorage('userInfo').token || '',
            role : _mm.getStorage("userInfo").role,
        }
    }

    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', qs.stringify(values));

            axios({
                method:"post",
                url:url+"/admin/resetNotice",
                headers:{
                    "Authorization":this.state.token,
                },
                data:qs.stringify(values),
            }).then(response => {
                if(response.data.code === 0){
                    swal("成功提醒","公告修改"+response.data.msg,"success");
                    this.setState({
                        notice : values.notice
                    });
                }
                else {
                    swal("错误提醒","公告修改"+response.data.msg,"warning");
                }
            })
                .catch(error => {
                    console.log(error);
                });
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    componentDidMount() {
        this.getNotice();
    }

    getNotice(){
        axios({
            method:"get",
            url:url+"/notice/getNotice",
            headers:{
                "Authorization":this.state.token,
            },
        }).then(response => {
            if(response.data.code === 0){

                this.setState({
                    notice : response.data.data
                });
            }
        })
            .catch(error => {
                console.log(error);
                console.log(error.status);
                console.log(error.statusText);
            })
    }


    render() {
        return(
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">

                        <li>
                            <NavLink exact activeClassName={"active-menu"} to={"/"}>
                                <i className="fa fa-home"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>

                        <li className={"active"}>
                            <Link to={this.state.role===1?"/project":"/project-user"}>
                                <i className="fa fa-bar-chart-o"></i>
                                <span>项目管理</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/project":"/project-user"}>横向项目</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/project-length":"/project-length-user"}>纵向项目</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={"active"}>
                            <Link to={this.state.role===1?"/project-test":"/project-test-user"}>
                                <i className="fa fa-bar-chart-o"></i>
                                <span>实验管理</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/project-test":"/project-test-user"}>内部实验</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/project-test-other":"/project-test-other-user"}>代理实验</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/project-test-out":"/project-test-out-user"}>外包实验</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={"active"}>
                            <Link to={"/knowledge"}>
                                <i className="fa fa-bookmark-o"></i>
                                <span>知识产权</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/knowledge":"/knowledge-user"}>文章</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/knowledge-patent":"/knowledge-patent-user"}>专利</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className={"active"}>
                            <Link to={this.state.role===1?"/equipment":"/equipment-user"}>
                                <i className="fa fa-desktop"></i>
                                <span>设备</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/equipment":"/equipment-user"}>设备管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={"active"}>
                            <Link to={this.state.role===1?"/user":"/changePw"}>
                                <i className="fa fa-user-o"></i>
                                <span>用户</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/user":"/changePw"}>用户管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={"active"}>
                            <Link to={this.state.role===1?"/selfReport":"/selfReport-user"}>
                                <i className="fa fa-upload"></i>
                                <span>个人周报</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName={"active-menu"} to={this.state.role===1?"/selfReport":"/selfReport-user"}>周报上传</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

                <div style={{padding: '20px',marginTop:'40px'}}>
                    <Card
                        title="公告"
                        bordered={true}
                        style={{backgroundColor:'#ececec'}}
                        extra={
                        <div>
                            <Button onClick={this.showModal} size={'small'} disabled={this.state.role === 1?false:true}>修改</Button>
                            <CollectionCreateForm
                                wrappedComponentRef={this.saveFormRef}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                onCreate={this.handleCreate}
                            />
                        </div>
                        }
                    >
                        <p>{this.state.notice}</p>
                    </Card>
                </div>

            </div>
        );
    }
}

export default SideNav;