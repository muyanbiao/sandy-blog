const fs = require('fs');
const https = require('https');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'data.js');
const outputPath = path.join(rootDir, 'miniprogram', 'data', 'books.js');
const siteOrigin = process.env.KIDREADING_ORIGIN || 'https://kidreading.club';
const localAudioRoot = path.join(rootDir, 'miniprogram', 'local-audio');

function loadWebsiteData() {
  const code = fs.readFileSync(sourcePath, 'utf8');
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${code}\nthis.__kidreadingData = { books, classBooks };`, context, {
    filename: sourcePath
  });
  return context.__kidreadingData;
}

function absoluteAssetUrl(value) {
  if (!value || typeof value !== 'string') return value;
  if (/^https?:\/\//i.test(value)) {
    return value.replace(/^https:\/\/kidreading\.club/i, siteOrigin);
  }
  if (value.startsWith('/')) return `${siteOrigin}${value}`;
  return `${siteOrigin}/${value}`;
}

function sourcePathForAsset(value) {
  if (!value || typeof value !== 'string') return '';
  const localPath = /^https?:\/\//i.test(value)
    ? new URL(value).pathname.replace(/^\/+/, '')
    : value.replace(/^\/+/, '');
  return path.join(rootDir, localPath);
}

function localAudioPath(value) {
  if (!value || typeof value !== 'string') return value;
  const pathname = /^https?:\/\//i.test(value)
    ? new URL(value).pathname.replace(/^\/+/, '')
    : value.replace(/^\/+/, '');
  return path.posix.join('local-audio', pathname.split(path.sep).join('/'));
}

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        downloadFile(response.headers.location, destination).then(resolve, reject);
        return;
      }

      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume();
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      fs.mkdirSync(path.dirname(destination), { recursive: true });
      const stream = fs.createWriteStream(destination);
      response.pipe(stream);
      stream.on('finish', () => {
        stream.close(resolve);
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function copyOrDownloadAudio(sourceValue) {
  if (!sourceValue) return sourceValue;
  const source = absoluteAssetUrl(sourceValue);
  const localPath = localAudioPath(source);
  const destination = path.join(rootDir, 'miniprogram', localPath);
  const existingSource = sourcePathForAsset(sourceValue);

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (fs.existsSync(existingSource)) {
    fs.copyFileSync(existingSource, destination);
    return localPath;
  }

  await downloadFile(source, destination);
  return localPath;
}

async function normalizeBook(book) {
  const pages = [];
  for (const page of book.pages || []) {
    const sentences = [];
    for (const sentence of page.sentences || []) {
      sentences.push({
        ...sentence,
        audio: await copyOrDownloadAudio(sentence.audio)
      });
    }

    pages.push({
      ...page,
      image: absoluteAssetUrl(page.image),
      actionAudio: await copyOrDownloadAudio(page.actionAudio),
      sentences
    });
  }

  return {
    ...book,
    video: absoluteAssetUrl(book.video),
    encouragementAudios: await Promise.all((book.encouragementAudios || []).map(copyOrDownloadAudio)),
    pages
  };
}

function validateBooks(books) {
  const ids = new Set();
  books.forEach(book => {
    if (!book.id) throw new Error('Book is missing id');
    if (ids.has(book.id)) throw new Error(`Duplicate book id: ${book.id}`);
    ids.add(book.id);

    if (!book.comingSoon && (!book.pages || book.pages.length === 0)) {
      throw new Error(`Book has no pages: ${book.id}`);
    }

    (book.pages || []).forEach(page => {
      if (!page.sentences || page.sentences.length === 0) {
        throw new Error(`Page has no sentences: ${book.id} page ${page.id}`);
      }
      page.sentences.forEach(sentence => {
        if (!sentence.id || !sentence.text || !sentence.audio) {
          throw new Error(`Incomplete sentence in ${book.id} page ${page.id}`);
        }
      });
    });
  });
}

function isExpired(book) {
  return Boolean(book.expiresAt && Date.now() > Date.parse(book.expiresAt));
}

async function main() {
  const { books = [], classBooks = [] } = loadWebsiteData();
  fs.rmSync(localAudioRoot, { recursive: true, force: true });
  const miniprogramBooks = [];
  for (const book of [...books, ...classBooks].filter(book => !isExpired(book))) {
    miniprogramBooks.push(await normalizeBook(book));
  }
  validateBooks(miniprogramBooks);

  const output = `module.exports = {\n  books: ${JSON.stringify(miniprogramBooks, null, 2)}\n};\n`;
  fs.writeFileSync(outputPath, output);

  console.log(`Synced ${miniprogramBooks.length} books and local audio to ${outputPath}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
