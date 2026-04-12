import { useState } from 'react';
import { Button, Card, Input, Modal } from '../components';
import './MoodDiary.css';

function MoodDiary() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [notes, setNotes] = useState('');
  const [showAIQuestions, setShowAIQuestions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  const emotions = [
    { emoji: '😊', label: '开心', value: 'happy', color: '#fbbf24' },
    { emoji: '😐', label: '平淡', value: 'neutral', color: '#9ca3af' },
    { emoji: '😔', label: '难过', value: 'sad', color: '#60a5fa' },
    { emoji: '😠', label: '生气', value: 'angry', color: '#f87171' },
    { emoji: '😨', label: '焦虑', value: 'anxious', color: '#a78bfa' },
    { emoji: '😌', label: '平静', value: 'calm', color: '#34d399' },
  ];

  const aiQuestions = [
    '发生了什么让你有这种感受？',
    '你的身体有什么感觉？',
    '对方的反应是什么？',
  ];

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubmit = () => {
    // Simulate AI analysis
    setAiFeedback({
      emotion: selectedEmotion.label,
      recognition: '检测到你现在感到有些焦虑，这是很正常的情绪反应。',
      empathy: '面对这样的情况，很多人都会有类似的感受。你已经做得很好了，能够意识到自己的情绪状态。',
      suggestion: '要不要试试深呼吸练习？花 5 分钟时间，专注于呼吸，可以帮助缓解当下的焦虑感。',
    });
    setShowFeedback(true);
  };

  return (
    <div className="mood-diary-container">
      {/* Header */}
      <header className="diary-header">
        <button className="back-btn">
          <span>←</span>
          <span>返回</span>
        </button>
        <h1>记录情绪</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Main Content */}
      <div className="diary-content">
        {/* Emotion Selection */}
        <Card className="emotion-select-card">
          <h2>此刻你的情绪是？</h2>
          <p className="select-subtitle">选择一个最符合你现在感受的情绪</p>

          <div className="emotion-grid-large">
            {emotions.map((emotion) => (
              <button
                key={emotion.value}
                className={`emotion-card ${selectedEmotion?.value === emotion.value ? 'selected' : ''}`}
                onClick={() => handleEmotionSelect(emotion)}
                style={selectedEmotion?.value === emotion.value ? {
                  borderColor: emotion.color,
                  backgroundColor: `${emotion.color}20`
                } : {}}
              >
                <span className="emotion-emoji-large">{emotion.emoji}</span>
                <span className="emotion-label-large">{emotion.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Notes Section - Shows after emotion selected */}
        {selectedEmotion && (
          <Card className="notes-card">
            <h2>发生了什么？</h2>
            <p className="notes-subtitle">简单描述一下引发这个情绪的事件（可选）</p>

            <textarea
              className="notes-textarea"
              placeholder="例如：今天和同事发生了争执..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />

            {/* Voice Input */}
            <button className="voice-input-btn">
              <span className="voice-icon">🎤</span>
              <span>语音输入</span>
            </button>
          </Card>
        )}

        {/* AI Questions - Optional */}
        {selectedEmotion && notes && (
          <Card className="ai-questions-card">
            <div className="ai-header">
              <span className="ai-icon">✨</span>
              <h2>AI 小助手想问你</h2>
            </div>
            <p className="questions-subtitle">回答这些问题可以帮助你更好地理解和梳理情绪</p>

            <div className="questions-list">
              {aiQuestions.map((question, index) => (
                <div key={index} className="question-item">
                  <span className="question-number">{index + 1}</span>
                  <span className="question-text">{question}</span>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              fullWidth
              onClick={() => setShowAIQuestions(true)}
            >
              展开问答
            </Button>
          </Card>
        )}

        {/* Submit Button */}
        {selectedEmotion && (
          <div className="submit-section">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="submit-btn"
              onClick={handleSubmit}
            >
              提交记录
            </Button>
          </div>
        )}
      </div>

      {/* AI Feedback Modal */}
      <Modal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        title="AI 分析结果"
      >
        {aiFeedback && (
          <div className="feedback-content">
            <div className="feedback-section">
              <div className="feedback-icon emotion">🎯</div>
              <div className="feedback-text">
                <h3>情绪识别</h3>
                <p>{aiFeedback.recognition}</p>
              </div>
            </div>

            <div className="feedback-section">
              <div className="feedback-icon empathy">💙</div>
              <div className="feedback-text">
                <h3>共情回应</h3>
                <p>{aiFeedback.empathy}</p>
              </div>
            </div>

            <div className="feedback-section">
              <div className="feedback-icon suggestion">💡</div>
              <div className="feedback-text">
                <h3>调节建议</h3>
                <p>{aiFeedback.suggestion}</p>
              </div>
            </div>

            <div className="feedback-actions">
              <Button variant="secondary" onClick={() => setShowFeedback(false)}>
                稍后再说
              </Button>
              <Button variant="primary" onClick={() => setShowFeedback(false)}>
                开始练习
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MoodDiary;
