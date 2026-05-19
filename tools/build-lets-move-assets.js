const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const imageDir = path.join(root, 'assets', 'img', 'books', 'lets-move');
const audioDir = path.join(root, 'assets', 'audio', 'books', 'lets-move');

fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(audioDir, { recursive: true });

const pages = [
  { id: 'cover', accent: '#22c55e', pose: 'cover', object: 'stars' },
  { id: 'run', accent: '#f97316', pose: 'run', object: 'track' },
  { id: 'jump', accent: '#8b5cf6', pose: 'jump', object: 'cloud' },
  { id: 'kick', accent: '#06b6d4', pose: 'kick', object: 'ball' },
  { id: 'throw', accent: '#ef4444', pose: 'throw', object: 'ball-hand' },
  { id: 'swim', accent: '#0ea5e9', pose: 'swim', object: 'water' },
  { id: 'ride', accent: '#14b8a6', pose: 'ride', object: 'bike' },
  { id: 'great-job', accent: '#f59e0b', pose: 'cheer', object: 'confetti' }
];

const tts = [
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
  ['enc-good-job.mp3', 'Good job!']
];

const sfx = [
  ['sfx-ready.mp3', 'sine=frequency=660:duration=0.16,sine=frequency=880:duration=0.16'],
  ['sfx-run.mp3', 'sine=frequency=170:duration=0.10,sine=frequency=220:duration=0.10,sine=frequency=170:duration=0.10,sine=frequency=220:duration=0.10'],
  ['sfx-jump.mp3', 'sine=frequency=420:duration=0.10,sine=frequency=760:duration=0.18,sine=frequency=360:duration=0.12'],
  ['sfx-kick.mp3', 'sine=frequency=86:duration=0.12,sine=frequency=180:duration=0.08'],
  ['sfx-throw.mp3', 'sine=frequency=500:duration=0.08,sine=frequency=700:duration=0.08,sine=frequency=900:duration=0.08'],
  ['sfx-swim.mp3', 'anoisesrc=color=pink:duration=0.38'],
  ['sfx-ride.mp3', 'sine=frequency=1100:duration=0.09,sine=frequency=1450:duration=0.09,sine=frequency=1100:duration=0.09'],
  ['sfx-yay.mp3', 'sine=frequency=523:duration=0.12,sine=frequency=659:duration=0.12,sine=frequency=784:duration=0.22']
];

function limb(x1, y1, x2, y2, color = '#475569', width = 16) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
}

function kid(pose, accent) {
  const head = `<circle cx="318" cy="210" r="52" fill="#ffd7b5" stroke="#475569" stroke-width="8"/>
  <circle cx="300" cy="203" r="6" fill="#111827"/><circle cx="336" cy="203" r="6" fill="#111827"/>
  <path d="M300 226 Q318 244 340 226" fill="none" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
  <path d="M272 182 Q318 130 366 182" fill="#334155" opacity=".95"/>`;
  const body = `<rect x="272" y="258" width="92" height="120" rx="34" fill="${accent}" stroke="#475569" stroke-width="8"/>`;

  const poses = {
    cover: [
      limb(278, 280, 220, 220), limb(358, 280, 416, 220),
      limb(292, 374, 252, 452), limb(344, 374, 392, 452)
    ],
    run: [
      limb(278, 282, 222, 326), limb(358, 282, 418, 246),
      limb(295, 372, 226, 420), limb(342, 372, 410, 430)
    ],
    jump: [
      limb(278, 282, 224, 206), limb(358, 282, 414, 206),
      limb(294, 374, 258, 448), limb(342, 374, 390, 438)
    ],
    kick: [
      limb(278, 282, 224, 312), limb(358, 282, 410, 304),
      limb(294, 374, 260, 454), limb(342, 374, 442, 388)
    ],
    throw: [
      limb(278, 282, 226, 336), limb(358, 282, 438, 190),
      limb(294, 374, 256, 450), limb(342, 374, 388, 452)
    ],
    swim: [
      limb(278, 292, 198, 282), limb(358, 292, 438, 282),
      limb(292, 374, 246, 410), limb(344, 374, 390, 410)
    ],
    ride: [
      limb(278, 282, 220, 318), limb(358, 282, 418, 318),
      limb(294, 374, 255, 424), limb(342, 374, 388, 424)
    ],
    cheer: [
      limb(278, 282, 222, 196), limb(358, 282, 414, 196),
      limb(294, 374, 250, 450), limb(342, 374, 388, 450)
    ]
  };

  return `${poses[pose].join('')}${body}${head}`;
}

function objectSvg(object, accent) {
  if (object === 'track') {
    return `<path d="M130 482 C250 432 390 432 510 482" fill="none" stroke="#fb923c" stroke-width="24" stroke-linecap="round" opacity=".55"/>
    <path d="M154 522 C260 482 380 482 486 522" fill="none" stroke="#fed7aa" stroke-width="16" stroke-linecap="round"/>`;
  }
  if (object === 'cloud') {
    return `<ellipse cx="214" cy="466" rx="58" ry="24" fill="#dbeafe"/><ellipse cx="430" cy="450" rx="64" ry="26" fill="#ede9fe"/>`;
  }
  if (object === 'ball' || object === 'ball-hand') {
    const cx = object === 'ball' ? 468 : 452;
    const cy = object === 'ball' ? 390 : 182;
    return `<circle cx="${cx}" cy="${cy}" r="42" fill="#ffffff" stroke="#111827" stroke-width="7"/>
    <path d="M${cx - 26} ${cy - 26} Q${cx} ${cy} ${cx + 26} ${cy - 26}" fill="none" stroke="#111827" stroke-width="5"/>
    <path d="M${cx - 28} ${cy + 20} Q${cx} ${cy - 10} ${cx + 28} ${cy + 20}" fill="none" stroke="#111827" stroke-width="5"/>`;
  }
  if (object === 'water') {
    return `<path d="M116 424 Q160 392 204 424 T292 424 T380 424 T468 424 T556 424 V546 H116 Z" fill="#bae6fd"/>
    <path d="M110 456 Q156 428 202 456 T294 456 T386 456 T478 456 T570 456" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round"/>`;
  }
  if (object === 'bike') {
    return `<circle cx="232" cy="430" r="58" fill="none" stroke="#334155" stroke-width="12"/>
    <circle cx="414" cy="430" r="58" fill="none" stroke="#334155" stroke-width="12"/>
    <path d="M232 430 L310 340 L414 430 L296 430 L350 340" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M350 340 H414" stroke="#334155" stroke-width="10" stroke-linecap="round"/>`;
  }
  if (object === 'confetti' || object === 'stars') {
    return `<circle cx="158" cy="168" r="14" fill="#f97316"/><circle cx="486" cy="156" r="12" fill="#22c55e"/>
    <path d="M118 294 L144 310 L118 326 L92 310 Z" fill="#38bdf8"/>
    <path d="M504 302 L534 318 L504 334 L474 318 Z" fill="#e879f9"/>
    <circle cx="108" cy="430" r="10" fill="#facc15"/><circle cx="532" cy="438" r="11" fill="#ef4444"/>`;
  }
  return '';
}

function svg(page) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <rect width="640" height="640" rx="56" fill="#fffaf3"/>
  <circle cx="320" cy="326" r="236" fill="${page.accent}" opacity=".14"/>
  <circle cx="188" cy="154" r="76" fill="#ffffff" opacity=".72"/>
  <circle cx="488" cy="494" r="92" fill="#ffffff" opacity=".64"/>
  ${objectSvg(page.object, page.accent)}
  ${kid(page.pose, page.accent)}
</svg>`;
}

function run(command, args) {
  execFileSync(command, args, { stdio: 'pipe' });
}

function buildImages() {
  const sourceSheet = path.join(root, 'tools', 'assets', 'lets-move-source-sheet.png');
  if (fs.existsSync(sourceSheet)) {
    for (const [index, page] of pages.entries()) {
      const col = index % 4;
      const row = Math.floor(index / 4);
      run('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error',
        '-y',
        '-i',
        sourceSheet,
        '-vf',
        `crop=443:443:${col * 443}:${row * 443},scale=640:640:flags=lanczos`,
        '-codec:v',
        'libwebp',
        '-quality',
        '90',
        path.join(imageDir, `${page.id}.webp`)
      ]);
    }
    return;
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lets-move-img-'));
  for (const page of pages) {
    const svgPath = path.join(tmp, `${page.id}.svg`);
    const thumbPath = `${svgPath}.png`;
    const webpPath = path.join(imageDir, `${page.id}.webp`);
    fs.writeFileSync(svgPath, svg(page));
    run('qlmanage', ['-t', '-s', '640', '-o', tmp, svgPath]);
    run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', thumbPath, '-vf', 'scale=640:640:flags=lanczos', '-codec:v', 'libwebp', '-quality', '88', webpPath]);
  }
}

function buildTts() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lets-move-tts-'));
  for (const [filename, text] of tts) {
    const aiff = path.join(tmp, `${filename}.aiff`);
    const mp3 = path.join(audioDir, filename);
    run('say', ['-v', 'Sandy', '-r', '168', '-o', aiff, text]);
    run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', aiff, '-codec:a', 'libmp3lame', '-q:a', '3', mp3]);
  }
}

function buildSfx() {
  for (const [filename, source] of sfx) {
    const inputs = source.split(',');
    const mp3 = path.join(audioDir, filename);
    const args = ['-hide_banner', '-loglevel', 'error', '-y'];
    if (inputs.length > 1) {
      for (const input of inputs) args.push('-f', 'lavfi', '-i', input);
      args.push('-filter_complex', `${inputs.map((_, index) => `[${index}:a]`).join('')}concat=n=${inputs.length}:v=0:a=1,afade=t=out:st=0.32:d=0.08,volume=0.28[a]`, '-map', '[a]');
    } else {
      args.push('-f', 'lavfi', '-i', source, '-filter:a', 'afade=t=out:st=0.28:d=0.10,volume=0.22');
    }
    args.push('-codec:a', 'libmp3lame', '-q:a', '5', mp3);
    run('ffmpeg', args);
  }
}

buildImages();
buildTts();
buildSfx();
console.log(`Built ${pages.length} images and ${tts.length + sfx.length} audio files for Let's Move.`);
