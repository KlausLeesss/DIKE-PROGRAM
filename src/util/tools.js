class MUtil{

    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type     : param.type     || 'get',
                url      : param.url      || ' ',
                dataType : param.dataType || 'json',
                data     : param.data     || null,
                success  : res => {
                    //数据请求成功
                    if(0 === res.code){
                        typeof resolve === 'function' && resolve(res.data,res.msg);
                    }

                    else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error   : err =>{
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });

    }
    //获取Url参数
    getUrlParam(name){
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? result[2] : null;
    }
    //错误提示
    errorTips(errMsg){
        alert(errMsg || "");
    }
    //用户名存储
    setStorage(name,data){
        let dataType = typeof data;
        if(dataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }
        else if(['number','string','boolean'].indexOf(dataType)){
            window.localStorage.setItem(name,data);
        }
        else{
            alert('该类型不能用于本地存储！');
        }
    }
    //提取本地存储
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else return '';
    }
    //删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }

}
export default MUtil;