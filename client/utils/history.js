import { createBrowserHistory } from 'history'

export default createBrowserHistory({
  basename: process.__baseURI__,
})
