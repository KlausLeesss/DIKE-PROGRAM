import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./page/home/Home";
import Login from "./page/login/login";
import Layout from "./component/layout";
import Project from "./page/project/Project";
import AddItem from "./page/AddItem/AddItem";
import AccountManager from "./page/accountManager/accountManager";
import showProjectDetail from "./page/showDetail/showProjectDetail";
import Equipment from "./page/equipmentManager/Equipment";
import {HashRouter,Switch,Link,Route,Redirect} from "react-router-dom";
import ChangePw from "./page/changepassword/ChangePw";
import AddItemDetail from "./page/AddItem/AddItem-details/AddItem-details";
import ProjectLength from "./page/project/ProjectLength";
import ProjectTest from "./page/project/ProjectTest";
import MUtil from "./util/tools";
import PersonProject from "./page/showOnePersonProject/showOnePersonProject";
import ChangeProjectInfo from "./page/changeInfo/changeProInfo.js"
import AddEquipment from "./page/equipmentManager/AddEquipment";
import Log from "./page/login/log";
import SelfReport from "./page/selfReport/selfReport";
import ProjectUser from "./userpage/prouser/project-user";
import ProjectDetailUser from "./userpage/detailuser/showProjectDetailUser"
import ProjectLengthUser from "./userpage/prouser/project-length-user";
import ProjectTestUser from "./userpage/prouser/project-test-user";
import EquipmentUser from "./userpage/equipment/equipment-user";
import SelfReportUser from "./userpage/selfReportUser/selfReportUser";
import Knowledge from "./page/knowledge/knowledge";
import KnowledgePatent from "./page/knowledge/knowledge-patent";
import KnowledgeUser from "./userpage/knowUser/knowledge-user";
import KnowledgePatentUser from "./userpage/knowUser/knowledge-patent-user";
import PersonProjectUser from "./userpage/selfReportUser/personProjectUser";
import ProjectTestOut from "./page/project/ProjectTestOut";
import ProjectTestOther from "./page/project/ProjectTestOther";
import ProjectTestOutUser from "./userpage/prouser/project-test-out-user";
import ProjectTestOtherUser from "./userpage/prouser/project-test-other-user";

const _mm = new MUtil();


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            role : _mm.getStorage("userInfo").role
        }
    }

    render() {
        
        return(
            <HashRouter>
                <Switch>
                    <Route path={"/login"} component={Log}/>
                    <Route path={"/"} render={(props) => (
                        <Layout>
                            <Switch>
                                <Route  path={"/home"} component={Home}/>
                                <Route  path={"/project-length"} component={ProjectLength}/>
                                <Route  path={"/project-length-user"} component={ProjectLengthUser}/>
                                <Route  path={"/project-test"} component={ProjectTest}/>
                                <Route  path={"/project-test-out"} component={ProjectTestOut}/>
                                <Route  path={"/project-test-out-user"} component={ProjectTestOutUser}/>
                                <Route  path={"/project-test-other"} component={ProjectTestOther}/>
                                <Route  path={"/project-test-other-user"} component={ProjectTestOtherUser}/>
                                <Route  path={"/project-test-user"} component={ProjectTestUser}/>
                                <Route  path={"/project"} component={Project}/>
                                <Route  path={"/knowledge"} component={Knowledge}/>
                                <Route  path={"/knowledge-user"} component={KnowledgeUser}/>
                                <Route  path={"/knowledge-patent"} component={KnowledgePatent}/>
                                <Route  path={"/knowledge-patent-user"} component={KnowledgePatentUser}/>
                                <Route  path={"/personProjectUser"} component={PersonProjectUser}/>
                                <Route  path={"/project-user"} component={ProjectUser}/>
                                <Route  path={"/AddItem"} component={AddItem}/>
                                <Route  path={"/user"} component={AccountManager}/>
                                <Route  path={'/equipment'} component={Equipment}/>
                                <Route  path={'/equipment-user'} component={EquipmentUser}/>
                                <Route  path={"/changePw"} component={ChangePw}/>
                                <Route  path={"/showDetail/:id"} component={showProjectDetail}/>
                                <Route  path={"/showDetailUser/:id"} component={ProjectDetailUser}/>
                                <Route  path={"/AddItem-details"} component={AddItemDetail}/>
                                <Route  path={"/ChangeProInfo/:id"} component={ChangeProjectInfo}/>
                                <Route  path={"/personProject/:username"} component={PersonProject}/>
                                <Route  path={"/AddEquipment"} component={AddEquipment}/>
                                <Route  path={"/selfReport"} component={SelfReport}/>
                                <Route  path={"/selfReport-user"} component={SelfReportUser}/>
                                <Redirect to="/home" />
                            </Switch>
                        </Layout>
                    )}/>
                    <Redirect to={'/login'} />
                </Switch>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
