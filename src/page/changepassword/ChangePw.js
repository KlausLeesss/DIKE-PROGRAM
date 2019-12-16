import React from "react";
import PageTitle from "../../component/page-title/page-title";
import ChangeForm from "./PwChangeForm";

class ChangePw extends React.Component {


    render() {
        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"密码修改"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'150px'}}>
                    <div className={"col-md-12"}>
                        {this.props.children}
                        <ChangeForm/>
                    </div>
                </div>
            </div>
        );
    }
}


export default ChangePw;