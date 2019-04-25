'use strict';
/**
 * User: myq
 * Date: 2018/11/28
 * Time: 20:46
 * Title: 获取验证码
*/


const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha') // 验证码图生成
let tool = require('../utils/tool.js');
class CodeController extends Controller {
    async index() {

        const { ctx } = this;

        const {
            userName, // 用户名
        } = ctx.params;

        let captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            noise: 3,
            width: 120,
            height: 34,
            background: "#ffffff"
        });
       
        ctx.session.codeImg[`${userName}`]= captcha.text
        ctx.session.maxAge = 10 * 1000

        //设置响应头
        ctx.response.type = "image/svg+xml";
        ctx.body = captcha.data;
    }

    async emailCode(){
        const { ctx } = this;

        let emailData = {
            host: 'smtp.163.com', // 邮箱服务器的主机地址
            // service: 'smtp.office365.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                // 这里密码不是qq密码，是你设置的smtp授权码
                user: 'shanghai9090@163.com', // 你的邮箱账号
                pass: '57484279y', // 你的邮箱密码
            }
        }
        
        let emailYzm = tool.createCode()

        ctx.session.code = {
            "17621515830": emailYzm
        };

        ctx.session.maxAge = 60 * 1000

        const mailOptions = {
            from: 'shanghai9090@163.com', // sender address
            to: '954663633@qq.com', // list of receivers
            subject: '验证码', // Subject line
            // 发送text或者html格式
            // text: 'Hello world?', // plain text body
            html: `<b>${emailYzm}</b>`, // html body
        };

        const yzm = await ctx.service.email.postEmail(emailData, mailOptions); //查询一条
        
        ctx.body = yzm;

    }

}

module.exports = CodeController;