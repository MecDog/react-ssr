import React from 'react'
import PropTypes from 'prop-types'
export default function Home({ str }) {
  return (
    <h1 style={{ textAlign: 'center' }}>
      <div>home</div>
      <div>接受服务端的数据:{str}</div>
    </h1>
  )
}

Home.propTypes = {
  str: PropTypes.string,
}

Home.getInitialProps = function (ctx) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ str: 'server getInitialProps' })
    }, 1000)
  })
}
