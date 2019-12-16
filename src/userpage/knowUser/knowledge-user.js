import React from "react";
import PageTitle from "../../component/page-title/page-title";
import {Button, Table, Progress} from "antd";
import {Link} from "react-router-dom";
import MUtil from "../../util/tools";
import axios from "axios";
import qs from 'qs';

const _mm = new MUtil();
class KnowledgeUser extends React.Component {

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
            url:"/user/getAllProject",
            data:qs.stringify({type:4}),
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
            url:"/user/getAllTaskByType",
            data:qs.stringify({type:4}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    alltask:response.data.data.data,
                });
                console.log(this.state.alltask)
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
                title: '文章名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '文章负责人',
                dataIndex: 'manager',
                key: 'manager',
            },

            {
                title: '文章进度',
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
                        <Link to={{pathname:'/showDetailUser/'+record.id}}>查看详情</Link>
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
                <PageTitle title={"文章管理"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
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


export default KnowledgeUser;