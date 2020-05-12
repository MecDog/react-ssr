import pageHOC from './pageHOC'
// 存储所有懒加载组件
// 若组件加载完成，则在相应位置，直接替换为组件，而不是()=> import(//....)的函数
let loaders = []

export let isLazyLoad = '__isLazyLoad__'

export default function lazyLoader(fn) {
  let config = {
    loader: fn,
    component: null,
    loaded: false,
  }
  loaders.push(config)
  return pageHOC(config)
}

// 加载全部的懒加载资源， 服务端会用到此场景
lazyLoader.preloadAll = () => {
  console.log('懒加载组件loading....')
  return Promise.all(loaders.map((config) => config.loader())).then((res) => {
    res.forEach((esModule, index) => {
      loaders[index].component = esModule.default
      loaders[index].loaded = true
    })
  })
}
