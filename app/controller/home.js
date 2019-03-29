'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const { ctx } = this;

    // 获取参数方法 get请求
    // const queryObj = ctx.query;
    // ctx.body = queryObj;

    // 获取参数方法 post 请求
    // const queryObj = ctx.request.body;
    // ctx.body = queryObj;

    // 通过中间件获取get 请求
    const {
      age,
    } = ctx.params;
    // const user = await ctx.service.user.insertGps(ctx.ip); //查询一条

    console.log('====================================');
    console.log(ctx.session.code);
    console.log('====================================');
    
    ctx.body = "成功";

    // ctx.body = '21';

    // ctx.body = 'Hello world';
    // const ctx = this.ctx;
    // const userId = ctx.params.id;
    // const user = await ctx.service.user.find(1);//查询一条
    // const user = await ctx.service.user.findList(); // 查询关键词
    // const user = await ctx.service.user.insert(); // 增加一条
    // const user = await ctx.service.user.update(); // 修改
    // const user = await ctx.service.user.delete(); // 修改
    // ctx.body = user;
  }
}

module.exports = HomeController;
