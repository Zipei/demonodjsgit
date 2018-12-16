

module.exports = class extends think.Mongo {
    //普通用户登录，手机号密码登录，考虑MD5加密，MD5加密暂未实现，因为测试用的数据库里面没有转换MD5
    async userLogin(qq,password){
        const pwd = think.md5(password);
        return this.model('users').where({"qq":qq,"password":pwd}).find();
    }
    //管理员登录，管理员姓名密码登录，考虑MD5加密，MD5加密用的网上算好后的加密密码存入数据库
    //注册接口需要把前台传来的明文密码加密后存入数据库
    // async adminLogin(adminname,password){
    //     // console.log(password);
    //     const pw = think.md5(password);//解析前台传到这里的明文密码，将其转换为MD5加密后的格式
    //     // console.log(pw);
    //     return this.model('admins').where({"adminname":adminname,"password":pw}).find();
    // }
};