import { useState } from 'react';
import { Card, Button, Avatar, Badge } from '../components';
import './Home.css';

function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const emotions = [
    { emoji: '😊', label: '开心', value: 'happy' },
    { emoji: '😐', label: '平淡', value: 'neutral' },
    { emoji: '😔', label: '难过', value: 'sad' },
    { emoji: '😠', label: '生气', value: 'angry' },
    { emoji: '😨', label: '焦虑', value: 'anxious' },
    { emoji: '😌', label: '平静', value: 'calm' },
  ];

  const todaySuggestions = [
    { title: '5 分钟正念呼吸', type: 'breathing', duration: '5 分钟' },
    { title: '情绪书写练习', type: 'writing', duration: '10 分钟' },
    { title: '认知重构引导', type: 'reframing', duration: '8 分钟' },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="header-left">
          <Avatar name="用户" size="md" />
          <div className="header-text">
            <h1>早上好，用户</h1>
            <p className="date-text">{new Date().toLocaleDateString('zh-CN', {
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}</p>
          </div>
        </div>
      </header>

      {/* Mood Summary Card */}
      <Card className="mood-summary-card">
        <div className="mood-summary-header">
          <span className="section-icon">📊</span>
          <h2>本周情绪指数</h2>
        </div>
        <div className="mood-score">
          <span className="score-value">72</span>
          <span className="score-label">/100</span>
        </div>
        <div className="mood-trend">
          <span className="trend-indicator up">↑</span>
          <span className="trend-text">较上周提升 5%</span>
        </div>
      </Card>

      {/* Today's Emotion Record */}
      <Card className="emotion-record-card">
        <h2>今日情绪记录</h2>
        <p className="record-subtitle">选择或输入你此刻的情绪</p>

        <div className="emotion-grid">
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              className={`emotion-btn ${selectedEmotion === emotion.value ? 'selected' : ''}`}
              onClick={() => setSelectedEmotion(emotion.value)}
            >
              <span className="emotion-emoji">{emotion.emoji}</span>
              <span className="emotion-label">{emotion.label}</span>
            </button>
          ))}
        </div>

        {selectedEmotion && (
          <div className="emotion-detail">
            <textarea
              placeholder="发生了什么？(可选)"
              className="emotion-textarea"
              rows={3}
            />
            <Button variant="primary" fullWidth className="submit-btn">
              提交记录
            </Button>
          </div>
        )}
      </Card>

      {/* Relationship Health */}
      <Card className="relationship-card">
        <div className="relationship-header">
          <span className="section-icon">💕</span>
          <h2>关系健康度</h2>
          <Badge variant="success" size="sm">良好</Badge>
        </div>

        <div className="health-score">
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="circle-chart">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                className="circle-path"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="82, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
              />
            </svg>
            <span className="circle-score">82</span>
          </div>
          <div className="score-details">
            <div className="detail-row">
              <span>沟通质量</span>
              <Badge variant="primary">80%</Badge>
            </div>
            <div className="detail-row">
              <span>信任程度</span>
              <Badge variant="success">90%</Badge>
            </div>
            <div className="detail-row">
              <span>情绪支持</span>
              <Badge variant="warning">60%</Badge>
            </div>
          </div>
        </div>

        <div className="health-tip">
          <span className="tip-icon">💡</span>
          <div className="tip-content">
            <p className="tip-title">关注项：情绪支持</p>
            <p className="tip-desc">近期情绪支持需求增加，建议多表达认可和关心</p>
          </div>
        </div>
      </Card>

      {/* Today's Suggestions */}
      <Card className="suggestions-card">
        <div className="suggestions-header">
          <span className="section-icon">✨</span>
          <h2>为你推荐</h2>
        </div>

        <div className="suggestions-list">
          {todaySuggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-info">
                <h3>{suggestion.title}</h3>
                <p className="suggestion-meta">{suggestion.duration}</p>
              </div>
              <Button variant="secondary" size="sm">开始</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Button variant="primary" fullWidth className="action-btn">
          📝 记录情绪
        </Button>
        <Button variant="secondary" fullWidth className="action-btn">
          📊 查看报告
        </Button>
      </div>
    </div>
  );
}

export default Home;
