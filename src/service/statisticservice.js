import _mm from "../util/tools";

class Statistic {
    //首页数据统计
    getHomeCount(loginInfo){
        return  _mm.request({
            type: 'get',
            url: 'http://www.baidu.com',
            data: loginInfo
        });
    }
}

export default Statistic;