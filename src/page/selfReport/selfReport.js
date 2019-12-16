import React from "react";
import PageTitle from "../../component/page-title/page-title";
import MUtil from "../../util/tools";
import axios from "axios";
import {Button, Divider, Input, Table} from "antd";
import qs from "qs";
import {Link} from "react-router-dom";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import url from '../../util/url/index';

const _mm = new MUtil();

class SelfReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token  : _mm.getStorage("userInfo").token || '',
            username  : _mm.getStorage("userInfo").username,
            data    : '',
            selfreport:''
        }
    }

    componentDidMount() {
        this.getAllSelfReport();
        this.getSelfAllReport();
    }

    getAllSelfReport = () => {
        axios({
            method:"get",
            url:url+"/admin/getAllSelfReport",
            headers:{
                "Authorization":this.state.token,
            }
        }).then(response => {
                if(response.data.code === 0){
                    this.setState({
                        data : response.data.data
                    })
                }
        }).catch(error => {
                console.log(error);
        })
    };

    getSelfAllReport = () => {
        axios({
            method:"post",
            url:url+"/user/getSelfAllReport",
            data:qs.stringify({userName:this.state.username}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log(response);
            this.setState({
                selfreport:response.data.data
            })
        }).catch(error => {
            console.log(error);
        })
    };


    submit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('userName',this.state.username);
        axios({
            method:"post",
            url:url+"/user/uploadPersonalReport",
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

    clickFile = () =>{
        document.getElementById("file").click();
    };

    clickBtn = () =>{
        document.getElementById("Btn").click();
    };

    fileChange = () =>{
        console.log(document.getElementById("file").files[0].name);
        document.getElementById("textfield").value = document.getElementById("file").files[0].name;
    };

    deleteReport = (record) => {
        axios({
            method:"post",
            url:url+"/user/deleteSelfReport",
            data:qs.stringify({id:record.id}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "删除周报"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","删除周报"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })

    };

    downloadReport = (record) =>{
        axios({
            method: 'post',
            url:url+'/admin/downloadSelfReport',
            responseType: 'blob',
            data: qs.stringify({
                fileName : record.reportName,
            }),
            headers: {
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded',
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

    downloadAllSelfReport = () =>{
        axios({
            method:"post",
            responseType: 'blob',
            url:url+"/admin/downloadAllSelfReport",
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
        const resule = Object.values(this.state.data);
        const rdata = resule.map(function(o,index) {
            o.key = index+1;
            return o;
        });

        const columns1 = [
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
                    <span>
                    <Button onClick={this.downloadReport.bind(this,record)}>下载周报</Button>
                    <Divider type="vertical" />
                    <Button  type={"danger"} onClick={this.deleteReport.bind(this,record)}>删除周报</Button>
                    </span>
                ),
                width:300
            },
        ];
        const sresule = Object.values(this.state.selfreport);
        const srdata = sresule.map(function(o,index) {
            o.key = index+1;
            return o;
        });

        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"个人周报"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
                    <div className={"col-md-12"} style={{marginLeft:'-50px',marginTop:'50px'}}>
                        <h2 className={"page-header"}>周报上传</h2>
                        <form onSubmit={this.submit} >
                            <Input type={"text"} id={"textfield"}></Input>
                            <br/>
                            <input id={"file"} type={"file"} name={"file"} style={{opacity:'0.5',width:'100%',display:'none'}} onChange={this.fileChange}/>
                            <Button onClick={this.clickFile} >选择文件</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <input id={"Btn"} type="submit" value="上传周报" style={{opacity:'0.5',width:'100%',display:'none'}}/>
                            <Button onClick={this.clickBtn}>上传周报</Button>
                        </form>
                    </div>
                    <div className={"col-md-12"} style={{marginLeft:'-50px',marginTop:'50px'}}>
                        <Button type="primary" icon="plus" style={{float:'right',marginTop:'25px'}} onClick={this.downloadAllSelfReport}>
                            打包下载
                        </Button>
                        <h2 className={"page-header"}>个人周报</h2>
                        <Table
                            columns={columns1}
                            dataSource={srdata}
                            pagination={false}
                            bordered={true}
                            scroll={{y:325}}
                            style={{marginTop:'20px'}}
                        />
                    </div>
                    <div className={"col-md-12"} style={{marginLeft:'-50px',marginTop:'50px'}}>
                        <Button type="primary" icon="plus" style={{float:'right',marginTop:'25px'}} onClick={this.downloadAllSelfReport}>
                            打包下载
                        </Button>
                        <h2 className={"page-header"}>周报下载</h2>
                        <Table
                            columns={columns}
                            dataSource={rdata}
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


export default SelfReport;