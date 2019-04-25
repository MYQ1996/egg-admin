'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
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
