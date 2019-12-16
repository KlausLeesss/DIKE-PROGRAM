import React from "react";
import PageTitle from "../../component/page-title/page-title";
import MUtil from "../../util/tools";
import axios from "axios";
import qs from "qs";
import { Card } from 'antd';
import {Link} from "react-router-dom";


const _mm   = new MUtil();
const gridStyle = {
    width: '100%',
    textAlign: 'center',
};

class PersonProject extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            data   : '',
            token  : _mm.getStorage("userInfo").token || ''
        }
    }



    componentDidMount() {
        this.loadPersonProject();
    }

    getUrlParam(){
        let queryString = this.props.location.pathname.split('/')[2] || '';
        return queryString;
    }

    loadPersonProject(){
        axios({
            method:"post",
            url:"/user/getProjectByUsername",
            data:qs.stringify({userName:this.getUrlParam()}),
            headers:{
                "Authorization":this.state.token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.code === 0){
                console.log(response);
                this.setState({
                    data:response.data.data,
                })
            }
        }).catch(error => {
            console.log(error);
        })

    };

    render() {
        const value = Object.values(this.state.data);
        const item = value.map((item,index) => {
            return <Card.Grid style={gridStyle} key={index+1}>
                <Link to={{pathname:'/showDetail/'+item.pid}}>{item.projectName}</Link>
            </Card.Grid>
        });

        return(
            <div id={"page-wrapper"}>
                <PageTitle title={"个人项目页面"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'70px'}}>
                    <div className={"col-md-12"} style={{marginLeft:'-50px'}}>
                        <Card title={this.getUrlParam()+'的项目'} headStyle={{backgroundColor:'#EDEDED',opacity:'0.5'}}>
                            {item}
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
export default PersonProject;