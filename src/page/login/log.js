import React from 'react'
import LoginForm from "./login";

import { Icon} from 'antd'

import './log.less'
import bg from './login_center_bg.5307896.png'

const Log = () =>{
    return(
        <div>
            <div id='log'>
                <img className='bk' src={bg} alt='' />
                <div className='log-from'>
                    <div className='bk-style'></div>
                    <Icon type="poweroff" className={"mail"}/>
                    <h3 className='title'> DIKE-Program</h3>
                    <LoginForm  style={{width:'200px;'}}/>
                </div>     
            </div>
        </div>
    )
}

export default Log