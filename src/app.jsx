import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'

import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

wx.cloud.init({
  env: 'dev-watcher', // 你的云数据库环境ID
  traceUser: true
})

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/activityAdd/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'SharTo',
      navigationBarTextStyle: 'black'
    },
    cloud: true
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
