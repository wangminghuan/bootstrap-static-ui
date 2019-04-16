const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Hello Koa 2!'
  })
})
router.get('/index', async (ctx, next) => {
  await ctx.render('index')
})
// router.get('/form/index', async (ctx, next) => {
//   await ctx.render('/form/index', {
//     title: 'Hello Koa 2!'
//   })
// })
router.get('/admin/dashboard', async (ctx, next) => {
  await ctx.render('/dashboard/index')
})
router.get('/admin/general/config', async (ctx, next) => {
  await ctx.render('/general/config')
})
router.get('/admin/general/attachment', async (ctx, next) => {
  await ctx.render('/general/attachment')
})
router.get('/admin/category', async (ctx, next) => {
  await ctx.render('/category/index')
})
router.get('/admin/auth/admin', async (ctx, next) => {
  await ctx.render('/auth/admin')
})
router.get('/admin/auth/adminlog', async (ctx, next) => {
  await ctx.render('/auth/adminlog')
})
router.get('/admin/edit', async (ctx, next) => {
  await ctx.render('edit')
})
router.get('/admin/detail', async (ctx, next) => {
  await ctx.render('detail')
})
router.get('/admin/upload', async (ctx, next) => {
  await ctx.render('upload')
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
router.post('/api/upload', async (ctx, next) => {
  ctx.set("Content-Type", "application/json")
  json={code:1}
  ctx.body = JSON.stringify(json)
})
router.post('/api/login', async (ctx, next) => {
  ctx.set("Content-Type", "application/json")
  json={code:1}
  ctx.body = JSON.stringify(json)
})
module.exports = router
