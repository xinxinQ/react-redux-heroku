module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || process.env.NODE_ENV === 'production' ? 8080 : 3000,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  app: {
    title: 'React与Redux开发实例精解',
    description: 'React与Redux开发实例精解',
    head: {
      titleTemplate: 'React与Redux开发实例精解: %s',
      meta: [
        {
          name: 'description',
          content: 'React与Redux开发实例精解'
        },
        { charset: 'utf-8' }
      ]
    }
  }
};
