<template>
  <Menu mode="horizontal" theme="light" active-name="1">
    <MenuItem name="1" to="/home">
      <Icon type="ios-paper" />
      首页
    </MenuItem>
    <MenuItem name="2" to="/ocr">
      <Icon type="ios-people" />
      OCR文字识别
    </MenuItem>
    <MenuItem name="3" to="/pdf2word">
      <Icon type="ios-construct" />
      PDF转Word
    </MenuItem>
  </Menu>
</template>

<script>
export default {
  name: 'jxHeader'
}
</script>

