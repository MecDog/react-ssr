import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export let isLazyLoad = '__isLazyLoad__'

export default (config) => {
  function lazyLoaderCom({ staticContext }) {
    let val = config.loaded ? config.component : undefined
    // 对函数式组件兼容处理，避免被useState当成函数式initState
    const [Component, setComponent] = useState(() => val)

    let initialProps
    if (staticContext) {
      initialProps = staticContext.initialProps || {}
    } else {
      initialProps = window.__initialProps__ || {}
      // 只用于首次渲染
      window.__initialProps__ = null
    }

    useEffect(() => {
      if (!config.loaded) {
        config.loader().then((esmodule) => {
          setComponent(esmodule.default)
        })
      }
    }, [])
    return Component ? <Component {...initialProps}></Component> : null
  }
  // 预加载某一项loader, client首次渲染，会用到
  lazyLoaderCom.preload = function () {
    return config.loader().then((esmodule) => {
      config.component = esmodule.default
      config.loaded = true
    })
  }
  // 调用组件的getInitProps， server端会使用到此api
  lazyLoaderCom.getInitialProps = function (ctx) {
    if (!config.loaded) {
      return Promise.reject(new Error('组件未预加载, server side先调用lazyLoader.prepoadAll'))
    }
    if (!config.loaded || !config.component) {
      return Promise.reject(new Error('组件返回未空'))
    }
    if (config.component.getInitialProps) {
      return config.component.getInitialProps(ctx)
    } else {
      return Promise.resolve()
    }
  }
  // 懒加载组件标识
  lazyLoaderCom[isLazyLoad] = true

  lazyLoaderCom.propTypes = {
    staticContext: PropTypes.object,
  }
  return lazyLoaderCom
}
