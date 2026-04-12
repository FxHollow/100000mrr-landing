import { useState } from 'react';
import { Card, Button, Badge } from '../components';
import './Practice.css';

function Practice() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeExercise, setActiveExercise] = useState(null);

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'breathing', label: '呼吸' },
    { id: 'writing', label: '书写' },
    { id: 'reframing', label: '认知重构' },
    { id: 'mindfulness', label: '正念' },
  ];

  const exercises = [
    {
      id: 1,
      title: '5 分钟正念呼吸',
      category: 'breathing',
      duration: '5 分钟',
      difficulty: '简单',
      emoji: '🧘',
      description: '通过专注于呼吸来平静思绪，减轻焦虑和压力。',
      benefits: ['缓解焦虑', '提升专注力', '快速平静'],
      suitableFor: ['焦虑', '压力大', '注意力分散'],
    },
    {
      id: 2,
      title: '情绪书写练习',
      category: 'writing',
      duration: '10 分钟',
      difficulty: '中等',
      emoji: '📝',
      description: '通过自由书写梳理混乱的情绪，获得内心清晰。',
      benefits: ['情绪释放', '自我觉察', '思维整理'],
      suitableFor: ['情绪混乱', '思绪繁杂', '需要宣泄'],
    },
    {
      id: 3,
      title: '认知重构引导',
      category: 'reframing',
      duration: '8 分钟',
      difficulty: '中等',
      emoji: '💭',
      description: '识别并挑战负面思维模式，建立更平衡的认知。',
      benefits: ['减少负面思维', '改善情绪', '建立弹性'],
      suitableFor: ['负面想法多', '自我批评', ' catastrophizing'],
    },
    {
      id: 4,
      title: '身体扫描冥想',
      category: 'mindfulness',
      duration: '15 分钟',
      difficulty: '简单',
      emoji: '🔍',
      description: '逐步觉察身体各部位的感受，释放紧张的部位。',
      benefits: ['身体放松', '觉察提升', '缓解疼痛'],
      suitableFor: ['身体紧张', '失眠', '需要深度放松'],
    },
    {
      id: 5,
      title: '4-7-8 呼吸法',
      category: 'breathing',
      duration: '3 分钟',
      difficulty: '简单',
      emoji: '💨',
      description: '快速缓解焦虑的呼吸技巧，帮助快速入睡。',
      benefits: ['快速放松', '助眠', '缓解急性焦虑'],
      suitableFor: ['失眠', '急性焦虑', '需要快速平静'],
    },
    {
      id: 6,
      title: '感恩日记',
      category: 'writing',
      duration: '5 分钟',
      difficulty: '简单',
      emoji: '🙏',
      description: '记录三件值得感恩的事，培养积极心态。',
      benefits: ['提升幸福感', '改善情绪', '培养积极思维'],
      suitableFor: ['情绪低落', '缺乏动力', '想要提升幸福感'],
    },
  ];

  const filteredExercises = selectedCategory === 'all'
    ? exercises
    : exercises.filter(ex => ex.category === selectedCategory);

  return (
    <div className="practice-container">
      {/* Header */}
      <header className="practice-header">
        <button className="back-btn">
          <span>←</span>
          <span>返回</span>
        </button>
        <h1>情绪调节练习</h1>
        <div className="header-spacer"></div>
      </header>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-chip ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="exercises-list">
        {filteredExercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={`exercise-card ${activeExercise === exercise.id ? 'active' : ''}`}
            onClick={() => setActiveExercise(activeExercise === exercise.id ? null : exercise.id)}
          >
            <div className="exercise-header">
              <div className="exercise-info">
                <span className="exercise-emoji">{exercise.emoji}</span>
                <div className="exercise-text">
                  <h3>{exercise.title}</h3>
                  <div className="exercise-meta">
                    <span className="meta-item">⏱ {exercise.duration}</span>
                    <Badge
                      variant={exercise.difficulty === '简单' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant={activeExercise === exercise.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {activeExercise === exercise.id ? '进行中' : '开始'}
              </Button>
            </div>

            {/* Expanded Content */}
            {activeExercise === exercise.id && (
              <div className="exercise-details">
                <p className="exercise-description">{exercise.description}</p>

                <div className="details-section">
                  <h4>✨ 练习益处</h4>
                  <div className="benefits-list">
                    {exercise.benefits.map((benefit, index) => (
                      <Badge key={index} variant="primary" size="sm">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="details-section">
                  <h4>🎯 适合场景</h4>
                  <div className="benefits-list">
                    {exercise.suitableFor.map((scenario, index) => (
                      <Badge key={index} variant="ghost" size="sm">
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="primary" fullWidth size="lg">
                  开始练习
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Quick Start Section */}
      <Card className="quick-start-card">
        <div className="quick-start-header">
          <span className="quick-icon">⚡</span>
          <h2>快速调节</h2>
        </div>
        <p className="quick-start-desc">
          感到情绪激动时，试试这个 1 分钟快速平静技巧
        </p>
        <Button variant="primary" fullWidth className="quick-start-btn">
          🌬️ 1 分钟呼吸空间
        </Button>
      </Card>

      {/* Progress Summary */}
      <Card className="progress-card">
        <h2>本周练习进度</h2>
        <div className="progress-content">
          <div className="progress-stat">
            <span className="stat-value">3</span>
            <span className="stat-label">次练习</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">28</span>
            <span className="stat-label">分钟</span>
          </div>
          <div className="progress-stat">
            <span className="stat-value">🔥</span>
            <span className="stat-label">3 天连续</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Practice;
