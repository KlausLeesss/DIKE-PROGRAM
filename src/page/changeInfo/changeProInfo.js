import React from "react";
import PageTitle from "../../component/page-title/page-title";
import ChangeProInfoForm from "./changeProInfoForm";


class ChangeProjectInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    getUrlParam(){
        let queryString = this.props.location.pathname.split('/')[2] || '';
        return queryString;
    }

    render() {
        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"信息修改"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
                    <ChangeProInfoForm pid={this.getUrlParam()}/>
                </div>
            </div>
        );
    }
}


export default ChangeProjectInfo;
