import React from "react";
import {Link, withRouter} from "react-router-dom";
import PageTitle from "../../component/page-title/page-title";
import "./Home.css"
import MUtil from "../../util/tools";
import Statistic from "../../service/statisticservice";
import {createHashHistory} from "history";

const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});
const _mm   = new MUtil();
const _statistic = new Statistic();

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            role:_mm.getStorage("userInfo").role || ''
        };
    }


    render() {
        let loginFlag = _mm.getStorage('loginFlag');
        if (loginFlag) {
            return (
                <div id={"page-wrapper"}>
                    <PageTitle title={"首页"}/>
                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <Link to={this.state.role === 1 ? "/user" : "/changePw"} className={"color-box brown"}>
                                <p className={"count"}><i className={"fa fa-user-o"}></i></p>
                                <p className={"desc"}>
                                    <span>用户管理</span>
                                </p>
                            </Link>
                        </div>
                        <div className={"col-md-4"}>
                            <Link to={this.state.role === 1 ? "/knowledge" : "/knowledge-user"}
                                  className={"color-box green"}>
                                <p className={"count"}><i className={"fa fa-book"}></i></p>
                                <p className={"desc"}>
                                    <span>文章管理</span>
                                </p>
                            </Link>
                        </div>
                        <div className={"col-md-4"}>
                            <Link to={this.state.role === 1 ? "/project" : "/project-user"}
                                  className={"color-box blue"}>
                                <p className={"count"}><i className={"fa fa-bar-chart-o"}></i></p>
                                <p className={"desc"}>
                                    <span>项目管理</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <br/>
                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <Link to={this.state.role === 1 ? "/equipment" : "/equipment-user"}
                                  className={"color-box brown"}>
                                <p className={"count"}><i className={"fa fa-desktop"}></i></p>
                                <p className={"desc"}>
                                    <span>设备管理</span>
                                </p>
                            </Link>
                        </div>
                        <div className={"col-md-4"}>
                            <Link to={this.state.role === 1 ? "/knowledge-patent" : "/knowledge-patent-user"}
                                  className={"color-box green"}>
                                <p className={"count"}><i className={"fa fa-bookmark-o"}></i></p>
                                <p className={"desc"}>
                                    <span>专利管理</span>
                                </p>
                            </Link>
                        </div>
                        <div className={"col-md-4"}>
                            <Link to={this.state.role === 1 ? "/project-test" : "/project-test-user"}
                                  className={"color-box blue"}>
                                <p className={"count"}><i className={"fa fa-laptop"}></i></p>
                                <p className={"desc"}>
                                    <span>实验管理</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            createHashHistory().push("/login");
            window.location.reload();
        }
    }
}

export default withRouter(Home);