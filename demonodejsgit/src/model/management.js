const ObjectID = require('mongodb-core').BSON.ObjectID;//引入.BSON.ObjectID是为了转换_id数据格式，需要转换为JSON格式的数据
//management普通人员和管理员增删改查方法
module.exports = class extends think.Mongo {
  //添加新用户,这里是注册用
  async addUser(user){
    user.password = think.md5(user.password);//md5加密
    return this.model('users').add(user);
  }
  //查看所有普通用户,find()只是查询单条数据，这里要用select()
  async showUser() {
    return this.model('users').where({identity:"member"}).select();
  }
  //删除用户，按照mongo中唯一的_id字段进行删除
  async deleteUser(_id){ //传参如果是user._id是否可行呢？
    return this.model('users').where({
      _id : new ObjectID(_id)
      })
      .delete();
  }
  //展示详细信息和更新编辑，前台给我_id，查询后返回前台数据进行个人详细信息的展示后可选择更新编辑
  async showEditUser(_id){
    return this.model('users').where({
      _id : new ObjectID(_id)
      })
      .find();
  }
  //更新用户信息，按照mongo中唯一的_id字段进行更新，MD5加密暂未实现
  async updateUser(user) {
    //user.password = think.md5(user.password);//md5加密
    return this.model('users').where({
      _id: new ObjectID(user._id)
    }).update({
      "username" : user.username,
      "usersource": user.usersource,
      "sex" : user.sex,
      "grade_major" : user.grade_major,
      "qq" : user.qq,
      "tel" : user.tel,
      "state" : user.state,
      "dormitory" : user.dormitory,
      "lab" : user.lab,
      "pcname" : user.pcname,
      "join_data" : user.join_data,
      "quit_data" : user.quit_data,
      "gradute_destination" : user.gradute_destination,
      "group" : user.group
    });
  }
  //查询用户信息，按照姓名或者专业来查询
  async searchUser(str){
    return this.model('users').where( {$or:[{"username":str},{"grade_major":{$regex:str}},{"sex":str}]} ).select();//$regex表示模糊查询无需输入专业全名
  }
  //添加管理员,MD5暂未实现
  async addAdmin(admin){
    return this.model('admins').add(admin);
  }
};
