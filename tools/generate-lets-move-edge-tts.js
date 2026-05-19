const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const audioDir = path.join(root, 'assets', 'audio', 'books', 'lets-move');

const voice = process.env.EDGE_TTS_VOICE || 'en-US-AnaNeural';
const rate = process.env.EDGE_TTS_RATE || '+12%';
const pitch = process.env.EDGE_TTS_PITCH || '+8Hz';

const entries = [
  ['lm-cover-01-lets-move.mp3', "Let's move!"],
  ['lm-cover-02-lets-play.mp3', "Let's play!"],
  ['lm-run-01-word.mp3', 'Run!'],
  ['lm-run-02-chant.mp3', 'Run, run, run!'],
  ['lm-run-03-can.mp3', 'I can run fast!'],
  ['lm-jump-01-word.mp3', 'Jump!'],
  ['lm-jump-02-high.mp3', 'Jump up high!'],
  ['lm-jump-03-can.mp3', 'I can jump!'],
  ['lm-kick-01-word.mp3', 'Kick!'],
  ['lm-kick-02-ball.mp3', 'Kick the ball!'],
  ['lm-kick-03-go.mp3', 'Go! Go! Go!'],
  ['lm-throw-01-word.mp3', 'Throw!'],
  ['lm-throw-02-ball.mp3', 'Throw the ball!'],
  ['lm-throw-03-catch.mp3', 'Catch it!'],
  ['lm-swim-01-word.mp3', 'Swim!'],
  ['lm-swim-02-water.mp3', 'Swim in the water!'],
  ['lm-swim-03-splash.mp3', 'Splash! Splash!'],
  ['lm-ride-01-word.mp3', 'Ride!'],
  ['lm-ride-02-bike.mp3', 'Ride a bike!'],
  ['lm-ride-03-ring.mp3', 'Ring! Ring!'],
  ['lm-end-01-run.mp3', 'You can run!'],
  ['lm-end-02-jump.mp3', 'You can jump!'],
  ['lm-end-03-sports.mp3', 'You can play sports!'],
  ['lm-end-04-yay.mp3', 'Yay!'],
  ['enc-great.mp3', 'Great!'],
  ['enc-awesome.mp3', 'Awesome!'],
  ['enc-good-job.mp3', 'Good job!'],
];

fs.mkdirSync(audioDir, { recursive: true });

for (const [index, [filename, text]] of entries.entries()) {
  execFileSync('uvx', [
    'edge-tts',
    '--voice',
    voice,
    '--rate',
    rate,
    '--pitch',
    pitch,
    '--text',
    text,
    '--write-media',
    path.join(audioDir, filename),
  ], { stdio: 'pipe' });
  console.log(`[${String(index + 1).padStart(2, '0')}/${entries.length}] wrote ${filename}`);
}

console.log(`Generated ${entries.length} Edge TTS files with ${voice}`);
