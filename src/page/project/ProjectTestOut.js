import React from "react";
import PageTitle from "../../component/page-title/page-title";
import {Button, Table, Progress, Divider} from "antd";
import {Link} from "react-router-dom";
import MUtil from "../../util/tools";
import url from '../../util/url/index';
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import axios from "axios";
import qs from 'qs';

const _mm = new MUtil();
class ProjectTestOut extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data   : '',
            alltask:'',
            token  : _mm.getStorage("userInfo").token || ''
        }
    }

    componentDidMount() {
        this.loadProjectList();
        this.loadAimList();
    }

    loadProjectList(){
        axios({
            method:"post",
            url:url+"/user/getAllProject",
            data:qs.stringify({type:5}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    data : response.data.data
                });
            }
        }).catch(error => {
            console.log(error);
        })

    };

    loadAimList(){
        axios({
            method:"post",
            url:url+"/user/getAllTaskByType",
            data:qs.stringify({type:5}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                this.setState({
                    alltask:response.data.data.data,
                });
                console.log(this.state.alltask)
            }
        }).catch(error => {
            console.log(error);
        })

    };

    deleteThisProject(record){                      //删除项目
        console.log(record.id);
        axios({
            method:"post",
            url:url+"/user/deleteProject",
            data:qs.stringify({id:record.id}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "实验删除"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","实验删除"+response.data.msg,"warning");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    findProgress(pid){
        const d = Object.values(this.state.alltask);
        var a = 0;
        var f = 0;
        var i;
        var k;
        for(i=0;i<d.length;i++){
            if(d[i].pid === pid){
                a++;
            }
        }
        for(k=0;k<d.length;k++){
            if(d[k].pid === pid && d[k].isFinished === 1){
                f++;
            }
        }
        return (f/a)*100;
    };

    render() {

        const columns = [
            {
                title: '实验名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '实验负责人',
                dataIndex: 'manager',
                key: 'manager',
            },

            {
                title: '实验进度',
                key: 'Progress',
                dataIndex: 'Progress',
                render:
                    (text, record) => <Progress percent={Number(this.findProgress(record.id).toFixed(1))} size="small" status="active" />
                ,
            },
            {
                title: '查看详情',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Link to={{pathname:'/showDetail/'+record.id}}>查看详情</Link>
                        <Divider type="vertical" />
                        <a onClick={this.deleteThisProject.bind(this,record)}>删除实验</a>
                    </span>
                ),
            },
        ];


        const data = Object.values(this.state.data);
        const result = data.map(function(o,index) {
            o.key = index+1;
            return o;
        });

        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"外包实验"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
                    <Link to={'/AddItem'}>
                        <Button type="primary" icon="plus" style={{float:'right'}}>
                            AddNew
                        </Button>
                    </Link>
                    <div className={"col-md-10"}>
                        {this.props.children}
                        <Table columns={columns}
                               dataSource={result}
                               bordered
                               style={{marginTop:'40px'}}
                               pagination={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default ProjectTestOut;