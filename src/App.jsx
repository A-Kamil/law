import { useState, useEffect } from 'react';
import './App.css';
import { QUESTIONS_DATA } from './questions.js';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'quiz', 'result'
  const [selectedSubject, setSelectedSubject] = useState(null); // 'DS' or 'IS'
  const [selectedLevel, setSelectedLevel] = useState(null); // 'beginner', 'intermediate', 'expert', 'exam'
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Local storage stats tracking
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('quizz_juridique_stats');
    if (saved) return JSON.parse(saved);
    return {
      DS: { beginner: 0, intermediate: 0, expert: 0, exam: 0 },
      IS: { beginner: 0, intermediate: 0, expert: 0, exam: 0 }
    };
  });

  // Countdown timer for Mock Exams (15 minutes)
  const [timer, setTimer] = useState(900); // 15 mins in seconds
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('quizz_juridique_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false);
      setCurrentView('result');
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const startQuiz = (subject, level) => {
    setSelectedSubject(subject);
    setSelectedLevel(level);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setCurrentView('quiz');

    if (level === 'exam') {
      setTimer(900); // 15 minutes
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  };

  const handleAnswerClick = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const questions = QUESTIONS_DATA[selectedSubject][selectedLevel];
    if (index === questions[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    const questions = QUESTIONS_DATA[selectedSubject][selectedLevel];
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      setTimerActive(false);
      // Save stats
      setStats((prev) => {
        const currentBest = prev[selectedSubject][selectedLevel];
        const newScore = Math.round((score / questions.length) * 100);
        return {
          ...prev,
          [selectedSubject]: {
            ...prev[selectedSubject],
            [selectedLevel]: Math.max(currentBest, newScore)
          }
        };
      });
      setCurrentView('result');
    }
  };

  const resetHome = () => {
    setTimerActive(false);
    setCurrentView('home');
    setSelectedSubject(null);
    setSelectedLevel(null);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getGlobalMastery = (subject) => {
    const levels = stats[subject];
    const avg = (levels.beginner + levels.intermediate + levels.expert + levels.exam) / 4;
    if (avg === 100) return { label: "Maître Absolu 👑", class: "master-100" };
    if (avg >= 75) return { label: "Expert Confirmé 🎓", class: "master-expert" };
    if (avg >= 50) return { label: "Praticien Intermédiaire ⚖️", class: "master-inter" };
    if (avg >= 1) return { label: "Initié Débutant 🌱", class: "master-init" };
    return { label: "Non initié 📁", class: "master-none" };
  };

  const renderHome = () => (
    <div className="home-container fade-in">
      <header className="header">
        <div className="brand-badge">PRO-LAW QUIZ v2.0</div>
        <h1>Plateforme d'Excellence Académique</h1>
        <p>Maîtrisez le Droit des Sûretés (DS) et l'Impôt sur les Sociétés (IS) grâce aux quiz tirés de vos fiches officielles de cours.</p>
      </header>
      
      <div className="card-container">
        {/* Droit des Sûretés */}
        <div className="subject-card ds-card">
          <div className="card-header-row">
            <h2>Droit des Sûretés (DS)</h2>
            <span className={`mastery-badge ${getGlobalMastery('DS').class}`}>
              {getGlobalMastery('DS').label}
            </span>
          </div>
          <p>Le cautionnement, la garantie autonome, la lettre d'intention, les sûretés réelles (gage, nantissement, réserve de propriété, etc.).</p>
          
          <div className="progress-section">
            <div className="stat-row">
              <span>Niveau Débutant</span>
              <strong>{stats.DS.beginner}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-ds" style={{width: `${stats.DS.beginner}%`}}></div></div>

            <div className="stat-row mt-2">
              <span>Niveau Intermédiaire</span>
              <strong>{stats.DS.intermediate}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-ds" style={{width: `${stats.DS.intermediate}%`}}></div></div>

            <div className="stat-row mt-2">
              <span>Niveau Expert</span>
              <strong>{stats.DS.expert}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-ds" style={{width: `${stats.DS.expert}%`}}></div></div>

            <div className="stat-row mt-2">
              <span>Examen Blanc (Meilleur)</span>
              <strong>{stats.DS.exam}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-ds" style={{width: `${stats.DS.exam}%`}}></div></div>
          </div>

          <div className="level-buttons mt-4">
            <div className="level-grid-3">
              <button onClick={() => startQuiz('DS', 'beginner')} className="btn btn-outline">Débutant</button>
              <button onClick={() => startQuiz('DS', 'intermediate')} className="btn btn-outline">Intermédiaire</button>
              <button onClick={() => startQuiz('DS', 'expert')} className="btn btn-outline">Expert</button>
            </div>
            <button onClick={() => startQuiz('DS', 'exam')} className="btn btn-ds-solid mt-2">💻 Lancer un Examen Blanc</button>
          </div>
        </div>

        {/* Impôt sur les Sociétés */}
        <div className="subject-card is-card">
          <div className="card-header-row">
            <h2>Impôt sur les Sociétés (IS)</h2>
            <span className={`mastery-badge ${getGlobalMastery('IS').class}`}>
              {getGlobalMastery('IS').label}
            </span>
          </div>
          <p>Acte anormal de gestion, abus de droit (simulation, fraude à la loi), règles de rattachement, charges déductibles, amortissements, provisions.</p>
          
          <div className="progress-section">
            <div className="stat-row">
              <span>Niveau Débutant</span>
              <strong>{stats.IS.beginner}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-is" style={{width: `${stats.IS.beginner}%`}}></div></div>

            <div className="stat-row mt-2">
              <span>Niveau Intermédiaire</span>
              <strong>{stats.IS.intermediate}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-is" style={{width: `${stats.IS.intermediate}%`}}></div></div>

            <div className="stat-row mt-2">
              <span>Niveau Expert</span>
              <strong>{stats.IS.expert}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-is" style={{width: `${stats.IS.expert}%`}}></div></div>

            <div className="stat-row mt-2">
              <span>Examen Blanc (Meilleur)</span>
              <strong>{stats.IS.exam}%</strong>
            </div>
            <div className="mini-progress-bar"><div className="mini-fill fill-is" style={{width: `${stats.IS.exam}%`}}></div></div>
          </div>

          <div className="level-buttons mt-4">
            <div className="level-grid-3">
              <button onClick={() => startQuiz('IS', 'beginner')} className="btn btn-outline">Débutant</button>
              <button onClick={() => startQuiz('IS', 'intermediate')} className="btn btn-outline">Intermédiaire</button>
              <button onClick={() => startQuiz('IS', 'expert')} className="btn btn-outline">Expert</button>
            </div>
            <button onClick={() => startQuiz('IS', 'exam')} className="btn btn-is-solid mt-2">💻 Lancer un Examen Blanc</button>
          </div>
        </div>
      </div>

      <div className="disclaimer-footer mt-4">
        📚 Les questions ont été extraites avec précision de vos fichiers <strong>FICHES DS.pdf</strong> (Droit des Sûretés) et <strong>FICHES IS.pdf</strong> (Impôt sur les Sociétés).
      </div>
    </div>
  );

  const renderQuiz = () => {
    const questions = QUESTIONS_DATA[selectedSubject][selectedLevel];
    const question = questions[currentQuestionIndex];
    const isExam = selectedLevel === 'exam';

    return (
      <div className="quiz-container fade-in">
        <div className="quiz-header">
          <button onClick={resetHome} className="btn btn-text">← Quitter</button>
          
          {isExam && (
            <div className={`timer-badge ${timer < 180 ? 'timer-danger' : ''}`}>
              ⏱️ {formatTime(timer)}
            </div>
          )}

          <div className="progress-text">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="score-text">Score actuel: {score}</div>
        </div>

        <div className="progress-bar">
          <div 
            className={`progress-fill ${selectedSubject === 'DS' ? 'bg-ds' : 'bg-is'}`}
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="question-box">
          <div className="badge-row">
            <span className={`badge ${selectedLevel}`}>
              {selectedLevel === 'exam' ? 'Examen Blanc' : `Niveau ${selectedLevel}`}
            </span>
            <span className="badge-subject">
              {selectedSubject === 'DS' ? 'Droit des Sûretés' : 'Impôt sur les Sociétés'}
            </span>
          </div>
          <h2 className="question-text">{question.text}</h2>
          
          <div className="options-grid">
            {question.options.map((option, index) => {
              let btnClass = "btn-option";
              if (showExplanation) {
                if (index === question.answer) btnClass += " correct";
                else if (index === selectedAnswer) btnClass += " incorrect";
                else btnClass += " disabled";
              }
              return (
                <button 
                  key={index} 
                  className={btnClass}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showExplanation}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className={`explanation-box fade-in-up ${selectedAnswer === question.answer ? 'exp-correct' : 'exp-incorrect'}`}>
            <h3>{selectedAnswer === question.answer ? '🎉 Excellente réponse !' : '💡 Explication juridique'}</h3>
            <p>{question.explanation}</p>
            <button onClick={nextQuestion} className={`btn btn-large mt-3 ${selectedSubject === 'DS' ? 'btn-ds-solid' : 'btn-is-solid'}`}>
              {currentQuestionIndex + 1 === questions.length ? 'Terminer et voir les résultats' : 'Question suivante'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderResult = () => {
    const questions = QUESTIONS_DATA[selectedSubject][selectedLevel];
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let emoji = "🎓";
    if (percentage === 100) {
      message = "Performance exceptionnelle ! Une maîtrise parfaite du sujet, félicitations !";
      emoji = "👑";
    } else if (percentage >= 80) {
      message = "Excellent ! Votre niveau de préparation est très rassurant pour vos examens.";
      emoji = "⭐";
    } else if (percentage >= 50) {
      message = "Bon résultat, mais certains points méritent encore une relecture attentive de vos fiches.";
      emoji = "📈";
    } else {
      message = "Ne vous découragez pas ! Relisez les explications fournies dans le quiz et retentez votre chance.";
      emoji = "📚";
    }

    return (
      <div className="result-container fade-in">
        <div className="result-card">
          <div className="result-emoji">{emoji}</div>
          <h2>Quizz Terminé !</h2>
          <p className="result-meta">
            {selectedSubject === 'DS' ? 'Droit des Sûretés' : 'Impôt sur les Sociétés'} — {selectedLevel === 'exam' ? 'Examen Blanc' : `Niveau ${selectedLevel}`}
          </p>
          
          <div className="score-circle-container">
            <div className="score-circle">
              <span className="score-number">{score} / {questions.length}</span>
              <span className="score-percentage">{percentage}%</span>
            </div>
          </div>
          
          <p className="score-message">{message}</p>
          
          <div className="result-actions mt-4">
            <button onClick={() => startQuiz(selectedSubject, selectedLevel)} className="btn btn-outline">🔄 Recommencer</button>
            <button onClick={resetHome} className="btn btn-primary">🏠 Retour à l'accueil</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      {currentView === 'home' && renderHome()}
      {currentView === 'quiz' && renderQuiz()}
      {currentView === 'result' && renderResult()}
    </div>
  );
}

export default App;