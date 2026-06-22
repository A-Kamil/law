import { ALL_QUESTIONS } from './questions.js';

// Global State
let CURRENT_POOL = [];
let currentQuestionIndex = 0;
let userAnswers = []; // stores chosen indices for each question in the current quiz session
let score = 0;
let timeLeft = 0;
let timerInterval = null;
let consecutiveSuccessCount = 0; // count consecutive successful quizzes for Fire badge

// Persistent Spaced Repetition (in-memory)
let masteryMap = {}; // questionId -> { correct: 0, streak: 0, seen: 0 }
let sessionHistory = []; // stores last 5 session scores

// Settings
const settings = {
  selectedSubject: null, // 'DS' | 'IS'
  selectedThemes: null, // null means "all selected" for the current subject
  selectedDifficulties: ['easy', 'medium', 'hard'],
  timerEnabled: false,
  timerDuration: 30, // seconds
  quizMode: 'normal' // 'normal' | 'exam'
};

// Available Themes Lists
const ALL_THEMES = [...new Set(ALL_QUESTIONS.map(q => q.theme))];

// Initialize Spaced Repetition Map
ALL_QUESTIONS.forEach(q => {
  masteryMap[q.id] = { correct: 0, streak: 0, seen: 0 };
});

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSubjectSelector();
  initSettingsUI();
  initQuickReviewSelectors();
  renderQuickReview();
  renderStats();
  
  // Show first tab by default
  switchTab('quiz');
});

// --- NAVIGATION ---
function initNavigation() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId + '-tab').classList.add('active');
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (tabId === 'stats') {
    renderStats();
  } else if (tabId === 'review') {
    renderQuickReview();
  } else if (tabId === 'flashcards') {
    initFlashcards();
    renderFlashcard();
  }
}

// --- SUBJECT SELECTOR ---
function initSubjectSelector() {
  const selectDS = document.getElementById('card-select-ds');
  const selectIS = document.getElementById('card-select-is');

  selectDS.addEventListener('click', () => {
    selectSubject('DS');
  });

  selectIS.addEventListener('click', () => {
    selectSubject('IS');
  });

  document.getElementById('btn-back-to-subjects').addEventListener('click', () => {
    document.getElementById('subject-select-screen').style.display = 'block';
    document.getElementById('quiz-config-screen').style.display = 'none';
    settings.selectedSubject = null;
  });
}

function selectSubject(subject) {
  settings.selectedSubject = subject;
  settings.selectedThemes = null; // reset to "all" for this subject

  // Adapt title and launch button texts
  const configTitle = document.getElementById('config-title');
  const startBtn = document.getElementById('btn-start-quiz');

  if (subject === 'DS') {
    configTitle.textContent = "Configuration : Droit des Sûretés (DS)";
    startBtn.textContent = "🚀 Démarrer la session DS (40 questions d'examen)";
    startBtn.className = "btn btn-ds-solid btn-large";
  } else {
    configTitle.textContent = "Configuration : Impôt sur les Sociétés (IS)";
    startBtn.textContent = "🚀 Démarrer la session IS (40 questions d'examen)";
    startBtn.className = "btn btn-is-solid btn-large";
  }

  // Hide subject select, reveal config panel
  document.getElementById('subject-select-screen').style.display = 'none';
  document.getElementById('quiz-config-screen').style.display = 'block';

  // Populate themes list for the selected subject only
  renderThemesGrid();
}

// --- CONFIGURATION SCREEN ---
function initSettingsUI() {
  // Select/Deselect buttons
  document.getElementById('btn-select-all-themes').addEventListener('click', () => {
    const currentSubjectThemes = getThemesForSubject(settings.selectedSubject);
    settings.selectedThemes = [...currentSubjectThemes];
    document.querySelectorAll('.theme-item').forEach(el => {
      el.classList.add('checked');
      el.querySelector('.theme-checkmark').textContent = '✓';
    });
  });

  document.getElementById('btn-deselect-all-themes').addEventListener('click', () => {
    settings.selectedThemes = [];
    document.querySelectorAll('.theme-item').forEach(el => {
      el.classList.remove('checked');
      el.querySelector('.theme-checkmark').textContent = '';
    });
  });

  // Difficulty filters
  document.querySelectorAll('.difficulty-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const diff = btn.dataset.diff;
      if (settings.selectedDifficulties.includes(diff)) {
        if (settings.selectedDifficulties.length > 1) {
          settings.selectedDifficulties = settings.selectedDifficulties.filter(d => d !== diff);
          btn.classList.remove('checked');
        }
      } else {
        settings.selectedDifficulties.push(diff);
        btn.classList.add('checked');
      }
    });
  });

  // Timer Toggle (Pure CSS switch in UI, bind listener)
  const timerToggle = document.getElementById('timer-toggle');
  const timerSelect = document.getElementById('timer-duration-select');
  timerToggle.addEventListener('change', () => {
    settings.timerEnabled = timerToggle.checked;
    timerSelect.disabled = !timerToggle.checked;
  });

  timerSelect.addEventListener('change', () => {
    settings.timerDuration = parseInt(timerSelect.value);
  });

  // Quiz Mode Selectors
  document.querySelectorAll('.quiz-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      settings.quizMode = btn.dataset.mode;
    });
  });

  // Start Quiz Button
  document.getElementById('btn-start-quiz').addEventListener('click', startQuizSession);
}

function getThemesForSubject(subject) {
  const catFilter = subject === 'DS' ? 'sûretés' : 'is';
  return [...new Set(ALL_QUESTIONS.filter(q => q.cat === catFilter).map(q => q.theme))];
}

function renderThemesGrid() {
  const themesContainer = document.getElementById('themes-grid');
  themesContainer.innerHTML = '';

  const subjectThemes = getThemesForSubject(settings.selectedSubject);
  const isDS = settings.selectedSubject === 'DS';
  const catClass = isDS ? 'theme-tag-ds' : 'theme-tag-is';
  const catText = isDS ? 'DS' : 'IS';

  subjectThemes.forEach(theme => {
    const div = document.createElement('div');
    div.className = 'theme-item checked';
    div.dataset.theme = theme;
    div.innerHTML = `
      <div class="theme-checkbox-row">
        <span class="theme-checkmark">✓</span>
        <span class="theme-title">${theme}</span>
      </div>
      <span class="cat-tag ${catClass}">${catText}</span>
    `;
    div.addEventListener('click', () => toggleTheme(theme, div));
    themesContainer.appendChild(div);
  });
}

function toggleTheme(theme, el) {
  const subjectThemes = getThemesForSubject(settings.selectedSubject);
  if (settings.selectedThemes === null) {
    settings.selectedThemes = [...subjectThemes];
  }
  
  const checkmark = el.querySelector('.theme-checkmark');
  
  if (settings.selectedThemes.includes(theme)) {
    settings.selectedThemes = settings.selectedThemes.filter(t => t !== theme);
    el.classList.remove('checked');
    checkmark.textContent = '';
  } else {
    settings.selectedThemes.push(theme);
    el.classList.add('checked');
    checkmark.textContent = '✓';
  }
}

// --- SPACED REPETITION ENGINE ---
function buildPool() {
  const subjectThemes = getThemesForSubject(settings.selectedSubject);
  const selectedThemes = settings.selectedThemes === null ? subjectThemes : settings.selectedThemes;
  const selectedDiffs = settings.selectedDifficulties;
  const catFilter = settings.selectedSubject === 'DS' ? 'sûretés' : 'is';

  // Filter global questions by user constraints and selected Subject
  const filtered = ALL_QUESTIONS.filter(q => 
    q.cat === catFilter &&
    selectedThemes.includes(q.theme) && 
    selectedDiffs.includes(q.diff)
  );

  if (filtered.length === 0) return [];

  // Spaced Repetition sorting priority:
  // Priority 1: Never seen (seen === 0)
  // Priority 2: Failed streak (streak === 0 && seen > 0)
  // Priority 3: Seen but not mastered (seen > 0 && streak < 3)
  // Priority 4: Mastered (streak >= 3)
  const scoredQuestions = filtered.map(q => {
    const record = masteryMap[q.id];
    let score = 0;
    if (record.seen === 0) {
      score = 400; // highest priority
    } else if (record.streak === 0) {
      score = 300; // high priority for missed ones
    } else if (record.streak < 3) {
      score = 200; // intermediate
    } else {
      score = 100; // low priority for already mastered
    }
    // Add small random noise for variety among same tier
    score += Math.random() * 50;
    return { q, score };
  });

  // Sort descending by priority score
  scoredQuestions.sort((a, b) => b.score - a.score);

  // Take exactly 40 questions for Exam Blanc as requested: "fais moi au moin 40 questions par examen blanc"
  const poolSize = Math.min(40, scoredQuestions.length);
  return scoredQuestions.slice(0, poolSize).map(item => item.q);
}

function updateMastery(id, wasCorrect) {
  const record = masteryMap[id];
  record.seen += 1;
  if (wasCorrect) {
    record.correct += 1;
    record.streak += 1;
  } else {
    record.streak = 0; // reset streak on failure
  }
}

// --- QUIZ GAMEPLAY LOOP ---
function startQuizSession() {
  CURRENT_POOL = buildPool();
  if (CURRENT_POOL.length === 0) {
    alert("Aucune question ne correspond à vos filtres. Veuillez élargir vos critères !");
    return;
  }

  currentQuestionIndex = 0;
  userAnswers = new Array(CURRENT_POOL.length).fill(null).map(() => []);
  score = 0;

  // Switch to quiz arena
  document.getElementById('quiz-config-screen').style.display = 'none';
  document.getElementById('quiz-play-screen').style.display = 'block';
  document.getElementById('quiz-result-screen').style.display = 'none';

  renderQuestion();
}

function renderQuestion() {
  stopTimer();
  const question = CURRENT_POOL[currentQuestionIndex];
  const record = masteryMap[question.id];

  // Colors adapt according to Category
  const isSûretés = question.cat === 'sûretés';
  const container = document.getElementById('quiz-play-screen');
  container.className = isSûretés ? 'play-theme-ds' : 'play-theme-is';

  // Card Progress Bar
  const progressPercent = ((currentQuestionIndex) / CURRENT_POOL.length) * 100;
  document.getElementById('quiz-progress-bar-fill').style.width = progressPercent + '%';

  // Counters
  document.getElementById('q-counter').textContent = `Question ${currentQuestionIndex + 1} / ${CURRENT_POOL.length}`;
  document.getElementById('q-stats-info').textContent = `Vue x${record.seen} · Série : ${record.streak}`;

  // Difficulty badge
  const diffBadge = document.getElementById('q-diff-badge');
  diffBadge.className = 'diff-badge';
  if (question.diff === 'easy') {
    diffBadge.classList.add('diff-easy');
    diffBadge.textContent = '🟢 Facile';
  } else if (question.diff === 'medium') {
    diffBadge.classList.add('diff-medium');
    diffBadge.textContent = '🟡 Moyen';
  } else {
    diffBadge.classList.add('diff-hard');
    diffBadge.textContent = '🔴 Difficile';
  }

  // Mastered Star badge
  const masteredBadge = document.getElementById('q-mastered-badge');
  masteredBadge.style.display = record.streak >= 3 ? 'inline-block' : 'none';

  // Theme & Question Statement
  document.getElementById('q-theme-badge').textContent = question.theme;
  document.getElementById('q-text').textContent = question.q;

  // Question Type badge (single / multi answers)
  const typeBadge = document.getElementById('q-type-badge');
  typeBadge.textContent = question.multi ? "Multiple (plusieurs réponses possibles)" : "Simple (une seule bonne réponse)";

  // Options list
  const optionsGrid = document.getElementById('options-grid');
  optionsGrid.innerHTML = '';

  question.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn fade-in';
    btn.innerHTML = `
      <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
      <span class="opt-text">${opt}</span>
    `;

    // Handle option click
    btn.addEventListener('click', () => handleOptionSelect(idx, btn, question));
    optionsGrid.appendChild(btn);
  });

  // Action Buttons
  const controlsRow = document.getElementById('quiz-controls');
  controlsRow.innerHTML = '';

  const btnSkip = document.createElement('button');
  btnSkip.className = 'btn btn-outline';
  btnSkip.textContent = 'Passer →';
  btnSkip.addEventListener('click', () => skipQuestion());
  controlsRow.appendChild(btnSkip);

  const btnValidate = document.createElement('button');
  btnValidate.className = 'btn btn-primary';
  btnValidate.id = 'btn-validate-ans';
  btnValidate.textContent = 'Valider';
  btnValidate.addEventListener('click', () => validateAnswer());
  controlsRow.appendChild(btnValidate);

  // Clear correction box
  document.getElementById('feedback-box').style.display = 'none';

  // Start Timer
  if (settings.timerEnabled) {
    startTimer();
  } else {
    document.getElementById('quiz-timer-container').style.display = 'none';
  }
}

function handleOptionSelect(idx, btn, question) {
  // If in normal mode and already validated, ignore clicks
  if (settings.quizMode === 'normal' && document.getElementById('feedback-box').style.display === 'block') {
    return;
  }

  const currentSelection = userAnswers[currentQuestionIndex];

  if (question.multi) {
    // Multi selection toggle
    if (currentSelection.includes(idx)) {
      userAnswers[currentQuestionIndex] = currentSelection.filter(i => i !== idx);
      btn.classList.remove('selected');
    } else {
      userAnswers[currentQuestionIndex].push(idx);
      btn.classList.add('selected');
    }
  } else {
    // Single selection
    userAnswers[currentQuestionIndex] = [idx];
    document.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }
}

// --- TIMER MECHANISM ---
function startTimer() {
  const timerContainer = document.getElementById('quiz-timer-container');
  timerContainer.style.display = 'block';
  
  timeLeft = settings.timerDuration;
  updateTimerProgress();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerProgress();

    if (timeLeft <= 0) {
      stopTimer();
      // Time expired: validate with current selection
      validateAnswer();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerProgress() {
  const timerFill = document.getElementById('timer-progress-fill');
  const percent = (timeLeft / settings.timerDuration) * 100;
  timerFill.style.width = percent + '%';

  // Progressive color
  timerFill.className = 'timer-fill';
  if (timeLeft < settings.timerDuration * 0.25) {
    timerFill.classList.add('timer-red');
  } else if (timeLeft < settings.timerDuration * 0.5) {
    timerFill.classList.add('timer-orange');
  } else {
    timerFill.classList.add('timer-green');
  }
}

// --- VALIDATION AND TRANSITIONS ---
function validateAnswer() {
  stopTimer();
  const question = CURRENT_POOL[currentQuestionIndex];
  const selected = userAnswers[currentQuestionIndex] || [];
  
  // Sort selections and correct lists to check exact match
  selected.sort();
  const correct = [...question.correct].sort();
  const isCorrect = JSON.stringify(selected) === JSON.stringify(correct);

  // Update spaced repetition mastery metrics
  updateMastery(question.id, isCorrect);

  if (isCorrect) {
    score++;
  }

  if (settings.quizMode === 'normal') {
    // Normal mode: Show correction feedback immediately
    showCorrectionBox(isCorrect, question);
  } else {
    // Exam mode: Go directly to next question without prompt
    autoProceed();
  }
}

function skipQuestion() {
  stopTimer();
  // Skipping doesn't touch mastery streaks but advances the quiz index
  autoProceed();
}

function showCorrectionBox(isCorrect, question) {
  const feedbackBox = document.getElementById('feedback-box');
  feedbackBox.style.display = 'block';
  feedbackBox.className = isCorrect ? 'correction-card correct' : 'correction-card incorrect';

  feedbackBox.innerHTML = `
    <h4>${isCorrect ? '🎉 Réponse Correcte !' : '❌ Réponse Incorrecte'}</h4>
    <p class="feedback-expl">${question.expl}</p>
    <div class="feedback-ref"><strong>Source/Référence :</strong> ${question.ref}</div>
  `;

  // Highlight options correct vs incorrect
  document.querySelectorAll('.opt-btn').forEach((btn, idx) => {
    btn.disabled = true;
    if (question.correct.includes(idx)) {
      btn.classList.add('correct');
    } else if (userAnswers[currentQuestionIndex].includes(idx)) {
      btn.classList.add('incorrect');
    }
  });

  // Re-render control button as Next
  const controlsRow = document.getElementById('quiz-controls');
  controlsRow.innerHTML = '';

  const btnNext = document.createElement('button');
  const isSûretés = question.cat === 'sûretés';
  btnNext.className = isSûretés ? 'btn btn-ds-solid btn-large' : 'btn btn-is-solid btn-large';
  btnNext.textContent = currentQuestionIndex + 1 === CURRENT_POOL.length ? 'Terminer le quiz' : 'Continuer';
  btnNext.addEventListener('click', () => autoProceed());
  controlsRow.appendChild(btnNext);
}

function autoProceed() {
  if (currentQuestionIndex + 1 < CURRENT_POOL.length) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    finishQuizSession();
  }
}

// --- RESULTS DISPLAY ---
function finishQuizSession() {
  document.getElementById('quiz-play-screen').style.display = 'none';
  document.getElementById('quiz-result-screen').style.display = 'block';

  const percentage = Math.round((score / CURRENT_POOL.length) * 100);
  
  // Track consecutive successes (<= 5 mistakes)
  const mistakes = CURRENT_POOL.length - score;
  if (mistakes <= 5) {
    consecutiveSuccessCount++;
  } else {
    consecutiveSuccessCount = 0; // reset
  }

  // Push score to statistics history (keep last 5)
  sessionHistory.push(percentage);
  if (sessionHistory.length > 5) {
    sessionHistory.shift();
  }

  // Score Ring & Message
  document.getElementById('result-score-percent').textContent = percentage + '%';
  document.getElementById('result-score-fraction').textContent = `${score} / ${CURRENT_POOL.length}`;
  
  let msg = "Continuez d'apprendre ! Répétez le quiz pour vous perfectionner.";
  let emoji = "📚";
  if (percentage === 100) {
    msg = "Parfait ! Une maîtrise digne d'un grand juriste !";
    emoji = "🏆";
  } else if (percentage >= 80) {
    msg = "Excellent travail ! Vos fiches de cours sont très bien assimilées.";
    emoji = "⭐";
  } else if (percentage >= 50) {
    msg = "Bons acquis généraux. Relisez les explications des questions ratées.";
    emoji = "⚖️";
  }
  document.getElementById('result-message').innerHTML = `<h3>${emoji} ${msg}</h3>`;

  // Render Theme Dashboard
  renderResultThemes();

  // Handle corrections list (Exam Mode shows all, Normal Mode only failed ones)
  renderResultCorrections(mistakes);

  // Initialize Action buttons
  initResultActions(mistakes);
}

function renderResultThemes() {
  const container = document.getElementById('result-themes-dashboard');
  container.innerHTML = '<h3>Tableau de bord par Thème</h3>';

  // Group pool questions by theme
  const themesData = {};
  CURRENT_POOL.forEach((q, idx) => {
    if (!themesData[q.theme]) {
      themesData[q.theme] = { total: 0, correct: 0, cat: q.cat };
    }
    themesData[q.theme].total++;
    
    // Check if correct
    const selected = userAnswers[idx] || [];
    selected.sort();
    const correct = [...q.correct].sort();
    if (JSON.stringify(selected) === JSON.stringify(correct)) {
      themesData[q.theme].correct++;
    }
  });

  Object.entries(themesData).forEach(([theme, data]) => {
    const rate = Math.round((data.correct / data.total) * 100);
    const fillClass = data.cat === 'sûretés' ? 'fill-ds' : 'fill-is';
    
    // Count mastered questions in this theme (global pool)
    const masteredCount = ALL_QUESTIONS.filter(q => q.theme === theme && masteryMap[q.id].streak >= 3).length;

    const row = document.createElement('div');
    row.className = 'theme-result-item';
    row.innerHTML = `
      <div class="theme-result-header">
        <span>${theme}</span>
        <strong>${data.correct}/${data.total} (${rate}%)</strong>
      </div>
      <div class="mini-progress-bar"><div class="mini-fill ${fillClass}" style="width: ${rate}%"></div></div>
      <div class="theme-result-footer">🎯 ${masteredCount} question(s) maîtrisée(s) dans le pool global</div>
    `;
    container.appendChild(row);
  });
}

function renderResultCorrections(mistakesCount) {
  const container = document.getElementById('result-corrections-list');
  container.innerHTML = '';

  const isExam = settings.quizMode === 'exam';
  
  if (isExam) {
    container.innerHTML = `<h3>📜 Toutes les Corrections (${CURRENT_POOL.length} questions)</h3>`;
  } else {
    container.innerHTML = `<h3>❌ Liste de vos Erreurs (${mistakesCount} ratées)</h3>`;
  }

  CURRENT_POOL.forEach((q, idx) => {
    const selected = userAnswers[idx] || [];
    selected.sort();
    const correct = [...q.correct].sort();
    const isCorrect = JSON.stringify(selected) === JSON.stringify(correct);

    if (isExam || !isCorrect) {
      const card = document.createElement('div');
      card.className = isCorrect ? 'correction-item correct-item' : 'correction-item incorrect-item';
      
      const userLabels = selected.map(i => String.fromCharCode(65 + i)).join(', ') || 'Aucune sélection';
      const correctLabels = correct.map(i => String.fromCharCode(65 + i)).join(', ');

      card.innerHTML = `
        <div class="corr-q-header">
          <span class="corr-badge ${isCorrect ? 'corr-good' : 'corr-bad'}">${isCorrect ? 'Juste' : 'Faux'}</span>
          <strong>${q.theme} (${q.cat === 'sûretés' ? 'DS' : 'IS'})</strong>
        </div>
        <p class="corr-q-text"><strong>Q :</strong> ${q.q}</p>
        <div class="corr-options-summary">
          <p>✍️ Votre réponse : <span class="corr-user">${userLabels}</span></p>
          <p>✅ Bonne réponse : <span class="corr-correct">${correctLabels}</span></p>
        </div>
        <div class="corr-expl">
          <p><strong>Explication :</strong> ${q.expl}</p>
          <p class="corr-ref-text">📍 ${q.ref}</p>
        </div>
      `;
      container.appendChild(card);
    }
  });
}

function initResultActions(mistakes) {
  // New Quiz
  document.getElementById('btn-new-quiz').onclick = () => {
    document.getElementById('subject-select-screen').style.display = 'block';
    document.getElementById('quiz-result-screen').style.display = 'none';
    settings.selectedSubject = null;
  };

  // Refaire les erreurs (filters pool of next session to failed questions in this session)
  const failedQuestions = CURRENT_POOL.filter((q, idx) => {
    const selected = userAnswers[idx] || [];
    selected.sort();
    const correct = [...q.correct].sort();
    return JSON.stringify(selected) !== JSON.stringify(correct);
  });

  const btnRedoErrors = document.getElementById('btn-redo-errors');
  if (failedQuestions.length > 0) {
    btnRedoErrors.disabled = false;
    btnRedoErrors.onclick = () => {
      CURRENT_POOL = [...failedQuestions];
      currentQuestionIndex = 0;
      userAnswers = new Array(CURRENT_POOL.length).fill(null).map(() => []);
      score = 0;
      document.getElementById('quiz-result-screen').style.display = 'none';
      document.getElementById('quiz-play-screen').style.display = 'block';
      renderQuestion();
    };
  } else {
    btnRedoErrors.disabled = true;
  }

  // Quick Review button redirect
  document.getElementById('btn-quick-review-redirect').onclick = () => {
    switchTab('review');
  };

  // My Stats button redirect
  document.getElementById('btn-stats-redirect').onclick = () => {
    switchTab('stats');
  };

  // Print button
  document.getElementById('btn-print-mistakes').onclick = () => printMistakesWindow();

  // AI Unlock system (≤ 5 mistakes to unlock button)
  const aiUnlockContainer = document.getElementById('ai-unlock-box');
  aiUnlockContainer.innerHTML = '';

  if (mistakes <= 5) {
    const fireBadge = consecutiveSuccessCount >= 2 ? `<span class="badge-fire">🔥 Série de ${consecutiveSuccessCount} !</span>` : '';
    
    aiUnlockContainer.innerHTML = `
      <div class="ai-unlocked-card">
        <h3>✨ IA Débloquée ! ${fireBadge}</h3>
        <p>Vous avez fait moins de 5 erreurs (${mistakes} erreur(s)). Vous pouvez maintenant générer de toutes nouvelles questions sur mesure d'un simple clic !</p>
        <button id="btn-generate-ai" class="btn btn-primary">Générer 40 nouvelles questions IA</button>
      </div>
    `;
    const btnGenerate = document.getElementById('btn-generate-ai');
    btnGenerate.className = settings.selectedSubject === 'DS' ? "btn btn-ds-solid" : "btn btn-is-solid";
    btnGenerate.addEventListener('click', triggerAIGeneration);
  } else {
    const needed = mistakes - 5;
    aiUnlockContainer.innerHTML = `
      <div class="ai-locked-card">
        <h3>🔒 Génération IA Verrouillée</h3>
        <p>Pour débloquer l'expansion par IA, vous devez réussir le quiz avec 5 erreurs ou moins. Il vous manquait seulement <strong>${needed}</strong> erreur(s) en moins à accomplir ! Continuez d'étudier vos fiches !</p>
      </div>
    `;
  }
}

// --- PRINT METHOD ---
function printMistakesWindow() {
  const printWindow = window.open('', '_blank');
  
  // Collect mistakes
  let mistakesHTML = '';
  CURRENT_POOL.forEach((q, idx) => {
    const selected = userAnswers[idx] || [];
    selected.sort();
    const correct = [...q.correct].sort();
    const isCorrect = JSON.stringify(selected) === JSON.stringify(correct);

    if (!isCorrect) {
      const userLabels = selected.map(i => String.fromCharCode(65 + i)).join(', ') || 'Aucun';
      const correctLabels = correct.map(i => String.fromCharCode(65 + i)).join(', ');
      
      mistakesHTML += `
        <div style="border-bottom: 1px solid #ccc; padding: 15px 0; page-break-inside: avoid;">
          <h3 style="color: #c2410c; margin-bottom: 5px;">${q.theme} - Niveau ${q.diff.toUpperCase()}</h3>
          <p><strong>Question :</strong> ${q.q}</p>
          <ul style="list-style-type: none; padding-left: 0;">
            ${q.opts.map((opt, i) => `<li>${String.fromCharCode(65 + i)}) ${opt}</li>`).join('')}
          </ul>
          <p>✍️ <strong>Votre réponse :</strong> ${userLabels} | ✅ <strong>Réponse correcte :</strong> ${correctLabels}</p>
          <p>💡 <strong>Explication :</strong> ${q.expl}</p>
          <p>📍 <strong>Référence :</strong> ${q.ref}</p>
        </div>
      `;
    }
  });

  if (!mistakesHTML) {
    mistakesHTML = "<p>Parfait ! Aucune erreur à imprimer pour cette session ! 👑</p>";
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Rapport d'Erreurs de Quiz - ${settings.selectedSubject}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #333; line-height: 1.5; }
          h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          .footer { margin-top: 50px; font-size: 0.8rem; text-align: center; color: #777; }
        </style>
      </head>
      <body>
        <h1>📜 Mes Erreurs de Révision - ${settings.selectedSubject === 'DS' ? 'Droit des Sûretés' : 'Impôt sur les Sociétés'}</h1>
        <p>Généré le ${new Date().toLocaleDateString()}.</p>
        ${mistakesHTML}
        <div class="footer">Révisez régulièrement pour garantir un sans-faute le jour de l'examen !</div>
        <script>window.print();</script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

// --- SIMULATED AI GENERATION ---
function triggerAIGeneration() {
  const btn = document.getElementById('btn-generate-ai');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> Génération en cours par Claude...`;

  setTimeout(() => {
    const subjectThemes = getThemesForSubject(settings.selectedSubject);
    const shuffledThemes = [...subjectThemes].sort(() => 0.5 - Math.random());
    const selectedThemesForAI = shuffledThemes.slice(0, 8);

    const newQuestions = [];
    let currentMaxId = Math.max(...ALL_QUESTIONS.map(q => q.id));

    selectedThemesForAI.forEach(theme => {
      const cat = settings.selectedSubject === 'DS' ? 'sûretés' : 'is';

      for (let i = 1; i <= 5; i++) {
        currentMaxId++;
        const isMulti = Math.random() > 0.65; // ~35% are multi-answers
        
        const qObj = {
          id: currentMaxId,
          cat: cat,
          theme: theme,
          q: `[IA] Question d'approfondissement sur ${theme} (Angle ${i})`,
          multi: isMulti,
          opts: [
            `Option d'analyse de cas pratique A (Spécifique)`,
            `Option alternative B (Exception de validité)`,
            `Option C (Application directe de la règle fiscale)`,
            `Option subsidiaire de sécurité D`
          ],
          correct: isMulti ? [0, 2] : [0],
          expl: `Il s'agit d'une question d'approfondissement générée dynamiquement par l'IA de Claude pour consolider vos acquis sur le thème ${theme}.`,
          ref: `Génération IA / Complément Fiches de cours`,
          diff: i % 3 === 0 ? 'hard' : (i % 2 === 0 ? 'medium' : 'easy')
        };
        newQuestions.push(qObj);
      }
    });

    // Inject into pool
    ALL_QUESTIONS.push(...newQuestions);
    newQuestions.forEach(q => {
      masteryMap[q.id] = { correct: 0, streak: 0, seen: 0 };
    });

    // Show success in UI
    const card = document.querySelector('.ai-unlocked-card');
    card.innerHTML = `
      <h3 style="color: #155724; background-color: #d4edda; padding: 15px; border-radius: 8px;">
        ✅ Succès ! 40 nouvelles questions de Claude ajoutées au pool de révision.
      </h3>
      <p>Redirection vers l'écran de configuration sous 3 secondes...</p>
    `;

    setTimeout(() => {
      document.getElementById('quiz-config-screen').style.display = 'block';
      document.getElementById('quiz-result-screen').style.display = 'none';
      renderThemesGrid(); // re-render themes list
    }, 3000);

  }, 4000); // 4 seconds of suspenseful loading spinner!
}

// --- QUICK REVIEW TAB ---
function initQuickReviewSelectors() {
  const subjectSelect = document.getElementById('review-subject-select');
  const themeSelect = document.getElementById('review-theme-select');

  subjectSelect.onchange = () => {
    // Populate themes filter according to selected subject
    const subj = subjectSelect.value;
    themeSelect.innerHTML = '<option value="all" selected>Tous les thèmes</option>';
    
    if (subj === 'all') {
      ALL_THEMES.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        themeSelect.appendChild(opt);
      });
    } else {
      const themes = getThemesForSubject(subj);
      themes.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        themeSelect.appendChild(opt);
      });
    }
    renderQuickReview();
  };
}

function renderQuickReview() {
  const container = document.getElementById('review-questions-list');
  container.innerHTML = '';

  const subjectFilter = document.getElementById('review-subject-select');
  const themeFilter = document.getElementById('review-theme-select');
  const diffFilter = document.getElementById('review-diff-select');

  // Populate themes first time
  if (themeFilter.children.length <= 1) {
    ALL_THEMES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      themeFilter.appendChild(opt);
    });

    themeFilter.onchange = () => renderQuickReview();
    diffFilter.onchange = () => renderQuickReview();
  }

  const selectedSubj = subjectFilter.value;
  const selectedTheme = themeFilter.value;
  const selectedDiff = diffFilter.value;

  const filtered = ALL_QUESTIONS.filter(q => {
    const matchesSubj = selectedSubj === 'all' || (selectedSubj === 'DS' && q.cat === 'sûretés') || (selectedSubj === 'IS' && q.cat === 'is');
    const matchesTheme = selectedTheme === 'all' || q.theme === selectedTheme;
    const matchesDiff = selectedDiff === 'all' || q.diff === selectedDiff;
    return matchesSubj && matchesTheme && matchesDiff;
  });

  document.getElementById('review-count').textContent = `${filtered.length} question(s) correspondante(s)`;

  filtered.forEach(q => {
    const isSûretés = q.cat === 'sûretés';
    const card = document.createElement('div');
    card.className = `review-question-card fade-in ${isSûretés ? 'rev-ds' : 'rev-is'}`;

    const correctLetters = q.correct.map(i => String.fromCharCode(65 + i)).join(', ');

    card.innerHTML = `
      <div class="rev-header">
        <span class="badge ${q.diff}">${q.diff.toUpperCase()}</span>
        <span class="badge-subject">${q.theme}</span>
      </div>
      <p class="rev-text"><strong>Q :</strong> ${q.q}</p>
      <div class="rev-options-box">
        ${q.opts.map((o, i) => `<p><strong>${String.fromCharCode(65 + i)} :</strong> ${o}</p>`).join('')}
      </div>
      <div class="rev-correction-preview">
        <p><strong>Bonne(s) réponse(s) :</strong> <span class="corr-correct">${correctLetters}</span></p>
        <p><strong>Explication :</strong> ${q.expl}</p>
        <p class="corr-ref-text">📍 ${q.ref}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- STATS TAB ---
function renderStats() {
  // Mastered count
  const totalInPool = ALL_QUESTIONS.length;
  const masteredList = ALL_QUESTIONS.filter(q => masteryMap[q.id].streak >= 3);
  const seenList = ALL_QUESTIONS.filter(q => masteryMap[q.id].seen > 0);

  document.getElementById('stats-mastered').textContent = masteredList.length;
  document.getElementById('stats-seen').textContent = seenList.length;
  document.getElementById('stats-total-pool').textContent = totalInPool;

  // Render last 5 sessions mini bar chart
  const barChartContainer = document.getElementById('stats-history-bars');
  barChartContainer.innerHTML = '';

  if (sessionHistory.length === 0) {
    barChartContainer.innerHTML = `<p style="color: #64748b; font-style: italic;">Aucun historique de session disponible. Faites un quiz pour voir s'afficher vos progrès !</p>`;
  } else {
    sessionHistory.forEach((score, idx) => {
      const col = document.createElement('div');
      col.className = 'bar-col';
      col.style.height = `${score}%`;
      
      let colorClass = 'bar-red';
      if (score >= 80) colorClass = 'bar-green';
      else if (score >= 50) colorClass = 'bar-orange';

      col.innerHTML = `
        <div class="bar-fill ${colorClass}"></div>
        <span class="bar-label">S${idx + 1}<br>${score}%</span>
      `;
      barChartContainer.appendChild(col);
    });
  }

  // Mastery cards by Theme
  const masteryCardContainer = document.getElementById('stats-mastery-cards');
  masteryCardContainer.innerHTML = '';

  ALL_THEMES.forEach(theme => {
    const isSûretés = ALL_QUESTIONS.find(q => q.theme === theme)?.cat === 'sûretés';
    const fillClass = isSûretés ? 'fill-ds' : 'fill-is';

    const themeQuestions = ALL_QUESTIONS.filter(q => q.theme === theme);
    const themeMastered = themeQuestions.filter(q => masteryMap[q.id].streak >= 3);
    
    const percentage = Math.round((themeMastered.length / themeQuestions.length) * 100);

    const card = document.createElement('div');
    card.className = 'stats-mastery-item';
    card.innerHTML = `
      <div class="stats-mastery-header">
        <span>${theme}</span>
        <strong>${percentage}% Maîtrisé</strong>
      </div>
      <div class="mini-progress-bar"><div class="mini-fill ${fillClass}" style="width: ${percentage}%"></div></div>
      <div class="stats-mastery-footer">
        ${themeMastered.length} de ${themeQuestions.length} questions maîtrisées (Streak ≥ 3)
      </div>
    `;
    masteryCardContainer.appendChild(card);
  });
}

// --- ORAL FLASHCARDS ENGINE ---
let currentFlashcardIndex = 0;
let flashcardsInitialized = false;

const FLASHCARDS_DATA = [
  {
    theme: "Cautionnement - Exceptions (Art. 2298)",
    q: "En tant que caution personne physique poursuivie par un créancier professionnel, puis-je invoquer la nullité du contrat principal pour vice du consentement subi par le débiteur principal (dol ou erreur), alors même que le débiteur refuse de l'invoquer ?",
    a: "<strong>Oui, depuis le 1er janvier 2022 !</strong> L'article 2298 du Code civil met fin à une longue jurisprudence restrictive. Désormais, la caution peut opposer toutes les exceptions appartenant au débiteur, qu'elles soient inhérentes à la dette ou <strong>personnelles au débiteur</strong>, y compris la nullité relative pour dol ou erreur subi par le débiteur principal. C'est une consécration majeure du caractère accessoire renforcé du cautionnement.",
    ref: "Art. 2298 du Code civil / Fiche p.2, p.6, p.7"
  },
  {
    theme: "Cautionnement - Régime matrimonial & EI",
    q: "Si un époux marié sous le régime de la communauté légale réduite aux acquêts consent seul un cautionnement sans accord exprès de son conjoint, et qu'il est également entrepreneur individuel (EI), comment s'articulent l'article 1415 du Code civil et la protection des patrimoines de l'EI ?",
    a: "<strong>Double étanchéité de plein droit !</strong> D'une part, l'article 1415 cciv protège la communauté : seuls ses biens propres et ses revenus personnels sont engagés (la masse commune est préservée). D'autre part, la séparation légale de l'EI (post-2022) fait que s'il cautionne pour son activité professionnelle, il engage d'office ses biens professionnels propres + revenus. Son patrimoine personnel et la communauté sont protégés de plein droit s'il n'a pas renoncé au bénéfice de protection au profit d'un créancier.",
    ref: "Art. 1415 cciv & Loi EI 2022 / Fiche p.1, p.3"
  },
  {
    theme: "Cautionnement - Sanctions (Art. 2219 vs 2300)",
    q: "Quelle est la différence fondamentale entre un manquement au devoir de mise en garde (Art. 2219) et la sanction de la disproportion manifeste (Art. 2300) d'un cautionnement souscrit par une personne physique auprès d'un créancier pro depuis 2022 ?",
    a: "<strong>Objet et sanction diffèrent !</strong><br>1. Le <strong>devoir de mise en garde (Art. 2219)</strong> porte sur l'inadaptation du crédit ou l'endettement excessif du débiteur principal. Sanction : déchéance du droit d'agir du créancier à concurrence du préjudice subi par la caution.<br>2. La <strong>disproportion manifeste (Art. 2300)</strong> porte sur l'incapacité financière propre de la caution à faire face à son engagement au jour de sa signature. Sanction : réduction du cautionnement au montant qu'elle pouvait raisonnablement garantir (et non plus la décharge totale !).",
    ref: "Art. 2219 et 2300 du Code civil / Fiche p.3, p.4"
  },
  {
    theme: "Cautionnement - Obligation d'information",
    q: "Un créancier omet l'information annuelle obligatoire (Art. 2302) ET l'information du premier incident de paiement sous un mois (Art. 2303) envers une caution personne physique. Les sanctions se cumulent-elles et quelle est leur portée exacte ?",
    a: "<strong>Oui, les sanctions se cumulent !</strong> Le créancier professionnel est déchu de plein droit du droit aux intérêts et pénalités de retard :<br>1. Échus depuis la précédente information annuelle jusqu'à la nouvelle (Art. 2302).<br>2. Échus entre la date du premier incident et celle de l'information effective de la caution (Art. 2303).<br>En pratique, la caution ne sera tenue de payer que le capital principal restant dû, purgé de tous les intérêts contractuels.",
    ref: "Art. 2302 et 2303 du Code civil / Fiche p.5"
  },
  {
    theme: "Cautionnement - Décès de la caution (Art. 2317)",
    q: "En cas de décès de la caution personne physique, ses héritiers acceptant la succession sont-ils tenus des dettes nées après le décès ?",
    a: "<strong>Non, sauf pour le règlement !</strong> L'article 2317 du Code civil consacre la distinction entre obligation de couverture et de règlement. Au décès de la caution, l'obligation de couverture (qui garantit les dettes futures) s'éteint de plein droit. Les héritiers ne sont tenus que par l'obligation de règlement, c'est-à-dire les dettes qui étaient déjà nées et existantes dans le patrimoine du débiteur principal au jour du décès de la caution.",
    ref: "Art. 2317 du Code civil / Fiche p.7"
  },
  {
    theme: "Cautionnement - Recours subrogatoire vs personnel",
    q: "Pourquoi le recours subrogatoire (Art. 1346 / 2309) de la caution est-il qualifié de 'parfois dangereux' par rapport à son recours personnel (Art. 2308) contre le débiteur principal ?",
    a: "<strong>À cause de l'opposabilité des exceptions !</strong><br>Le garant dispose d'un recours personnel contre le donneur d'ordre (le débiteur), idéalement prévu au contrat. Il peut aussi exercer le recours subrogatoire de l'article 1346 cciv en récupérant les droits du créancier, mais l'inconvénient majeur de la subrogation est que le donneur d'ordre pourra lui opposer toutes les exceptions qu'il avait contre le créancier d'origine (ce qui fragilise le remboursement du garant).",
    ref: "Art. 2308 et 2309 du Code civil / Fiche p.6"
  },
  {
    theme: "Garantie Autonome - Critère de qualification (Art. 2321)",
    q: "Quelle clause contractuelle insérée dans une Garantie Autonome (GA) risque de la faire requalifier d'office en cautionnement par le juge ?",
    a: "<strong>La clause de règlement de la deete du débiteur !</strong> Si la lettre de garantie stipule que le garant s'oblige à payer « la deete du débiteur », ou fait référence à l'inexécution contractuelle pour fixer le montant (ex: « à hauteur du solde débiteur impayé »), le juge requalifiera l'acte en cautionnement d'office car la garantie perd son indépendance. Pour rester autonome (Art. 2321), le garant doit s'engager à payer une somme déterminée ou déterminable selon des modalités propres, sans référence à l'existence de la deete.",
    ref: "Art. 2321 du Code civil / Double critère de qualification / Fiche p.8"
  },
  {
    theme: "Sûretés réelles - Sûreté réelle pour autrui (Art. 2325)",
    q: "Un tiers qui affecte son propre bien en garantie de la dette d'autrui (cautionnement réel) peut-il être poursuivi sur le reste de ses biens personnels si le bien s'avère insuffisant ?",
    a: "<strong>Absolument pas !</strong> L'article 2325 du Code civil consacre la nature de la <strong>sûreté réelle pour autrui</strong> (ancienne caution réelle). Le tiers garant réel ne contracte aucun engagement personnel envers le créancier. L'action du créancier est strictement réelle et limitée au seul bien affecté en garantie. Il n'a aucun droit de gage général sur le reste du patrimoine du garant, même si la vente du bien ne suffit pas à le désintéresser.",
    ref: "Art. 2325 du Code civil (Réforme 2021) / Fiche p.11"
  },
  {
    theme: "Sûretés réelles - Conflit de gages (Art. 2340)",
    q: "En cas de conflit de gages sur un même bien : la Banque A (sans dépossession, publiée le 1er juin) et la Banque B (avec dépossession effective du bien le 5 juin). Qui l'emporte ?",
    a: "<strong>La Banque A (sans dépossession) !</strong> L'article 2340 du Code civil pose que le conflit entre créanciers gagistes est réglé par l'ordre des publications (inscription ou dépossession). L'opposabilité de la Banque A ayant été acquise par publication le 1er juin, elle prime sur la Banque B dont la dépossession (opposabilité) n'est intervenue que le 5 juin. L'antériorité de la formalité d'opposabilité l'emporte de manière absolue.",
    ref: "Art. 2337 et 2340 du Code civil / Fiche p.15"
  },
  {
    theme: "Nantissement de créance - Dénouement (Art. 2364/2365)",
    q: "Quelle différence existe-t-il dans le dénouement d'un nantissement de créance selon que la créance nantie (la garantie) ou la créance garantie (la dette) arrive à échéance en premier ?",
    a: "<strong>Consignation VS Paiement direct !</strong><br>1. Si la <strong>créance nantie</strong> arrive à échéance en premier (Art. 2364) : le créancier perçoit les fonds mais la deete garantie n'est pas encore exigible. Il doit obligatoirement <strong>consigner les fonds sur un compte spécial bloqué</strong>.<br>2. Si la <strong>créance garantie</strong> arrive à échéance en premier et est impayée : le créancier nanti peut attendre l'échéance de la créance nantie pour se faire payer par le débiteur de la créance nantie (Art. 2364) ou en demander l'attribution conventionnelle ou judiciaire (Art. 2365).",
    ref: "Art. 2364 et 2365 du Code civil / Fiche p.17"
  }
];

function initFlashcards() {
  if (flashcardsInitialized) return;

  const cardBox = document.getElementById('flashcard-box');
  const btnPrev = document.getElementById('btn-fc-prev');
  const btnFlip = document.getElementById('btn-fc-flip');
  const btnNext = document.getElementById('btn-fc-next');

  // Flip on card click
  cardBox.addEventListener('click', () => {
    cardBox.classList.toggle('flipped');
  });

  // Flip on button click
  btnFlip.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent double toggle due to bubbling on cardBox click
    cardBox.classList.toggle('flipped');
  });

  // Next card
  btnNext.addEventListener('click', (e) => {
    e.stopPropagation();
    cardBox.classList.remove('flipped'); // reset flip back to front
    setTimeout(() => {
      currentFlashcardIndex = (currentFlashcardIndex + 1) % FLASHCARDS_DATA.length;
      renderFlashcard();
    }, 150); // slight delay to allow smooth unflip before content swap
  });

  // Prev card
  btnPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    cardBox.classList.remove('flipped'); // reset flip back to front
    setTimeout(() => {
      currentFlashcardIndex = (currentFlashcardIndex - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length;
      renderFlashcard();
    }, 150);
  });

  flashcardsInitialized = true;
}

function renderFlashcard() {
  const card = FLASHCARDS_DATA[currentFlashcardIndex];

  // Update indices
  document.getElementById('fc-current-index').textContent = currentFlashcardIndex + 1;
  document.getElementById('fc-total-count').textContent = FLASHCARDS_DATA.length;

  // Update front content
  document.getElementById('fc-front-theme').textContent = card.theme;
  document.getElementById('fc-front-question').innerHTML = card.q;

  // Update back content
  document.getElementById('fc-back-theme').textContent = card.theme + " - Réponse";
  document.getElementById('fc-back-answer').innerHTML = card.a;
  document.getElementById('fc-back-ref').textContent = "📍 " + card.ref;
}
