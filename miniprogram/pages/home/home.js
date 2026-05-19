const { books } = require('../../data/books');

const PROGRESS_KEY = 'kidreadingProgressV1';
const THEME_IDS = ['lets-move', 'animal-words', 'fruit-words', 'seasons'];

function isExpired(book) {
  return Boolean(book.expiresAt && Date.now() > Date.parse(book.expiresAt));
}

function isClassBook(book) {
  return String(book.id || '').indexOf('class-') === 0;
}

function buildCard(book) {
  const pageCount = book.pages ? book.pages.length : 0;
  const sentenceCount = countSentences(book);
  return {
    id: book.id,
    title: book.title,
    subtitle: book.subtitle || '',
    description: book.description || '点一句、听一句，也可以录音跟读。',
    age: book.age || '英语点读',
    topic: book.topic || 'Reading',
    level: book.level || 'Level',
    pageCountText: pageCount + '页',
    sentenceCountText: sentenceCount + '句',
    image: getCoverImage(book),
    accentClass: isClassBook(book) ? 'class-accent' : 'reading-accent'
  };
}

function countSentences(book) {
  return (book.pages || []).reduce((total, page) => total + (page.sentences || []).length, 0);
}

function getCoverImage(book) {
  const firstPage = (book.pages || [])[0] || {};
  return firstPage.image || '';
}

function buildTodayTask(book) {
  if (!book) return null;
  const pageCount = (book.pages || []).length;
  const sentenceCount = countSentences(book);
  const minutes = Math.max(3, Math.min(10, Math.ceil(sentenceCount / 2)));
  const labels = (book.pages || [])
    .slice(0, 3)
    .map(page => page.label)
    .filter(Boolean)
    .join(' / ');

  return {
    id: book.id,
    title: book.title,
    subtitle: book.subtitle || '今日点读',
    description: isClassBook(book) ? '今天的班级作业，点一句听一句。' : '今天先读这一本，5分钟就能完成。',
    image: getCoverImage(book),
    stats: sentenceCount + ' 句 · ' + pageCount + ' 页 · 约 ' + minutes + ' 分钟',
    preview: labels || book.topic || 'English Reading'
  };
}

function buildThemeCard(book, index) {
  const names = {
    'lets-move': { title: 'Sports', subtitle: '运动', badge: 'Run' },
    'animal-words': { title: 'Animals', subtitle: '动物', badge: 'Cat' },
    'fruit-words': { title: 'Food', subtitle: '食物', badge: 'Apple' },
    seasons: { title: 'Seasons', subtitle: '四季', badge: 'Spring' }
  };
  const preset = names[book.id] || {};
  return {
    id: book.id,
    title: preset.title || book.title,
    subtitle: preset.subtitle || book.topic || '',
    badge: preset.badge || book.level || '',
    image: getCoverImage(book),
    toneClass: 'theme-tone-' + ((index % 4) + 1),
    countText: countSentences(book) + '句'
  };
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

function loadProgress() {
  try {
    return wx.getStorageSync(PROGRESS_KEY) || { days: {}, books: {} };
  } catch (error) {
    return { days: {}, books: {} };
  }
}

function saveProgress(book) {
  const progress = loadProgress();
  const today = formatDate(new Date());
  progress.days = progress.days || {};
  progress.books = progress.books || {};
  progress.days[today] = true;
  progress.books[book.id] = true;
  progress.lastBookId = book.id;
  try {
    wx.setStorageSync(PROGRESS_KEY, progress);
  } catch (error) {}
  return progress;
}

function buildProgress(activeBooks, progress) {
  const days = progress.days || {};
  const booksStarted = progress.books || {};
  const today = new Date();
  const weekDates = [];
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    const key = formatDate(date);
    weekDates.push({
      key,
      active: Boolean(days[key]),
      dotClass: days[key] ? 'active' : ''
    });
  }

  const bookMap = activeBooks.reduce((map, book) => {
    map[book.id] = book;
    return map;
  }, {});
  const learnedSentences = Object.keys(booksStarted).reduce((total, id) => {
    return total + (bookMap[id] ? countSentences(bookMap[id]) : 0);
  }, 0);
  const learnedBooks = Object.keys(booksStarted).filter(id => bookMap[id]).length;
  const activeDays = weekDates.filter(day => day.active).length;

  return {
    starCount: activeDays + learnedBooks,
    activeDaysText: '本周已点读 ' + activeDays + ' 天',
    learnedText: '已开始 ' + learnedBooks + ' 本 · ' + learnedSentences + ' 句',
    encourageText: activeDays ? '继续保持，明天再来读一句。' : '今天开始第一句。',
    weekDots: weekDates
  };
}

function readingSort(a, b) {
  if (a.id === 'lets-move') return -1;
  if (b.id === 'lets-move') return 1;
  return 0;
}

Page({
  data: {
    todayTask: null,
    quickActions: [],
    themeBooks: [],
    progress: {},
    books: [],
    classBooks: [],
    hasClassBooks: false,
    hasBooks: false,
    hasThemeBooks: false,
    loadMessage: ''
  },

  onLoad() {
    this.refreshHome();
  },

  onShow() {
    this.refreshHome();
  },

  refreshHome() {
    const activeBooks = books.filter(book => !book.comingSoon && !isExpired(book));
    const rawReadingBooks = activeBooks.filter(book => !isClassBook(book)).sort(readingSort);
    const readingBooks = rawReadingBooks.map(buildCard);
    const todaySource = activeBooks.find(book => isClassBook(book)) || rawReadingBooks[0];
    const classBooks = activeBooks
      .filter(book => isClassBook(book) && (!todaySource || book.id !== todaySource.id))
      .map(buildCard);
    const todayTask = buildTodayTask(todaySource);
    const progress = buildProgress(activeBooks, loadProgress());
    const recentBook = activeBooks.find(book => book.id === loadProgress().lastBookId) || todaySource;
    const themeBooks = THEME_IDS
      .map(id => activeBooks.find(book => book.id === id))
      .filter(Boolean)
      .map(buildThemeCard);
    const quickActions = [
      { id: 'read', title: '点读', subtitle: 'Read', action: 'read', bookId: todaySource ? todaySource.id : '', toneClass: 'quick-read' },
      { id: 'speak', title: '跟读', subtitle: 'Speak', action: 'speak', bookId: todaySource ? todaySource.id : '', toneClass: 'quick-speak' },
      { id: 'review', title: '复习', subtitle: 'Review', action: 'review', bookId: recentBook ? recentBook.id : '', toneClass: 'quick-review' }
    ];

    this.setData({
      todayTask,
      quickActions,
      themeBooks,
      progress,
      classBooks,
      books: readingBooks,
      hasClassBooks: classBooks.length > 0,
      hasBooks: readingBooks.length > 0,
      hasThemeBooks: themeBooks.length > 0,
      loadMessage: activeBooks.length ? '' : '暂时没有可用资源'
    });
  },

  openReader(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    this.openBook(id);
  },

  startToday() {
    if (!this.data.todayTask || !this.data.todayTask.id) return;
    this.openBook(this.data.todayTask.id);
  },

  quickStart(event) {
    const id = event.currentTarget.dataset.bookId;
    if (!id) return;
    this.openBook(id);
  },

  openTheme(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    this.openBook(id);
  },

  openBook(id) {
    const book = books.find(item => item.id === id);
    if (book) {
      const progress = saveProgress(book);
      const activeBooks = books.filter(item => !item.comingSoon && !isExpired(item));
      this.setData({ progress: buildProgress(activeBooks, progress) });
    }
    wx.navigateTo({
      url: '/pages/reader/reader?id=' + encodeURIComponent(id)
    });
  }
});
