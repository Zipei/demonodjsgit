const ObjectID = require('mongodb-core').BSON.ObjectID;
module.exports = class extends think.Mongo {
   /*  async getInfo(username) {
        return this.where({
            username:'wuzipei'
            //   _id: new ObjectID(username)
        })
          .find();
      } */
      //添加用户，添加完成后userid自增长1
      // updateViewNums(id){
      //   return this.where({id: id}).increment('view_nums', 1); //将阅读数加 1
      // }

      //设置自增长函数
      async updateViewNums(userid){
        return this.where({userid: userid}).increment('userid', 1); //将userid字段数加 1
      }

      async adduser(username, usersource, sex, grade_major, qq, tel,state) {
        return this.model('users').add({"username": username, "usersource": usersource, "sex": sex, "grade_major":grade_major, "qq":qq, "tel":tel, "state":state});
      }

      // 查看所有用户,find()只是查询单条数据，这里要用select()
      async showuser() {
        return this.model('users').select();
      }

      // 删除用户按照姓名删除,按照自增长的ID删除——暂未实现
      async deleteuser(username) {
        return this.model('users').where({"username": username}).delete();
      }
      // 根据用户姓名更改信息，按照自增长的ID删除
      async updateuser(userid,username, usersource, sex, grade_major, qq, tel,state) {
        return this.model('users').where({"userid": userid}).update({"username" : username ,"usersource": usersource, "sex": sex, "grade_major":grade_major, "qq":qq, "tel":tel, "state":state});
      }
};
