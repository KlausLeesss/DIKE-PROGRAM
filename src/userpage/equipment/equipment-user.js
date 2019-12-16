import React from "react";
import PageTitle from "../../component/page-title/page-title";
import {Button, Table, Progress, Modal, Divider} from "antd";
import {Link} from "react-router-dom";
import MUtil from "../../util/tools";
import axios from "axios";


const _mm = new MUtil();
class EquipmentUser extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data   : '',
            visible: false,
            token  : _mm.getStorage("userInfo").token || ''
        }
    }

    componentDidMount() {
        this.loadEquipmentList();
    }

    loadEquipmentList(){
        axios({
            method:"get",
            url:"/user/getAllEquipment",
            headers:{
                "Authorization":this.state.token,
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    data : response.data.data.data
                });
            }
        }).catch(error => {
            console.log(error);
        })

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

    render() {

        const columns = [
            {
                title: '设备名称',
                dataIndex: 'eName',
                key: 'eName',
                render: text => <b>{text}</b>,
            },
            {
                title: '设备负责人',
                dataIndex: 'eManager',
                key: 'eManager',
                render: text => <b>{text}</b>,
            },
            {
                title: '设备价值',
                dataIndex: 'ePrice',
                key: 'ePrice',
                render: text => <b>{text}</b>,
            },
            {
                title: '设备状态',
                dataIndex: 'eState',
                key: 'eState',
                render: text => <b>{text === 0 ? "正常运行" : (text === 1 ? "损坏" : "维修中")}</b>,
            },
            {
                title: '购买人',
                dataIndex: 'purchaser',
                key: 'purchaser',
                render: text => <b>{text}</b>,
            },
        ];


        const data = Object.values(this.state.data);
        const result = data.map(function(o,index) {
            o.key = index+1;
            o.Progress = 75;
            return o;
        });

        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"设备管理"}/>
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


export default EquipmentUser;