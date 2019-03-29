/**
 * User: myq
 * Date: 2018/7/16
 * Time: 14:21
 * Title: 人员设置
 */

 const Controller = require('egg').Controller;
 class peopleController extends Controller {
     
    // 电话/邮箱  注册接口
    async registered() {}

    // 通过邮箱注册账号一次封装
    async emailProgenitor(){}

    // 手机登录
    async loginTel() {}

    // 邮箱登录
    async loginEmail() {}

    // 用户名登录
    async loginUserName() {}
 }

 module.exports = peopleController;