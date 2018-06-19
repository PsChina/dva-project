#!/usr/bin/env node
'use strict'

const program = require('commander')
const path = require('path')
const To = require('./to')

program.version('1.0.0', '-v, --version')
  .usage('component development')
  .command('hk')
  .option('-s, --src', 'conversion directory')
  .option('-d, --dist', 'to conversion directory')
  .option('-l, --log', 'show log')
  .action((src, dir, log) => {
    if(typeof src === 'string' || src instanceof Buffer && typeof dist === 'string' || dist instanceof Buffer){
      if (!isOption(src) || !isOption(dir)) {
        throw new Error('请填写路径')
      }
      new To(src, dir).toHk(isOption(log))      
    }

  })

function isOption (p) {
  if (typeof p === 'object') {
    return false
  }
  return true
}

program.parse(process.argv)
