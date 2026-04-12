import { useState } from 'react';
import { Card, Button, Badge } from '../components';
import './RelationshipAnalysis.css';

function RelationshipAnalysis() {
  const [selectedDimension, setSelectedDimension] = useState(null);

  const dimensions = [
    {
      name: '沟通质量',
      score: 80,
      description: '你们的日常沟通频率和质量',
      trend: 'up',
      trendValue: 5,
      tips: ['尝试每天分享一件有趣的事', '学习使用「我感受」句式表达需求'],
    },
    {
      name: '信任程度',
      score: 90,
      description: '彼此之间的信任和理解程度',
      trend: 'up',
      trendValue: 3,
      tips: ['继续保持开放的沟通态度', '在重要决定上多征询对方意见'],
    },
    {
      name: '情绪支持',
      score: 60,
      description: '在对方需要时提供情绪支持的能力',
      trend: 'down',
      trendValue: 8,
      tips: ['主动询问对方今天的感受', '学习识别对方的情绪信号', '提供具体的帮助而非泛泛安慰'],
    },
    {
      name: '冲突处理',
      score: 70,
      description: '面对分歧和争吵时的处理能力',
      trend: 'stable',
      trendValue: 0,
      tips: ['争吵时先暂停冷静 10 分钟', '避免使用「总是」「从不」等绝对词'],
    },
  ];

  const weeklyData = [
    { day: '周一', score: 75 },
    { day: '周二', score: 78 },
    { day: '周三', score: 82 },
    { day: '周四', score: 80 },
    { day: '周五', score: 85 },
    { day: '周六', score: 88 },
    { day: '周日', score: 82 },
  ];

  const alerts = [
    {
      type: 'attention',
      title: '情绪支持需求上升',
      description: '近期数据显示你对情绪支持的需求有所增加',
      action: '查看建议',
    },
  ];

  return (
    <div className="relationship-container">
      {/* Header */}
      <header className="relation-header">
        <button className="back-btn">
          <span>←</span>
          <span>返回</span>
        </button>
        <h1>关系健康度</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Overall Score Card */}
      <Card className="overall-score-card">
        <h2>关系评分</h2>
        <div className="overall-score-content">
          <div className="score-circle-large">
            <svg viewBox="0 0 36 36" className="circle-chart-large">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="2.5"
              />
              <path
                className="circle-path-good"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="82, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
              />
            </svg>
            <div className="circle-content">
              <span className="circle-score-large">82</span>
              <span className="circle-label">/100</span>
            </div>
          </div>
          <div className="score-info">
            <Badge variant="success" size="md">总体良好</Badge>
            <p className="score-description">你们的关系整体健康稳定</p>
            <div className="score-trend">
              <span className="trend-icon up">↑</span>
              <span className="trend-text">较上周提升 5%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Trend */}
      <Card className="weekly-trend-card">
        <h2>本周趋势</h2>
        <div className="weekly-chart">
          <div className="chart-bars">
            {weeklyData.map((day, index) => (
              <div key={index} className="bar-container">
                <div
                  className="bar"
                  style={{ height: `${(day.score / 100) * 120}px` }}
                ></div>
                <span className="bar-label">{day.day}</span>
                <span className="bar-value">{day.score}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Dimension Analysis */}
      <Card className="dimensions-card">
        <h2>维度分析</h2>
        <div className="dimensions-list">
          {dimensions.map((dimension, index) => (
            <div
              key={index}
              className={`dimension-item ${selectedDimension === index ? 'selected' : ''}`}
              onClick={() => setSelectedDimension(index === selectedDimension ? null : index)}
            >
              <div className="dimension-header">
                <span className="dimension-name">{dimension.name}</span>
                <div className="dimension-score-row">
                  <Badge
                    variant={dimension.score >= 80 ? 'success' : dimension.score >= 60 ? 'warning' : 'danger'}
                    size="sm"
                  >
                    {dimension.score}%
                  </Badge>
                  {dimension.trend === 'up' && <span className="trend-icon up">↑</span>}
                  {dimension.trend === 'down' && <span className="trend-icon down">↓</span>}
                </div>
              </div>
              <div className="dimension-bar">
                <div
                  className="dimension-progress"
                  style={{
                    width: `${dimension.score}%`,
                    backgroundColor: dimension.score >= 80 ? '#10b981' : dimension.score >= 60 ? '#f59e0b' : '#ef4444'
                  }}
                ></div>
              </div>
              <p className="dimension-description">{dimension.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Selected Dimension Tips */}
      {selectedDimension !== null && dimensions[selectedDimension].tips && (
        <Card className="tips-card">
          <div className="tips-header">
            <span className="tips-icon">💡</span>
            <h2>{dimensions[selectedDimension].name} - 改善建议</h2>
          </div>
          <ul className="tips-list">
            {dimensions[selectedDimension].tips.map((tip, index) => (
              <li key={index} className="tip-item">{tip}</li>
            ))}
          </ul>
          <Button variant="primary" fullWidth onClick={() => setSelectedDimension(null)}>
            知道了
          </Button>
        </Card>
      )}

      {/* Alerts Section */}
      {alerts.map((alert, index) => (
        <Card key={index} className="alert-card">
          <div className="alert-content">
            <span className="alert-icon">⚠️</span>
            <div className="alert-text">
              <h3>{alert.title}</h3>
              <p>{alert.description}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="alert-action">
            {alert.action} →
          </Button>
        </Card>
      ))}

      {/* Action Button */}
      <div className="bottom-action">
        <Button variant="primary" fullWidth size="lg">
          查看详细报告
        </Button>
      </div>
    </div>
  );
}

export default RelationshipAnalysis;
