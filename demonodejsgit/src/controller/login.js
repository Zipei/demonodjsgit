const Base = require('./base.js');
const jwt = require('jsonwebtoken');

module.exports = class extends Base {
    //普通用户登录接口
    async userLoginAction(){
        let user = await this.mongo('login').userLogin(this.post('qq'),this.post('password'));//告诉传入data中的tel和password字段的值      
        if (think.isEmpty(user)) {//判断是否查询对应的数据，如果有就登录成功，没有就失败
            return this.success({code: 502, message:'用户名或者密码错误，请重新填写'});
          } else {//设置token
            let payload = {qqaccount: user.qq, identity:user.identity ,password: user.password};
            console.log(payload);
            let token = jwt.sign(payload, 'secret', {expiresIn: '3h'});
            // 将token和用户id存入redis，并设置过期时间,还没写，卡在这里滞留不前了
            
            console.log(token);
            console.log(user);
            return this.success(token,{code: 500, message: '登录成功'});
          }
    }
    //管理员登录接口
    // async adminLoginAction(){
    //     const data = await this.mongo('login').adminLogin(this.post('adminname'),this.post('password'));//告诉传入data中的tel和password字段的值
    //     console.log(data);
    //     if (think.isEmpty(data)) {//判断是否查询对应的数据，如果有就登录成功，没有就失败
    //         return this.success({code: 502, message:'用户名或者密码错误，请重新填写'});
    //       } else {
    //         return this.success({code: 500, message: '登录成功'});
    //       }
    // }


};