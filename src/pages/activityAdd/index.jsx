import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtImagePicker } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  state = {
    title: '',
    keywords: '',
    date: '',
    files: []
  }

  config = {
    navigationBarTitleText: '增加活动'
  }

  handleChange(key, value) {
    this.setState({ [key]: value })
  }

  onDateChange = (e) => {
    this.setState({ date: e.detail.value })
  }

  onFilesChange(files) {
    this.setState({ files })
  }

  onSubmit() {
    const { title, keywords, date, files } = this.state
    let images = []
    files.map(val => {
      images.push(val.url)
    })
    const db = wx.cloud.database()
    db.collection('activity').add({
      data: { title, keywords, date, images }
    }).then( res => {
      console.log(res)
    })
  }

  render() {
    const { title, keywords, date, files } = this.state
    return (
      <AtForm onSubmit={this.onSubmit.bind(this)}>
        <AtInput
          name='title'
          title='标题'
          type='text'
          placeholder='请输入标题'
          value={title}
          onChange={this.handleChange.bind(this, 'title')}
        />
        <AtInput
          name='keywords'
          title='关键词'
          type='text'
          placeholder='请输入关键词'
          value={keywords}
          onChange={this.handleChange.bind(this, 'keywords')}
        />
        <Picker mode='date' onChange={this.onDateChange}>
          <View className='picker'>
            当前选择：{date}
          </View>
        </Picker>
        <AtImagePicker
          multiple
          files={files}
          onChange={this.onFilesChange.bind(this)}
        />
        <AtButton formType='submit'>提交</AtButton>
      </AtForm>
    )
  }
}
