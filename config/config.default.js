/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '123.206.177.252',
      // 端口号
      port: '3306',
      // 用户名
      user: 'egg',
      // 密码
      password: '57484279',
      // 数据库名
      database: 'egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [ 'http://www.baidu.com' ], // 配置白名单
  };

  config.cors = {
    origin: '*',//允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.middleware = [
    'params',
  ];

  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '79019',
    secret: 'ca8351573fb07faed40c12cd53cee89e044451c6',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552980223880_5344';

  // add your middleware config here

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.swagger2 = {
    enable: true, // 禁用swagger , 默认为true
    base: {
      /* default config,support cover
      schemes: [
          'http',
      ],
      host: '127.0.0.1:7001',
      basePath: '/',
      consumes: [
      'application/json',
      ],
      produces: [
      'application/json',
      ],
      */
      info: {
        description: 'This is a test swagger-ui html',
        version: '1.0.0',
        title: 'TEST',
        contact: {
          email: 'caandoll@aliyun.com',
        },
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
      tags: [{
          name: 'admin',
          description: 'Admin desc',
        },
        {
          name: 'role',
          description: 'Role desc',
        },
      ],
      definitions: {
        // model definitions
      },
      securityDefinitions: {
        // security definitions
      }
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
