/**
 * User: myq
 * Date: 2018/7/16
 * Time: 14:21
 * Title: 人员设置
 */

const Controller = require('egg').Controller;

class PeopleController extends Controller {

    // 电话/邮箱  注册接口
    async registered() {
       ctx.cookies.set(`${Math.random()}`, "ccc", {
          maxAge: 24 * 3600 * 1000,
          httpOnly: true, // by default it's true
          encrypt: true, // cookies are encrypted during network transmission
       });
    }

    // 通过邮箱注册账号一次封装
    async emailProgenitor(){}

    // 手机登录
    async loginTel() {}

    // 邮箱登录
    async loginEmail() {}

    // 用户名登录
    async loginUserName() {
      const { ctx } = this;

      const {
          userName, // 用户名
          password, // 密码
          code // 验证码
      } = ctx.params;

      ctx.body = "成功";

      let scode = ctx.session

      console.log('====================================');
      console.log(scode);
      console.log('====================================');

      if (code == scode) {
         // $info = model('People') -> seleNick($userName); //获取姓名
         // if (empty($info) == '') {
         //    if ($info[0]['password'] == $password) {
         //       $shu = model('Tools') - > random();
         //       Session::set($shu, $info[0]['orgid'], 'think');
         //       model('People') - > loginTime($info[0]['rid']);
         //       $roleTile = $info[0]['orgid'] == 'B834D761-7BFB-A5F5-33F6-9C90EC3FC2D6' ? '超级管理员' : '普通用户';

         //       $fanhui = [
         //          'auth' => $shu,
         //          'userName' => $userName,
         //          'role' => $roleTile
         //       ];
         //       $res = model('Msg') - > success($fanhui);

         //    } else {
         //       $res = model('Msg') - > error('密码错误');
         //    }
         // } else {
         //    $res = model('Msg') - > error('用户名不存在');
         // }
      }

    }
 }

 module.exports = PeopleController;