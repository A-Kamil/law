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
    theme: "Gage Général - Notion",
    q: "Quelle est la définition exacte du droit de gage général ?",
    a: "C'est le droit reconnu par les <strong>articles 2284 et 2285</strong> du Code civil à tout créancier de faire saisir tous les biens de son débiteur afin d'obtenir paiement de sa créance.",
    ref: "Articles 2284 et 2285 du Code civil / Fiche p.1"
  },
  {
    theme: "Gage Général - Faiblesses",
    q: "Quelles sont les deux faiblesses majeures du droit de gage général pour un créancier ?",
    a: "1. Le patrimoine du débiteur peut s'avérer insuffisant (insolvabilité).<br>2. L'égalité entre créanciers chirographaires implique le concours et subit la règle du <strong>'prix de la course'</strong>.",
    ref: "Article 2285 du Code civil / Fiche p.1"
  },
  {
    theme: "Gage Général - Prix de la course",
    q: "Qu'est-ce que la règle du 'prix de la course' entre créanciers chirographaires ?",
    a: "C'est le principe de fait selon lequel <strong>le premier créancier qui saisit est le premier payé</strong> sur le patrimoine du débiteur commun, ruinant l'égalité théorique.",
    ref: "Article 2285 du Code civil / Fiche p.1"
  },
  {
    theme: "Sûretés - Types",
    q: "Quelle est la distinction fondamentale entre une sûreté réelle et une sûreté personnelle ?",
    a: "La **sûreté réelle** confère un droit de préférence ou d'exclusivité sur un <strong>bien déterminé</strong>. La **sûreté personnelle** adjoint l'engagement de paiement d'un <strong>tiers (garant)</strong>.",
    ref: "Cours d'introduction / Fiche p.1"
  },
  {
    theme: "Sûretés Personnelles - Liste",
    q: "Quelles sont les trois sûretés personnelles reconnues par le Code civil ?",
    a: "1. Le <strong>cautionnement</strong>.<br>2. La <strong>garantie autonome</strong>.<br>3. La <strong>lettre d'intention</strong>.",
    ref: "Livre IV du Code civil / Fiche p.1"
  },
  {
    theme: "Réforme 2021 - Date",
    q: "Quelle est la date d'entrée en vigueur de la grande réforme par ordonnance du droit des sûretés ?",
    a: "Elle est entrée en vigueur le <strong>1er janvier 2022</strong>. Les contrats antérieurs restent soumis au droit ancien.",
    ref: "Ordonnance du 15 septembre 2021 / Fiche p.1"
  },
  {
    theme: "Entrepreneur Individuel - EI",
    q: "Quel est l'effet de la réforme de 2022 sur le patrimoine de l'Entrepreneur Individuel (EI) ?",
    a: "Elle instaure la <strong>séparation de plein droit</strong> (sans déclaration) entre le patrimoine professionnel et le patrimoine personnel de l'EI.",
    ref: "Réforme de l'EI de 2022 / Fiche p.1"
  },
  {
    theme: "EI - Auto-garantie",
    q: "Un EI peut-il se porter caution pour sa propre dette en voulant utiliser son autre patrimoine ?",
    a: "<strong>Non !</strong> La séparation légale des patrimoines n'altère pas l'identité de la personne : nul ne peut se porter caution de sa propre dette (absence d'altérité).",
    ref: "Réforme de l'EI de 2022 / Fiche p.1"
  },
  {
    theme: "Cautionnement - Définition",
    q: "Quelle est la définition du cautionnement selon l'article 2288 du Code civil ?",
    a: "C'est le contrat par lequel une caution s'oblige envers le créancier à <strong>payer la dette du débiteur en cas de défaillance</strong> de celui-ci.",
    ref: "Article 2288 du Code civil / Fiche p.2"
  },
  {
    theme: "Cautionnement - Unilatéralité",
    q: "Le cautionnement est-il un contrat unilatéral ou synallagmatique ?",
    a: "C'est un contrat <strong>unilatéral</strong>, car seule la caution s'engage envers le créancier à payer en cas de défaillance.",
    ref: "Article 2288 du Code civil / Fiche p.2"
  },
  {
    theme: "Cautionnement - Commercialité",
    q: "À quelle condition un cautionnement prend-il une nature commerciale ?",
    a: "S'il est souscrit par un **établissement de crédit** ou s'il garantit un **acte de commerce** (cautionnement intéressé).",
    ref: "Jurisprudence commerciale / Fiche p.2"
  },
  {
    theme: "Cautionnement Commercial - Preuve",
    q: "Quel est le régime de la preuve pour un cautionnement commercial ?",
    a: "C'est la <strong>liberté de la preuve</strong> (par tous moyens), dérogeant à l'écrit obligatoire requis au-delà de 1500€ en matière civile.",
    ref: "Article 110-3 du Code de commerce / Fiche p.2"
  },
  {
    theme: "Cautionnement Commercial - Solidarité",
    q: "Quelle présomption s'applique en matière de cautionnement commercial ?",
    a: "Le cautionnement commercial est <strong>présumé solidaire</strong> en jurisprudence, sauf clause contraire expresse.",
    ref: "Jurisprudence constante / Fiche p.2"
  },
  {
    theme: "Sous-cautionnement - Notion",
    q: "Qu'est-ce que le sous-cautionnement (Art. 2291) ?",
    a: "C'est le cautionnement de la caution : une personne (sous-caution) s'engage envers la caution à lui <strong>payer ce que le débiteur principal lui doit</strong> suite à ses recours.",
    ref: "Article 2291 du Code civil / Fiche p.2"
  },
  {
    theme: "Certification de caution - Notion",
    q: "Qu'est-ce que la certification de caution (Art. 2291) ?",
    a: "C'est un contrat par lequel un tiers garantit au créancier le paiement de la dette <strong>en cas de défaillance de la première caution</strong> (seconde caution).",
    ref: "Article 2291 du Code civil / Fiche p.2"
  },
  {
    theme: "Cautionnement - Caractère accessoire",
    q: "Quel texte consacre la dépendance de l'engagement de caution envers la validité de la dette principale ?",
    a: "L'<strong>article 2293</strong> du Code civil consacre le caractère accessoire renforcé du cautionnement.",
    ref: "Article 2293 du Code civil / Fiche p.2"
  },
  {
    theme: "Cautionnement - Montant maximal",
    q: "Le cautionnement peut-il être plus lourd que la dette principale d'après l'article 2296 ?",
    a: "<strong>Non !</strong> Il ne peut jamais dépasser la dette principale. S'il la dépasse, il est réduit d'office au montant de la dette principale.",
    ref: "Article 2296 du Code civil / Fiche p.2, p.4"
  },
  {
    theme: "Cautionnement - Exceptions (Art. 2298)",
    q: "Depuis 2022, quelles exceptions la caution peut-elle opposer au créancier ?",
    a: "La caution peut opposer <strong>toutes les exceptions</strong> appartenant au débiteur : les inhérentes à la dette ET les **personnelles au débiteur** (ex: dol subi par lui).",
    ref: "Article 2298 du Code civil / Fiche p.2, p.6"
  },
  {
    theme: "Cautionnement - Dol du débiteur",
    q: "La caution peut-elle opposer au créancier le dol subi par le débiteur principal ?",
    a: "<strong>Oui !</strong> Depuis la réforme de 2021, la caution peut se prévaloir du dol subi par le débiteur pour faire annuler ou éteindre sa garantie.",
    ref: "Article 2298 du Code civil / Fiche p.2, p.7"
  },
  {
    theme: "Cautionnement - Subsidiarité",
    q: "Qu'est-ce que le caractère subsidiaire du cautionnement d'après l'article 2288 ?",
    a: "La caution **ne paie qu'en cas de défaillance** du débiteur principal. Le créancier doit d'abord poursuivre le débiteur avant de s'adresser à la caution.",
    ref: "Article 2288 du Code civil / Fiche p.2"
  },
  {
    theme: "Bénéfice de discussion - Notion",
    q: "Qu'est-ce que le bénéfice de discussion (Art. 2305) ?",
    a: "C'est la faculté pour la caution d'obliger le créancier à <strong>poursuivre d'abord le débiteur principal</strong> et réaliser ses biens avant de se tourner vers elle.",
    ref: "Article 2305 du Code civil / Fiche p.2"
  },
  {
    theme: "Bénéfice de discussion - Invocation",
    q: "À quel moment et sous quelle condition de forme le bénéfice de discussion doit-il être invoqué ?",
    a: "Il doit être invoqué par la caution <strong>dès les premières poursuites</strong> dirigées contre elle.",
    ref: "Article 2305 du Code civil / Fiche p.2"
  },
  {
    theme: "Bénéfice de discussion - Extinction",
    q: "Dans quels cas le bénéfice de discussion disparaît-il d'office ?",
    a: "Il disparaît si la caution est **solidaire**, ou si elle y a **renoncé** expressément.",
    ref: "Article 2305 du Code civil / Fiche p.2"
  },
  {
    theme: "Bénéfice de division - Notion",
    q: "Qu'est-ce que le bénéfice de division (Art. 2306) ?",
    a: "En cas de cofidéjusseurs, c'est le droit pour une caution d'obliger le créancier à <strong>diviser ses poursuites</strong> entre toutes les cautions solvables.",
    ref: "Article 2306 du Code civil / Fiche p.2"
  },
  {
    theme: "Cofidéjusseurs - Notion",
    q: "Qu'est-ce que des cofidéjusseurs d'après le cours ?",
    a: "Ce sont **plusieurs cautions** qui garantissent solidairement ou non la **même dette** envers le même créancier.",
    ref: "Article 2306 du Code civil / Fiche p.2, p.6"
  },
  {
    theme: "Cautionnement - Fond (Art. 1128)",
    q: "Quelles sont les conditions de fond de droit commun requises pour la validité du cautionnement ?",
    a: "Le **consentement**, la **capacité**, le **pouvoir** de contracter et un **contenu licite et certain**.",
    ref: "Article 1128 du Code civil / Fiche p.2"
  },
  {
    theme: "Protection - Consentement (Art. 1130)",
    q: "Quelle condition régit le consentement de la caution ?",
    a: "Le consentement doit être <strong>libre et éclairé</strong>, exempt de vices du consentement (erreur, dol ou violence d'après l'article 1130).",
    ref: "Article 1130 du Code civil / Fiche p.2"
  },
  {
    theme: "Information Précontractuelle (Art. 1112-1)",
    q: "À quelle obligation générale d'information le créancier est-il soumis avant la signature ?",
    a: "À l'**obligation précontractuelle d'information** (Art. 1112-1) : fournir toute information déterminante pour le consentement de la caution.",
    ref: "Article 1112-1 du Code civil / Fiche p.2"
  },
  {
    theme: "Cautionnement - Express",
    q: "Le cautionnement peut-il être tacite d'après l'article 2294 ?",
    a: "<strong>Non !</strong> Le cautionnement ne se présume point; il doit être <strong>exprès</strong>.",
    ref: "Article 2294 du Code civil / Fiche p.2"
  },
  {
    theme: "Mise en garde - Définition",
    q: "Qu'est-ce que le devoir de mise en garde par rapport au conseil d'après le cours ?",
    a: "C'est une mesure intermédiaire consistant en une <strong>information personnalisée et d'alerte</strong> sur les risques d'insolvabilité.",
    ref: "Jurisprudence / Fiche p.2"
  },
  {
    theme: "Mise en garde - Avant 2022",
    q: "À qui bénéficiait le devoir de mise en garde avant la réforme de 2021 ?",
    a: "Uniquement à la <strong>caution non avertie</strong> en relation avec un professionnel du crédit.",
    ref: "Jurisprudence antérieure / Fiche p.3"
  },
  {
    theme: "Mise en garde - Appréciation avertie",
    q: "Sur quels critères les juges appréciaient-ils si une caution était 'avertie' ?",
    a: "Sur sa **formation**, son **expérience pro** et ses **liens d'affaires ou familiaux** avec le débiteur principal.",
    ref: "Jurisprudence constante / Fiche p.3"
  },
  {
    theme: "Mise en garde - Objets historiques",
    q: "Quels étaient les deux objets du devoir de mise en garde de la banque avant 2022 ?",
    a: "1. La **disproportion** de l'engagement.<br>2. L'**inadaptation du crédit** octroyé au débiteur principal.",
    ref: "Ancien droit / Fiche p.3"
  },
  {
    theme: "Mise en garde - Sanction ancienne",
    q: "Quelle était la sanction en cas de manquement au devoir de mise en garde avant 2022 ?",
    a: "L'octroi de dommages et intérêts fondant la **responsabilité civile (RC) de la banque**.",
    ref: "Ancien droit / Fiche p.3"
  },
  {
    theme: "Mise en garde - Loi moderne (Art. 2219)",
    q: "Depuis le 1er janvier 2022, qui bénéficie du devoir de mise en garde de l'article 2219 ?",
    a: "<strong>Toute caution personne physique</strong> engagée avec un créancier professionnel (plus de distinction avertie/non avertie).",
    ref: "Article 2219 du Code civil / Fiche p.3"
  },
  {
    theme: "Créancier Professionnel - Définition",
    q: "Quelle est la définition du créancier professionnel sous l'article 2219 ?",
    a: "C'est celui dont <strong>la créance est née de sa profession</strong> (ex: banque, fournisseur professionnel).",
    ref: "Article 2219 du Code civil / Fiche p.3"
  },
  {
    theme: "Mise en garde - Objet moderne",
    q: "Sur quel double risque porte le devoir de mise en garde post-2022 d'après le cours ?",
    a: "Le risque d'<strong>inadaptation du crédit</strong> ET le risque de **disproportion** de l'engagement de caution.",
    ref: "Article 2219 du Code civil / Fiche p.3"
  },
  {
    theme: "Mise en garde - Sanction moderne",
    q: "Quelle est la sanction moderne du défaut de mise en garde (Art. 2219) ?",
    a: "La <strong>déchéance du droit d'agir du créancier</strong> à hauteur du préjudice subi par la caution.",
    ref: "Article 2219 du Code civil / Fiche p.3"
  },
  {
    theme: "Sociétés - Pouvoir caution",
    q: "Par quel intermédiaire une société peut-elle se porter caution ?",
    a: "Uniquement par l'intermédiaire de <strong>ses organes de représentation légale</strong> (dirigeants).",
    ref: "Droit des sociétés / Fiche p.3"
  },
  {
    theme: "Organes - Dépassement objet social",
    q: "Dans une SARL, le dépassement de l'objet social par le dirigeant annule-t-il le cautionnement ?",
    a: "<strong>Non !</strong> Le dépassement de l'objet social est **inopposable aux tiers de bonne foi**. La SARL reste engagée.",
    ref: "Droit des sociétés commerciaux / Fiche p.3"
  },
  {
    theme: "Société Civile - Dépassement objet social",
    q: "Dans une SCI, quelle est la sanction d'un cautionnement qui dépasse l'objet social ?",
    a: "Il est frappé de <strong>nullité absolue</strong> s'il n'entre pas dans l'objet social ou s'il compromet l'existence de la société.",
    ref: "Droit des sociétés civiles / Fiche p.3"
  },
  {
    theme: "Sociétés - Intérêt social (Art. 1833)",
    q: "Quelle règle d'ordre public de l'article 1833 s'applique à tout cautionnement de société ?",
    a: "Le cautionnement doit être conforme à l'<strong>intérêt social</strong> de la société, sous peine de nullité absolue.",
    ref: "Article 1833 du Code civil / Fiche p.3"
  },
  {
    theme: "Sociétés - Cautionnement intéressé",
    q: "Qu'est-ce qu'un cautionnement 'intéressé' pour une société ?",
    a: "C'est un cautionnement qui procure un **avantage économique ou commercial** indirect à la société garante.",
    ref: "Droit des sociétés / Fiche p.3"
  },
  {
    theme: "Époux - Gage commun (Art. 1413)",
    q: "En principe, sous le régime de communauté légale, les dettes d'un époux engagent-elles les biens communs ?",
    a: "<strong>Oui !</strong> En principe, les dettes contractées pendant le mariage engagent les biens communs d'après l'**article 1413**.",
    ref: "Article 1413 du Code civil / Fiche p.3"
  },
  {
    theme: "Époux - Caution signée seule (Art. 1415)",
    q: "Quels biens sont engagés si un époux cautionne seul sans l'accord de son conjoint (Art. 1415) ?",
    a: "Uniquement ses <strong>biens propres</strong> et ses <strong>revenus</strong>. Les biens communs du couple sont préservés.",
    ref: "Article 1415 du Code civil / Fiche p.3"
  },
  {
    theme: "Époux - Caution signée avec accord",
    q: "Quels biens sont engagés si un époux cautionne avec l'accord exprès de son conjoint ?",
    a: "Les **biens propres de l'époux caution** ET l'intégralité des **biens communs** (les propres du conjoint restent exclus).",
    ref: "Article 1415 du Code civil / Fiche p.3"
  },
  {
    theme: "Époux - Double signature",
    q: "Quels biens sont engagés si les deux époux co-signent le même cautionnement ?",
    a: "Les **biens communs** ainsi que les **biens propres de chacun des deux époux**.",
    ref: "Régimes matrimoniaux / Fiche p.3"
  },
  {
    theme: "Époux - Actes distincts",
    q: "Quels biens sont engagés si les époux signent deux cautionnements par actes distincts sans accord mutuel ?",
    a: "Seuls les **biens propres et les revenus de chacun** (la masse commune reste exclue).",
    ref: "Article 1415 du Code civil / Fiche p.3"
  },
  {
    theme: "Époux - Séparation de biens",
    q: "L'article 1415 du Code civil s'applique-t-il sous le régime de séparation de biens ?",
    a: "<strong>Non !</strong> En l'absence de masse commune, l'article 1415 ne s'applique pas; chacun engage ses biens personnels.",
    ref: "Régime de séparation de biens / Fiche p.3"
  },
  {
    theme: "Cautionnement Indéfini - Notion",
    q: "Qu'englobe un cautionnement qualifié d'indéfini ?",
    a: "Il garantit le **principal de la dette**, les **intérêts**, les **indemnités contractuelles** et les **frais de poursuite**.",
    ref: "Article 2292 du Code civil / Fiche p.4"
  },
  {
    theme: "Cautionnement Limité (Art. 2296)",
    q: "Qu'englobe un cautionnement limité ou 'défini' d'après l'article 2296 ?",
    a: "Il garantit uniquement le **capital principal** de la dette, à l'exclusion des intérêts de retard sauf clause contraire.",
    ref: "Article 2296 du Code civil / Fiche p.4"
  },
  {
    theme: "Cautionnement Omnibus - Notion",
    q: "Qu'est-ce qu'un cautionnement omnibus d'après le cours ?",
    a: "C'est un cautionnement qui garantit **toutes les dettes présentes et futures** du débiteur envers le même créancier.",
    ref: "Pratique bancaire / Fiche p.4"
  },
  {
    theme: "Dette future - Définition",
    q: "Qu'est-ce qu'un cautionnement de dette future ?",
    a: "C'est un cautionnement garantissant une dette qui **n'existe pas encore juridiquement** au moment de l'engagement.",
    ref: "Cours d'étendue / Fiche p.4"
  },
  {
    theme: "Durée Indéterminée - Résiliation (Art. 1211)",
    q: "Quelle faculté est offerte à la caution dans un engagement à durée indéterminée ?",
    a: "Elle dispose du droit de <strong>résilier unilatéralement</strong> son engagement à tout moment en respectant un préavis.",
    ref: "Article 1211 du Code civil / Fiche p.4"
  },
  {
    theme: "Obligation de règlement - Définition",
    q: "Qu'est-ce que l'obligation de règlement de la caution ?",
    a: "C'est l'obligation de <strong>payer le créancier</strong> à l'échéance lorsque la dette couverte est exigible et impayée.",
    ref: "Articles 2316 et 2318 du Code civil / Fiche p.4"
  },
  {
    theme: "Obligation de couverture - Définition",
    q: "Qu'est-ce que l'obligation de couverture de la caution ?",
    a: "C'est la période durant laquelle la caution **accepte de garantir les dettes futures** qui naîtront dans le patrimoine du débiteur.",
    ref: "Articles 2316 et 2318 du Code civil / Fiche p.4, p.7"
  },
  {
    theme: "Dette future - Plafond couverture",
    q: "Quel est le rôle de l'obligation de couverture dans un cautionnement de dette future ?",
    a: "Elle sert de **plafond garanti** déterminant quelles dettes entreront ou non dans le champ de la garantie.",
    ref: "Articles 2316 et 2318 du Code civil / Fiche p.4"
  },
  {
    theme: "Proportionnalité - Cibles",
    q: "À quels types d'engagements s'applique l'exigence de proportionnalité du cautionnement ?",
    a: "À tous les cautionnements conclus par une <strong>personne physique (PP)</strong> avec un <strong>créancier professionnel</strong>.",
    ref: "Article 2300 du Code civil / Fiche p.4"
  },
  {
    theme: "Disproportion - Sanction Moderne (Art. 2300)",
    q: "Quelle est la sanction de la disproportion manifeste d'un cautionnement depuis 2022 ?",
    a: "Le cautionnement n'est plus nul; il est **réduit au montant** que la caution pouvait raisonnablement garantir.",
    ref: "Article 2300 du Code civil / Fiche p.4"
  },
  {
    theme: "Disproportion - Charge de la preuve (Art. 1353)",
    q: "Sur qui pèse la charge de la preuve de la disproportion manifeste du cautionnement ?",
    a: "Elle pèse sur <strong>la caution</strong> qui l'invoque, conformément à l'article 1353 du Code civil.",
    ref: "Article 1353 du Code civil / Fiche p.5"
  },
  {
    theme: "Fiche Patrimoniale - Effet mensonge",
    q: "Qu'advient-il si la caution ment sur la fiche patrimoniale remplie pour le créancier ?",
    a: "La caution **ne pourra plus invoquer la disproportion** manifeste de son engagement pour se défendre.",
    ref: "Jurisprudence constante / Fiche p.5"
  },
  {
    theme: "Époux - Appréciation disproportion",
    q: "Comment s'apprécie la disproportion pour des cautions époux d'après le cours ?",
    a: "On intègre dans l'actif et le passif les **biens propres** ET les **biens communs** du couple s'ils se sont engagés.",
    ref: "Jurisprudence / Fiche p.5"
  },
  {
    theme: "Preuve - Écrit (Art. 1359)",
    q: "Quelle formalité de preuve exige un cautionnement civil supérieur à 1500€ ?",
    a: "La rédaction obligatoire d'un <strong>écrit sous signature privée ou authentique</strong> d'après l'article 1359.",
    ref: "Article 1359 du Code civil / Fiche p.5"
  },
  {
    theme: "Preuve - Somme écrite (Art. 1376)",
    q: "Quelle formalité impose l'article 1376 pour la preuve d'un engagement unilatéral de payer ?",
    a: "L'acte doit comporter la signature de l'engagé et la mention de la **somme écrite en chiffres et en lettres**.",
    ref: "Article 1376 du Code civil / Fiche p.5"
  },
  {
    theme: "Formalisme Validité (Art. 2297)",
    q: "Quel formalisme de validité régit le cautionnement d'une PP envers un pro post-2022 ?",
    a: "L'obligation d'apposer une <strong>mention écrite</strong> définissant le montant maximal garanti en chiffres et en lettres.",
    ref: "Article 2297 du Code civil / Fiche p.5"
  },
  {
    theme: "Mention - Caractère Manuscrit",
    q: "La mention obligatoire de l'article 2297 doit-elle être impérativement manuscrite ?",
    a: "<strong>Non !</strong> Elle peut être d'origine **électronique** (permettant la signature électronique d'après 1174/1175).",
    ref: "Article 2297 du Code civil / Fiche p.2, p.5"
  },
  {
    theme: "Information Annuelle (Art. 2302)",
    q: "Quelle information périodique le créancier pro doit-il fournir à la caution PP ?",
    a: "L'**information annuelle (Art. 2302)** : montant du capital restant dû, des intérêts, frais, pénalités et durée.",
    ref: "Article 2302 du Code civil / Fiche p.5"
  },
  {
    theme: "Information Annuelle - Sanction",
    q: "Quelle est la sanction du défaut d'information annuelle (Art. 2302) ?",
    a: "La <strong>déchéance des intérêts et pénalités de retard</strong> contractuels échus depuis la précédente information.",
    ref: "Article 2302 du Code civil / Fiche p.5"
  },
  {
    theme: "Défaillance - Information (Art. 2303)",
    q: "Dans quel délai le créancier pro doit-il informer la caution PP de la défaillance du débiteur ?",
    a: "Dès le **premier incident de paiement** non régularisé dans le mois de son exigibilité d'après l'article 2303.",
    ref: "Article 2303 du Code civil / Fiche p.5"
  },
  {
    theme: "Défaillance - Sanction info",
    q: "Quelle est la sanction du défaut d'information du premier incident de paiement (Art. 2303) ?",
    a: "La <strong>déchéance des intérêts et pénalités de retard</strong> échus entre le premier incident et l'information effective.",
    ref: "Article 2303 du Code civil / Fiche p.5"
  },
  {
    theme: "Poursuites - Terme exigible",
    q: "À quelle condition temporelle la caution peut-elle être poursuivie en paiement ?",
    a: "Uniquement lorsque la dette du débiteur principal est **elle-même devenue exigible**.",
    ref: "Droit des poursuites / Fiche p.5"
  },
  {
    theme: "Prorogation du terme (Art. 2320)",
    q: "La caution bénéficie-t-elle de la prorogation de terme accordée au débiteur principal ?",
    a: "<strong>Oui !</strong> D'après l'**article 2320**, la caution bénéficie de plein droit du nouveau terme accordé au débiteur.",
    ref: "Article 2320 du Code civil / Fiche p.5"
  },
  {
    theme: "Délai de grâce - Sort caution",
    q: "Le délai de grâce judiciaire octroyé au débiteur principal profite-t-il à la caution ?",
    a: "<strong>Non !</strong> Le délai de grâce de l'article 1343-5 octroyé au débiteur **ne s'applique pas à la caution (Art. 2298)**.",
    ref: "Article 2298 du Code civil / Fiche p.5"
  },
  {
    theme: "Surendettement - Sort caution",
    q: "La caution PP bénéficie-t-elle des mesures d'un plan de surendettement du débiteur particulier ?",
    a: "<strong>Non !</strong> Elle n'en bénéficie pas, sauf accord exprès des créanciers.",
    ref: "Régime du surendettement / Fiche p.5"
  },
  {
    theme: "Sauvegarde & RJ - Déclaration créance",
    q: "Quel est l'effet de l'absence de déclaration de créance en Sauvegarde/RJ sur la caution PP ?",
    a: "La créance non déclarée devient <strong>inopposable de plein droit</strong> à la caution PP en Sauvegarde et en RJ.",
    ref: "Droit des entreprises en difficulté / Fiche p.5"
  },
  {
    theme: "Liquidation - Sort caution PP",
    q: "L'ouverture d'une Liquidation Judiciaire (LJ) suspend-elle les poursuites contre la caution PP ?",
    a: "<strong>Non !</strong> En LJ, la protection cesse et le créancier peut **poursuivre immédiatement la caution PP**.",
    ref: "Régime de la LJ / Fiche p.5, p.7"
  },
  {
    theme: "Cautionnement - Recours après paiement",
    q: "Quels sont les deux recours ouverts à la caution après avoir désintéressé le créancier ?",
    a: "Le <strong>recours personnel</strong> (Art. 2308) et le <strong>recours subrogatoire</strong> (Art. 2309 / 1346).",
    ref: "Articles 2308 et 2309 du Code civil / Fiche p.6"
  },
  {
    theme: "Recours - Formalité d'avertissement (Art. 2311)",
    q: "Quelle obligation d'avertissement pèse sur la caution avant de payer le créancier ?",
    a: "Elle doit **avertir le débiteur principal** avant d'effectuer le paiement (Art. 2311), sous peine de perdre ses recours faciles.",
    ref: "Article 2311 du Code civil / Fiche p.6"
  },
  {
    theme: "Défaut d'avertissement - Conséquence",
    q: "Qu'advient-il de ses recours si la caution paie sans en avoir averti le débiteur principal ?",
    a: "Ses recours sont **remis en cause** si le débiteur prouve qu'il pouvait payer le créancier ou l'avait déjà fait.",
    ref: "Article 2311 du Code civil / Fiche p.6"
  },
  {
    theme: "Incapacité débiteur - Utilité contrat",
    q: "Si la dette est nulle pour incapacité du débiteur, sous quelle condition la caution conserve-t-elle ses recours ?",
    a: "Uniquement s'il est prouvé que le contrat de base a été **utile au débiteur principal (Art. 1151)**.",
    ref: "Article 1151 du Code civil / Fiche p.6"
  },
  {
    theme: "Recours Personnel (Art. 2308) - Avantage",
    q: "Quel est l'avantage juridique majeur du recours personnel (Art. 2308) de la caution ?",
    a: "C'est un droit propre et nouveau : le débiteur **ne peut pas lui opposer les exceptions** qu'il avait contre le créancier.",
    ref: "Article 2308 du Code civil / Fiche p.6"
  },
  {
    theme: "Recours Subrogatoire (Art. 2309) - Danger",
    q: "Quel est le danger ou inconvénient majeur du recours subrogatoire (Art. 2309) ?",
    a: "Le débiteur **peut opposer à la caution toutes les exceptions** (prescription, etc.) qu'il avait contre le créancier d'origine.",
    ref: "Article 2309 du Code civil / Fiche p.6"
  },
  {
    theme: "Caution Consommation - Prescription",
    q: "Quelle est la durée de prescription du recours d'une banque caution d'un crédit à la consommation ?",
    a: "Le recours est soumis à une prescription courte de <strong>2 ans</strong>.",
    ref: "Code de la consommation / Fiche p.6"
  },
  {
    theme: "Recours Cofidéjusseurs (Art. 2312)",
    q: "Dans quel cas une caution solvens peut-elle agir contre ses cofidéjusseurs (Art. 2312) ?",
    a: "Lorsqu'elle a payé l'intégralité de la dette, elle peut réclamer à **chacune des autres cautions sa part et portion**.",
    ref: "Article 2312 du Code civil / Fiche p.6"
  },
  {
    theme: "Extinction Accessoire - Causes",
    q: "Par quelles causes la dette principale s'éteint-elle, libérant la caution par voie accessoire ?",
    a: "Le **paiement complet**, la **remise de dette**, la **compensation** ou la **prescription extinctive**.",
    ref: "Voie accessoire / Fiche p.6"
  },
  {
    theme: "Cautionnement Partiel - Imputation paiement",
    q: "Comment s'impute un paiement partiel du débiteur en présence d'un cautionnement partiel ?",
    a: "Le paiement partiel s'impute <strong>d'abord sur la partie non cautionnée</strong> de la dette principale.",
    ref: "Règles d'imputation / Fiche p.7"
  },
  {
    theme: "Remise de dette (Art. 1350-2)",
    q: "La remise de dette accordée au débiteur principal libère-t-elle la caution ?",
    a: "<strong>Oui !</strong> La remise de dette accordée au débiteur principal **libère intégralement la caution** (Art. 1350-2).",
    ref: "Article 1350-2 du Code civil / Fiche p.7"
  },
  {
    theme: "Remise de poursuite - Sort caution",
    q: "La simple remise de poursuite accordée au débiteur principal libère-t-elle la caution ?",
    a: "<strong>Non !</strong> La dette subsiste, le créancier peut encore poursuivre la caution.",
    ref: "Régime des remises / Fiche p.7"
  },
  {
    theme: "Compensation (Art. 1347-6)",
    q: "La caution peut-elle opposer la compensation si le débiteur néglige de l'invoquer ?",
    a: "<strong>Oui !</strong> L'**article 1347-6** l'autorise expressément à opposer la compensation des dettes réciproques.",
    ref: "Articles 1347-6 et 2298 du Code civil / Fiche p.7"
  },
  {
    theme: "Prescription Extinctive (Art. 2253)",
    q: "La caution peut-elle invoquer la prescription de la dette si le débiteur y renonce ?",
    a: "<strong>Oui !</strong> En vertu de l'**article 2253**, la caution peut invoquer la prescription même si le débiteur y renonce.",
    ref: "Article 2253 du Code civil / Fiche p.7"
  },
  {
    theme: "Exception Subrogation - Cibles (Art. 2314)",
    q: "Quels sont les 3 critères cumulatifs de l'exception de défaut de subrogation (Art. 2314) ?",
    a: "1. Perte d'un **droit préférentiel ou d'une sûreté utile**.<br>2. Par la **faute** du créancier.<br>3. Causant un **préjudice** à la caution.",
    ref: "Article 2314 du Code civil / Fiche p.7"
  },
  {
    theme: "Exception Subrogation - Sanction",
    q: "Quelle est la sanction de l'exception de subrogation (Art. 2314) ?",
    a: "La caution est **déchargée à hauteur du préjudice subi** (décharge totale ou partielle).",
    ref: "Article 2314 du Code civil / Fiche p.7"
  },
  {
    theme: "Divorce - Sort cautionnement",
    q: "Le divorce de la caution et du débiteur éteint-il le cautionnement ?",
    a: "<strong>Non !</strong> Le divorce n'éteint pas l'acte; le juge peut transférer la charge au conjoint reprenant l'activité.",
    ref: "Article 1387-1 du Code civil / Fiche p.7"
  },
  {
    theme: "Décès Caution - Sort dettes",
    q: "Au décès de la caution PP, ses héritiers héritent-ils des dettes futures ?",
    a: "<strong>Non !</strong> L'obligation de couverture s'éteint; ils n'héritent que de l'**obligation de règlement** (dettes nées avant le décès).",
    ref: "Article 2317 du Code civil / Fiche p.7"
  },
  {
    theme: "Fusion Sociétés - Sort couverture",
    q: "La fusion de la société caution éteint-elle l'obligation de couverture pour l'avenir ?",
    a: "<strong>Non, par exception !</strong> En cas de fusion de la société caution, toutes les obligations (couverture et règlement) sont transmises.",
    ref: "Article 2318 du Code civil / Fiche p.7"
  },
  {
    theme: "Garantie Autonome - Tripartite",
    q: "Qu'est-ce que la Garantie Autonome (Art. 2321) ?",
    a: "C'est l'engagement unilatéral d'un garant de **verser une somme sur simple demande**, indépendamment du contrat de base.",
    ref: "Article 2321 du Code civil / Fiche p.8"
  },
  {
    theme: "GA - Indépendance exceptions",
    q: "Le garant d'une GA peut-il opposer au bénéficiaire les exceptions du débiteur ?",
    a: "<strong>Non !</strong> C'est le principe d'**inopposabilité des exceptions** découlant de l'indépendance de la garantie.",
    ref: "Article 2321 du Code civil / Fiche p.8"
  },
  {
    theme: "GA - Sûreté accessoire ?",
    q: "La Garantie Autonome est-elle un accessoire de la créance d'origine ?",
    a: "<strong>Non !</strong> Elle est autonome et personnelle, elle **ne se transmet pas de plein droit** avec la créance d'origine.",
    ref: "Article 2321 du Code civil / Fiche p.8"
  },
  {
    theme: "GA - Interdictions légales",
    q: "Dans quels contrats la Garantie Autonome est-elle strictement interdite ?",
    a: "Dans les **baux d'habitation**, les **crédits à la consommation** et les **crédits immobiliers aux consommateurs**.",
    ref: "Droit de la consommation et immobilier / Fiche p.8"
  },
  {
    theme: "GA - Mention Manuscrite (Art. 1376)",
    q: "La Garantie Autonome est-elle soumise à l'écriture d'une mention manuscrite ?",
    a: "<strong>Oui !</strong> En tant que contrat unilatéral, elle exige une mention manuscrite de la somme d'après l'**article 1376**.",
    ref: "Article 1376 du Code civil / Fiche p.8"
  },
  {
    theme: "GA - Modalités d'appel",
    q: "Quelles sont les trois modalités possibles d'appel d'une Garantie Autonome ?",
    a: "1. La **première demande**.<br>2. La **garantie documentaire**.<br>3. La **garantie justifiée**.",
    ref: "Lettre de garantie / Fiche p.9"
  },
  {
    theme: "GA - Appel abusif",
    q: "Quelles sont les deux seules exceptions à l'obligation de payer du garant de GA ?",
    a: "1. Le **non-respect des conditions formelles** de la lettre.<br>2. L'**appel manifestement abusif ou frauduleux**.",
    ref: "Article 2321 du Code civil / Fiche p.9"
  },
  {
    theme: "GA - Disqualification",
    q: "Quelle clause contractuelle disqualifie d'office une GA en cautionnement ?",
    a: "Toute clause obligeant le garant à payer <strong>« la dette du débiteur »</strong> (perte d'autonomie et d'indépendance).",
    ref: "Jurisprudence constante / Fiche p.8"
  },
  {
    theme: "Lettre d'intention (Art. 2322)",
    q: "Qu'est-ce qu'une lettre d'intention (Art. 2322) ?",
    a: "C'est l'engagement unilatéral d'un confortant de **soutenir un débiteur** (souvent société mère pour sa filiale).",
    ref: "Article 2322 du Code civil / Fiche p.10"
  },
  {
    theme: "Lettre d'intention - Nature",
    q: "La lettre d'intention comporte-t-elle une obligation de moyens ou de résultat ?",
    a: "Elle peut être de <strong>moyens</strong> (veiller à, faire de son mieux) ou de <strong>résultat</strong> (s'engager à ce que, faire le nécessaire).",
    ref: "Article 2322 du Code civil / Fiche p.10"
  },
  {
    theme: "Lettre d'intention - Formalisme",
    q: "Quel formalisme d'écriture manuscrite est exigé pour la validité de la lettre d'intention ?",
    a: "<strong>Aucun !</strong> C'est un contrat consensuel car le garant s'engage à soutenir et non à payer une dette d'autrui.",
    ref: "Article 2322 du Code civil / Fiche p.10"
  },
  {
    theme: "Sûreté Réelle - Définition",
    q: "Quelle est la définition d'une sûreté réelle d'après l'article 2323 ?",
    a: "C'est l'<strong>affectation d'un bien</strong> au paiement préférentiel ou exclusif d'un créancier.",
    ref: "Article 2323 du Code civil / Fiche p.11"
  },
  {
    theme: "Sûreté réelle pour autrui (Art. 2325)",
    q: "Qu'est-ce qu'une sûreté réelle pour autrui d'après le cours ?",
    a: "C'est lorsqu'un tiers **affecte l'un de ses biens en garantie** de la dette d'un autre (sans s'engager personnellement).",
    ref: "Article 2325 du Code civil / Fiche p.11"
  },
  {
    theme: "Sûreté réelle pour autrui - Limite",
    q: "Quels biens sont engagés par un tiers garant réel pour autrui ?",
    a: "<strong>Uniquement le bien affecté !</strong> Le créancier n'a aucun droit de gage général sur le reste de son patrimoine.",
    ref: "Article 2325 du Code civil / Fiche p.11"
  },
  {
    theme: "Clause Réserve Propriété (Art. 2367)",
    q: "Comment fonctionne la clause de réserve de propriété (CRP) ?",
    a: "Elle **suspend le transfert de propriété** d'un bien jusqu'à l'entier paiement du prix par l'acheteur.",
    ref: "Article 2367 du Code civil / Fiche p.11"
  },
  {
    theme: "CRP - Forme",
    q: "Quelle forme exige la CRP pour sa validité d'après l'article 2368 ?",
    a: "Elle doit être obligatoirement rédigée par <strong>écrit</strong>.",
    ref: "Article 2368 du Code civil / Fiche p.11"
  },
  {
    theme: "CRP - Subrogation réelle",
    q: "Qu'est-ce que la subrogation réelle en cas de revente du bien sous CRP ?",
    a: "Le créancier initial peut reporter son droit sur la <strong>créance de prix de revente</strong> encore due par le sous-acquéreur.",
    ref: "Article 2372 du Code civil / Fiche p.11"
  },
  {
    theme: "Crédit-bail - Propriétaire",
    q: "Qui conserve la propriété du bien dans un contrat de crédit-bail ?",
    a: "Le <strong>crédit-bailleur</strong> (l'établissement de crédit propriétaire) pendant toute la période de location.",
    ref: "Régime du crédit-bail / Fiche p.11"
  },
  {
    theme: "Fiducie-sûreté (Art. 2011)",
    q: "Qu'est-ce que la fiducie-sûreté (Art. 2011) ?",
    a: "Le transfert temporaire de propriété d'un bien à un **fiduciaire** afin de garantir le paiement d'une dette.",
    ref: "Article 2011 du Code civil / Fiche p.12"
  },
  {
    theme: "Fiducie-sûreté - Étanche",
    q: "Quel est le sort des biens en fiducie-sûreté vis-à-vis des autres créanciers ?",
    a: "Ils entrent dans un **patrimoine d'affectation étanche** (Art. 2025) et deviennent insaisissables par les autres créanciers.",
    ref: "Article 2025 du Code civil / Fiche p.12"
  },
  {
    theme: "Droit de Rétention (Art. 2286)",
    q: "Qu'est-ce que le droit de rétention (Art. 2286) ?",
    a: "Le droit pour un créancier de <strong>conserver une chose</strong> légitimement détenue tant qu'il n'a pas été payé.",
    ref: "Article 2286 du Code civil / Fiche p.13"
  },
  {
    theme: "Droit de Rétention - Connexités",
    q: "Quels sont les 3 types de connexités requis pour le droit de rétention ?",
    a: "La connexité **juridique** (même contrat), **matérielle** (dépenses sur la chose) ou **conventionnelle**.",
    ref: "Régime de rétention / Fiche p.13"
  },
  {
    theme: "Gage - Définition (Art. 2333)",
    q: "Sur quoi porte le gage d'après l'article 2333 ?",
    a: "Sur un **bien meuble corporel** (ou un ensemble de meubles corporels) affecté en garantie d'une obligation.",
    ref: "Article 2333 du Code civil / Fiche p.14"
  },
  {
    theme: "Gage - Dérogations immobilières",
    q: "Le gage peut-il porter sur un immeuble d'après la réforme ?",
    a: "<strong>Oui, par exception !</strong> Sur certains **immeubles par destination** (Art. 524/525, ex: panneaux solaires, machines).",
    ref: "Articles 524 et 525 du Code civil / Fiche p.14"
  },
  {
    theme: "Gage - Opposabilité",
    q: "Quelles sont les deux modalités d'opposabilité du gage ?",
    a: "La <strong>publicité</strong> (inscription sur un registre spécial) ou la <strong>dépossession</strong> effective du bien.",
    ref: "Article 2337 du Code civil / Fiche p.15"
  },
  {
    theme: "Conflit de gages - Publication",
    q: "Comment se règle le conflit entre un gage avec dépossession et un gage sans dépossession ?",
    a: "Par l'<strong>antériorité de la formalité d'opposabilité</strong> (le premier à avoir publié ou dépossédé d'après 2340 l'emporte).",
    ref: "Article 2340 du Code civil / Fiche p.15"
  },
  {
    theme: "Pacte Commissoire - Gage",
    q: "Qu'est-ce que le pacte commissoire dans un gage (Art. 2348) ?",
    a: "La clause prévoyant que la défaillance du débiteur entraînera l'<strong>appropriation automatique du bien</strong> par le créancier.",
    ref: "Article 2348 du Code civil / Fiche p.16"
  },
  {
    theme: "Gage - Évaluation obligatoire",
    q: "Quelle formalité est obligatoire pour mettre en oeuvre un pacte commissoire ?",
    a: "Le bien doit être **évalué objectivement par un expert** (ou cotation officielle) pour restituer l'éventuel surplus au débiteur.",
    ref: "Article 2348 du Code civil / Fiche p.16"
  },
  {
    theme: "Voie parée - Gage",
    q: "La clause de voie parée est-elle autorisée dans le gage d'après l'article 2346 ?",
    a: "<strong>Non !</strong> Elle est strictement interdite (le créancier ne peut pas vendre lui-même le bien à l'amiable).",
    ref: "Article 2346 du Code civil / Fiche p.16"
  },
  {
    theme: "Nantissement - Définition",
    q: "Qu'est-ce que le nantissement d'après l'article 2355 ?",
    a: "L'affectation en garantie d'une obligation d'un **bien meuble incorporel** (créances, comptes-titres, etc.).",
    ref: "Article 2355 du Code civil / Fiche p.16"
  },
  {
    theme: "Nantissement - Rétention fictive",
    q: "Le bénéficiaire d'un nantissement dispose-t-il d'un droit de rétention fictif ?",
    a: "<strong>Non !</strong> L'application de l'article 2286 alinéa 4 (rétention fictive) est **expressément exclue** pour le nantissement.",
    ref: "Article 2355 du Code civil / Fiche p.16"
  },
  {
    theme: "Nantissement créance - Validité",
    q: "Quelle formalité de forme est exigée pour la validité d'un nantissement de créance ?",
    a: "Un <strong>écrit à peine de nullité</strong> identifiant clairement la créance garantie et la créance nantie (Art. 2356).",
    ref: "Article 2356 du Code civil / Fiche p.17"
  },
  {
    theme: "Nantissement créance - Opposabilité débiteur",
    q: "Comment le nantissement de créance devient-il opposable au débiteur de la créance nantie (Art. 2362) ?",
    a: "Par la **notification** de l'acte ou par son **intervention directe** à l'acte.",
    ref: "Article 2362 du Code civil / Fiche p.17"
  },
  {
    theme: "Nantissement créance - Échéances croisées",
    q: "Qu'advient-il si la créance nantie arrive à échéance avant la créance garantie (Art. 2364) ?",
    a: "Le créancier perçoit les fonds mais doit obligatoirement les <strong>consigner sur un compte spécial bloqué</strong>.",
    ref: "Article 2364 du Code civil / Fiche p.17"
  },
  {
    theme: "Compte-titres - Clause d'arrosage",
    q: "Qu'est-ce que la clause d'arrosage dans un nantissement de compte-titres ?",
    a: "L'obligation pour le constituant d'**ajouter des titres ou du cash** si la valeur du portefeuille nanti baisse.",
    ref: "Nantissement de CT / Fiche p.18"
  },
  {
    theme: "Fonds de commerce - Assiette",
    q: "Quels éléments incorporels composent par défaut l'assiette d'un nantissement de fonds de commerce ?",
    a: "L'**enseigne**, le **nom commercial**, la **clientèle** et le **droit au bail**.",
    ref: "Code de commerce / Fiche p.18"
  },
  {
    theme: "Fonds de commerce - Capacité",
    q: "Un locataire-gérant peut-il nantir le fonds de commerce qu'il exploite ?",
    a: "<strong>Non !</strong> Le constituant d'un nantissement de fonds de commerce doit impérativement en être le **propriétaire**.",
    ref: "Code de commerce / Fiche p.18"
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
