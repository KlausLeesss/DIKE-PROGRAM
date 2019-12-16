import MUtil from "../util/tools";

const _mm   = new MUtil();


class User {
    //用户登录
    login(loginInfo){
        return  _mm.request({
            type: 'post',
            url: 'http://10.20.0.62:8087/anon/login',
            data: loginInfo
        });
    }

    changePW(values){
        return  _mm.request({
            type: 'post',
            url: 'http://192.168.1.215:8082/user/updatePw',
            data: values
        });
    }

    //检查登录接口数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        //判断用户名合法性
        if(typeof username != 'string' || username.length ===0){
            return{
                status : false,
                msg    : "用户名不能为空！"
            }
        }
        //判断密码合法性
        if(typeof password != 'string' || password.length ===0){
            return{
                status : false,
                msg    : "密码不能为空！"
            }
        }
        return {
            status  : true,
            msg     : "验证通过！"
        }
    }
}

export default User;