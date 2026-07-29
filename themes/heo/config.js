const CONFIG = {
  HEO_HOME_POST_TWO_COLS: true, // 首页博客两列显示，若为false则只显示一列
  HEO_LOADING_COVER: true, // 页面加载的遮罩动画

  HEO_HOME_BANNER_ENABLE: true,

  HEO_INFO_CARD_AVATAR_BLUR: true, // 文章详情页个人资料卡头像样式。true：显示为模糊装饰头像；false：与首页头像保持一致

  HEO_COLOR_PRIMARY: '#4f65f0',
  HEO_COLOR_PRIMARY_HOVER: '#4f46e5',
  HEO_COLOR_PRIMARY_TEXT: '#ffffff',
  HEO_COLOR_ACCENT: '#dca846',
  HEO_COLOR_BG: '#f7f9fe',
  HEO_COLOR_BG_DARK: '#18171d',
  HEO_COLOR_CARD: '#ffffff',
  HEO_COLOR_CARD_DARK: '#1e1e1e',
  HEO_COLOR_CARD_MUTED: '#f1f3f8',
  HEO_COLOR_BORDER: '#4f46e5',
  HEO_COLOR_BORDER_DARK: '#dca846',
  HEO_COLOR_TEXT: '#111827',
  HEO_COLOR_TEXT_SECONDARY: '#4b5563',

  HEO_SITE_CREATE_TIME: '2023-10-27', // 建站日期，用于计算网站运行的第几天

  // 首页顶部通知条滚动内容，如不需要可以留空 []
  HEO_NOTICE_BAR: [],

  // 英雄区左右侧组件颠倒位置
  HEO_HERO_REVERSE: false,
  // 博客主体区左右侧组件颠倒位置
  HEO_HERO_BODY_REVERSE: false,

  // 英雄区(首页顶部大卡)
  HEO_HERO_TITLE_1: 'Technology',
  HEO_HERO_TITLE_2: 'Insights',
  HEO_HERO_TITLE_3: 'WENYANG.XYZ',
  HEO_HERO_TITLE_4: "it's a crime",
  HEO_HERO_TITLE_5: 'to waste a single day',
  HEO_HERO_TITLE_LINK: 'https://www.wenyang.xyz',
  // 英雄区遮罩文字
  HEO_HERO_COVER_TITLE: 'Browsing aimlessly',

  // 英雄区显示三个置顶分类
  HEO_HERO_CATEGORY_1: { title: 'Technology Practice', url: '/category/practice' },
  HEO_HERO_CATEGORY_2: { title: 'Python Showcase', url: '/tag/python' },
  HEO_HERO_CATEGORY_3: { title: 'Network Engineer', url: '/tag/network' },

  // 英雄区右侧推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  HEO_HERO_RECOMMEND_POST_TAG: '',
  HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 推荐文章排序，为`true`时将强制按最后修改时间倒序
  //   HERO_RECOMMEND_COVER: 'https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg', // 英雄区右侧图片

  // 英雄区右侧推荐文章遮罩控制
  HEO_HERO_RECOMMEND_COVER_ENABLE: true, // 是否显示推荐文章遮罩图片，true显示遮罩需点击查看，false直接显示推荐文章

  // 右侧个人资料卡牌欢迎语，点击可自动切换
  HEO_INFOCARD_GREETINGS: [
    'Yesterday is history',
    'Tomorrow is a mystery',
    'But today is Friday'
  ],

  // 个人资料底部按钮
  HEO_INFO_CARD_URL1: 'https://www.linkedin.com/in/wenyang-lyu-603470195/',
  HEO_INFO_CARD_ICON1: 'fab fa-linkedin',
  HEO_INFO_CARD_URL2: 'https://github.com/wenyanglyu',
  HEO_INFO_CARD_ICON2: 'fab fa-github',
  HEO_INFO_CARD_ICON_ORCID: 'fab fa-orcid',
  HEO_INFO_CARD_URL3: '',
  HEO_INFO_CARD_TEXT3: '',

  // 用户技能图标
  HEO_GROUP_ICONS: [
    {
      title_1: 'Python',
      img_1: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color_1: '#989bf8',
      title_2: 'C#',
      img_2: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      color_2: '#ffffff'
    },
    {
      title_1: 'Docker',
      img_1: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      color_1: '#57b6e6',
      title_2: 'Git',
      img_2: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color_2: '#4082c3'
    },
    {
      title_1: 'PyTorch',
      img_1: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      color_1: '#ffffff',
      title_2: 'TensorFlow',
      img_2: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      color_2: '#ffffff'
    },
    {
      title_1: 'OpenCV',
      img_1: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/opencv.svg',
      color_1: '#eb6840',
      title_2: 'YOLO',
      img_2: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ultralytics.svg',
      color_2: '#8f55ba'
    },
    {
      title_1: 'NumPy',
      img_1: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
      color_1: '#f29e39',
      title_2: 'scikit-learn',
      img_2: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/scikitlearn.svg',
      color_2: '#2c51db'
    },
    {
      title_1: 'Jupyter',
      img_1: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
      color_1: '#f7cb4f',
      title_2: 'C++',
      img_2: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      color_2: '#e9572b'
    },
    {
      title_1: 'VS Code',
      img_1: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      color_1: '#df5b40',
      title_2: 'GitHub',
      img_2: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      color_2: '#1f1f1f'
    }
  ],

  HEO_SOCIAL_CARD: false, // 是否显示右侧，点击加入社群按钮
  HEO_SOCIAL_CARD_TITLE_1: 'Korchagin',
  HEO_SOCIAL_CARD_TITLE_2: 'Join our DC Community',
  HEO_SOCIAL_CARD_TITLE_3: 'Click me',
  HEO_SOCIAL_CARD_URL: 'https://discord.gg/YmWaNJzF',

  // 底部统计面板文案
  HEO_POST_COUNT_TITLE: 'Articles Count:',
  HEO_SITE_TIME_TITLE: 'Website Days:',
  HEO_SITE_VISIT_TITLE: 'Page Views:',
  HEO_SITE_VISITOR_TITLE: 'Website Viewers:',

  // *****  以下配置无效，只是预留开发 ****
  // 菜单配置
  HEO_MENU_INDEX: true, // 显示首页
  HEO_MENU_CATEGORY: true, // 显示分类
  HEO_MENU_TAG: true, // 显示标签
  HEO_MENU_ARCHIVE: true, // 显示归档
  HEO_MENU_SEARCH: true, // 显示搜索

  HEO_POST_LIST_COVER: true, // 列表显示文章封面
  HEO_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  HEO_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  HEO_POST_LIST_SUMMARY: true, // 文章摘要
  HEO_POST_LIST_PREVIEW: false, // 读取文章预览
  HEO_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  HEO_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  HEO_ARTICLE_COPYRIGHT: true, // 文章版权声明：true 全部显示；false 全部关闭；custom 仅填写 copyright 时显示
  HEO_ARTICLE_NOT_BY_AI: false, // 显示非AI写作
  HEO_ARTICLE_RECOMMEND: true, // 文章关联推荐

  HEO_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  HEO_WIDGET_ANALYTICS: false, // 显示统计卡
  HEO_WIDGET_TO_TOP: true,
  HEO_WIDGET_TO_COMMENT: true, // 跳到评论区
  HEO_WIDGET_DARK_MODE: true, // 夜间模式
  HEO_WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG
