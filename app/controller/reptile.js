'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const { ctx } = this;

    ctx.body = await ctx.service.reptile.login(201530193);
  }
}

module.exports = HomeController;
