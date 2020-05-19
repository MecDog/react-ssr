import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

console.log('server worker runing')

// prechache将自动使用cacheFirst策略
// 主要针对css和js等静太文件
// html逻辑单独处理
precacheAndRoute(self.__WB_MANIFEST || [], {
  cleanUrls: false,
  directoryIndex: null,
})

// 对页面请求进行拦截
registerRoute(
  ({ url }) => {
    // 过滤掉api请求
    return (
      url.origin === self.location.origin &&
      url.pathname.startsWith(process.__baseURI__) &&
      !url.pathname.startsWith(process.__baseURI__ + process.__apiPrefix__)
    )
  },
  new StaleWhileRevalidate({
    cacheName: 'html-cache',
  }),
)
