const { books } = require('../../data/books');

function isExpired(book) {
  return Boolean(book.expiresAt && Date.now() > Date.parse(book.expiresAt));
}

function isClassBook(book) {
  return String(book.id || '').indexOf('class-') === 0;
}

function buildCard(book) {
  const pageCount = book.pages ? book.pages.length : 0;
  return {
    id: book.id,
    title: book.title,
    subtitle: book.subtitle || '',
    description: book.description || '点一句、听一句，也可以录音跟读。',
    age: book.age || '英语点读',
    topic: book.topic || 'Reading',
    level: book.level || 'Level',
    pageCountText: pageCount + '页',
    accentClass: isClassBook(book) ? 'class-accent' : 'reading-accent'
  };
}

function readingSort(a, b) {
  if (a.id === 'lets-move') return -1;
  if (b.id === 'lets-move') return 1;
  return 0;
}

Page({
  data: {
    books: [],
    classBooks: [],
    hasClassBooks: false,
    hasBooks: false,
    loadMessage: ''
  },

  onLoad() {
    const activeBooks = books.filter(book => !book.comingSoon && !isExpired(book));
    const classBooks = activeBooks.filter(book => isClassBook(book)).map(buildCard);
    const readingBooks = activeBooks.filter(book => !isClassBook(book)).sort(readingSort).map(buildCard);

    this.setData({
      classBooks,
      books: readingBooks,
      hasClassBooks: classBooks.length > 0,
      hasBooks: readingBooks.length > 0,
      loadMessage: activeBooks.length ? '' : '暂时没有可用资源'
    });
  },

  openReader(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/reader/reader?id=' + encodeURIComponent(id)
    });
  }
});
