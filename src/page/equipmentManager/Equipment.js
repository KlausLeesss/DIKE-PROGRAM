import React from "react";
import PageTitle from "../../component/page-title/page-title";
import {Button, Table, Progress, Modal, Divider} from "antd";
import {Link} from "react-router-dom";
import MUtil from "../../util/tools";
import url from "../../util/url/index"
import axios from "axios";
import ChangeEForm from "./changeEForm";
import qs from "qs";

const _mm = new MUtil();
class Equipment extends React.Component {

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
            url:url+"/user/getAllEquipment",
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

    showModal = (record) => {
        console.log(record.key-1)
        this.setState({
            visible: true,
            id:record.id,
            en:record.eName,
            em:record.eManager,
            es:record.eState,
            ep:record.ePrice,
            pu:record.purchaser
        });
    };

    deleteEquipment = (record) => {
        axios({
            method:"post",
            url:url+"/admin/deleteEquipment",
            data:qs.stringify({id:record.id}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                swal({
                        title: "成功提醒",
                        text: "设备删除"+response.data.msg,
                        type: "success",
                        showCancelButton: false,
                    },
                    function (isConfirm) {
                        window.location.reload();
                    }
                );
            }
            else {
                swal("错误提醒","设备删除"+response.data.msg,"warning");
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
                //render: text => <b>{text}</b>,
            },
            {
                title: '设备负责人',
                dataIndex: 'eManager',
                key: 'eManager',
                //render: text => <b>{text}</b>,
            },
            {
                title: '设备价值',
                dataIndex: 'ePrice',
                key: 'ePrice',
                //render: text => <b>{text}</b>,
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
                //render: text => <b>{text}</b>,
            },
            {
                title: '具体操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type={"primary"} onClick={this.showModal.bind(this,record)}>修改</Button>
                        <Modal
                            title={"修改设备信息"}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <ChangeEForm id={this.state.id} eName={this.state.en} ePrice={this.state.ep} eState={this.state.es} purchaser={this.state.pu} eManager={this.state.em}/>
                        </Modal>
                        <Divider type="vertical" />
                        <Button type={"danger"} onClick={this.deleteEquipment.bind(this,record)}>删除</Button>
                    </span>
                ),
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
                    <Link to={'/AddEquipment'}>
                        <Button type="primary" icon="plus" style={{float:'right'}}>
                            AddEquipment
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


export default Equipment;