'use strict';
const Service = require('egg').Service;
const request = require('request');
const cheerio = require('cheerio');
const superagent = require('superagent');

class Reptile extends Service {

  async login(studentId) {
    let duixaing = {};

    // 登陆post地址
    const url = 'http://jw.sicp.sh.cn/st/login.aspx';
    // 登陆post的所有数据
    const datas = {
      __VIEWSTATE: '/wEPDwUJOTYxNDY3OTc0D2QWAgIBD2QWBAIBDw8WBB4JQmFja0NvbG9yCf////8eBF8hU0ICCGRkAgcPEGQPFgECARYBBQnovoXlr7zlkZhkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUNQnV0dG9uX+eZu+mZhlYh9939KrXa9Anl8fWbrDtGgwqK',
      __VIEWSTATEGENERATOR: 'D2D9F043',
      __EVENTVALIDATION: '/wEWCQLvtf2jCQLep8vjCAKu8uE5AvKm2soEAvLJzeAMAvWZ8TkC6fHPnw8CwsjN4QICyKiipgGAy1YJIL+fMUXSUgdFZ5oh1bwv2Q==',
      txt_卡学号: studentId,
      txt_密码: '57484279',
      'Button_登陆.x': 75,
      'Button_登陆.y': 33,
      Rad_角色: '家长',
    };

    // 设置头部
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
    };

    const opts = {
      url,
      method: 'POST',
      headers,
      form: datas,
    };

    await request(opts, (e, r, b) => {
      superagent.post('http://jw.sicp.sh.cn/st/parents/st_search_a_a.aspx')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36')
        .set('Cookie', r.headers['set-cookie'])
        .end(function(err, pres) {

          // 常规的错误处理
          if (err) {
            // return '失败';
          }

          const $ = cheerio.load(pres.text);
          const name = $('#txt_姓名').val();

          if (!name) {
            // return '失败';
          }

          const former_name = $('#txt_曾用名').val() || '无';
          const student_id = $('#txt_学号').val();
          const Rad = $('#Rad_性别_0').is(':checked') ? '男' : '女';
          const height = $('#txt_身高').val();
          const weight = $('#txt_体重').val();
          const AdministrativeClass = $('#txt_行政班').val();
          const AdministrativeClassCode = $('#txt_行政班代码').val();
          const LearningForm = $('#txt_学习形式').val();
          const Department = $('#txt_系院').val();
          const grade = $('#txt_年级').val();
          const major = $('#txt_专业').val();
          const ClassBan = $('#txt_班别').val();
          const Nation = $('#txt_民族').val() || '无';
          const PoliticalFace = $('#txt_政治面目').val();
          const DegreeOfEducation = $('#txt_文化程度').val() || '无';
          const CertificateNumber = $('#txt_结业证号码').val() || '无';
          const DiplomaNumber = $('#txt_毕业证号码').val() || '无';
          const ExamineeNumber = $('#txt_考生号').val() || '无';
          const TeachingClass = $('#txt_教学班').val() || '无';
          const state = $('#txt_目前状态').val();
          const dateOfBirth = $('#txt_出生日期').val();
          const entry_time = $('#txt_入学时间').val();
          const marital = $('#Rad_婚否').is(':checked') ? '是' : '否';
          const nativePlace = $('#txt_籍贯').val();
          const eductional = $('#txt_学制').val();
          const arrangement = $('#txt_层次').val();
          const campus = $('#txt_校区').val();
          const admissionScore = $('#txt_入学成绩').val();
          const entranceExaminationNumber = $('#txt_高考准考证号').val();
          const iDcardNo = $('#txt_身份证号码').val();
          const biogenicLand = $('#txt_生源地').val();
          const e_mail = $('#txt_E_mail').val();
          const studentMobilePhone = $('#txt_学生手机').val();
          const postalCode = $('#txt_邮政编码').val();
          const homePhone = $('#txt_家庭电话').val();
          const homeAddress = $('#txt_家庭通讯地址').val();
          const completionTime = $('#txt_结业时间').val() || '无';
          const remarks = $('#txt_备注').val();
          const dormitory = $('#txt_宿舍').val() || '无';
          // var trList = $("#Grd_家庭成员").children("tr")


          let familyList = '';
          $('#Grd_家庭成员').find('tr').each(function(i) {
            if (i > 0) {
              familyList = familyList + `${$(this).children().eq(0)
                .text()}  ${$(this).children().eq(1)
                .text()}  ${$(this).children().eq(2)
                .text()}  ${$(this).children().eq(3)
                .text()}  ${$(this).children().eq(4)
                .text()}  ${$(this).children().eq(5)
                .text()}  ${$(this).children().eq(6)
                .text()}  ${$(this).children().eq(7)
                .text()} </br>`;
            }
          });

          let resumeList = '';
          $('#Grd_个人简历').find('tr').each(function(i) {
            if (i > 0) {
              resumeList = resumeList + `${$(this).children().eq(0)
                .text()}  ${$(this).children().eq(1)
                .text()}  ${$(this).children().eq(2)
                .text()}  ${$(this).children().eq(3)
                .text()} </br>`;
            }
          });

          duixaing = {
            name,
            former_name,
            student_id,
            Rad,
            height,
            weight,
            AdministrativeClass,
            AdministrativeClassCode,
            LearningForm,
            Department,
            grade,
            major,
            ClassBan,
            Nation,
            PoliticalFace,
            DegreeOfEducation,
            CertificateNumber,
            DiplomaNumber,
            ExamineeNumber,
            TeachingClass,
            state,
            dateOfBirth,
            entry_time,
            marital,
            nativePlace,
            eductional,
            arrangement,
            campus,
            admissionScore,
            entranceExaminationNumber,
            iDcardNo,
            biogenicLand,
            e_mail,
            studentMobilePhone,
            postalCode,
            homePhone,
            homeAddress,
            completionTime,
            remarks,
            dormitory,
            familyList,
            resumeList,
          };
          callback(duixaing);
        });
    });

    function callback(duixaing) {
      console.log('====================================');
      console.log(duixaing);
      console.log('====================================');
      return duixaing;
    }

  }
}

module.exports = Reptile;
