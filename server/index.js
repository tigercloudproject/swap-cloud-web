import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import VueX from 'vuex'
import ApiConfig from '../config/api.config.js'
async function start () {
  const app = new Koa()
  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || 3008

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(async (ctx, next) => {
    // VueX.Store.commit('auth/SET_TOKEN', {
    //   token: ctx.cookies.get('token')
    // })
    // VueX.Store.commit('auth/SET_UID', {
    //   uid: ctx.cookies.get('uid'),
    //   ssid: ctx.cookies.get('ssid')
    // })
    // VueX.Store.commit('auth/SET_LOCALE', {
    //   locale: ctx.cookies.get('locale'),
    // })
     ctx.req.contract_id = ctx.query.id
     ctx.req.news = ctx.query.news
     ctx.req.token = ctx.cookies.get('token')
    //  ctx.req.ssid = ctx.cookies.get('ssid')
    //  ctx.req.uid = ctx.cookies.get('uid')
     ctx.req.locale = ctx.cookies.get('lang')
     if (!ctx.req.locale) {
      let acceptLanguage = ctx.req && ctx.req.headers['accept-language']
      if (acceptLanguage) {
        if (~acceptLanguage.indexOf('en')) {
          acceptLanguage = 'en-us'
        }
        if (~acceptLanguage.indexOf('CN')) {
          acceptLanguage = 'zh-cn'
        }
        if (~['en-us', 'zh-cn'].indexOf(acceptLanguage)) {
          ctx.cookies.set('lang', acceptLanguage, {domain: ApiConfig.domain, maxAge: 3600 * 24 * 10, httpOnly: false})
          ctx.req.locale = acceptLanguage
        }
      }
     } else {
       if (~ctx.req.locale.indexOf('en')) {
        ctx.req.locale = 'en-us'
       }
     }
     await next()
  })
  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
