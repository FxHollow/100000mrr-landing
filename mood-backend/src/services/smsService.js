// 阿里云短信服务配置

const OSS = require('aliyun-sdk');
const { logger } = require('../utils/logger');

const config = {
  accessKeyId: process.env.ALIYUN_ACCESS_KEY || '',
  secretAccessKey: process.env.ALIYUN_SECRET || '',
  smsVersion: '2015-05-28',
  endpoint: 'http://dysmsapi.aliyuncs.com',
};

// 短信签名
const SIGN_NAME = process.env.ALIYUN_SMS_SIGN_NAME || '情绪小助手';

// 短信模板
const templates = {
  // 情绪签到提醒
  MOOD_CHECK_IN: process.env.ALIYUN_SMS_TEMPLATE_MOOD_CHECK_IN || 'SMS_123456001',
  // 风险预警
  RISK_ALERT: process.env.ALIYUN_SMS_TEMPLATE_RISK_ALERT || 'SMS_123456002',
  // 成就通知
  ACHIEVEMENT: process.env.ALIYUN_SMS_TEMPLATE_ACHIEVEMENT || 'SMS_123456003',
};

/**
 * 发送短信
 */
async function sendSms(phoneNumber, templateCode, templateParam) {
  if (!config.accessKeyId || !config.secretAccessKey) {
    logger.warn('阿里云配置缺失，无法发送短信');
    return { success: false, error: '短信配置缺失' };
  }

  const sms = new OSS.SMS({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    smsVersion: config.smsVersion,
    endpoint: config.endpoint,
  });

  try {
    const result = await sms
      .sendSms({
        PhoneNumbers: phoneNumber,
        SignName: SIGN_NAME,
        TemplateCode: templateCode,
        TemplateParam: JSON.stringify(templateParam || {}),
      })
      .promise();

    if (result.Code === 'OK') {
      logger.info('短信发送成功', { phoneNumber, templateCode });
      return { success: true, messageId: result.BizId };
    }

    logger.error('短信发送失败', result);
    return { success: false, error: result.Message };
  } catch (err) {
    logger.error('发送短信异常:', err);
    return { success: false, error: err.message };
  }
}

/**
 * 发送情绪签到提醒短信
 */
async function sendMoodCheckIn(phoneNumber) {
  return sendSms(phoneNumber, templates.MOOD_CHECK_IN, {});
}

/**
 * 发送风险预警短信
 */
async function sendRiskAlert(phoneNumber, riskLevel, message) {
  return sendSms(phoneNumber, templates.RISK_ALERT, {
    risk: riskLevel,
    message,
  });
}

/**
 * 发送成就通知短信
 */
async function sendAchievement(phoneNumber, title, message) {
  return sendSms(phoneNumber, templates.ACHIEVEMENT, {
    title,
    message,
  });
}

module.exports = {
  config,
  templates,
  sendSms,
  sendMoodCheckIn,
  sendRiskAlert,
  sendAchievement,
};
