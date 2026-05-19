const books = [
  {
    id: 'seasons',
    title: 'Seasons of the Year',
    subtitle: '四季主题短句点读',
    age: '3-6岁',
    topic: '自然四季',
    level: '启蒙',
    color: '#2ECC71',
    video: 'assets/seasons.mp4',
    description: '认识 spring, summer, autumn, winter，适合第一次体验英语点读。',
    pages: [
      {
        id: 1,
        sentences: [
          { id: 's1', text: 'Seasons of the year.', audio: 'assets/audio/books/seasons/s01.mp3' },
          { id: 's2', text: 'There are four seasons.', audio: 'assets/audio/books/seasons/s02.mp3' },
        ]
      },
      {
        id: 2,
        sentences: [
          { id: 's3', text: 'This is spring. It is warm.', audio: 'assets/audio/books/seasons/s03.mp3' },
          { id: 's4', text: 'We plant seeds in spring.', audio: 'assets/audio/books/seasons/s04.mp3' },
        ]
      },
      {
        id: 3,
        sentences: [
          { id: 's5', text: 'This is summer. It is hot.', audio: 'assets/audio/books/seasons/s05.mp3' },
          { id: 's6', text: 'We swim in summer.', audio: 'assets/audio/books/seasons/s06.mp3' },
        ]
      },
      {
        id: 4,
        sentences: [
          { id: 's7', text: 'This is autumn. It is cool.', audio: 'assets/audio/books/seasons/s07.mp3' },
          { id: 's8', text: 'We pick apples in autumn.', audio: 'assets/audio/books/seasons/s08.mp3' },
        ]
      },
      {
        id: 5,
        sentences: [
          { id: 's9', text: 'This is winter. It is cold.', audio: 'assets/audio/books/seasons/s09.mp3' },
          { id: 's10', text: 'We build snowmen in winter.', audio: 'assets/audio/books/seasons/s10.mp3' },
        ]
      },
      {
        id: 6,
        sentences: [
          { id: 's11', text: 'Which season do you like?', audio: 'assets/audio/books/seasons/s11.mp3' },
        ]
      },
    ]
  },
  {
    id: 'four-seasons-picture-book',
    title: 'Four Seasons Picture Book',
    subtitle: '四季绘本点读',
    age: '3-6岁',
    topic: '自然四季',
    level: '绘本',
    color: '#38BDF8',
    description: '完整四季绘本点读页，适合孩子看图、听音频、跟读句子。',
    pages: [
      {
        id: 1,
        label: 'Intro',
        theme: 'intro',
        image: '/four-seasons-picture-book/img/p03.jpg',
        alt: 'Four seasons collage',
        sentences: [
          { id: 'fs2', text: 'There are four seasons.', audio: '/four-seasons-picture-book/audio/s02.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Spring',
        theme: 'spring',
        image: '/four-seasons-picture-book/img/p04.jpg',
        alt: 'Spring rain',
        sentences: [
          { id: 'fs3', text: 'In spring, the rain falls.', audio: '/four-seasons-picture-book/audio/s03.mp3' },
          { id: 'fs4', text: 'Children play in the puddles.', audio: '/four-seasons-picture-book/audio/s04.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Summer coming',
        theme: 'summer',
        image: '/four-seasons-picture-book/img/p05.jpg',
        alt: 'Summer coming',
        sentences: [
          { id: 'fs5', text: 'The days get longer.', audio: '/four-seasons-picture-book/audio/s05.mp3' },
          { id: 'fs6', text: 'Summer comes.', audio: '/four-seasons-picture-book/audio/s06.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Summer',
        theme: 'summer',
        image: '/four-seasons-picture-book/img/p06.jpg',
        alt: 'Summer beach',
        sentences: [
          { id: 'fs7', text: 'In summer, the days are hot.', audio: '/four-seasons-picture-book/audio/s07.mp3' },
          { id: 'fs8', text: 'Children play at the beach.', audio: '/four-seasons-picture-book/audio/s08.mp3' },
        ]
      },
      {
        id: 5,
        label: 'Fall coming',
        theme: 'fall',
        image: '/four-seasons-picture-book/img/p07.jpg',
        alt: 'Fall coming',
        sentences: [
          { id: 'fs9', text: 'It starts to cool off.', audio: '/four-seasons-picture-book/audio/s09.mp3' },
          { id: 'fs10', text: 'Fall comes.', audio: '/four-seasons-picture-book/audio/s10.mp3' },
        ]
      },
      {
        id: 6,
        label: 'Fall',
        theme: 'fall',
        image: '/four-seasons-picture-book/img/p08.jpg',
        alt: 'Fall pumpkins',
        sentences: [
          { id: 'fs11', text: 'In fall, trees lose their leaves.', audio: '/four-seasons-picture-book/audio/s11.mp3' },
          { id: 'fs12', text: 'Children make faces on pumpkins.', audio: '/four-seasons-picture-book/audio/s12.mp3' },
        ]
      },
      {
        id: 7,
        label: 'Winter coming',
        theme: 'winter',
        image: '/four-seasons-picture-book/img/p09.jpg',
        alt: 'Winter coming',
        sentences: [
          { id: 'fs13', text: 'The winds get colder.', audio: '/four-seasons-picture-book/audio/s13.mp3' },
          { id: 'fs14', text: 'Winter comes.', audio: '/four-seasons-picture-book/audio/s14.mp3' },
        ]
      },
      {
        id: 8,
        label: 'Winter',
        theme: 'winter',
        image: '/four-seasons-picture-book/img/p10.jpg',
        alt: 'Winter snow',
        sentences: [
          { id: 'fs15', text: 'In winter, the days are shorter.', audio: '/four-seasons-picture-book/audio/s15.mp3' },
          { id: 'fs16', text: 'Children play in the snow.', audio: '/four-seasons-picture-book/audio/s16.mp3' },
        ]
      },
      {
        id: 9,
        label: 'Spring again',
        theme: 'spring',
        image: '/four-seasons-picture-book/img/p11.jpg',
        alt: 'Spring again',
        sentences: [
          { id: 'fs17', text: 'The snow begins to melt.', audio: '/four-seasons-picture-book/audio/s17.mp3' },
          { id: 'fs18', text: 'Flowers start to grow.', audio: '/four-seasons-picture-book/audio/s18.mp3' },
          { id: 'fs19', text: 'Spring comes again.', audio: '/four-seasons-picture-book/audio/s19.mp3' },
        ]
      },
      {
        id: 10,
        label: 'All seasons',
        theme: 'all',
        image: '/four-seasons-picture-book/img/p12.jpg',
        alt: 'All seasons fun',
        sentences: [
          { id: 'fs20', text: 'Every season is fun!', audio: '/four-seasons-picture-book/audio/s20.mp3' },
        ]
      },
    ]
  },
  {
    id: 'animal-words',
    title: 'Animal Words',
    subtitle: '动物单词跟读',
    age: '3-6岁',
    topic: '动物',
    level: '单词',
    color: '#F59E0B',
    description: '12个动物单词卡片，支持听原音、跟读录音和回放自己的声音。',
    practice: true,
    pages: [
      {
        id: 1,
        label: 'Cat',
        theme: 'animal',
        image: 'assets/img/books/animals/cat.webp',
        alt: 'Cat',
        sentences: [
          { id: 'cat-word', text: 'A cat', audio: 'assets/audio/books/animals/p01-cat-word.mp3' },
          { id: 'cat-sentence', text: 'This is a cat.', audio: 'assets/audio/books/animals/p01-cat-sentence.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Dog',
        theme: 'animal',
        image: 'assets/img/books/animals/dog.webp',
        alt: 'Dog',
        sentences: [
          { id: 'dog-word', text: 'A dog', audio: 'assets/audio/books/animals/p02-dog-word.mp3' },
          { id: 'dog-sentence', text: 'This is a dog.', audio: 'assets/audio/books/animals/p02-dog-sentence.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Bird',
        theme: 'animal',
        image: 'assets/img/books/animals/bird.webp',
        alt: 'Bird',
        sentences: [
          { id: 'bird-word', text: 'A bird', audio: 'assets/audio/books/animals/p03-bird-word.mp3' },
          { id: 'bird-sentence', text: 'This is a bird.', audio: 'assets/audio/books/animals/p03-bird-sentence.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Fish',
        theme: 'animal',
        image: 'assets/img/books/animals/fish.webp',
        alt: 'Fish',
        sentences: [
          { id: 'fish-word', text: 'A fish', audio: 'assets/audio/books/animals/p04-fish-word.mp3' },
          { id: 'fish-sentence', text: 'This is a fish.', audio: 'assets/audio/books/animals/p04-fish-sentence.mp3' },
        ]
      },
      {
        id: 5,
        label: 'Rabbit',
        theme: 'animal',
        image: 'assets/img/books/animals/rabbit.webp',
        alt: 'Rabbit',
        sentences: [
          { id: 'rabbit-word', text: 'A rabbit', audio: 'assets/audio/books/animals/p05-rabbit-word.mp3' },
          { id: 'rabbit-sentence', text: 'This is a rabbit.', audio: 'assets/audio/books/animals/p05-rabbit-sentence.mp3' },
        ]
      },
      {
        id: 6,
        label: 'Duck',
        theme: 'animal',
        image: 'assets/img/books/animals/duck.webp',
        alt: 'Duck',
        sentences: [
          { id: 'duck-word', text: 'A duck', audio: 'assets/audio/books/animals/p06-duck-word.mp3' },
          { id: 'duck-sentence', text: 'This is a duck.', audio: 'assets/audio/books/animals/p06-duck-sentence.mp3' },
        ]
      },
      {
        id: 7,
        label: 'Cow',
        theme: 'animal',
        image: 'assets/img/books/animals/cow.webp',
        alt: 'Cow',
        sentences: [
          { id: 'cow-word', text: 'A cow', audio: 'assets/audio/books/animals/p07-cow-word.mp3' },
          { id: 'cow-sentence', text: 'This is a cow.', audio: 'assets/audio/books/animals/p07-cow-sentence.mp3' },
        ]
      },
      {
        id: 8,
        label: 'Horse',
        theme: 'animal',
        image: 'assets/img/books/animals/horse.webp',
        alt: 'Horse',
        sentences: [
          { id: 'horse-word', text: 'A horse', audio: 'assets/audio/books/animals/p08-horse-word.mp3' },
          { id: 'horse-sentence', text: 'This is a horse.', audio: 'assets/audio/books/animals/p08-horse-sentence.mp3' },
        ]
      },
      {
        id: 9,
        label: 'Sheep',
        theme: 'animal',
        image: 'assets/img/books/animals/sheep.webp',
        alt: 'Sheep',
        sentences: [
          { id: 'sheep-word', text: 'A sheep', audio: 'assets/audio/books/animals/p09-sheep-word.mp3' },
          { id: 'sheep-sentence', text: 'This is a sheep.', audio: 'assets/audio/books/animals/p09-sheep-sentence.mp3' },
        ]
      },
      {
        id: 10,
        label: 'Pig',
        theme: 'animal',
        image: 'assets/img/books/animals/pig.webp',
        alt: 'Pig',
        sentences: [
          { id: 'pig-word', text: 'A pig', audio: 'assets/audio/books/animals/p10-pig-word.mp3' },
          { id: 'pig-sentence', text: 'This is a pig.', audio: 'assets/audio/books/animals/p10-pig-sentence.mp3' },
        ]
      },
      {
        id: 11,
        label: 'Lion',
        theme: 'animal',
        image: 'assets/img/books/animals/lion.webp',
        alt: 'Lion',
        sentences: [
          { id: 'lion-word', text: 'A lion', audio: 'assets/audio/books/animals/p11-lion-word.mp3' },
          { id: 'lion-sentence', text: 'This is a lion.', audio: 'assets/audio/books/animals/p11-lion-sentence.mp3' },
        ]
      },
      {
        id: 12,
        label: 'Elephant',
        theme: 'animal',
        image: 'assets/img/books/animals/elephant.webp',
        alt: 'Elephant',
        sentences: [
          { id: 'elephant-word', text: 'An elephant', audio: 'assets/audio/books/animals/p12-elephant-word.mp3' },
          { id: 'elephant-sentence', text: 'This is an elephant.', audio: 'assets/audio/books/animals/p12-elephant-sentence.mp3' },
        ]
      },
    ]
  },
  {
    id: 'fruit-words',
    title: 'Fruit Words',
    subtitle: '水果单词跟读',
    age: '3-6岁',
    topic: '水果',
    level: 'aa',
    color: '#F59E0B',
    description: 'Day 1 水果单词卡片，学习 apple, banana, orange。',
    practice: true,
    pages: [
      {
        id: 1,
        label: 'Apple',
        theme: 'fruit',
        image: 'assets/img/books/fruits/apple.webp',
        alt: 'Apple',
        sentences: [
          { id: 'apple-word', text: 'An apple', audio: 'assets/audio/books/fruits/p01-apple-word.mp3' },
          { id: 'apple-sentence', text: 'This is an apple.', audio: 'assets/audio/books/fruits/p01-apple-sentence.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Banana',
        theme: 'fruit',
        image: 'assets/img/books/fruits/banana.webp',
        alt: 'Banana',
        sentences: [
          { id: 'banana-word', text: 'A banana', audio: 'assets/audio/books/fruits/p02-banana-word.mp3' },
          { id: 'banana-sentence', text: 'This is a banana.', audio: 'assets/audio/books/fruits/p02-banana-sentence.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Orange',
        theme: 'fruit',
        image: 'assets/img/books/fruits/orange.webp',
        alt: 'Orange',
        sentences: [
          { id: 'orange-word', text: 'An orange', audio: 'assets/audio/books/fruits/p03-orange-word.mp3' },
          { id: 'orange-sentence', text: 'This is an orange.', audio: 'assets/audio/books/fruits/p03-orange-sentence.mp3' },
        ]
      },
    ]
  },
  {
    id: 'i-see-fruit',
    title: 'I See Fruit',
    subtitle: '重复句型点读',
    age: '3-6岁',
    topic: '水果',
    level: 'aa',
    color: '#F59E0B',
    description: 'Day 1 重复句型书，练习 I see ...',
    pages: [
      {
        id: 1,
        label: 'Apple',
        theme: 'fruit',
        image: 'assets/img/books/fruits/apple.webp',
        alt: 'Apple',
        sentences: [
          { id: 'see-apple', text: 'I see an apple.', audio: 'assets/audio/books/fruits/see-apple.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Banana',
        theme: 'fruit',
        image: 'assets/img/books/fruits/banana.webp',
        alt: 'Banana',
        sentences: [
          { id: 'see-banana', text: 'I see a banana.', audio: 'assets/audio/books/fruits/see-banana.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Orange',
        theme: 'fruit',
        image: 'assets/img/books/fruits/orange.webp',
        alt: 'Orange',
        sentences: [
          { id: 'see-orange', text: 'I see an orange.', audio: 'assets/audio/books/fruits/see-orange.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Fruit',
        theme: 'fruit',
        image: 'assets/img/books/fruits/fruit-group.webp',
        alt: 'Fruit',
        sentences: [
          { id: 'see-fruit', text: 'I see fruit.', audio: 'assets/audio/books/fruits/see-fruit.mp3' },
        ]
      },
    ]
  },
  {
    id: 'fruit-in-my-bag',
    title: 'Fruit in My Bag',
    subtitle: '场景小书点读',
    age: '3-6岁',
    topic: '水果',
    level: 'A',
    color: '#F59E0B',
    description: 'Day 1 场景小书，练习 I have ... in my bag.',
    pages: [
      {
        id: 1,
        label: 'Apple',
        theme: 'fruit',
        image: 'assets/img/books/fruits/fruit-bag.webp',
        alt: 'Fruit in my bag',
        sentences: [
          { id: 'bag-apple', text: 'I have an apple in my bag.', audio: 'assets/audio/books/fruits/bag-apple.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Banana',
        theme: 'fruit',
        image: 'assets/img/books/fruits/fruit-bag.webp',
        alt: 'Fruit in my bag',
        sentences: [
          { id: 'bag-banana', text: 'I have a banana in my bag.', audio: 'assets/audio/books/fruits/bag-banana.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Orange',
        theme: 'fruit',
        image: 'assets/img/books/fruits/fruit-bag.webp',
        alt: 'Fruit in my bag',
        sentences: [
          { id: 'bag-orange', text: 'I have an orange in my bag.', audio: 'assets/audio/books/fruits/bag-orange.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Fruit',
        theme: 'fruit',
        image: 'assets/img/books/fruits/fruit-bag.webp',
        alt: 'Fruit in my bag',
        sentences: [
          { id: 'bag-fruit', text: 'I have fruit in my bag.', audio: 'assets/audio/books/fruits/bag-fruit.mp3' },
        ]
      },
    ]
  },
  {
    id: 'lets-move',
    title: "Let's Move!",
    subtitle: 'Fun Sports for Kids',
    age: '小学一年级',
    topic: '运动',
    level: 'TPR',
    color: '#14B8A6',
    description: '运动主题动作英语：一页一个动作，短句点读、跟读鼓励和动作音效。',
    practice: true,
    encouragementAudios: [
      'assets/audio/books/lets-move/enc-great.mp3?v=202605191215',
      'assets/audio/books/lets-move/enc-awesome.mp3?v=202605191215',
      'assets/audio/books/lets-move/enc-good-job.mp3?v=202605191215',
    ],
    pages: [
      {
        id: 1,
        label: 'Start',
        theme: 'move',
        image: 'assets/img/books/lets-move/cover.webp',
        alt: "Let's Move cover",
        actionText: 'Move with me!',
        actionAudio: 'assets/audio/books/lets-move/sfx-ready.mp3?v=202605191215',
        sentences: [
          { id: 'lm-cover-lets-move', text: "Let's move!", audio: 'assets/audio/books/lets-move/lm-cover-01-lets-move.mp3?v=202605191215' },
          { id: 'lm-cover-lets-play', text: "Let's play!", audio: 'assets/audio/books/lets-move/lm-cover-02-lets-play.mp3?v=202605191215' },
        ]
      },
      {
        id: 2,
        label: 'Run',
        theme: 'move',
        image: 'assets/img/books/lets-move/run.webp',
        alt: 'Run',
        actionText: 'Run with me!',
        actionAudio: 'assets/audio/books/lets-move/sfx-run.mp3?v=202605191215',
        sentences: [
          { id: 'lm-run-word', text: 'Run!', audio: 'assets/audio/books/lets-move/lm-run-01-word.mp3?v=202605191215' },
          { id: 'lm-run-chant', text: 'Run, run, run!', audio: 'assets/audio/books/lets-move/lm-run-02-chant.mp3?v=202605191215' },
          { id: 'lm-run-can', text: 'I can run fast!', audio: 'assets/audio/books/lets-move/lm-run-03-can.mp3?v=202605191215' },
        ]
      },
      {
        id: 3,
        label: 'Jump',
        theme: 'move',
        image: 'assets/img/books/lets-move/jump.webp',
        alt: 'Jump',
        actionText: 'Jump together!',
        actionAudio: 'assets/audio/books/lets-move/sfx-jump.mp3?v=202605191215',
        sentences: [
          { id: 'lm-jump-word', text: 'Jump!', audio: 'assets/audio/books/lets-move/lm-jump-01-word.mp3?v=202605191215' },
          { id: 'lm-jump-high', text: 'Jump up high!', audio: 'assets/audio/books/lets-move/lm-jump-02-high.mp3?v=202605191215' },
          { id: 'lm-jump-can', text: 'I can jump!', audio: 'assets/audio/books/lets-move/lm-jump-03-can.mp3?v=202605191215' },
        ]
      },
      {
        id: 4,
        label: 'Kick',
        theme: 'move',
        image: 'assets/img/books/lets-move/kick.webp',
        alt: 'Kick',
        actionText: 'Kick the ball!',
        actionAudio: 'assets/audio/books/lets-move/sfx-kick.mp3?v=202605191215',
        sentences: [
          { id: 'lm-kick-word', text: 'Kick!', audio: 'assets/audio/books/lets-move/lm-kick-01-word.mp3?v=202605191215' },
          { id: 'lm-kick-ball', text: 'Kick the ball!', audio: 'assets/audio/books/lets-move/lm-kick-02-ball.mp3?v=202605191215' },
          { id: 'lm-kick-go', text: 'Go! Go! Go!', audio: 'assets/audio/books/lets-move/lm-kick-03-go.mp3?v=202605191215' },
        ]
      },
      {
        id: 5,
        label: 'Throw',
        theme: 'move',
        image: 'assets/img/books/lets-move/throw.webp',
        alt: 'Throw',
        actionText: 'Throw and catch!',
        actionAudio: 'assets/audio/books/lets-move/sfx-throw.mp3?v=202605191215',
        sentences: [
          { id: 'lm-throw-word', text: 'Throw!', audio: 'assets/audio/books/lets-move/lm-throw-01-word.mp3?v=202605191215' },
          { id: 'lm-throw-ball', text: 'Throw the ball!', audio: 'assets/audio/books/lets-move/lm-throw-02-ball.mp3?v=202605191215' },
          { id: 'lm-throw-catch', text: 'Catch it!', audio: 'assets/audio/books/lets-move/lm-throw-03-catch.mp3?v=202605191215' },
        ]
      },
      {
        id: 6,
        label: 'Swim',
        theme: 'move',
        image: 'assets/img/books/lets-move/swim.webp',
        alt: 'Swim',
        actionText: 'Swim like a fish!',
        actionAudio: 'assets/audio/books/lets-move/sfx-swim.mp3?v=202605191215',
        sentences: [
          { id: 'lm-swim-word', text: 'Swim!', audio: 'assets/audio/books/lets-move/lm-swim-01-word.mp3?v=202605191215' },
          { id: 'lm-swim-water', text: 'Swim in the water!', audio: 'assets/audio/books/lets-move/lm-swim-02-water.mp3?v=202605191215' },
          { id: 'lm-swim-splash', text: 'Splash! Splash!', audio: 'assets/audio/books/lets-move/lm-swim-03-splash.mp3?v=202605191215' },
        ]
      },
      {
        id: 7,
        label: 'Ride',
        theme: 'move',
        image: 'assets/img/books/lets-move/ride.webp',
        alt: 'Ride',
        actionText: "Let's ride!",
        actionAudio: 'assets/audio/books/lets-move/sfx-ride.mp3?v=202605191215',
        sentences: [
          { id: 'lm-ride-word', text: 'Ride!', audio: 'assets/audio/books/lets-move/lm-ride-01-word.mp3?v=202605191215' },
          { id: 'lm-ride-bike', text: 'Ride a bike!', audio: 'assets/audio/books/lets-move/lm-ride-02-bike.mp3?v=202605191215' },
          { id: 'lm-ride-ring', text: 'Ring! Ring!', audio: 'assets/audio/books/lets-move/lm-ride-03-ring.mp3?v=202605191215' },
        ]
      },
      {
        id: 8,
        label: 'Great Job',
        theme: 'move',
        image: 'assets/img/books/lets-move/great-job.webp',
        alt: 'Great job',
        actionText: 'Yay!',
        actionAudio: 'assets/audio/books/lets-move/sfx-yay.mp3?v=202605191215',
        sentences: [
          { id: 'lm-end-run', text: 'You can run!', audio: 'assets/audio/books/lets-move/lm-end-01-run.mp3?v=202605191215' },
          { id: 'lm-end-jump', text: 'You can jump!', audio: 'assets/audio/books/lets-move/lm-end-02-jump.mp3?v=202605191215' },
          { id: 'lm-end-sports', text: 'You can play sports!', audio: 'assets/audio/books/lets-move/lm-end-03-sports.mp3?v=202605191215' },
          { id: 'lm-end-yay', text: 'Yay!', audio: 'assets/audio/books/lets-move/lm-end-04-yay.mp3?v=202605191215' },
        ]
      },
    ]
  },
  {
    id: 'coming-daily',
    title: 'Daily English',
    subtitle: '生活场景短句',
    age: '6-8岁',
    topic: '日常表达',
    level: '更新中',
    color: '#7C3AED',
    description: '适合早餐、睡前、出门等日常表达，资源准备中。',
    comingSoon: true,
    pages: []
  }
];

const classBooks = [
  {
    id: 'class-1-4-l22-my-sand-pie',
    title: 'L22 My sand pie',
    subtitle: '一（4）班点读版',
    age: '一（4）班',
    topic: '英语课文',
    level: 'L22',
    color: '#F59E0B',
    description: 'My sand pie 课文点读版，支持左右滑动翻页、逐句点读。有效期至 2026-05-26 23:59。',
    expiresAt: '2026-05-26T23:59:59+08:00',
    practice: true,
    pages: [
      {
        id: 1,
        label: 'Cover',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p01.webp',
        alt: 'My sand pie cover',
        sentences: [
          { id: 'l22-p01-title', text: 'My sand pie.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p01-title.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Bucket',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p02.webp',
        alt: 'Bucket',
        sentences: [
          { id: 'l22-p02-bucket', text: 'Here is the bucket.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p02-bucket.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Spade',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p03.webp',
        alt: 'Spade',
        sentences: [
          { id: 'l22-p03-spade', text: 'Here is the spade.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p03-spade.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Sand',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p04.webp',
        alt: 'Sand',
        sentences: [
          { id: 'l22-p04-sand', text: 'Here is the sand.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p04-sand.mp3' },
        ]
      },
      {
        id: 5,
        label: 'Water',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p05.webp',
        alt: 'Water',
        sentences: [
          { id: 'l22-p05-water', text: 'Here is the water.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p05-water.mp3' },
        ]
      },
      {
        id: 6,
        label: 'Plate',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p06.webp',
        alt: 'Plate',
        sentences: [
          { id: 'l22-p06-plate', text: 'Here is the plate.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p06-plate.mp3' },
        ]
      },
      {
        id: 7,
        label: 'Sand goes',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p07.webp',
        alt: 'The sand goes here',
        sentences: [
          { id: 'l22-p07-sand-goes', text: 'The sand goes here.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p07-sand-goes.mp3' },
        ]
      },
      {
        id: 8,
        label: 'Leaves go',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p08.webp',
        alt: 'The leaves go here',
        sentences: [
          { id: 'l22-p08-leaves-go', text: 'The leaves go here.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p08-leaves-go.mp3' },
        ]
      },
      {
        id: 9,
        label: 'My sand pie',
        theme: 'class',
        image: 'assets/class/grade1-4/l22-my-sand-pie/reader/p09.webp',
        alt: 'Look at my sand pie',
        sentences: [
          { id: 'l22-p09-look', text: 'Look at my sand pie.', audio: 'assets/class/grade1-4/l22-my-sand-pie/audio/p09-look.mp3' },
        ]
      },
    ]
  },
  {
    id: 'class-1-4-l21-my-lunch',
    title: 'L21 My lunch',
    subtitle: '一（4）班点读版',
    age: '一（4）班',
    topic: '英语课文',
    level: 'L21',
    color: '#22C55E',
    description: 'My lunch 课文点读版，支持左右滑动翻页、逐句点读。有效期至 2026-05-18 23:59。',
    expiresAt: '2026-05-18T23:59:59+08:00',
    practice: true,
    pages: [
      {
        id: 1,
        label: 'Cover',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p01.webp',
        alt: 'My lunch cover',
        sentences: [
          { id: 'l21-p01-title', text: 'My lunch.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p01-title.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Bread',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p02.webp',
        alt: 'Bread',
        sentences: [
          { id: 'l21-p02-bread', text: 'Here is the bread.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p02-bread.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Butter',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p03.webp',
        alt: 'Butter',
        sentences: [
          { id: 'l21-p03-butter', text: 'Here is the butter.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p03-butter.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Cheese',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p04.webp',
        alt: 'Cheese',
        sentences: [
          { id: 'l21-p04-cheese', text: 'Here is the cheese.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p04-cheese.mp3' },
        ]
      },
      {
        id: 5,
        label: 'Lettuce',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p05.webp',
        alt: 'Lettuce',
        sentences: [
          { id: 'l21-p05-lettuce', text: 'Here is the lettuce.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p05-lettuce.mp3' },
        ]
      },
      {
        id: 6,
        label: 'Carrot',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p06.webp',
        alt: 'Carrot',
        sentences: [
          { id: 'l21-p06-carrot', text: 'Here is the carrot.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p06-carrot.mp3' },
        ]
      },
      {
        id: 7,
        label: 'Tomato',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p07.webp',
        alt: 'Tomato',
        sentences: [
          { id: 'l21-p07-tomato', text: 'Here is the tomato.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p07-tomato.mp3' },
        ]
      },
      {
        id: 8,
        label: 'Meat',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p08.webp',
        alt: 'Meat',
        sentences: [
          { id: 'l21-p08-meat', text: 'Here is the meat.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p08-meat.mp3' },
        ]
      },
      {
        id: 9,
        label: 'My lunch',
        theme: 'class',
        image: 'assets/class/grade1-4/l21-my-lunch/reader/p09.webp',
        alt: 'My lunch',
        sentences: [
          { id: 'l21-p09-my-lunch', text: 'Here is my lunch.', audio: 'assets/class/grade1-4/l21-my-lunch/audio/p09-my-lunch.mp3' },
        ]
      },
    ]
  },
  {
    id: 'class-1-4-l20-party-food',
    title: 'L20 Party food',
    subtitle: '一（4）班点读版',
    age: '一（4）班',
    topic: '英语课文',
    level: 'L20',
    color: '#EC4899',
    description: 'Party food 课文点读版，支持左右滑动翻页、逐句点读。有效期至 2026-05-13 23:59。',
    expiresAt: '2026-05-13T23:59:59+08:00',
    practice: true,
    pages: [
      {
        id: 1,
        label: 'Cover',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p01.webp',
        alt: 'Party food cover',
        sentences: [
          { id: 'l20-p01-title', text: 'Party food.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p01-title.mp3' },
        ]
      },
      {
        id: 2,
        label: 'Chips',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p09.webp',
        alt: 'Chips',
        sentences: [
          { id: 'l20-p02-chips', text: 'I like chips.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p02-chips.mp3' },
        ]
      },
      {
        id: 3,
        label: 'Chocolate',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p08.webp',
        alt: 'Chocolate',
        sentences: [
          { id: 'l20-p03-chocolate', text: 'I like chocolate.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p03-chocolate.mp3' },
        ]
      },
      {
        id: 4,
        label: 'Popcorn',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p07.webp',
        alt: 'Popcorn',
        sentences: [
          { id: 'l20-p04-popcorn', text: 'I like popcorn.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p04-popcorn.mp3' },
        ]
      },
      {
        id: 5,
        label: 'Fruit',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p06.webp',
        alt: 'Fruit',
        sentences: [
          { id: 'l20-p05-fruit', text: 'I like fruit.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p05-fruit.mp3' },
        ]
      },
      {
        id: 6,
        label: 'Lollies',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p05.webp',
        alt: 'Lollies',
        sentences: [
          { id: 'l20-p06-lollies', text: 'I like lollies.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p06-lollies.mp3' },
        ]
      },
      {
        id: 7,
        label: 'Crackers',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p04.webp',
        alt: 'Crackers',
        sentences: [
          { id: 'l20-p07-crackers', text: 'I like crackers.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p07-crackers.mp3' },
        ]
      },
      {
        id: 8,
        label: 'Jelly beans',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p03.webp',
        alt: 'Jelly beans',
        sentences: [
          { id: 'l20-p08-jelly-beans', text: 'I like jelly beans.', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p08-jelly-beans.mp3' },
        ]
      },
      {
        id: 9,
        label: 'Birthday cake',
        theme: 'class',
        image: 'assets/class/grade1-4/l20-party-food/reader/p02.webp',
        alt: 'Birthday cake',
        sentences: [
          { id: 'l20-p09-birthday-cake', text: 'I like birthday cake!', audio: 'assets/class/grade1-4/l20-party-food/audio/v2-p09-birthday-cake.mp3' },
        ]
      },
    ]
  }
];
