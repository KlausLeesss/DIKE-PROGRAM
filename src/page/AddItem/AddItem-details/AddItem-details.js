import React from "react";
import PageTitle from "../../../component/page-title/page-title";
import MUtil from "../../../util/tools";
import ThePForm from "./PForm";
import TheAForm from "./AForm";

const _mm = new MUtil();

class AddItemDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token : _mm.getStorage('userInfo').token || ''
        }
    }

    componentDidMount() {
        console.log(this.getUrlParam("id"));
        console.log(this.getUrlParam("type"));
    }

    getUrlParam(name){
        let queryString = this.props.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? result[2] : null;
    }

    render() {
        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"新增详情管理"}/>
                <div className={"row"} style={{margin:'0 10%',marginTop:'20px'}}>
                    <ThePForm pid={this.getUrlParam("id")} type={this.getUrlParam("type")}/>
                    <TheAForm pid={this.getUrlParam("id")} type={this.getUrlParam("type")}/>
                </div>
            </div>
        );
    }
}


export default AddItemDetail;