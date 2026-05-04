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
    id: 'coming-animals',
    title: 'Animal Words',
    subtitle: '动物主题点读',
    age: '3-6岁',
    topic: '动物',
    level: '更新中',
    color: '#F59E0B',
    description: '适合认识常见动物声音和英文名称，资源准备中。',
    comingSoon: true,
    pages: []
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
