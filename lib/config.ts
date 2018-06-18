const host = 'localhost'

export default  {
  name: 'YeeTiku Admin',
  prefix: 'yeetiu Admin',
  footerText: 'YEE TIKU Admin 版权所有 © 2017 由 elone 支持',
  logo: `http://${host}:8080/assets/logo.png`,
  iconFontUrl: '//at.alicdn.com/t/font_c4y7asse3q1cq5mi.js',
  server:`http://${host}:8080`,
  baseURL: `http://${host}:8080/api/v1`,  
  CORS: [`http://${host}:7001`],
  openPages: ['/admin/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: '/auth/login',
    userLogout: '/auth/logout',
    userRegister: '/auth/register',
    userInfo: '/me',
    users: '/users',
    groups: '/groups',
    tags: '/tags',
    questions: '/questions',
    categories:'categories',
    banks:'/banks',
    comments:'/comments',
    upload:'/upload',
    client:'/client',
    notification:'/notification',
    feedback:'feedback',
  },
  templates:{
    questions: "/download/import_questions_template.xlsx"
  }
}