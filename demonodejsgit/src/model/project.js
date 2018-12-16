const ObjectID = require('mongodb-core').BSON.ObjectID;
//项目分组模块
module.exports = class extends think.Mongo {
    //展示所有项目
    async showPro(){
        return this.model('projects').select();
    }
    //查看单个项目
    async showOnePro(_id){
        return this.model('projects').where({
            _id : new ObjectID(_id)
        }).find();
    }
    //提取单个项目中的member字段的值,后去users表内查询成员信息，最终找到人名
    async showProMemId(_id){
        return (
            this.model('projects').field({'_id':0,'member':1})//屏蔽项目的_id字段只查找member字段的内容，卡在这里是最后没有加select()
        .where({_id : new ObjectID(_id)}).select()
        )
    }
    //提取单个项目中的member字段_id,然后去users表查询成员姓名，返回所有数据，是否要只返回姓名等前台需求,是否能不用循环提取数据用$or？
    async showProMemName(user_id){//这里传的是users表的_id，showProMemIdToName接口会调用这里的方法，showProMemIdToName一个接口调用多个方法
        return this.model('users').where({
            _id : new ObjectID(user_id)
        }).find();
        //return this.model('users').where( {$or:[{_id : new ObjectID(user_id)}]} ).select();
    }
    //添加新项目
    async addPro(Pro){
        return this.model('projects').add(Pro);
    }
    //删除新项目
    async deletePro(_id){//传入项目对应的_id
        return this.model('projects').where({
            _id : new ObjectID(_id)
            })
            .delete();
    }
    //更新项目信息
    async updatePro(Pro){
        console.log(Pro);
        return this.model('projects').where({
            _id: new ObjectID(Pro._id)
          }).update({
            project_name : Pro.project_name,
            "detail": Pro.detail,
            //"member" : Pro.member,//添加或者删除另外做更新
            "res_person" : Pro.res_person,
            "res_person_tel" : Pro.res_person_tel,
            "progress" : Pro.progress,
            "start_time" : Pro.start_time,
            "end_time" : Pro.end_time,
          });
    }
    //项目添加新成员
    async addProMem(_id,user_id){//前台发送该项目的Pro_id,和要加入的成员user_id
        // console.log(_id);
        // console.log(user_id);
        return this.model('projects').where({
            _id: new ObjectID(_id)
          }).update({$addToSet:{member:user_id}});//$addToSet：向数组中添加元素，若数组本身含有该元素，则不添加，否则，添加，这样就避免了数组中的元素重复现象；
                                                  //$push：向数组尾部添加元素，但它不管数组中有没有该元素，都会添加。
    }
    //项目移除成员
    async deleteProMem(_id,user_id){
        // console.log(_id);
        // console.log(user_id);
        return this.model('projects').where({
            _id: new ObjectID(_id)
          }).update({$pull:{member:user_id}});//$pull  删除数组中的元素
    }
    //按照项目名字查询项目
    //{"grade_major":{$regex:str}}
    async searchProByName(project_name){
        // console.log("project_name",project_name);
        return this.model('projects').where({
            "project_name":{$regex:project_name}
        }).select();

    }








};