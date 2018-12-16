const ObjectID = require('mongodb-core').BSON.ObjectID;//引入.BSON.ObjectID是为了转换_id数据格式，需要转换为JSON格式的数据
module.exports = class extends think.Mongo {
     
  //添加技术分组
      async addTechnology(technology){
        return this.model('technologies').add(technology);
      }
// 展示技术分组
      async showTechnology() {
        return this.model('technologies').select();
      }
// 删除技术分组
      async deleteTechnology(_id){
        return this.model('technologies').where({_id:new ObjectID(_id)}).delete();
      }





// 查询某个技术组并且只获取技术组成员ID字段
      async showTecPerId(_id){
        return (this.model('technologies').field({'_id':0,'personnel':1})
        .where({_id:new ObjectID(_id)})
        .select())
      }

      async showPerName(){
        return this.model('users').select();
      }



// 在实验室人员表中查找人员
      async showTecPerName(user_id){
        return this.model('users').where({_id:new ObjectID(user_id)}).select();
      }
      // 把查找的人员表中的人员id添加到指定技术组成员数组中
      async addTecPer(_id,user_id){
        return this.model('technologies').where({_id:new ObjectID(_id)})
        .update( { $addToSet: { personnel: user_id } });
      }

// 删除某个技术组中的某个成员
      async deleteTecPer(_id,user_id){
        return this.model('technologies').where({_id:new ObjectID(_id)})
        .update({ $pull: { personnel: user_id } });
      }
    


    async selectTechnology(_id){
      return this.model('technologies')
      .where({_id:new ObjectID(_id)})
      .select()
    }
    async updateTechnology(technologies){
      return this.model('technologies').where({_id:new ObjectID(technologies._id)})
      .update({
        "name":technologies.name,
        "describe":technologies.describe
      })
    }
  }