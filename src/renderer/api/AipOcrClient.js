import baiduapi from 'baidu-aip-sdk'

const AipOcrClient = baiduapi.ocr

// 设置APPID/AK/SK
const APP_ID = '16986956'
const API_KEY = 'jNKUpm3VsNZRofuyzqbVg7Ku'
const SECRET_KEY = 'pmy2D8BnyY3zuFMwaxoWVIasNVOOn16a'

// 新建一个对象，建议只保存一个对象调用服务接口
export const baiduclient = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY)
