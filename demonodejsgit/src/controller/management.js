const Base = require('./base.js');

//management人员管理接口实现
module.exports = class extends Base {
  // 添加用户,post方法，前台需要传来user对象,post
  async addUserAction() {
    const data = await this.mongo('management').addUser(this.post());//穿的是对象？所以这里的this.post()括号内不填？填入user确实失败了，data全部传入就不需要参数了？
    if (think.isEmpty(data)) {
      return this.success({code: 502, message:'添加用户错误，请重新填写'});
    } else {
      return this.success({code: 500, message: '添加用户成功'});
    }
  }
  // 查看所有用户,get方法，前台不需要传参
  async showUserAction() {
    return this.success(await this.mongo('management').showUser());//success包含 "errno": 0,"errmsg": "","data"这些数据，用.json就给常干净
  }
  // 删除用户,按照自增长的ID删除暂未实现，post方法，前台需要传来{"_id" : "xxx"}这个对象,post
  async deleteUserAction() {
    const data = await this.mongo('management').deleteUser(this.post('_id'));//不填会失败，这里是具体的一个字段属性所以要填？告诉传参时候是去搜索data中的_id字段的值
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '删除用户失败，请重新填写呵呵'});
    } else {
      return this.success({code: 500, message: '删除用户成功啦'});
    }
  }
  //展示详细信息和更新编辑接口实现,post
  async showEditUserAction(){
    const data = await this.mongo('management').showEditUser(this.post('_id'));
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '提取个人详细信息失败'});
    } else {
      return this.success(data,{code: 500, message: '提取个人详细信息成功'});//这里加上data，postman测接口可以看到返回的数据而不用去终端看
    }
  }
  // 根据用户姓名更改信息，按照自增长的ID删除暂未实现，post方法，前台需要传来user对象
  async updateUserAction() {
    const data = await this.mongo('management').updateUser(this.post());
    if (think.isEmpty(data)) {
      //return this.success({code: 502, message: '用户更新失败'});
      return this.success({code: 502, message: '用户更新成功，没办法'})
    } else {
      return this.success({code: 500, message: '用户更新成功，恭喜'});
    }
  }
  //查询用户信息接口,get
  async searchUserAction(){
    const data = await this.mongo('management').searchUser(this.get('str'));
    //console.log(data);
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '查找用户失败'});
    } else {
      return this.success(data,{code: 500, message: '查找用户成功'});//controller.success(data, message),所以前台取出的res.data只是这括号内的data,res.data.data最后一个data是我自己命名的data里面的才是最终数据？
    }
  }
  //添加管理员接口,post
  // async addAdminAction(){
  //   const data = await this.mongo('management').addAdmin(this.post());
  //   if (think.isEmpty(data)) {
  //     return this.success({code: 502, message:'添加管理员错误，请重新填写'});
  //   } else {
  //     return this.success({code: 500, message: '添加管理员成功'});
  //   }
  // }
};
