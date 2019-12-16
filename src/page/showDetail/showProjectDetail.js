import React from "react";
import PageTitle from "../../component/page-title/page-title";
import ChangeMForm from "./changeMForm";
import ChangeTForm from "./changeTForm";
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import url from '../../util/url/index';
import {Collapse, Button, Icon, Descriptions, Select, Table, Modal, Input, Form, Divider,Alert} from 'antd';
import axios from "axios";
import qs from "qs";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import AddMForm from "./AddMForm";
import AddTForm from "./AddTForm";
import {createHashHistory} from "history";
const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});
const { Panel } = Collapse;
const _mm   = new MUtil();
const { Option } = Select;

class showProjectDetail extends React.Component{

    constructor(props){
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            data    : '',
            date    : date,
            values  : '',
            self    : '',
            disable : false,
            type    : '',
            id      : this.getUrlParam(),
            report  : '',
            member  : '',
            task    : '',
            visible: false,
            visible1: false,
            token   : _mm.getStorage("userInfo").token || '',
            username : _mm.getStorage('userInfo').username || ''
        }
    }

    componentDidMount() {
        this.loadOneProject();
        this.loadAllReport();
        this.loadAllMember();
        this.loadAllTask();
    }

    deleteMember = (record) => {
        axios({
            method:"post",
            url:url+"/user/deleteMember",
            data:qs.stringify({id:record.id}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "删除成员"+record.memberName+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","删除成员"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    deleteMemberByPid = () => {
        axios({
            method:"post",
            url:url+"/user/deleteMember",
            data:qs.stringify({pid:this.getUrlParam()}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "删除所有成员"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","删除所有成员"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    deleteTask = (record) => {
        axios({
            method:"post",
            url:url+"/user/deleteTask",
            data:qs.stringify({id:record.id}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "删除阶段任务"+record.memberName+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","删除阶段任务"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    deleteTaskByPid = () => {
        axios({
            method:"post",
            url:url+"/user/deleteMember",
            data:qs.stringify({pid:this.getUrlParam()}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "删除所有任务"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","删除所有任务"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    showModal = (record) => {
        this.setState({
            visible: true,
            mn : record.memberName,
            mt : record.memberTask,
            index : record.key-1
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    showModal1 = (record) => {
        this.setState({
            visible1: true,
            tk : record.task,
            ft : record.finishTime,
            if : record.isFinished,
            index : record.key-1
        });
    };

    handleOk1 = e => {
        this.setState({
            visible1: false,
        });
    };

    handleCancel1 = e => {
        this.setState({
            visible1: false,
        });
    };

    getUrlParam(){
        let queryString = this.props.location.pathname.split('/')[2] || '';
        return queryString;
    }

    loadOneProject(){
        axios({
            method:"post",
            url:url+"/user/getOneProject",
            data:qs.stringify({id:this.getUrlParam()}),
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

    loadAllMember(){
        axios({
            method:"post",
            url:url+"/user/getAllMember",
            data:qs.stringify({pid:this.getUrlParam()}),
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

    loadAllTask(){
        axios({
            method:"post",
            url:url+"/user/getAllTask",
            data:qs.stringify({pid:this.getUrlParam()}),
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

    loadAllReport(){
        axios({
            method:"post",
            url:url+"/admin/getAllReport",
            data:qs.stringify({pid:this.getUrlParam()}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    report:response.data.data,
                })
            }
        }).catch(error => {
            console.log(error);
        })

    };

    submit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('pid',this.getUrlParam());
        axios({
            method:"post",
            url:url+"/admin/uploadEvidence",
            data:formData,
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/multipart/form-data'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "上传文件"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","上传文件"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    submitEnv = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('pid',this.getUrlParam());
        axios({
            method:"post",
            url:url+"/admin/uploadContract",
            data:formData,
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/multipart/form-data'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "上传文件"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","上传文件"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    submit1 = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('pid',this.getUrlParam());
        formData.append('userName',this.state.username);
        axios({
            method:"post",
            url:url+"/user/uploadProjectReport",
            data:formData,
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/multipart/form-data'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "上传文件"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","上传文件"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    checkPic = () => {
       window.location="http://47.96.184.129:8086"+'/getEvidence/'+this.getUrlParam()+".jpg";
    };

    checkEnvPic = () => {
        window.location = "http://47.96.184.129:8086"+'/getEvidence/'+this.getUrlParam()+"Contract"+".jpg";
    };

    handleSelectChange = (value) => {
        this.setState({values: value});
        let thing = this.state.data;
        thing.isPaid = value;
        axios({
            method:"post",
            url:url+"/user/updateProject",
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/json',
            },
            data:JSON.stringify(thing),
        }).then(response => {
            if(response.data.code === 0 ) {
                console.log(response);
                swal("成功提醒", "支付状态修改" + response.data.msg, "success")
            }
            else{
                swal("错误提醒", "支付状态修改" + response.data.msg, "warning")
            }
        })
            .catch(error => {
                console.log(error);
            })
    };

    handleSelectChange1 = (value) => {
        this.setState({self: value});
        let thing = this.state.data;
        thing.selfChoice = value;
        axios({
            method:"post",
            url:url+"/user/updateProject",
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/json',
            },
            data:JSON.stringify(thing),
        }).then(response => {
            if(response.data.code === 0 ) {
                console.log(response);
                swal("成功提醒", "支付渠道修改" + response.data.msg, "success")
            }
            else{
                swal("错误提醒", "支付渠道修改" + response.data.msg, "warning")
            }
        })
            .catch(error => {
                console.log(error);
            })
    };

    handleSelectChange2 = (value) => {
        this.setState({type: value});
        let thing = this.state.data;
        thing.payChannel = value;
        axios({
            method:"post",
            url:url+"/user/updateProject",
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/json',
            },
            data:JSON.stringify(thing),
        }).then(response => {
            if(response.data.code === 0 ) {
                console.log(response);
                swal("成功提醒", "支付渠道修改" + response.data.msg, "success")
            }
            else{
                swal("错误提醒", "支付渠道修改" + response.data.msg, "warning")
            }
        })
            .catch(error => {
                console.log(error);
            })
    };

    downloadReport = (record) =>{
        let data = {
            "fileName" : record.reportName,
            "pid"      : this.getUrlParam()
        };
        axios({
            method: 'post',
            url:url+'/user/downloadProjectReport',
            responseType: 'blob',
            data: JSON.stringify(data),
            headers: {
                "Authorization":this.state.token,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log(response);
            const blob = new Blob([response.data],{type:response.data.type});
            const fileName = record.reportName;
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);// 释放URL 对象
                document.body.removeChild(elink)
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    downloadAllReport = () =>{
        axios({
            method:"post",
            responseType: 'blob',
            url:url+"/admin/downloadAllReport",
            data:qs.stringify({pid:this.getUrlParam()}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            const blob = new Blob([response.data],{type:response.data.type});
            const fileName = this.state.data.name;
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);// 释放URL 对象
                document.body.removeChild(elink)
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    DateDiff(sDate1,  sDate2){
        var  aDate,  oDate1,  oDate2,  iDays;
        aDate  =  sDate1.split("-");
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2002格式
        aDate  =  sDate2.split("-");
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
        let arys1= new Array();
        let arys2= new Array();
        if(sDate1 != null && sDate2 != null) {
            arys1=sDate1.split('-');
            var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
            arys2=sDate2.split('-');
            var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);
            if(sdate > edate) {
                return -1;
            }
            else {
                iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);   //把相差的毫秒数转换为天数
                return  iDays
            }
        }
    }



    render() {
        const columns = [
            {
                title: '周报名称',
                dataIndex: 'reportName',
                key: 'reportName',
                render: (text,record) => text,
                width:300
            },
            {
                title: '上传用户',
                dataIndex: 'userName',
                key: 'userName',
                render: (text,record) => <Link to={{pathname:'/personProject/'+record.userName}}>{text}</Link>,
                width:300
            },
            {
                title: '下载周报',
                key: 'action',
                render: (text, record) => (
                    <Button onClick={this.downloadReport.bind(this,record)}>下载周报</Button>
                    ),
                width:300
            },
        ];
        const data = Object.values(this.state.report);
        const result = data.map(function(o,index) {
            o.key = index+1;
            return o;
        });

        const columns1 = [
            {
                title: '成员名',
                dataIndex: 'memberName',
                key: 'memberName',
                render: text => <b>{text}</b>,
                width:300
            },
            {
                title: '成员职责',
                dataIndex: 'memberTask',
                key: 'memberTask',
                render: text => <b>{text}</b>,
                width:300
            },
            {
                title: '管理员操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type={"primary"} onClick={this.showModal.bind(this,record)}>修改</Button>
                        <Modal
                            title={"修改成员职责信息"}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                        <ChangeMForm name={this.state.mn} task={this.state.mt} index={this.state.index} pid={this.getUrlParam()}/>
                    </Modal>
                        <Divider type="vertical" />
                        <Button type={"danger"} onClick={this.deleteMember.bind(this,record)}>删除</Button>
                    </span>),
                width:300
            },
        ];
        const memberarr = Object.values(this.state.member);
        const memberlist = memberarr.map((item,index) => {
            item.key = index+1;
            return item;
        });

        const columns2 = [
            {
                title: '阶段任务',
                dataIndex: 'task',
                key: 'task',
                render: text => <b>{text}</b>,
                width:300
            },
            {
                title: '完成时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
                render: text => <b>{text}</b>,
                width:300
            },
            {
                title: '完成状态',
                dataIndex: 'isFinished',
                key: 'isFinished',
                render: text => <b>{ text===0 ? '未完成' : '已完成' }</b>,
                width:300
            },
            {
                title: '倒计时',
                dataIndex: 'date',
                key: 'date',
                render: (text,record) => <b>{ this.DateDiff(this.state.date,record.finishTime)===-1 ? "时间到" : "剩余"+this.DateDiff(this.state.date,record.finishTime)+"天"}</b>,
            },
            {
                title: '选择操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type={"primary"} onClick={this.showModal1.bind(this,record)}>修改</Button>
                            <Modal
                                title={"修改阶段任务信息"}
                                visible={this.state.visible1}
                                onOk={this.handleOk1}
                                onCancel={this.handleCancel1}
                            >
                            <ChangeTForm finishTime={this.state.ft} task={this.state.tk} index={this.state.index} pid={this.getUrlParam()} isFinished={this.state.if}/>
                            </Modal>
                        <Divider type="vertical" />
                        <Button type={"danger"} onClick={this.deleteTask.bind(this,record)}>删除</Button>
                    </span>),
                width:300
            },
        ];
        const taskArr = Object.values(this.state.task);
        const taskList = taskArr.map((item,index) => {
            item.key = index+1;
            return item;
        });

        return(
            <div id={"page-wrapper"}>
                <PageTitle title={"项目&周报"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'10px'}}>
                    <div className={"col-md-12"} style={{marginTop:'30px',marginLeft:'-50px'}}>
                        <Link to={'/ChangeProInfo/'+this.getUrlParam()}>
                            <Button type="primary" icon="plus" style={{float:'right',marginTop:'20px'}}>
                                修改项目信息
                            </Button>
                        </Link>
                        <h2 className={"page-header"}>项目详情</h2>
                        <Descriptions  layout="vertical" bordered>
                            <Descriptions.Item label="项目名称">{this.state.data.name}</Descriptions.Item>
                            <Descriptions.Item label="项目类别">{this.state.data.type === 1?"横向项目":(this.state.data.type === 2 ? "纵向项目":(this.state.data.type === 0?"实验":(this.state.data.type === 3?"专利":"文章")))}</Descriptions.Item>
                            <Descriptions.Item label="项目负责人">{this.state.data.manager}</Descriptions.Item>
                            <Descriptions.Item label="项目开始时间">{this.state.data.startTime}</Descriptions.Item>
                            <Descriptions.Item label="项目结束时间">{this.state.data.endTime}</Descriptions.Item>
                            <Descriptions.Item label="支付渠道">
                                <Select onChange={this.handleSelectChange1.bind(this)}
                                        value={this.state.data.selfChoice}
                                        style={{width:"50%"}}>
                                    <Option value={1} key={'个人'}>个人</Option>
                                    <Option value={2} key={'学校'}>学校</Option>
                                    <Option value={3} key={'公司'}>公司</Option>
                                </Select>
                                <Select onChange={this.handleSelectChange2.bind(this)}
                                        value={this.state.data.payChannel}
                                        style={{width:"50%"}}
                                        disabled={this.state.disable}
                                >
                                    <Option value={1} key={'现金'}>现金</Option>
                                    <Option value={2} key={'银行卡'}>银行卡</Option>
                                    <Option value={3} key={'微信'}>微信</Option>
                                </Select>
                            </Descriptions.Item>
                            <Descriptions.Item label="支付状态">
                                <Select onChange={this.handleSelectChange.bind(this)}
                                        value={this.state.data.isPaid}
                                        style={{width:"100%"}}>
                                    <Option value={"已支付"} key={'已支付'}>已支付</Option>
                                    <Option value={"未支付"} key={'未支付'}>未支付</Option>
                                </Select>
                            </Descriptions.Item>
                            <Descriptions.Item label="支付凭证">{this.state.data.payWarrant === null ?
                                <form onSubmit={this.submit}>
                                    <input type={"file"} name={"file"} style={{opacity:'0.5',width:'100%'}}/>
                                    <input type="submit" value="上传"style={{opacity:'0.5',width:'100%'}}/>
                                </form>
                                :
                                <Button onClick={this.checkPic}>查看凭证</Button>}
                            </Descriptions.Item>
                            <Descriptions.Item label="支付凭证">{this.state.data.envidence === null ?
                                <form onSubmit={this.submitEnv}>
                                    <input type={"file"} name={"file"} style={{opacity:'0.5',width:'100%'}}/>
                                    <input type="submit" value="上传"style={{opacity:'0.5',width:'100%'}}/>
                                </form>
                                :
                                <Button onClick={this.checkEnvPic}>查看合同</Button>}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className={"col-md-12"} style={{marginTop:'30px',marginLeft:'-50px'}}>
                        <Button type="primary" icon={"minus"} style={{float:'right',marginTop:'20px'}} onClick={this.deleteMemberByPid}>
                            删除所有成员
                        </Button>
                        <h2 className={"page-header"}>成员职责</h2>
                        <div>
                            <Table
                                columns={columns1}
                                dataSource={memberlist}
                                pagination={false}
                                bordered={true}
                                scroll={{y:325}}
                                style={{marginTop:'20px'}}
                            />
                            <AddMForm pid={this.getUrlParam()} type={this.state.data.type}/>
                        </div>
                    </div>
                    <div className={"col-md-12"} style={{marginTop:'30px',marginLeft:'-50px'}}>
                        <Button type="primary" icon={"minus"} style={{float:'right',marginTop:'20px'}} onClick={this.deleteTaskByPid}>
                            删除所有阶段任务
                        </Button>
                        <h2 className={"page-header"}>阶段任务</h2>
                        <div>
                            <Table
                                columns={columns2}
                                dataSource={taskList}
                                pagination={false}
                                bordered={true}
                                scroll={{y:325}}
                                style={{marginTop:'20px'}}
                            />
                            <AddTForm pid={this.getUrlParam()} type={this.state.data.type}/>
                        </div>
                    </div>
                    <div className={"col-md-12"} style={{marginLeft:'-50px',marginTop:'50px'}}>
                        <h2 className={"page-header"}>周报上传</h2>
                        <form onSubmit={this.submit1} >
                            <input type={"file"} name={"file"} style={{opacity:'0.5',width:'100%'}}/>
                            <input type="submit" value="上传周报"style={{opacity:'0.5',width:'100%'}}/>
                        </form>
                    </div>
                    <div className={"col-md-12"} style={{marginLeft:'-50px',marginTop:'50px'}}>
                        <Button type="primary" icon="plus" style={{float:'right',marginTop:'25px'}} onClick={this.downloadAllReport}>
                            打包下载
                        </Button>
                        <h2 className={"page-header"}>周报下载</h2>
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
export default withRouter(showProjectDetail);