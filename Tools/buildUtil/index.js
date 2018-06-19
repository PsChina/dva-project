#!/usr/bin/env node
'use strict'

const program = require('commander')
const shell = require('shelljs')
const fs = require('fs-extra')
const path = require('path')

// build directory name
const appPrefix = "td-webapp-"
const allProjectName = ['ams', 'bas', 'bms', 'enter', 'mms', 'oms', 'pls', 'pms', 'portals-agt', 'portals-mer', 'rms', 'sms', 'tms']

program.version('1.0.0', '-v, --version')
    .usage('component development')
    .command('build')
    .option('-s, --src', 'build directory')
    .option('-d, --dist', 'to conversion directory')
    .option('-lang, --language', 'language type')
    .option('-p, --project', 'build project')
    .action((src, dist, language, project) => {
        if (!isOption(src) || !isOption(dist)) {
            shell.echo('Error, please input build directory! ')
            shell.exit(1)
        }
        this.src = path.resolve(process.cwd(), src)
        this.dist = path.resolve(process.cwd(), dist)
        if (src === dist) {
            shell.echo('Error, The src path cannot be the same as the dist path! ')
            shell.exit(1)
        }
        let projectList = []
        if (project === "") {
            projectList = allProjectName
        } else {
            projectList = project.split(",")
        }
        startBuild(src, dist, language, projectList)
    })

function isOption(p) {
    if (typeof p === 'object') {
        return false
    }
    return true
}

function startBuild(src, dist, language, projectName) {
    shell.cd(src)
    for (let i = 0; i < projectName.length; i++) {
        let currtDir = path.resolve(process.cwd(), appPrefix + projectName[i])
        fs.pathExists(currtDir, function (err, exists) {
            shell.echo("currtDir：" + currtDir)
            if (exists) {
                shell.echo(" exec npm install begin ...")
                shell.cd(currtDir)
                shell.exec("npm install")
                shell.echo(" exec npm install end ...")

                // is exist language directory
                /*let i18nDir = path.resolve(process.cwd(), currtDir + "/config/i18n")
                fs.pathExists(i18nDir, function (error, i18nDirExists) {
                    if (i18nDirExists) {
                        shell.echo(" exec translate node index hk ...")
                        // translate
                        let languageDir = path.resolve(__dirname, '../LanguageUtil');
                        // go to translate tool directory
                        shell.cd(languageDir)
                        let zhcn = path.resolve(__dirname, '../../' + appPrefix + projectName[i] + '/config/i18n/zh-cn');
                        let zhhk = path.resolve(__dirname, '../../' + appPrefix + projectName[i] + '/config/i18n/zh-hk');
                        shell.echo(" translate cn to hk " + zhcn + " - " + zhhk)
                        shell.exec("node index hk " + zhcn + " " + zhhk + " -l")
                    }
                    // back to build directory
                    shell.cd(currtDir)
                })*/

                shell.echo(" exec npm run build begin ...")
                shell.exec("npm run build")
                shell.echo(" exec npm run build end ...")

                let codeDir = path.resolve(process.cwd(), currtDir + "/dist")
                shell.echo("codeDir：" + codeDir)
                let outDir = path.resolve(__dirname, dist + '/' + language + '/webapp/' + projectName[i] + '-hash')
                shell.echo("outDir：" + outDir)
                fs.emptyDirSync(outDir)
                shell.echo("start copy " + codeDir + " files ...")
                fs.copySync(codeDir, outDir)
                shell.echo("copy to " + outDir + " files finish.")

                let imageDir = path.resolve(__dirname, 'image');
                shell.echo("start copy " + imageDir + " images ...")
                fs.copySync(imageDir, outDir)
                shell.echo("copy to " + outDir + " images finish.")

                shell.echo("delete " + codeDir + " dist files.")
                fs.removeSync(codeDir)
                shell.echo("delete finish.")
            } else {
                shell.echo("err：" + err)
                shell.echo(currtDir + " directory not exists! ")
                shell.exit(1)
            }
        })
    }
}

program.parse(process.argv)
