const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Hello Koa 2!'
  })
})
router.get('/index', async (ctx, next) => {
  await ctx.render('index')
})
router.get('/form/index', async (ctx, next) => {
  await ctx.render('/form/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/admin/dashboard', async (ctx, next) => {
  await ctx.render('/dashboard/index')
})
router.get('/table/data/index', async (ctx, next) => {
  await ctx.render('/table/data/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/table/basic/index', async (ctx, next) => {
  await ctx.render('/table/basic/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/chart/index', async (ctx, next) => {
  await ctx.render('/chart/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/login', async (ctx, next) => {
  await ctx.render('/login.json', {
    title: 'Hello Koa 2!'
  })
})
module.exports = router
