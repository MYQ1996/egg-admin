'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const { ctx } = this;

    console.log('====================返回================');
    console.log(await ctx.service.reptile.login(201530193));
    console.log('====================================');
    ctx.body = '213';
  }
}

module.exports = HomeController;
