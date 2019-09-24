import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
// import { Item } from '../activityList/index'
import './index.scss'

export default class Index extends Component {

  state = {
    activity: []
  }

  componentWillMount() {
    const db = wx.cloud.database()
    db.collection('activity').get().then(res => {
      this.setState({ activity: res.data })
    })
  }

  config = {
    navigationBarTitleText: '首页',
  }

  render () {
    const { activity } = this.state
    const listItems = activity.map(val => {
      return <View  key={val.id} className='at-row item' onClick={() => { Taro.navigateTo({ url: '/pages/activityAdd/index' }) }}>
        <View className='at-col at-col-5'>
          <Image src={val.images.length ? val.images[0] : ''} className='img' />
        </View>
        <View className='at-col at-col-7 content'>
          <View className='title'>{val.title}</View>
          <View className='keywords'>{val.keywords}</View>
        </View>
      </View>
    })
    return (
      <View className='index'>
        {listItems}
      </View>
    )
  }
}
