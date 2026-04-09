<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pumping Lemma — Interactive Visualizer</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="progress-bar" id="progress"></div>
<div class="page-wrap">

<!-- NAV -->
<nav>
  <a class="nav-logo" href="#">&#8704; Pumping Lemma</a>
  <ul class="nav-links">
    <li><a href="#config">Configure</a></li>
    <li><a href="#viz-panel">Visualize</a></li>
    <li><a href="#quiz-section">Self-Test</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-left">
    <div class="eyebrow">Theory of Computation</div>
    <h1 class="hero-h1">The<br><em>Pumping</em><br>Lemma</h1>
    <p class="hero-desc">
      An interactive tool for understanding why certain formal languages cannot be regular — through live string decomposition and pumping simulation.
    </p>
    <div class="cta-row">
      <a class="btn-primary" href="#config">Begin &rarr;</a>
      <a class="btn-secondary" href="#quiz-section">Take the Quiz</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="formula-display">
      <div class="formula-tag">Formal Definition &nbsp;&middot;&nbsp; Pumping Lemma for Regular Languages</div>
      <div class="formula-line">
        <span class="kw">&#8704;</span> regular language <span class="sym">L</span>, <span class="kw">&#8707;</span> pumping length <span class="sym">p</span><br>
        <span class="kw">&#8704;</span> <span class="sym">s &isin; L</span> with <span class="sym">|s| &ge; p</span>, <span class="kw">&#8707;</span> split <span class="sym">s = xyz</span>:<br><br>
        &nbsp;&nbsp;<span class="cond">&#9312; &nbsp;<span class="sym">|y|</span> &ge; 1</span><br>
        &nbsp;&nbsp;<span class="cond">&#9313; &nbsp;<span class="sym">|xy|</span> &le; p</span><br>
        &nbsp;&nbsp;<span class="cond">&#9314; &nbsp;<span class="sym">xy<sup>i</sup>z &isin; L</span> &nbsp;for all i &ge; 0</span>
      </div>
    </div>
    <div class="hero-stats">
      <div class="stat">
        <div class="stat-num">5</div>
        <div class="stat-lbl">Languages</div>
      </div>
      <div class="stat">
        <div class="stat-num">&infin;</div>
        <div class="stat-lbl">Pump Trials</div>
      </div>
      <div class="stat">
        <div class="stat-num">8</div>
        <div class="stat-lbl">Quiz Items</div>
      </div>
    </div>
  </div>
</section>

<!-- CONFIGURE -->
<div id="config" class="tool-wrap">
  <div class="section-header">
    <div class="section-num">Section 01</div>
    <div class="section-title-block">
      <div class="section-label">Input</div>
      <div class="section-h">Configure</div>
    </div>
  </div>
  <div class="section-body">
    <div class="config-grid">
      <div class="config-cell full">
        <div class="cfg-label">Preset Language</div>
        <select class="cfg-select" id="lang-sel" onchange="onLangChange()">
          <option value="anbn">L = { a&#8319;b&#8319; | n &ge; 1 } &mdash; not regular</option>
          <option value="an">L = { a&#8319; | n &ge; 0 } &mdash; regular</option>
          <option value="ww">L = { ww | w &isin; {a,b}* } &mdash; not regular</option>
          <option value="abn">L = { (ab)&#8319; | n &ge; 1 } &mdash; regular</option>
          <option value="a2n">L = { a&#178;&#8319; | n &ge; 1 } &mdash; regular</option>
          <option value="custom">Custom&hellip;</option>
        </select>
      </div>
      <div class="config-cell">
        <div class="cfg-label">Input String s</div>
        <input class="cfg-input" type="text" id="str-in" value="aaabbb" placeholder="e.g. aaabbb" maxlength="18">
      </div>
      <div class="config-cell">
        <div class="cfg-label">Pumping Length p</div>
        <input class="cfg-input" type="number" id="p-in" value="3" min="1" max="14">
      </div>
      <div class="config-cell" id="xend-cell" style="display:none">
        <div class="cfg-label">x ends at index</div>
        <input class="cfg-input" type="number" id="x-end" value="1" min="0">
      </div>
      <div class="config-cell" id="yend-cell" style="display:none">
        <div class="cfg-label">y ends at index</div>
        <input class="cfg-input" type="number" id="y-end" value="2" min="1">
      </div>
    </div>
    <div class="run-row">
      <button class="run-btn" onclick="runViz()">
        <span>Visualize</span>
        <span>&rarr;</span>
      </button>
      <span class="run-hint">Select a language and string, then click Visualize</span>
    </div>
  </div>
</div>

<!-- VIZ -->
<div id="viz-panel" class="tool-wrap">
  <div class="section-header">
    <div class="section-num">Section 02</div>
    <div class="section-title-block">
      <div class="section-label">Decomposition</div>
      <div class="section-h">s = xyz</div>
    </div>
  </div>
  <div class="section-body">
    <div class="legend-row">
      <div class="legend-item"><div class="lsq lx"></div>x &mdash; prefix</div>
      <div class="legend-item"><div class="lsq ly"></div>y &mdash; pumpable</div>
      <div class="legend-item"><div class="lsq lz"></div>z &mdash; suffix</div>
      <div class="legend-item"><div class="lsq le"></div>extra y copies</div>
    </div>

    <div class="char-section-label">Base string decomposition</div>
    <div class="char-track" id="base-track"></div>
    <div class="constraint-strip" id="cstrips"></div>

    <div class="pump-strip">
      <span class="pump-label">pump count &nbsp;i =</span>
      <input type="range" id="pump-sl" min="0" max="5" value="1" step="1" oninput="onPump(this.value)">
      <span class="pump-val" id="pump-val">1</span>
    </div>

    <div class="char-section-label">Pumped string xy<sup id="i-sup">1</sup>z</div>
    <div class="char-track" id="pumped-track"></div>
    <div id="mem-bar"></div>
  </div>
</div>

<!-- PROOF -->
<div id="proof-panel" class="tool-wrap">
  <div class="section-header">
    <div class="section-num">Section 03</div>
    <div class="section-title-block">
      <div class="section-label">Reasoning</div>
      <div class="section-h">Step-by-Step Proof</div>
    </div>
  </div>
  <div class="section-body">
    <div class="proof-grid" id="proof-grid"></div>
    <div style="height:1.5rem"></div>
    <div class="accordion" id="accordion"></div>
  </div>
</div>

<!-- ABOUT -->
<div class="about-strip">
  <div class="about-card">
    <div class="about-icon">&#8704;</div>
    <div class="about-h">What is the Pumping Lemma?</div>
    <p class="about-p">A necessary condition for regular languages: any sufficiently long string can be &ldquo;pumped&rdquo; by repeating a middle segment and always remain in the language.</p>
  </div>
  <div class="about-card">
    <div class="about-icon">&#8836;</div>
    <div class="about-h">Proving Non-Regularity</div>
    <p class="about-p">To show L is not regular, we assume it is and derive a contradiction: find a string where pumping escapes L regardless of how we split it.</p>
  </div>
  <div class="about-card">
    <div class="about-icon">&#9633;</div>
    <div class="about-h">Finite Automata Connection</div>
    <p class="about-p">A language is regular iff it is recognized by a DFA. Languages like {a&#8319;b&#8319;} require counting, which finite memory cannot do &mdash; hence non-regular.</p>
  </div>
</div>

<!-- QUIZ -->
<div id="quiz-section" class="tool-wrap" style="border-top:var(--border)">
  <div class="section-header">
    <div class="section-num">Section 04</div>
    <div class="section-title-block">
      <div class="section-label">Self-Assessment</div>
      <div class="section-h">Quiz</div>
    </div>
  </div>
  <div class="section-body">
    <div class="quiz-wrap">
      <div class="quiz-top">
        <div>
          <div class="quiz-score-label">Score</div>
          <div class="quiz-score-val" id="qscore">0 / 0</div>
        </div>
        <button class="btn-secondary" onclick="resetQuiz()" style="font-size:10px;padding:8px 18px;">Reset</button>
      </div>
      <div class="quiz-body">
        <div class="quiz-q" id="qq"></div>
        <div class="quiz-opts" id="qopts"></div>
        <div class="quiz-fb" id="qfb"></div>
        <button class="quiz-next" id="qnext" onclick="nextQuiz()">Next question &rarr;</button>
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <span class="footer-logo">&#8704; Pumping Lemma Visualizer</span>
  <span class="footer-copy">Educational tool &middot; Theory of Computation</span>
</footer>

</div><!-- page-wrap -->

<script src="js/data.js"></script>
<script src="js/app.js"></script>
</body>
</html>
