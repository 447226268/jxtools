<template>
  <div>
    <div class="select">
      <Select v-model="typesSelect" @on-select="handleSelectType" style="width:25%">
        <Option v-for="item in typesList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
      <span>{{ selectWarring }}</span>
    </div>
    <Upload
        class="upload"
        :before-upload="handleUpload"
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击、推拽图片</p>
      </div>
    </Upload>
    <div class="result">
      <Button type="primary">复制到剪贴板</Button>
      <Input v-model="resultText" type="textarea" :autosize="{minRows: 20}"/>

    </div>
  </div>

</template>

<script>
import {baiduclient} from '@/api/AipOcrClient'
import {getImageBase64} from '@/tools/index'
import {Message} from 'view-design'

export default {
  name: 'home',
  data: () => ({
    typesSelect: 0,
    typesList: [
      {
        value: 0,
        label: '通用文字识别',
        warring: '高精度版 500次/天免费'
      }, {
        value: 1,
        label: '网络图片文字识别',
        warring: '200次/天免费'
      }
    ],
    selectWarring: '高精度版 500次/天免费',
    resultText: ''
  }),

  methods: {
    handleSelectType (e) {
      this.selectWarring = this.typesList[e.value].warring
      this.resultText = ''
    },
    handleUpload (file) {
      const loading = Message.loading({
        content: '加载中...',
        duration: 0
      })
      setTimeout(loading, 3000)

      const imgBase64 = getImageBase64(file)

      switch (this.typesSelect) {
        case 0:
          // 文字识别
          baiduclient.accurateBasic(imgBase64).then((result) => {
            this.resultText = this.result2Text(result.words_result)
          }).catch(function (err) {
            Message.error(JSON.stringify(err))
            console.log(err)
          })
          break
        case 1:
          // 调用网络图片文字识别, 图片参数为本地图片
          baiduclient.webImage(imgBase64).then((result) => {
            this.resultText = this.result2Text(result.words_result)
          }).catch(function (err) {
            // 如果发生网络错误
            Message.error(JSON.stringify(err))
            console.log(err)
          })
          break
      }

      return false
    },
    result2Text (result) {
      let text = ''
      for (let i of result) {
        text += i.words + '\n'
      }
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  padding-top: 10px;
}

.select {
  display: flex;
  align-items: flex-end;

  span {
    padding-left: 40px;
    color: #ff0000;
    font-size: 12px;
  }
}

.upload {
  margin-top: 20px;
}

.result {
  display: flex;
  align-items:flex-end;
  flex-direction: column;
  Button {
    width: 120px;
    margin: 20px 0 10px 0;
    position: relative;
    right: 0;
  }
}
</style>
