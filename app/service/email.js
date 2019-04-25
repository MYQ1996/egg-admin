'use strict';

const Service = require('egg').Service;

const Imap = require('imap');
const MailParser = require('mailparser').MailParser;
const nodemailer = require('nodemailer');

class EmailService extends Service {

    async getEmail() {
        const p = new Promise(function (resolve, reject) {
            const imap = new Imap({
                user: 'kwei1@visteon.com', // 你的邮箱账号
                password: 'Temp2019', // 你的邮箱密码
                host: 'outlook.office365.com', // 邮箱服务器的主机地址
                port: 993, // 邮箱服务器的端口地址
                tls: true, // 使用安全传输协议
                tlsOptions: {
                    rejectUnauthorized: false,
                }, // 禁用对证书有效性的检查
            });

            function openInbox(cb) {
                imap.openBox('INBOX', false, cb);
            }

            imap.once('ready', function () {

                openInbox(function (err, box) {

                    console.log('打开邮箱');

                    if (err) throw err;

                    imap.search(['UNSEEN', ['SINCE', 'Mar 21, 2019']], function (err, results) { // 搜寻2017-05-20以后未读的邮件

                        if (results.length === 0) {
                            resolve('没有邮件了...');
                            imap.end();
                            return;
                        }

                        if (err) throw err;

                        const f = imap.fetch(results, {
                            bodies: '',
                            markSeen: true,
                        }); // 抓取邮件（默认情况下邮件服务器的邮件是未读状态）

                        f.on('message', function (msg, seqno) {

                            const mailparser = new MailParser();

                            msg.on('body', function (stream, info) {

                                stream.pipe(mailparser); // 将为解析的数据流pipe到mailparser

                                // 邮件头内容
                                mailparser.on('headers', function (headers) {
                                    console.log('邮件头信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                                    console.log('邮件主题: ' + headers.get('subject'));
                                    console.log('发件人: ' + headers.get('from').text);
                                    console.log('收件人: ' + headers.get('to').text);
                                });

                                // 邮件内容

                                mailparser.on('data', function (data) {
                                    if (data.type === 'text') { // 邮件正文
                                        console.log('邮件内容信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                                        console.log('邮件内容: ' + data.html);
                                    }
                                    if (data.type === 'attachment') { // 附件
                                        console.log('邮件附件信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                                        console.log('附件名称:' + data.filename); // 打印附件的名称
                                        // data.content.pipe(fs.createWriteStream(data.filename)); //保存附件到当前目录下
                                        data.release();
                                    }
                                });

                            });
                            msg.once('end', function () {
                                console.log(seqno + '完成');
                            });
                        });
                        f.once('error', function (err) {
                            console.log('抓取出现错误: ' + err);
                        });
                        f.once('end', function () {
                            resolve('所有邮件抓取完成!');
                            console.log('所有邮件抓取完成!');
                            imap.end();
                        });
                    });
                });
            });

            imap.once('error', function (err) {
                console.log(err);
            });

            imap.once('end', function () {
                console.log('关闭邮箱');
            });

            imap.connect();
        });
        return p;
    }

    async postEmail(emailData, mailOptions) {
        const p = new Promise(function (resolve, reject) {

            // let emailData = {
            //     host: 'smtp.office365.com', // 邮箱服务器的主机地址
            //     // service: 'smtp.office365.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            //     port: 587, // SMTP 端口
            //     secureConnection: true, // 使用了 SSL
            //     auth: {
            //         // 这里密码不是qq密码，是你设置的smtp授权码
            //         user: 'kwei1@visteon.com', // 你的邮箱账号
            //         pass: 'Temp2019', // 你的邮箱密码
            //     }
            // }

            const transporter = nodemailer.createTransport(emailData);

            // const mailOptions = {
            //     from: 'kwei1@visteon.com', // sender address
            //     to: '954663633@qq.com', // list of receivers
            //     subject: 'Hello', // Subject line
            //     // 发送text或者html格式
            //     // text: 'Hello world?', // plain text body
            //     html: '<b>Hello world?</b>', // html body
            // };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    resolve(error);
                    // return console.log(error);
                }
                resolve(info.messageId);
                // console.log('Message sent: %s', info.messageId);
                // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
            });
        });
        return p;
    }

}

module.exports = EmailService;