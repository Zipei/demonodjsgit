const Base = require('./base.js');
//项目分组接口实现
module.exports = class extends Base {
    //展示所有项目接口
    async showProAction(){
        let data = await this.mongo('project').showPro();  
        return this.success(data);
    }
    //展示单个项目信息，前台需要传_id
    async showOneProAction(){
        const data = await this.mongo('project').showOnePro(this.post('_id'));//这里前端传来的必须是{"_id":}如果写成pro_id那么是{"pro_id":}
        if (think.isEmpty(data)) {
            return this.success({code: 502, message:'展示该项目错误，请重新填写'});
        } 
        else {
            return this.success(data,{code: 500, message: '展示该项目成功'});
        }
    }
    //提取单个项目中的member字段的值,后去users表内查询成员信息，最终找到人名的接口
    async showProMemIdToNameAction(){//
        const dataId = await this.mongo('project').showProMemId(this.post('_id'));//找成员_id方法
        /**取出来的data是这种形式
         * [ { member:
                [ '5bfdfd024c80e0888acd1b18',
                '5bfcdeec6dab4417e8332ce6',
                '5c00d068053eda187456a815',
                '5bfbbae671a9ee79b6b28ef5' ] } ]
        */
        // console.log("dataId[0].member[0]:",dataId[0].member[0]);//取出各条id
        // console.log("dataId[0].member[1]:",dataId[0].member[1]);//取出各条id
        let j = dataId[0].member.length;//取出数组member下的数据条数，即成员的数目
        let dataName=[];//定义一个数组用来存放循环查询到的数据，是否能不用循环提取数据用$or?
        for(let i=0;i<j;i++){
            let arr = dataId[0].member[i];
            let res = await this.mongo('project').showProMemName(arr);//通过成员_id找名字的方法
            dataName.push(res);
        }
        // if (think.isEmpty(dataName)) {
        //     return this.success({code: 502, message:'提取成员姓名失败'});
        //   } 
        //   else {
        //     return this.success(dataName,{code: 500, message: '提取成员姓名失败成功'});
        //   }
        return this.success(dataName);
    }

    //添加新项目接口
    async addProAction() {
        const data = await this.mongo('project').addPro(this.post());
        if (think.isEmpty(data)) {
          return this.success({code: 502, message:'添加项目错误，请重新填写'});
        } 
        else {
          return this.success({code: 500, message: '添加项目成功'});
        }
      }
    //删除新项目接口
    async deleteProAction() {
        const data = await this.mongo('project').deletePro(this.post('_id'));
        if (think.isEmpty(data)) {
            return this.success({code: 502, message: '删除项目失败，请重新填写'});
        } 
        else {
            return this.success({code: 500, message: '删除项目成功'});
        }
    }
    //更新项目接口
    async updateProAction(){
        const data = await this.mongo('project').updatePro(this.post());
        if (think.isEmpty(data)) {
            return this.success({code: 502, message: '项目更新失败，完蛋'})
        } 
        else {
            return this.success({code: 500, message: '项目更新成功，恭喜'});
        }
    }
    //项目添加新成员接口
    async addProMemAction(){
        let data = await this.mongo('project').addProMem(this.post('_id'),this.post('user_id'));
        // console.log(data);
        if (think.isEmpty(data)) {
            return this.success({code: 502, message: '项目添加成员失败'})
        } 
        else {
            return this.success({code: 500, message: '项目添加成员成功'}); 
        }
          
    }
    //项目删除成员接口
    async deleteProMemAction(){
        let data = await this.mongo('project').deleteProMem(this.post('_id'),this.post('user_id'));
        // console.log(data);
        if (think.isEmpty(data)) {
            return this.success({code: 502, message: '项目移除成员失败'})
        } 
        else {
            return this.success({code: 500, message: '项目移除成员成功'}); 
        }
    }
    //按照项目名字查询项目信息
    async searchProByNameAction(){
        let data = await this.mongo('project').searchProByName(this.get('project_name'));
        if (think.isEmpty(data)) {
            return this.success({code: 502, message: '搜索项目信息失败'})
        } 
        else {
            return this.success(data,{code: 500, message: '搜索项目信息成功'}); 
        }
    }




};
