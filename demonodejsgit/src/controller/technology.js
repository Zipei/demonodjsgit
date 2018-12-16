const Base = require('./base.js');

module.exports = class extends Base {
 
  async addTechnologyAction() {
    const data = await this.mongo('technology').addTechnology(this.post());
    if (think.isEmpty(data)) {
      return this.success(500, '添加错误，请重新填写');
    } else {
      return this.success({code: 502, message: '添加成功'});
    }
  }
  
  async showTechnologyAction() {
    return this.success(await this.mongo('technology').showTechnology());
  }

  async deleteTechnologyAction(){
    const data = await this.mongo('technology').deleteTechnology(this.post('_id'));
    if (think.isEmpty(data)) {
      return this.success(500, '删除错误，请重新填写');
    } else {
      return this.success({code: 502, message: '删除成功'});
    }
  }


  async showPerNameAction() {
    return this.success(await this.mongo('technology').showPerName());
  }



  async showTecPerIdToNameAction(){
    const dataId=await this.mongo('technology').showTecPerId(this.post('_id'));
  let j=dataId[0].personnel.length;
  let dataName=[];
  for(let i=0;i<j;i++){
    let a=dataId[0].personnel[i];
    let b=await this.mongo('technology').showTecPerName(a);
    dataName.push(b[0]);
     }
     if (think.isEmpty(dataName)) {
      return this.success({code: 502, message: '查询失败'});
    } else {
      return this.success(dataName,{code: 500, message: '查询成功'});
    }
    return this.success(dataName);
  }


  async selectTechnologyAction(){
    const data=await this.mongo('technology').selectTechnology(this.post('_id'));
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '用户查询失败'});
    } else {
      // console.log(this.post('_id'))
      return this.success(data);
    }

  }

  async updateTechnologyAction() {
    const data = await this.mongo('technology').updateTechnology(this.post());
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '用户更新失败'});
    } else {
      return this.success({code: 500, message: '更新成功'});
    }
  }






  async addTecPerAction(){
    const data=await this.mongo('technology').addTecPer(this.post('_id'),this.post('user_id'));
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '添加失败'});
    } else {
      return this.success(data,{code: 500, message: '添加成功'});
    }  
  }
  async deleteTecPerAction(){
    const data = await this.mongo('technology').deleteTecPer(this.post('_id'),this.post('user_id'));
    if (think.isEmpty(data)) {
      return this.success({code: 502, message: '删除失败'});
    } else {
      return this.success({code: 500, message: '删除成功'});
    }
  }




 
}