const Base = require('./base.js');

//home主页接口实现
module.exports = class extends Base {
    async labMemberCountAction(){
        let data = await this.mongo('home').labMemberCount(this.get('labname'));
        console.log(data);
        if (think.isEmpty(data)) {
            return this.success({code: 502, message: '查询实验室人数失败'});
            } else {
            return this.success(data,{code: 500, message: '查询实验室人数成功'});
            }
    }

};