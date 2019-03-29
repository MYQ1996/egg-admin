/**
 * User: myq
 * Date: 2018/11/28
 * Time: 20:46
 * Title: 获取验证码
*/
'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha') // 验证码图生成

class CodeController extends Controller {
    async index() {

        const { ctx } = this;

        let captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            noise: 3,
            width: 120,
            height: 34,
            background: "#ffffff"
        });
       
        ctx.session.code['17621515830'] = {
            text:captcha.text
        };

        //设置响应头
        ctx.response.type = "image/svg+xml";
        ctx.body = captcha.data;
    }
}

module.exports = CodeController;