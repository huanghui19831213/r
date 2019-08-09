require('es6-promise').polyfill();
require('isomorphic-fetch');

import { message } from 'antd';
import {createHashHistory} from 'history';
const history = createHashHistory();
const ajax = function (url,params,type) {
  return new Promise(function (resolve) {
    var _type = type||'json'
    if(type){
      var str=""
      for(var prop in params.body){
        str+=prop+ "=" + params.body[prop] +"&"
      }
      str = str.substring(0, str.length-1)
    }
      fetch(url,{
        method:params.methods||'GET',
        headers : {
          'Accept': 'application/json',
          'Content-Type':_type=='json'?'application/json':'application/x-www-form-urlencoded; charset=UTF-8'
        }, 
        body:_type=='json'?JSON.stringify(params.body):str,
        cache : 'default', // 是否缓存这个请求
        credentials : 'include', //要不要携带 cookie 默认不携带 omit、same-origin 或者 include
      }).then((e)=>{
        console.log(e)
        if (e.status >= 400) {
          message.error("服务器错误");
        }
        return e.json();
      })
      .then((e) => {
        if(e.code==500){
          message.error(e.msg);
        }else if(e.code==4401){
          localStorage.clear();
          history.push('/login');
          message.error(e.msg);
        }else{
          resolve(e);
        }
      });
    })
}

export default ajax;