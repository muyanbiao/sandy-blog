const { books } = require('../../data/books');

let audio = null;
let recorder = null;
let recordingSentenceId = '';
let playingSentenceId = '';
let stoppingBeforeNextPlay = false;
const audioFileCache = {};

function findBook(id) {
  for (let index = 0; index < books.length; index += 1) {
    if (books[index].id === id) return books[index];
  }
  return books[0];
}

function isRemoteUrl(src) {
  return /^https?:\/\//i.test(src);
}

Page({
  data: {
    book: {},
    page: {},
    pageIndex: 0,
    pageNumber: 1,
    pageTotal: 1,
    pageLabel: '',
    isFirstPage: true,
    isLastPage: false,
    playingId: '',
    recordingId: '',
    recordings: {},
    feedback: {}
  },

  onLoad(options) {
    audio = wx.createInnerAudioContext({ useWebAudioImplement: true });
    audio.obeyMuteSwitch = false;
    audio.onEnded(() => {
      playingSentenceId = '';
      this.setData({ playingId: '' });
      this.refreshSentenceState();
    });
    audio.onStop(() => {
      if (stoppingBeforeNextPlay) {
        stoppingBeforeNextPlay = false;
        return;
      }
      playingSentenceId = '';
      this.setData({ playingId: '' });
      this.refreshSentenceState();
    });
    audio.onError(error => {
      const id = playingSentenceId;
      const message = error && error.errMsg ? error.errMsg : '请检查音量和合法域名设置';
      this.setData({
        playingId: '',
        [`feedback.${id}`]: '声音加载失败：' + message
      });
      this.refreshSentenceState();
      wx.showToast({ title: '声音加载失败', icon: 'none' });
    });

    recorder = wx.getRecorderManager();
    recorder.onStart(() => {
      this.setData({
        recordingId: recordingSentenceId,
        [`feedback.${recordingSentenceId}`]: '正在录音，请跟读。'
      });
      this.refreshSentenceState();
    });
    recorder.onStop(result => {
      const id = recordingSentenceId;
      recordingSentenceId = '';
      this.setData({
        recordingId: '',
        [`recordings.${id}`]: result.tempFilePath,
        [`feedback.${id}`]: 'Great! 录好了，可以回放。'
      });
      this.refreshSentenceState();
      this.playEncouragement();
    });
    recorder.onError(() => {
      const id = recordingSentenceId;
      recordingSentenceId = '';
      this.setData({
        recordingId: '',
        [`feedback.${id}`]: '没有拿到麦克风权限，请允许后再试。'
      });
      this.refreshSentenceState();
    });

    const book = findBook(options.id);
    this.setData({ book });
    this.setReaderPage(0);
    wx.setNavigationBarTitle({ title: book.title });
    this.preloadCurrentAudio();
  },

  onUnload() {
    if (audio) audio.destroy();
    try {
      if (recorder) recorder.stop();
    } catch (error) {}
  },

  goBack() {
    wx.navigateBack();
  },

  buildPageState(index) {
    const page = this.data.book.pages[index];
    const pageTotal = this.data.book.pages.length;
    const pageNumber = index + 1;
    const recordings = this.data.recordings || {};
    const feedback = this.data.feedback || {};
    const sentences = (page.sentences || []).map(sentence => {
      const playing = sentence.id === this.data.playingId;
      const recording = sentence.id === this.data.recordingId;
      return Object.assign({}, sentence, {
        playing,
        recording,
        hasRecording: Boolean(recordings[sentence.id]),
        listenText: playing ? '播放中' : '点读',
        recordText: recording ? '录完再点' : '录音跟读',
        cardClass: playing ? 'playing' : '',
        recordClass: recording ? 'recording' : '',
        feedbackText: feedback[sentence.id] || ''
      });
    });

    return {
      page: Object.assign({}, page, { sentences }),
      pageIndex: index,
      pageNumber,
      pageTotal,
      pageLabel: page.label || 'Page ' + page.id,
      isFirstPage: index === 0,
      isLastPage: index === pageTotal - 1
    };
  },

  setReaderPage(index) {
    this.setData(this.buildPageState(index));
  },

  refreshSentenceState() {
    if (!this.data.book.pages) return;
    this.setData(this.buildPageState(this.data.pageIndex));
  },

  preloadCurrentAudio() {
    const page = this.data.page || {};
    const sentences = page.sentences || [];
    const sentence = sentences[0];
    if (!sentence || !sentence.audio || audioFileCache[sentence.audio] || !isRemoteUrl(sentence.audio)) return;
    wx.downloadFile({
      url: sentence.audio,
      success: result => {
        if (result.statusCode >= 200 && result.statusCode < 300 && result.tempFilePath) {
          audioFileCache[sentence.audio] = result.tempFilePath;
        }
      }
    });
  },

  playSentence(event) {
    const { id, audio: src } = event.currentTarget.dataset;
    if (!src) return;
    playingSentenceId = id;
    this.setData({
      playingId: id,
      [`feedback.${id}`]: '正在加载声音...'
    });
    this.refreshSentenceState();
    this.playAudioSource(id, src);
  },

  playAction(event) {
    const src = event.currentTarget.dataset.audio;
    if (!src) return;
    playingSentenceId = 'action';
    this.playAudioSource('action', src);
  },

  playEncouragement() {
    const list = this.data.book.encouragementAudios || [];
    if (!list.length) return;
    const index = Math.floor(Math.random() * list.length);
    playingSentenceId = 'encouragement';
    this.playAudioSource('encouragement', list[index]);
  },

  playAudioSource(id, src) {
    if (!isRemoteUrl(src)) {
      this.playLocalAudio(id, src);
      return;
    }

    if (audioFileCache[src]) {
      this.playLocalAudio(id, audioFileCache[src]);
      return;
    }

    wx.downloadFile({
      url: src,
      success: result => {
        if (playingSentenceId !== id) return;
        if (result.statusCode < 200 || result.statusCode >= 300 || !result.tempFilePath) {
          this.setData({
            playingId: '',
            [`feedback.${id}`]: '声音下载失败：HTTP ' + result.statusCode
          });
          this.refreshSentenceState();
          return;
        }
        audioFileCache[src] = result.tempFilePath;
        this.playLocalAudio(id, result.tempFilePath);
      },
      fail: error => {
        if (playingSentenceId !== id) return;
        this.setData({
          playingId: '',
          [`feedback.${id}`]: '声音下载失败：' + (error.errMsg || '网络超时')
        });
        this.refreshSentenceState();
      }
    });
  },

  playLocalAudio(id, src) {
    stoppingBeforeNextPlay = true;
    audio.stop();
    audio.src = src;
    this.setData({
      playingId: id,
      [`feedback.${id}`]: '正在播放...'
    });
    this.refreshSentenceState();
    audio.play();
  },

  toggleRecord(event) {
    const id = event.currentTarget.dataset.id;
    if (this.data.recordingId === id) {
      recorder.stop();
      return;
    }
    if (this.data.recordingId) {
      try { recorder.stop(); } catch (error) {}
    }
    recordingSentenceId = id;
    recorder.start({
      duration: 12000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'mp3'
    });
  },

  playRecording(event) {
    const id = event.currentTarget.dataset.id;
    const src = this.data.recordings[id];
    if (!src) return;
    playingSentenceId = id;
    this.playLocalAudio(id, src);
  },

  prevPage() {
    this.changePage(-1);
  },

  nextPage() {
    this.changePage(1);
  },

  changePage(step) {
    const next = Math.max(0, Math.min(this.data.book.pages.length - 1, this.data.pageIndex + step));
    if (next === this.data.pageIndex) return;
    audio.stop();
    this.setData({ playingId: '' });
    this.setReaderPage(next);
    this.preloadCurrentAudio();
  }
});
