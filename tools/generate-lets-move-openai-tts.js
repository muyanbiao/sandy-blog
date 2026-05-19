const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const audioDir = path.join(root, 'assets', 'audio', 'books', 'lets-move');

const model = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
const voice = process.env.OPENAI_TTS_VOICE || 'coral';
const apiKey = process.env.OPENAI_API_KEY;

const instructions = [
  'Speak like a happy kindergarten teacher talking to young children.',
  'Use an energetic, playful, encouraging tone with clear American English pronunciation.',
  'Keep the rhythm bouncy and easy to imitate.',
  'Use short natural pauses, especially in repeated chants.',
  'Do not sound like news narration, adult instruction, or a robot.',
].join(' ');

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

async function generateSpeech(filename, text) {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      voice,
      input: text,
      instructions,
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI TTS failed for ${filename}: ${response.status} ${message}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(path.join(audioDir, filename), buffer);
}

async function main() {
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
  fs.mkdirSync(audioDir, { recursive: true });

  for (const [index, [filename, text]] of entries.entries()) {
    await generateSpeech(filename, text);
    console.log(`[${String(index + 1).padStart(2, '0')}/${entries.length}] wrote ${filename}`);
  }

  console.log(`Generated ${entries.length} OpenAI TTS files with ${model}/${voice}`);
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
