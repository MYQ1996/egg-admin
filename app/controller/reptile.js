'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {

    const { ctx } = this;
    for (let index = 201530000; index <= 201539999; index++) {
      const student = await ctx.service.reptile.login(index);
      if (student.code === 0) {
        await ctx.service.reptile.insert(student.message);
      }
    }
    ctx.body = 0;
  }
}

module.exports = HomeController;
