import React from "react";
import TopNav from '../top-nav/TopNav';
import SideNav from '../side-nav/SideNav';
import "./theme.css"

class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div id={"wrapper"}>

                <TopNav/>
                <SideNav/>

                {this.props.children}
            </div>
        );
    }
}

export default Layout;