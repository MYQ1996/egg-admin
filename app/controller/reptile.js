'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const { ctx } = this;

    const a = await ctx.service.reptile.login(201530193);
    console.log('====================================');
    console.log(a);
    console.log('====================================');
    ctx.body = '213';
  }
}

module.exports = HomeController;
