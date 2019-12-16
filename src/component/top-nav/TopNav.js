import React from "react";
import {Link,withRouter} from "react-router-dom";
import MUtil from "../../util/tools";
import User from "../../service/userservice";
import "../../util/ToolAlert/sweetalert-dev";
import "../../util/ToolAlert/sweetalert.css";
import {createHashHistory} from "history";
const _mm   = new MUtil();
const _user = new User();
const history = createHashHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});
class TopNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : _mm.getStorage('userInfo').username || ''
        }
    }

    //退出登录
    onLogout = () =>{
            _mm.removeStorage('userInfo');
        _mm.setStorage('loginFlag',false);

        swal({
                title: "成功提醒",
                text: "退出登录成功",
                type: "success",
                showCancelButton: false,
            },
            function (isConfirm) {
                history.push('/login');
            }
        );
};

    render() {
        return(
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}><b>DiKe</b>PROJECT</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle"  href="javascript:;" >
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>Welcome,{this.state.username}</span>
                                : <span>Welcome</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                            <li>
                                <Link to={'/changePw'}>
                                    <i className="fa fa-cog"></i>
                                    <span>修改密码</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withRouter(TopNav);