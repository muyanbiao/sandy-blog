let currentBook = books[0];
let allSentences = [];
let mode = 'tap';
let playingId = null;
let isAutoPlaying = false;
let selectedAge = '全部';
let selectedTopic = '全部';
let audio = new Audio();

init();

function init() {
  bindActions();
  renderFilters();
  renderResourceLists();
  openReader(currentBook.id, false);
  showView('home');
}

function bindActions() {
  document.addEventListener('click', event => {
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
    }
  });
}

function showView(name) {
  stopAll();
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  document.getElementById(`${name}-view`).classList.add('active');

  ['home', 'library', 'about'].forEach(item => {
    const btn = document.getElementById(`nav-${item}`);
    if (btn) btn.classList.toggle('active', item === name);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
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

function renderResourceLists() {
  document.getElementById('home-resource-list').innerHTML = books.slice(0, 2).map(renderResourceCard).join('');
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
  const book = books.find(item => item.id === bookId);
  if (!book) return;

  if (book.externalUrl) {
    window.location.href = book.externalUrl;
    return;
  }

  currentBook = book;
  allSentences = book.pages.flatMap(page => page.sentences);
  document.getElementById('book-title').textContent = book.title;
  document.getElementById('book-meta').textContent = `${book.age} · ${book.topic} · ${book.level}`;
  document.getElementById('story-video').src = book.video || '';
  document.getElementById('btn-video').style.display = book.video ? '' : 'none';
  document.querySelector('.mode-bar').style.display = book.comingSoon ? 'none' : 'flex';

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
  if (jump) showView('reader');
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
    container.innerHTML = currentBook.pages.map(page => `
      <section class="reader-page reader-page-${page.theme || 'default'}">
        <div class="reader-image-wrap">
          <img src="${page.image}" alt="${page.alt || currentBook.title}">
        </div>
        <div class="reader-page-label">${page.label || `Page ${page.id}`}</div>
        <div class="reader-page-sentences">
          ${page.sentences.map(renderSentenceCard).join('')}
        </div>
      </section>
    `).join('');
    return;
  }

  container.innerHTML = allSentences.map(renderSentenceCard).join('');
}

function renderSentenceCard(sentence) {
  return `
    <div class="sentence-card ${playingId === sentence.id ? 'playing' : ''}"
         id="card-${sentence.id}"
         onclick="tapSentence('${sentence.id}', '${sentence.audio}')">
      <span class="card-icon">${playingId === sentence.id ? 'ON' : 'PLAY'}</span>
      <span class="card-en">${sentence.text}</span>
    </div>
  `;
}

function setPlaying(id) {
  playingId = id;
  document.querySelectorAll('.sentence-card').forEach(el => {
    const sid = el.id.replace('card-', '');
    const isPlaying = sid === id;
    el.classList.toggle('playing', isPlaying);
    el.querySelector('.card-icon').textContent = isPlaying ? 'ON' : 'PLAY';
  });
}

function setMode(nextMode) {
  mode = nextMode;
  stopAll();
  ['tap', 'auto', 'video'].forEach(name => {
    document.getElementById('btn-' + name).classList.toggle('active', name === nextMode);
  });
  document.getElementById('video-area').style.display = nextMode === 'video' ? 'block' : 'none';
  document.getElementById('read-area').style.display = nextMode === 'video' ? 'none' : 'block';
  document.getElementById('auto-bar').style.display = nextMode === 'auto' ? 'flex' : 'none';
}

function tapSentence(id, src) {
  if (mode !== 'tap') return;
  stopAll();
  setPlaying(id);
  audio.src = src;
  audio.play();
  audio.onended = () => setPlaying(null);
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
    audio.src = sentence.audio;
    audio.play();
    audio.onended = playNext;
  }

  playNext();
}

function stopAll() {
  audio.pause();
  audio.onended = null;
  isAutoPlaying = false;
  setPlaying(null);
  const btn = document.querySelector('.play-all-btn');
  if (btn) btn.textContent = 'Play All';
}

window.showView = showView;
window.openReader = openReader;
window.setMode = setMode;
window.toggleAutoPlay = toggleAutoPlay;
