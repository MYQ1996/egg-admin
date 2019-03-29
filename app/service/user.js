'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('user', { id: uid });
    return { user };
  }

  async insert() {
    const result = await this.app.mysql.insert('user', {
      name: 'Jack',
      age: 18,
    });
    return { result };
    // 判断： result.affectedRows === 1
  }

  async insertGps(ip) {
    const result = await this.app.mysql.insert('gps', {
      ip: ip,
    });
    return { result };
    // 判断： result.affectedRows === 1
  }

  async findList() {
    const result = await this.app.mysql.select('user', {
      columns: [ 'id', 'name' ], // 查询字段，全部查询则不写，相当于查询*
      where: {
        name: 'Jack',
      }, // 查询条件
      orders: [
        [ 'id', 'desc' ], // 降序desc，升序asc
      ],
      limit: 10, // 查询条数
      offset: 0, // 数据偏移量（分页查询使用）
    });
    return { result };
    // 判断： result.length > 0
  }

  async update() {
    const result = await this.app.mysql.update('user', {
      age: 30, // 需要修改的数据
    }, {
      where: {
        id: 1,
      }, // 修改查询条件
    });
    return { result };
    // 判断： result.affectedRows === 1
  }

  async delete() {
    const result = await this.app.mysql.delete('user', {
      name: 'Jack',
    });
    return { result };
    //   判断： result.affectedRows === 1
  }

}
module.exports = UserService;
