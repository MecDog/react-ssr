react服务端渲染脚手架，既有ssr首屏渲染优势，也有spa页面切换的响应性能


### 1.node端文件打包注意项
1. 考虑到需要依赖分析能力，因此必须得webpack，仅仅babel满足不了需求的。
2. 三方依赖node_modules没必要打进包内，因为node端可以直接使用项目里的node_mudles。`webpack-node-externals`就是解决这个问题
3. 静态资源处理方式和clent保持一致，`publicPath`要进行同步
4. 路径上尽量使用绝对路径,因为打包后，文件目录结构已经变了
5. 然后就是css文件处理，后面会说到


### 2. node端css、less等文件处理
这个根据客户端css文件处理的方式不同，措施也不同

#### 使用`mini-css-extract-plugin`抽离了css
由于html里已经有了全部页面的css样式,因此node端仅需根据是否使用cssModule来处理。

**无`cssModule`**
直接无视css文件

```javascript
{
  test:/.(css|less|scss)$/,
  loader: 'ignore-laoder'
}
```

**有`cssModule`**
此时需要获取css文件导出的classname,而无需嵌入css内容
```javascript
{
  test:/.css$/,
  loader: 'css-laoder'
  options:{
    exportOnlyLocals: true,
  }
}
```

#### 没有使用`mini-css-extract-plugin`
[isomorphic-style-loader](https://github.com/kriasoft/isomorphic-style-loader)正好可以解决此问题。  

node端：在调用`renderToString()`时，获取依赖的css文件内容；然后插入的html的`<style>`标签内。
client端：在首次渲染时，移除掉内置在js里的css内容，避免冗余。


### 3.懒加载支持原理
client端懒加载跟正常的写法没有区别

> * `react.lazy`和`react.Suspense`是不支持ssr的

```javascript
// router/config.js
export default [
  {
    path: '/home',
    component: lazyLoader(() => import('../pages/home')),
  },
  {
    path: '/detail',
    component: lazyLoader(() => import('../pages/home')),
  },
]
```

lazyLoader里面会维护所有的懒加载组件.

```javascript 
let loaders = []
function lazyLoader(fn) {
  let config = {
    loader: fn,
    component: null,// 懒加载的组件
    loaded: false, // 是否加载完成
  }
  loaders.push(config)
  return pageHOC(config)
}
```

lazyLoader返回的`pageHOC`还提供了`preLoad()`方法,预加载好相关组件，这在首屏渲染时会用到

```javascript
// client/index.js
// matchRoutes为匹配的卤肉配置,数据结构同client/router/config.js
let matchRoutes = matchRouteByPath(history.location.pathname)
if (matchRoutes.length) {
  // 这里调用preload() 预加载首屏用到的组件，再进行渲染
  // 不然的话，首屏前端会展示loading组件,导致跟服务端下发的不一致
  Promise.all(matchRoutes.map((route) => route.component.preload())).then(() => {
    render()
  })
}
```

`lazyLoader.preloadAll()`会将所有组件预加载，这个会在node端使用到.

```javascript
lazyLoader.preloadAll().then(() => {
  app.listen(8080, 'localhost', () => {
    console.log(`server started at localhost: 8080`)
  })
})
```

### 4.node注入getInitialProps的数据到client


### 5.小的优化