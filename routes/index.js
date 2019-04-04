const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/dashboard/index', async (ctx, next) => {
  await ctx.render('/dashboard/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/auth/admin/index', async (ctx, next) => {
  await ctx.render('/auth/admin/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/auth/adminlog/index', async (ctx, next) => {
  await ctx.render('/auth/adminlog/index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
