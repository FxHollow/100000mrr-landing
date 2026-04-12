// 微信服务配置

const { logger } = require('../utils/logger');

// 微信公众号配置
const config = {
  appId: process.env.WECHAT_APPID || '',
  secret: process.env.WECHAT_APP_SECRET || '',
  token: process.env.WECHAT_TOKEN || '',
  encodingAESKey: process.env.WECHAT_ENCODING_AES_KEY || '',
};

// 模板消息配置
const templates = {
  // 情绪签到提醒模板
  MOOD_CHECK_IN: process.env.WECHAT_TEMPLATE_MOOD_CHECK_IN || '',
  // 风险预警模板
  RISK_ALERT: process.env.WECHAT_TEMPLATE_RISK_ALERT || '',
  // 成就通知模板
  ACHIEVEMENT: process.env.WECHAT_TEMPLATE_ACHIEVEMENT || '',
};

/**
 * 获取访问令牌
 */
async function getAccessToken() {
  if (!config.appId || !config.secret) {
    logger.warn('微信配置缺失，无法获取 access_token');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.secret}`,
      { method: 'GET' }
    );

    const data = await response.json();

    if (data.access_token) {
      return data.access_token;
    }

    logger.error('获取微信 access_token 失败:', data);
    return null;
  } catch (err) {
    logger.error('获取微信 access_token 异常:', err);
    return null;
  }
}

/**
 * 发送模板消息
 */
async function sendTemplateMessage(openid, templateId, data, url) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { success: false, error: '无法获取 access_token' };
  }

  try {
    const response = await fetch(
      `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          touser: openid,
          template_id: templateId,
          url: url || undefined,
          data,
        }),
      }
    );

    const result = await response.json();

    if (result.errcode === 0) {
      logger.info('微信模板消息发送成功', { openid, templateId });
      return { success: true, messageId: result.msgid };
    }

    logger.error('微信模板消息发送失败', result);
    return { success: false, error: result.errmsg };
  } catch (err) {
    logger.error('发送微信模板消息异常:', err);
    return { success: false, error: err.message };
  }
}

/**
 * 发送情绪签到提醒
 */
async function sendMoodCheckIn(openid) {
  return sendTemplateMessage(openid, templates.MOOD_CHECK_IN, {
    first: { value: '今天的情绪如何？', color: '#173177' },
    keyword1: { value: '每日签到', color: '#173177' },
    keyword2: { value: new Date().toLocaleDateString(), color: '#173177' },
    remark: { value: '花一分钟记录一下此刻的感受吧~', color: '#173177' },
  });
}

/**
 * 发送风险预警
 */
async function sendRiskAlert(openid, riskLevel, message) {
  const color = riskLevel === 'CRITICAL' ? '#FF0000' : riskLevel === 'HIGH' ? '#FF8C00' : '#FFA500';

  return sendTemplateMessage(openid, templates.RISK_ALERT, {
    first: { value: `${riskLevel === 'CRITICAL' ? '严重' : riskLevel === 'HIGH' ? '高度' : ''}风险提醒`, color },
    keyword1: { value: new Date().toLocaleDateString(), color: '#173177' },
    keyword2: { value: riskLevel, color },
    remark: { value: message, color: '#173177' },
  });
}

/**
 * 发送成就通知
 */
async function sendAchievement(openid, title, message) {
  return sendTemplateMessage(openid, templates.ACHIEVEMENT, {
    first: { value: title, color: '#FF69B4' },
    keyword1: { value: new Date().toLocaleDateString(), color: '#173177' },
    keyword2: { value: '成就解锁', color: '#FF69B4' },
    remark: { value: message, color: '#173177' },
  });
}

module.exports = {
  config,
  templates,
  getAccessToken,
  sendTemplateMessage,
  sendMoodCheckIn,
  sendRiskAlert,
  sendAchievement,
};
