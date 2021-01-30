<template>
  <div id="header">
    <div class="left">
      <h1>嘉兴广告责任有限公司</h1>
    </div>

    <div class="right">
      <el-button size="small"
                 @mouseenter.native="hoverin(1)"
                 @mouseleave.native="hoverout(1)"
                 :style="color1"
                 icon="el-icon-minus"
                 type="success"
                 circle
                 @click="min"></el-button>
      <el-button size="small"
                 @mouseenter.native="hoverin(2)"
                 @mouseleave.native="hoverout(2)"
                 :style="color2"
                 icon="el-icon-copy-document"
                 type="warning"
                 circle
                 @click="max"></el-button>
      <el-button size="small"
                 @mouseenter.native="hoverin(3)"
                 @mouseleave.native="hoverout(3)"
                 :style="color3"
                 icon="el-icon-close"
                 type="danger"
                 circle
                 @click="quit"></el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'jxHeader',
  data: () => ({
    color1: '',
    color2: '',
    color3: ''
  }),
  methods: {
    min () {
      const {ipcRenderer: ipc} = require('electron')
      ipc.send('window-min')
    },
    max () {
      const {ipcRenderer: ipc} = require('electron')
      ipc.send('window-max')
    },
    quit () {
      const {ipcRenderer: ipc} = require('electron')
      ipc.send('window-close')
    },
    hoverin (i) {
      switch (i) {
        case 1:
          this.color1 = 'color: #FFFFFF'
          break
        case 2:
          this.color2 = 'color: #FFFFFF'
          break
        case 3:
          this.color3 = 'color: #FFFFFF'
          break
      }
    },
    hoverout (i) {
      switch (i) {
        case 1:
          this.color1 = 'color: transparent'
          break
        case 2:
          this.color2 = 'color: transparent'
          break
        case 3:
          this.color3 = 'color: transparent'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#header {
  height: 60px;
  border-bottom: 1px solid #dadce0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5% 0 5%;
}

.el-button {
  -webkit-app-region: no-drag;
}

/deep/ .el-button--small.is-circle {
  padding: 3px;
  color: transparent;
}

.left {

}

.right {

  .el-button + .el-button {
    margin-left: 2px;
  }

}

</style>

