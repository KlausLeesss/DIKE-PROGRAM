import React from "react";
import CreatForm from "./CreatUserForm";
import PageTitle from "../../component/page-title/page-title";
import MUtil from "../../util/tools";
import { Table, Divider } from 'antd';
import { Button } from 'antd';
import axios from "axios";
import {Link} from "react-router-dom";
import qs from "qs";
import url from "../../util/url";

const _mm   = new MUtil();

class AccountManager extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data   : '',
            token  : _mm.getStorage("userInfo").token || ''
        }
    }




    rePassword(record){
        axios({
            method:"post",
            url:"/admin/resetPw",
            data:qs.stringify({username:record.username}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "重置用户密码"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    }
                );
            }
            else {
                swal("错误提醒","重置用户密码"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    deleteUser(record){
        axios({
            method:"post",
            url:"/admin/delete",
            data:qs.stringify({id:record.id}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "成员删除"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","成员删除"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    changeRole(record){
        if(record.role === 1){
            record.role = 0;
        }
        else record.role = 1;
        console.log(record.role);
        axios({
            method:"post",
            url:"/admin/updateRole",
            data:qs.stringify({
                userRole:record.role,
                userName: record.username
            }),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response)
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "权限更改"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","权限更改"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList(){
        axios({
            method:"get",
            url:"/admin/getAll",
            headers:{
                "Authorization":this.state.token,
            }}).then(response => {
            if(response.data.code === 0){
                console.log(response.data.data);
                this.setState({
                    data : response.data.data
                });
            }
        })
            .catch(error => {
                console.log(error);
                console.log(error.status);
                console.log(error.statusText);
            })

    };

    render() {

        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                render: (text,record) => <Link to={{pathname:'/personProject/'+record.username}}>{text}</Link>,
                width:300
            },
            {
                title: '管理权限',
                dataIndex: 'role',
                key: 'role',
                render: text => <b>{ text===1 ? '管理员' : '成员' }</b>,
                width:300
            },
            {
                title: '管理员操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type={"primary"} onClick={this.rePassword.bind(this,record)}>重置密码</Button>
                        <Divider type="vertical" />
                        <Button type={"danger"} onClick={this.deleteUser.bind(this,record)}>删除用户</Button>
                        <Divider type="vertical" />
                        <Button style={{backgroundColor:'#5CB85C',color:'white'}} onClick={this.changeRole.bind(this,record)}>更改权限</Button>
                    </span>),
                width:300
            },
        ];

        const data = Object.values(this.state.data);
        const result = data.map(function(o,index) {
            o.key = index+1;
            return o;
        });

        return(
            <div id={"page-wrapper"}>
                <PageTitle title={"用户管理"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
                    <CreatForm/>
                    <div className={"col-md-12"}>
                        <Table
                            columns={columns}
                            dataSource={result}
                            pagination={false}
                            bordered={true}
                            scroll={{y:325}}
                            style={{marginTop:'20px'}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default AccountManager;