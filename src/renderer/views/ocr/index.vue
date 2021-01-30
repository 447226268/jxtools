<template>
  <div>
    <div class="select">
      <el-select v-model="typesSelect" @change="handleSelectType" style="width:25%">
        <el-option
            v-for="item in typesList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span>{{ selectWarring }}</span>
    </div>
    <div class="upload">
      <el-upload
          class="upload-demo "
          drag
          :before-upload="handleUpload"
          action="https://jsonplaceholder.typicode.com/posts/"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或点击上传</div>
      </el-upload>
    </div>

    <div class="result">
      <el-button type="primary" @click="copy">复制到剪贴板</el-button>
      <el-input v-model="resultText" type="textarea" :rows="23"/>
    </div>

  </div>

</template>

<script>
import {baiduclient} from '@/api/AipOcrClient'
import {getImageBase64} from '@/tools/index'
import {Message} from 'element-ui'

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
      this.selectWarring = this.typesList[e].warring
      this.resultText = ''
    },
    handleUpload (file) {
      Message({
        message: '加载中...',
        type: 'info',
        showClose: true
      })

      const imgBase64 = getImageBase64(file)
      switch (this.typesSelect) {
        case 0:
          // 文字识别
          baiduclient.accurateBasic(imgBase64).then((result) => {
            this.resultText = this.result2Text(result.words_result)
          }).catch(function (err) {
            Message({
              message: JSON.stringify(err),
              type: 'warning',
              showClose: true
            })
            console.log(err)
          })
          break
        case 1:
          // 调用网络图片文字识别, 图片参数为本地图片
          baiduclient.webImage(imgBase64).then((result) => {
            this.resultText = this.result2Text(result.words_result)
          }).catch(function (err) {
            // 如果发生网络错误
            Message({
              message: JSON.stringify(err),
              type: 'warning',
              showClose: true
            })
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
    },
    copy () {
      const {clipboard} = require('electron')
      clipboard.writeText(this.resultText)
      // Message.sucess('复制成功！')
      Message({
        message: '已复制到剪贴板！',
        type: 'success',
        showClose: true
      })
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
    color: #fa8072;
    font-size: 12px;
  }
}

.upload {

  margin-top: 20px;
  display: flex;
  justify-content: center;

  /deep/ .el-upload-dragger {
    width: 60vw;
  }
}

.result {
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  Button {
    width: 120px;
    margin: 20px 0 10px 0;
    position: relative;
    right: 0;
  }
}
</style>
