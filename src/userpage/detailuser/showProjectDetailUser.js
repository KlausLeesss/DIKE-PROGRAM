import React from "react";
import PageTitle from "../../component/page-title/page-title";
import MUtil from "../../util/tools";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import {Collapse, Button, Icon, Descriptions, Select, Table, Modal, Input, Form, Divider,Alert} from 'antd';
import axios from "axios";
import qs from "qs";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {createHashHistory} from "history";
const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});
const { Panel } = Collapse;
const _mm   = new MUtil();
const { Option } = Select;

class ProjectDetailUser extends React.Component{

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
        console.log(this.DateDiff(this.state.date,"2019-12-4"));

    }


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


    getUrlParam(){
        let queryString = this.props.location.pathname.split('/')[2] || '';
        return queryString;
    }

    loadOneProject(){
        axios({
            method:"post",
            url:"/user/getOneProject",
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
            url:"/user/getAllMember",
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
            url:"/user/getAllTask",
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
            url:"/admin/getAllReport",
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
            url:"/admin/uploadEvidence",
            data:formData,
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/multipart/form-data'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "周报上传"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","周报上传"+response.data.msg,"warning");
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
            url:"/user/uploadProjectReport",
            data:formData,
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/multipart/form-data'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "周报上传"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","周报上传"+response.data.msg,"warning");
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
            url:"/user/updateProject",
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
                        <h2 className={"page-header"}>项目详情</h2>
                        <Descriptions  layout="vertical" bordered>
                            <Descriptions.Item label="项目名称">{this.state.data.name}</Descriptions.Item>
                            <Descriptions.Item label="项目类别">{this.state.data.type === 1?"横向项目":(this.state.data.type === 2 ? "纵向项目":(this.state.data.type === 0?"实验":(this.state.data.type === 3?"专利":"文章")))}</Descriptions.Item>
                            <Descriptions.Item label="项目负责人">{this.state.data.manager}</Descriptions.Item>
                            <Descriptions.Item label="项目开始时间">{this.state.data.startTime}</Descriptions.Item>
                            <Descriptions.Item label="项目结束时间">{this.state.data.endTime}</Descriptions.Item>
                            <Descriptions.Item label="支付渠道">
                                        {this.state.data.selfChoice===1?"个人":(this.state.data.selfChoice===2?"学校":(this.state.data.selfChoice===3?"公司":"暂无"))}&nbsp;{this.state.data.payChannel===1?"现金":(this.state.data.payChannel===2?"银行卡":(this.state.data.payChannel===3?"微信":"暂无"))}
                            </Descriptions.Item>
                            <Descriptions.Item label="支付状态">{this.state.data.isPaid}</Descriptions.Item>
                            <Descriptions.Item label="支付凭证">{this.state.data.payWarrant === null ?
                                "暂无"
                                :
                                <Button onClick={this.checkPic}>查看凭证</Button>}
                            </Descriptions.Item>
                            <Descriptions.Item label="支付凭证">{this.state.data.envidence === null ?
                                "暂无"
                                :
                                <Button onClick={this.checkEnvPic}>查看合同</Button>}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className={"col-md-12"} style={{marginTop:'30px',marginLeft:'-50px'}}>
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
                        </div>
                    </div>
                    <div className={"col-md-12"} style={{marginTop:'30px',marginLeft:'-50px'}}>
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
                        </div>
                    </div>
                    <div className={"col-md-12"} style={{marginLeft:'-50px',marginTop:'50px'}}>
                        <h2 className={"page-header"}>周报上传</h2>
                        <form onSubmit={this.submit1} >
                            <input type={"file"} name={"file"} style={{opacity:'0.5',width:'100%'}}/>
                            <input type="submit" value="上传周报"style={{opacity:'0.5',width:'100%'}}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(ProjectDetailUser);