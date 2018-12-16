module.exports = class extends think.Mongo {
    //分组计数，统计各实验室人员数量
    async labMemberCount(labname){
       //db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
       let count116 = this.model('users').where({"lab":"116"}).count();
       const count118 = this.model('users').where({"lab":"118"}).count();
       let countJZ = this.model('users').where({"lab":"荆州"}).count();
       let s =[count116,count118,countJZ];
       switch(labname){
            case "116":
                return count116;
                break;
            case "118":
                return count118;
                break;
            case "荆州":
                return countJZ;
                break;
            default:
                return error;    
       }
   }
   //

};