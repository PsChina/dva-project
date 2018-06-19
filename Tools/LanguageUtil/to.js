const path = require('path')
const fs = require('fs-extra')
const opencc = require('node-opencc')

function log (isLog, event) {
  if (isLog) {
    event()
  }
}

class To {
  constructor (src, dist) {
    this.src = path.resolve(process.cwd(), src)
    this.dist = path.resolve(process.cwd(), dist)
    if (src === dist) {
      throw new Error('路径不能相同')
    }
    if(typeof this.src === 'string' || this.src instanceof Buffer && typeof this.dist === 'string' || this.dist instanceof Buffer){
      if (fs.statSync(this.src).isFile()) {
        this.paserFile(this.src, this.dist, false)
      } else {
        if (fs.existsSync(this.dist)) {
          fs.removeSync(this.dist)
        }
        fs.copySync(this.src, this.dist)
      }
    }

  }

  toHk (isLog = false) {
    const files = this.filePathMerge(this.getFilesPath(this.dist))
    for (let i = 0; i < files.length; i++) {
      this.paserFile(files[i], files[i], isLog)
    }
  }

  paserFile (filePath, toPath, isLog = false) {
    log(isLog, () => console.log('=================================='))
    log(true, () => console.log(filePath + '：'))
    const json = this.paserJson(fs.readJsonSync(filePath))
    log(isLog, () => console.log(JSON.stringify(json)))
    fs.writeJsonSync(toPath, json, {spaces: 2})
  }

  paserJson (json) {
    if (json instanceof Array) {
      return this.paserArray(json)
    }

    if ('label' in json) {
      json['label'] = opencc.simplifiedToHongKong(json['label'])
      if ('children' in json) {
        json.children = this.paserArray(json.children)
      }
      return json
    }

    if ('zh_cn' in json) {
      json['zh_cn'] = opencc.simplifiedToHongKong(json['zh_cn'])
      json['value'] = opencc.simplifiedToHongKong(json['value'])
      return json
    }

    for (let key in json) {
      if (typeof json[key] === 'string') {
        json[key] = opencc.simplifiedToHongKong(json[key])
      } else {
        json[key] = this.paserJson(json[key])
      }
    }
    return json
  }

  paserArray (array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = this.paserJson(array[i])
    }
    return array
  }

  filePathMerge (files) {
    let mergeFiles = []
    for (let i = 0; i < files.length; i++) {
      if (files[i] instanceof Array) {
        mergeFiles.push(...files[i])
      } else {
        mergeFiles.push(files[i])
      }
    }
    return mergeFiles
  }

  getFilesPath (dist) {
    const distFiles = fs.readdirSync(dist)
    return distFiles.map(file => {
      const filePath = path.resolve(dist, file)
      return fs.statSync(filePath).isDirectory() ? this.getFilesPath(filePath) : filePath
    })
  }
}

module.exports = To