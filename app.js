let currentBook = books[0];
let allSentences = [];
let mode = 'tap';
let playingId = null;
let isAutoPlaying = false;
let selectedAge = '全部';
let selectedTopic = '全部';
let currentPageIndex = 0;
let touchStartX = 0;
let touchStartY = 0;
let audio = new Audio();
let activeRecorder = null;
let activeStream = null;
let activeLine = null;
let activeChunks = [];
let activeRecognition = null;
let recognizedText = '';
let lastTouchActionAt = 0;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

init();

function init() {
  bindActions();
  bindReaderSwipe();
  renderFilters();
  renderResourceLists();
  const sharedReaderId = getSharedReaderId();
  openReader(sharedReaderId || currentBook.id, false);
  showView(sharedReaderId ? 'reader' : 'home');
}

function bindActions() {
  document.addEventListener('touchend', event => {
    const actionButton = event.target.closest('[data-listen-sentence], [data-record]');
    if (!actionButton) return;
    event.preventDefault();
    lastTouchActionAt = Date.now();
    handleSentenceActionButton(actionButton);
  }, { passive: false });

  document.addEventListener('click', event => {
    const listenButton = event.target.closest('[data-listen-sentence]');
    if (listenButton) {
      if (Date.now() - lastTouchActionAt < 500) return;
      handleSentenceActionButton(listenButton);
      return;
    }

    const recordButton = event.target.closest('[data-record]');
    if (recordButton) {
      if (Date.now() - lastTouchActionAt < 500) return;
      handleSentenceActionButton(recordButton);
      return;
    }

    const replayButton = event.target.closest('[data-play-recording]');
    if (replayButton) {
      const card = replayButton.closest('.sentence-card');
      const player = card?.querySelector('.recording-player');
      if (player?.src) {
        player.currentTime = 0;
        player.play();
      }
      return;
    }

    const pageButton = event.target.closest('[data-page-step]');
    if (pageButton) {
      changeReaderPage(Number(pageButton.dataset.pageStep));
      return;
    }

    const actionButton = event.target.closest('[data-action-audio]');
    if (actionButton) {
      playActionAudio(actionButton.dataset.actionAudio);
      return;
    }

    const viewButton = event.target.closest('[data-view]');
    if (viewButton) {
      showView(viewButton.dataset.view);
      return;
    }

    const readerButton = event.target.closest('[data-reader]');
    if (readerButton) {
      openReader(readerButton.dataset.reader);
      return;
    }

    const modeButton = event.target.closest('[data-mode]');
    if (modeButton) {
      setMode(modeButton.dataset.mode);
      return;
    }

    const autoButton = event.target.closest('[data-auto-play]');
    if (autoButton) {
      toggleAutoPlay();
      return;
    }

    const sentenceCard = event.target.closest('.sentence-card');
    if (sentenceCard && !event.target.closest('button, audio')) {
      tapSentence(sentenceCard.dataset.sentenceId, sentenceCard.dataset.audio, sentenceCard);
    }
  });
}

function handleSentenceActionButton(button) {
  const card = button.closest('.sentence-card');
  if (!card) return;
  if (button.matches('[data-listen-sentence]')) {
    tapSentence(card.dataset.sentenceId, card.dataset.audio, card);
    return;
  }
  if (button.matches('[data-record]')) {
    togglePracticeRecording(card);
  }
}

function bindReaderSwipe() {
  const readArea = document.getElementById('read-area');
  readArea.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  readArea.addEventListener('touchend', event => {
    if (!isPagedReader()) return;
    if (event.target.closest('button, audio')) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      changeReaderPage(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
}

function isPagedReader() {
  return currentBook?.pages?.some(page => page.image) && currentBook.pages.length > 1;
}

function getSharedReaderId() {
  const params = new URLSearchParams(window.location.search);
  const queryReader = params.get('reader');
  if (queryReader) return queryReader;

  const hashMatch = window.location.hash.match(/^#reader=(.+)$/);
  return hashMatch ? decodeURIComponent(hashMatch[1]) : '';
}

function showView(name) {
  stopAll();
  if (name === 'about') loadDeferredImages(document.getElementById('about-view'));
  document.body.classList.toggle('reader-open', name === 'reader');
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  document.getElementById(`${name}-view`).classList.add('active');

  ['home', 'library', 'about'].forEach(item => {
    const btn = document.getElementById(`nav-${item}`);
    if (btn) btn.classList.toggle('active', item === name);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadDeferredImages(root = document) {
  root.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

function renderFilters() {
  const ages = ['全部', ...new Set(books.map(book => book.age))];
  const topics = ['全部', ...new Set(books.map(book => book.topic))];
  document.getElementById('age-filters').innerHTML = ages.map(age => `
    <button class="chip ${selectedAge === age ? 'active' : ''}" onclick="setAgeFilter('${age}')">${age}</button>
  `).join('');
  document.getElementById('topic-filters').innerHTML = topics.map(topic => `
    <button class="chip ${selectedTopic === topic ? 'active' : ''}" onclick="setTopicFilter('${topic}')">${topic}</button>
  `).join('');
}

function setAgeFilter(age) {
  selectedAge = age;
  renderFilters();
  renderResourceLists();
}

function setTopicFilter(topic) {
  selectedTopic = topic;
  renderFilters();
  renderResourceLists();
}

function getFilteredBooks() {
  return books.filter(book => {
    const ageMatch = selectedAge === '全部' || book.age === selectedAge;
    const topicMatch = selectedTopic === '全部' || book.topic === selectedTopic;
    return ageMatch && topicMatch;
  });
}

function getClassBooks() {
  return typeof classBooks === 'undefined' ? [] : classBooks;
}

function isBookExpired(book) {
  return Boolean(book.expiresAt && Date.now() > Date.parse(book.expiresAt));
}

function getActiveClassBooks() {
  return getClassBooks().filter(book => !isBookExpired(book));
}

function renderResourceLists() {
  const homeBooks = books
    .filter(book => !book.comingSoon)
    .sort((a, b) => (a.id === 'animal-words' ? -1 : 0) - (b.id === 'animal-words' ? -1 : 0))
    .slice(0, 3);
  document.getElementById('home-resource-list').innerHTML = homeBooks.map(renderResourceCard).join('');
  const classList = document.getElementById('class-resource-list');
  if (classList) {
    const activeClassBooks = getActiveClassBooks();
    classList.closest('.section-block').hidden = activeClassBooks.length === 0;
    classList.innerHTML = activeClassBooks.map(renderResourceCard).join('');
  }
  const filtered = getFilteredBooks();
  document.getElementById('library-resource-list').innerHTML = filtered.length
    ? filtered.map(renderResourceCard).join('')
    : '<div class="empty-state">这个分类的资源还在整理中。</div>';
}

function renderResourceCard(book) {
  const action = book.comingSoon ? '查看计划' : '开始点读';
  const statusClass = book.comingSoon ? ' coming-soon' : '';
  return `
    <article class="resource-card${statusClass}" data-reader="${book.id}">
      <div class="resource-mark" style="background:${book.color}"></div>
      <div class="resource-main">
        <div class="resource-title">${book.title}</div>
        <div class="resource-subtitle">${book.subtitle}</div>
        <p>${book.description}</p>
        <div class="meta-row">
          <span>${book.age}</span>
          <span>${book.topic}</span>
          <span>${book.level}</span>
        </div>
      </div>
      <button class="resource-action" data-reader="${book.id}">${action}</button>
    </article>
  `;
}

function openReader(bookId, jump = true) {
  const book = [...books, ...getClassBooks()].find(item => item.id === bookId);
  if (!book) return;

  if (book.externalUrl) {
    window.location.href = book.externalUrl;
    return;
  }

  currentBook = book;
  currentPageIndex = 0;
  allSentences = book.pages.flatMap(page => page.sentences);
  document.getElementById('book-title').textContent = book.title;
  document.getElementById('book-meta').textContent = `${book.age} · ${book.topic} · ${book.level}`;
  const storyVideo = document.getElementById('story-video');
  storyVideo.pause();
  storyVideo.removeAttribute('src');
  storyVideo.dataset.src = book.video || '';
  storyVideo.load();
  document.getElementById('btn-video').style.display = book.video ? '' : 'none';
  document.querySelector('.mode-bar').style.display = book.comingSoon || book.pages.some(page => page.image) ? 'none' : 'flex';

  if (isBookExpired(book)) {
    renderExpiredBook(book);
    document.getElementById('video-area').style.display = 'none';
    document.getElementById('read-area').style.display = 'block';
    document.getElementById('auto-bar').style.display = 'none';
    if (jump) showView('reader');
    return;
  }

  if (book.comingSoon) {
    renderComingSoon(book);
    document.getElementById('video-area').style.display = 'none';
    document.getElementById('read-area').style.display = 'block';
    document.getElementById('auto-bar').style.display = 'none';
    if (jump) showView('reader');
    return;
  }

  renderSentences();
  setMode('tap');
  if (jump) updateReaderUrl(book.id);
  if (jump) showView('reader');
}

function updateReaderUrl(bookId) {
  const url = new URL(window.location.href);
  url.searchParams.set('reader', bookId);
  url.hash = '';
  window.history.replaceState(null, '', url);
}

function renderExpiredBook(book) {
  const expiresAt = formatExpiresAt(book.expiresAt);
  document.getElementById('sentences-container').innerHTML = `
    <div class="coming-detail expired-detail">
      <div class="coming-label">临时作业已下线</div>
      <h2>${book.title}</h2>
      <p>这个一（4）班短期点读作业已到期下线。如需继续使用，请联系老师重新开放。</p>
      <div class="coming-grid">
        <span>班级：${book.age}</span>
        <span>主题：${book.topic}</span>
        <span>截止：${expiresAt}</span>
      </div>
      <button class="primary-btn" data-view="home">返回首页</button>
    </div>
  `;
}

function renderComingSoon(book) {
  document.getElementById('sentences-container').innerHTML = `
    <div class="coming-detail">
      <div class="coming-label">资源更新中</div>
      <h2>${book.title}</h2>
      <p>${book.description}</p>
      <div class="coming-grid">
        <span>年龄：${book.age}</span>
        <span>主题：${book.topic}</span>
        <span>类型：${book.subtitle}</span>
      </div>
      <button class="primary-btn" data-view="library">返回资源列表</button>
    </div>
  `;
}

function renderSentences() {
  const container = document.getElementById('sentences-container');
  if (currentBook.pages.some(page => page.image)) {
    const pages = [currentBook.pages[currentPageIndex]];

    container.innerHTML = `
      ${pages.map(page => `
      <section class="reader-page practice-reader-page reader-page-${page.theme || 'default'}">
        <div class="reader-image-wrap">
          <img src="${page.image}" alt="${page.alt || currentBook.title}" loading="eager" fetchpriority="high" decoding="async">
        </div>
        <div class="reader-page-label">${currentPageIndex + 1} / ${currentBook.pages.length} · ${page.label || `Page ${page.id}`}</div>
        ${page.actionText ? `<button class="reader-action-prompt" type="button" data-action-audio="${page.actionAudio || ''}">${page.actionText}</button>` : ''}
        <div class="reader-page-sentences">
          ${page.sentences.map(renderSentenceCard).join('')}
        </div>
        ${renderPracticeNotice()}
      </section>
      `).join('')}
      ${renderReaderLinks()}
      ${renderPageNav()}
      ${renderPageDots()}
      ${renderTemporaryNotice()}
    `;
    return;
  }

  container.innerHTML = allSentences.map(renderSentenceCard).join('');
}

function renderReaderLinks() {
  if (!currentBook.links?.length) return '';
  return `
    <div class="reader-links">
      ${currentBook.links.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>
      `).join('')}
    </div>
  `;
}

function renderTemporaryNotice() {
  if (!currentBook.expiresAt) return '';
  return `<div class="temporary-notice">本页仅供班级短期作业跟读使用，有效期至 ${formatExpiresAt(currentBook.expiresAt)}，请勿转发。</div>`;
}

function formatExpiresAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '未设置';
  const pad = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function renderPracticeNotice() {
  return '<div class="practice-notice">录音仅用于本次跟读反馈，不会上传或保存。</div>';
}

function renderPageNav() {
  const total = currentBook.pages.length;
  if (total <= 1) return '';
  return `
    <div class="reader-pager">
      <button type="button" data-page-step="-1" ${currentPageIndex === 0 ? 'disabled' : ''}>‹</button>
      <span>${currentPageIndex + 1} / ${total}</span>
      <button type="button" data-page-step="1" ${currentPageIndex === total - 1 ? 'disabled' : ''}>›</button>
    </div>
  `;
}

function renderPageDots() {
  const total = currentBook.pages.length;
  if (total <= 1) return '';
  return `
    <div class="reader-dots" aria-label="页面位置">
      ${currentBook.pages.map((_, index) => `<span class="${index === currentPageIndex ? 'active' : ''}"></span>`).join('')}
    </div>
    <div class="reader-swipe-hint">左右滑动翻页</div>
  `;
}

function changeReaderPage(step) {
  const total = currentBook.pages.length;
  if (!total) return;
  const nextIndex = Math.max(0, Math.min(total - 1, currentPageIndex + step));
  if (nextIndex === currentPageIndex) return;
  stopAll();
  currentPageIndex = nextIndex;
  renderSentences();
  document.getElementById('reader-view').scrollIntoView({ block: 'start' });
}

function renderSentenceCard(sentence) {
  const listenLabel = playingId === sentence.id ? '播放中' : '点读';
  const practiceControls = `
      <div class="practice-panel">
        <div class="practice-actions">
          <button class="mic-button" type="button" data-record aria-label="开始跟读">
            <span class="mic-icon">🎙</span>
            <span class="mic-text">录音跟读</span>
          </button>
          <button class="replay-button" type="button" data-play-recording disabled hidden>播放我的录音</button>
        </div>
        <audio class="recording-player" controls hidden></audio>
        <div class="practice-feedback" hidden></div>
      </div>
    `;

  return `
    <div class="sentence-card practice-card ${playingId === sentence.id ? 'playing' : ''}"
         id="card-${sentence.id}"
         data-sentence-id="${sentence.id}"
         data-audio="${sentence.audio}"
         data-expected="${sentence.text}">
      <div class="sentence-main">
        <button class="card-icon" type="button" data-listen-sentence aria-label="点读：${sentence.text}">${listenLabel}</button>
        <span class="card-en">${sentence.text}</span>
      </div>
      ${practiceControls}
    </div>
  `;
}

function setPlaying(id) {
  playingId = id;
  document.querySelectorAll('.sentence-card').forEach(el => {
    const sid = el.id.replace('card-', '');
    const isPlaying = sid === id;
    el.classList.toggle('playing', isPlaying);
    el.querySelector('.card-icon').textContent = isPlaying ? '播放中' : '点读';
  });
}

function setMode(nextMode) {
  mode = nextMode;
  stopAll();
  ['tap', 'auto', 'video'].forEach(name => {
    document.getElementById('btn-' + name).classList.toggle('active', name === nextMode);
  });
  const storyVideo = document.getElementById('story-video');
  if (nextMode === 'video' && storyVideo.dataset.src && !storyVideo.getAttribute('src')) {
    storyVideo.src = storyVideo.dataset.src;
  }
  if (nextMode !== 'video') {
    storyVideo.pause();
  }
  document.getElementById('video-area').style.display = nextMode === 'video' ? 'block' : 'none';
  document.getElementById('read-area').style.display = nextMode === 'video' ? 'none' : 'block';
  document.getElementById('auto-bar').style.display = nextMode === 'auto' ? 'flex' : 'none';
}

function tapSentence(id, src, card = null) {
  if (mode === 'video') return;
  if (!src) {
    if (card) setPracticeFeedback(card, '这句音频还没准备好。', 'retry');
    return;
  }
  stopAll();
  setPlaying(id);
  if (card) setPracticeFeedback(card, '正在加载声音...');

  audio = new Audio(new URL(src, window.location.href).href);
  audio.preload = 'auto';
  audio.playsInline = true;
  audio.muted = false;
  audio.volume = 1;
  audio.onplaying = () => {
    if (card) setPracticeFeedback(card, '正在播放...', 'well');
  };
  audio.onended = () => {
    setPlaying(null);
    if (card) {
      const feedback = card.querySelector('.practice-feedback');
      if (feedback?.textContent === '正在播放...') feedback.hidden = true;
    }
  };
  audio.onerror = () => {
    setPlaying(null);
    if (card) setPracticeFeedback(card, '声音加载失败，请再点一次。', 'retry');
  };

  const playPromise = audio.play();
  if (playPromise?.catch) {
    playPromise.catch(() => {
      setPlaying(null);
      if (card) setPracticeFeedback(card, '手机拦截了播放，请再点一次“点读”。', 'retry');
    });
  }
}

function playActionAudio(src) {
  if (!src) return;
  stopAll();
  audio = new Audio(new URL(src, window.location.href).href);
  audio.preload = 'auto';
  audio.playsInline = true;
  audio.play().catch(() => {});
}

function playEncouragementAudio() {
  const list = currentBook.encouragementAudios || [];
  if (!list.length) return;
  const src = list[Math.floor(Math.random() * list.length)];
  const praise = new Audio(new URL(src, window.location.href).href);
  praise.preload = 'auto';
  praise.playsInline = true;
  praise.play().catch(() => {});
}

function toggleAutoPlay() {
  if (isAutoPlaying) {
    stopAll();
    return;
  }

  isAutoPlaying = true;
  document.querySelector('.play-all-btn').textContent = 'Stop';
  let index = 0;

  function playNext() {
    if (!isAutoPlaying || index >= allSentences.length) {
      isAutoPlaying = false;
      document.querySelector('.play-all-btn').textContent = 'Play All';
      setPlaying(null);
      return;
    }
    const sentence = allSentences[index++];
    setPlaying(sentence.id);
    document.getElementById('card-' + sentence.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    audio = new Audio(new URL(sentence.audio, window.location.href).href);
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.play();
    audio.onended = playNext;
  }

  playNext();
}

function stopAll() {
  audio.pause();
  audio.onended = null;
  if (activeRecorder?.state === 'recording') {
    try { activeRecorder.stop(); } catch (error) {}
  }
  activeStream?.getTracks().forEach(track => track.stop());
  activeStream = null;
  try { activeRecognition?.stop(); } catch (error) {}
  isAutoPlaying = false;
  setPlaying(null);
  const btn = document.querySelector('.play-all-btn');
  if (btn) btn.textContent = 'Play All';
}

function normalizeSpeechText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function speechSimilarity(expected, actual) {
  const a = normalizeSpeechText(expected);
  const b = normalizeSpeechText(actual);
  if (!a || !b) return 0;
  return 1 - editDistance(a, b) / Math.max(a.length, b.length);
}

function setPracticeFeedback(card, message, type = '') {
  const feedback = card.querySelector('.practice-feedback');
  if (!feedback) return;
  feedback.textContent = message;
  feedback.hidden = false;
  feedback.className = `practice-feedback ${type}`.trim();
}

function setRecordingUi(card, isRecording) {
  const recordButton = card.querySelector('[data-record]');
  if (!recordButton) return;
  recordButton.classList.remove('requesting');
  recordButton.classList.toggle('recording', isRecording);
  recordButton.setAttribute('aria-label', isRecording ? '结束跟读录音' : '开始跟读录音');
  recordButton.querySelector('.mic-icon').textContent = isRecording ? '■' : '🎙';
  recordButton.querySelector('.mic-text').textContent = isRecording ? '录完再点' : '录音跟读';
}

function setMicrophoneRequestUi(card, isRequesting) {
  const recordButton = card.querySelector('[data-record]');
  if (!recordButton) return;
  recordButton.classList.toggle('requesting', isRequesting);
  recordButton.querySelector('.mic-icon').textContent = isRequesting ? '...' : '🎙';
  recordButton.querySelector('.mic-text').textContent = isRequesting ? '正在打开麦克风' : '录音跟读';
}

function requestMicrophoneStream() {
  const request = navigator.mediaDevices.getUserMedia({ audio: true });
  const timeout = new Promise((_, reject) => {
    window.setTimeout(() => reject(new Error('microphone-timeout')), 8000);
  });
  return Promise.race([request, timeout]);
}

function togglePracticeRecording(card) {
  if (activeRecorder?.state === 'recording' && activeLine === card) {
    activeRecorder.stop();
    return;
  }

  startPracticeRecording(card).catch(error => {
    setMicrophoneRequestUi(card, false);
    setRecordingUi(card, false);
    const message = error?.message === 'microphone-timeout'
      ? '麦克风没有响应。请点右上角，用浏览器打开，或检查麦克风权限。'
      : '没有拿到麦克风权限。请允许录音权限后再试一次。';
    setPracticeFeedback(card, message, 'retry');
  });
}

function evaluatePractice(card) {
  if (!SpeechRecognition) {
    setPracticeFeedback(card, 'Well done', 'well');
    playEncouragementAudio();
    return;
  }

  if (!recognizedText) {
    setPracticeFeedback(card, 'Well done', 'well');
    playEncouragementAudio();
    return;
  }

  const expected = card.dataset.expected;
  const normalizedExpected = normalizeSpeechText(expected);
  const normalizedActual = normalizeSpeechText(recognizedText);
  const score = speechSimilarity(expected, recognizedText);
  const expectedWords = normalizedExpected.split(' ').filter(word => word.length > 1);
  const actualWords = normalizedActual.split(' ');
  const matchedWords = expectedWords.filter(word => actualWords.includes(word));
  const hasMainWord = expectedWords.length > 0 && normalizedActual.includes(expectedWords[expectedWords.length - 1]);

  if (score >= 0.86 || normalizedActual === normalizedExpected) {
    setPracticeFeedback(card, 'Perfect', 'perfect');
  } else if (score >= 0.42 || normalizedActual.includes(normalizedExpected) || hasMainWord || matchedWords.length >= 1) {
    setPracticeFeedback(card, 'Well done', 'well');
  } else {
    setPracticeFeedback(card, 'Try again', 'retry');
  }
  playEncouragementAudio();
}

async function startPracticeRecording(card) {
  if (!navigator.mediaDevices?.getUserMedia) {
    setPracticeFeedback(card, '当前浏览器不支持录音。请用 Safari 或 Chrome 打开 HTTPS 页面再试。', 'retry');
    return;
  }

  if (!window.MediaRecorder) {
    setPracticeFeedback(card, '当前浏览器不支持网页录音。请用 Safari 或 Chrome 打开再试。', 'retry');
    return;
  }

  if (activeRecorder?.state === 'recording') {
    activeRecorder.stop();
  }

  activeLine = card;
  activeChunks = [];
  recognizedText = '';

  const recordButton = card.querySelector('[data-record]');
  const replayButton = card.querySelector('[data-play-recording]');
  setMicrophoneRequestUi(card, true);
  replayButton.disabled = true;
  replayButton.hidden = true;
  setPracticeFeedback(card, '正在打开麦克风，请在弹窗里点允许。');

  activeStream = await requestMicrophoneStream();
  activeRecorder = new MediaRecorder(activeStream);
  setMicrophoneRequestUi(card, false);
  setRecordingUi(card, true);
  replayButton.disabled = true;
  replayButton.hidden = true;
  setPracticeFeedback(card, '正在录音，请跟读。读完后再点一次话筒。');

  activeRecorder.ondataavailable = event => {
    if (event.data.size > 0) activeChunks.push(event.data);
  };

  activeRecorder.onstop = () => {
    const blob = new Blob(activeChunks, { type: activeRecorder.mimeType || 'audio/webm' });
    const player = card.querySelector('.recording-player');
    player.src = URL.createObjectURL(blob);
    player.hidden = true;
    setRecordingUi(card, false);
    replayButton.disabled = false;
    replayButton.hidden = false;
    activeStream?.getTracks().forEach(track => track.stop());
    activeStream = null;
    try { activeRecognition?.stop(); } catch (error) {}
    window.setTimeout(() => evaluatePractice(card), 450);
  };

  if (SpeechRecognition) {
    activeRecognition = new SpeechRecognition();
    activeRecognition.lang = 'en-US';
    activeRecognition.interimResults = false;
    activeRecognition.maxAlternatives = 1;
    activeRecognition.onresult = event => {
      recognizedText = event.results?.[0]?.[0]?.transcript || '';
    };
    activeRecognition.onerror = () => {};
    try { activeRecognition.start(); } catch (error) {}
  }

  activeRecorder.start();
}

window.showView = showView;
window.openReader = openReader;
window.setMode = setMode;
window.toggleAutoPlay = toggleAutoPlay;
