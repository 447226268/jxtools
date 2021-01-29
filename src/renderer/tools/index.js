import fs from 'fs'

export function getImageBase64 (img) {
  return fs.readFileSync(img.path).toString('base64')
}
