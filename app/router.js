'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,swagger } = app;
  router.get('/', controller.home.index);
  swagger.get('/', {
    tags: [
      'role',
    ],
    summary: 'search role by page',
    description: '',
    parameters: [{
        in: 'query',
        name: 'name',
        description: 'role\'s name',
      },
      {
        in: 'query',
        name: 'pageIndex',
        description: 'pageIndex',
      },
      {
        in: 'query',
        name: 'pageSize',
        description: 'pageSize',
      },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'status',
            },
            datas: {
              type: 'array',
              description: 'result datas',
              properties: {
                token: {
                  type: 'string',
                  description: 'token',
                },
              },
            },
            pageIndex: {
              type: 'number',
              description: 'pageIndex',
            },
            pageSize: {
              type: 'number',
              description: 'pageSize',
            },
            totalCount: {
              type: 'number',
              description: 'totalCount',
            },
          },
        },
      },
    },
  });

  router.post('/', controller.home.index);

  // 获取验证码
  router.get('/Code/ImageCode', controller.code.index);
  // 获取邮箱验证码
  router.get('/Code/EmailCode', controller.code.emailCode);
  // 获取手机验证码

  //手机登录
  // router.post('/People/loginTel', controller.people.emailCode);
  // // 邮箱登录
  // router.post('/People/loginEmail', controller.people.emailCode);
  // 用户名登录
  router.post('/People/loginUserName', controller.people.loginUserName);

  

  router.post('/People/loginUserName', controller.code.emailCode);
  router.post('/People/registeredUser', controller.code.emailCode);
  router.post('/People/loginTel', controller.code.emailCode);
  router.post('/People/loginEmail', controller.code.emailCode);
  router.post('/People/loginUserName', controller.code.emailCode);

  router.post('/Info/updateInfos', controller.code.emailCode);


};
