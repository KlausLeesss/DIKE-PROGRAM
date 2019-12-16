import React from "react";
import PageTitle from "../../component/page-title/page-title";
import DetailForm from "./AddDetailForm";


class AddItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }



    render() {
        return (
            <div id={"page-wrapper"}>
                <PageTitle title={"新增管理"}/>
                <div className={"row"} style={{margin:'0 10%',marginRight:'50px',marginTop:'20px'}}>
                    <DetailForm/>
                </div>
            </div>
        );
    }
}


export default AddItem;