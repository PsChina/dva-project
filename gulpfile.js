const gulp = require('gulp')
const lang = 'hk'
const appfileName = 'webapp'
const map = {
    './td-webapp-bas':`./release/${lang}/${appfileName}/bas`,
    './td-webapp-bms':`./release/${lang}/${appfileName}/bms`,
    './td-webapp-enter':`./release/${lang}/${appfileName}/enter`,
    './td-webapp-mms':`./release/${lang}/${appfileName}/mms`,
    './td-webapp-oms':`./release/${lang}/${appfileName}/oms`,
    './td-webapp-pms':`./release/${lang}/${appfileName}/pms`,
    './td-webapp-portals-agt':`./release/${lang}/${appfileName}/portals-agt`,
    './td-webapp-portals-mer':`./release/${lang}/${appfileName}/portals-mer`,
    './td-webapp-rms':`./release/${lang}/${appfileName}/rms`,
    './td-webapp-sms':`./release/${lang}/${appfileName}/sms`,
    './td-webapp-tms':`./release/${lang}/${appfileName}/tms`,
    './td-webapp-ams':`./release/${lang}/${appfileName}/ams`,
    './td-webapp-pls':`./release/${lang}/${appfileName}/pls`,
}

const useref = require('gulp-useref'),
uglify = require('gulp-uglify'),
cleancss = require('gulp-clean-css'),
rev = require('gulp-rev'),
revReplace = require('gulp-rev-replace'),
gulpif = require('gulp-if'),
replace = require('gulp-replace'),
fs = require('fs');

gulp.task('move:dist',function(){
    for(let key in map){
        gulp.src(key+'/dist/*.*')
            .pipe(gulp.dest(map[key]))
            .on('end',function(){
                gulp.src(`${map[key]}/*.*`)
                .pipe(useref())             //pack the file in index.html with build comment
                // .pipe(gulpif('*.js', uglify()))       // minify js
                .pipe(gulpif('*.js', rev()))          // append hash to the packed js file
                // .pipe(gulpif('*.css', cleancss()))    // minify css
                .pipe(gulpif('*.css', rev()))         // append hash to the packed js file
                // substitute the useref filename with the hash filename in index.html
                .pipe(revReplace())
                .pipe(gulp.dest(`${map[key]}-hash`))
                // 生成 对应关系
                .pipe(rev.manifest())
                // 输出json 文件
                .pipe(gulp.dest(`${map[key]}-map`))
                .on('end',function(){
                    fs.exists(`${map[key]}-map/rev-manifest.json`, (exist) => {
                        if(exist){
                            const json = require(`${map[key]}-map/rev-manifest.json`);                        
                            
                            let jsCode = `gulp.src("${map[key]}-hash/index*.js")`
                            for( let key in json ) {
                                if( key.indexOf('index') === -1 ){
                                    jsCode += `.pipe(replace(/${key.split('.')[0]}*/,"${json[key].split('.')[0]}"))`
                                }
                            }
                            jsCode += `.pipe( gulp.dest("${map[key]}-hash/") )`
                            eval(jsCode)
                        }
                    });
                })
            })
    }
})

gulp.task('hash-all',['move:dist'])

const del = require('del')

gulp.task('clearFile',function(){
    for( let key in map ) {
        del([`${map[key]}-map`,map[key]])
    }
})

gulp.task('amshash',function(){
    gulp.src('./td-webapp-ams/dist/*.*')
    .pipe(gulp.dest(`./release/${lang}/${appfileName}/ams`))
    .on('end',function(){
        gulp.src(`./release/${lang}/${appfileName}/ams/*.*`)
        .pipe(useref())             //pack the file in index.html with build comment
        // .pipe(gulpif('*.js', uglify()))       // minify js
        .pipe(gulpif('*.js', rev()))          // append hash to the packed js file
        // .pipe(gulpif('*.css', cleancss()))    // minify css
        .pipe(gulpif('*.css', rev()))         // append hash to the packed js file
        // substitute the useref filename with the hash filename in index.html
        .pipe(revReplace())
        .pipe(gulp.dest(`./release/${lang}/${appfileName}/ams-hash`))
        // 生成 对应关系
        .pipe(rev.manifest())
        // 输出json 文件
        .pipe(gulp.dest(`./release/${lang}/${appfileName}/ams-map`))
        .on('end',function(){
            fs.exists(`./release/${lang}/${appfileName}/ams-map/rev-manifest.json`, (exist) => {
                if(exist){
                    const json = require(`./release/${lang}/${appfileName}/ams-map/rev-manifest.json`);                        
                    
                    let jsCode = `gulp.src("./release/${lang}/${appfileName}/ams-hash/index*.js")`;
                    for( let key in json ) {
                        if( key.indexOf('index') === -1 ){
                            jsCode += `.pipe(replace(/${key.split('.')[0]}*/,"${json[key].split('.')[0]}"))`
                        }
                    };
                    jsCode += `.pipe( gulp.dest("./release/${lang}/${appfileName}/ams-hash/") )`;
                    eval(jsCode);
                };
            });
        })
    })
})

const appNames = ['portals-mer','portals-agt','bas','bms','enter','mms','oms','pms','rms','sms','tms','ams','pls'];

gulp.task('hash',function(){
    const param = process.argv[3];
    const delParam = process.argv[4];
    const app = param.substr(1);
    if(appNames.indexOf(app)!==-1){
        if(delParam){
            del([`./release/${lang}/${appfileName}/${app}`,`./release/${lang}/${appfileName}/${app}-map`,`./release/${lang}/${appfileName}/${app}-hash`])
        }
        gulp.src(`./td-webapp-${app}/dist/*.*`)
        .pipe(gulp.dest(`./release/${lang}/${appfileName}/${app}`))
        .on('end',function(){
            gulp.src(`./release/${lang}/${appfileName}/${app}/*.*`)
            .pipe(useref())             //pack the file in index.html with build comment
            // .pipe(gulpif('*.js', uglify()))       // minify js
            .pipe(gulpif('*.js', rev()))          // append hash to the packed js file
            // .pipe(gulpif('*.css', cleancss()))    // minify css
            .pipe(gulpif('*.css', rev()))         // append hash to the packed js file
            // substitute the useref filename with the hash filename in index.html
            .pipe(revReplace())
            .pipe(gulp.dest(`./release/${lang}/${appfileName}/${app}-hash`))
            // 生成 对应关系
            .pipe(rev.manifest())
            // 输出json 文件
            .pipe(gulp.dest(`./release/${lang}/${appfileName}/${app}-map`))
            .on('end',function(){
                fs.exists(`./release/${lang}/${appfileName}/${app}-map/rev-manifest.json`, (exist) => {
                    if(exist){
                        const json = require(`./release/${lang}/${appfileName}/${app}-map/rev-manifest.json`);                        
                        
                        let jsCode = `gulp.src("./release/${lang}/${appfileName}/${app}-hash/index*.js")`;
                        for( let key in json ) {
                            if( key.indexOf('index') === -1 ){
                                jsCode += `.pipe(replace(/${key.split('.')[0]}*/,"${json[key].split('.')[0]}"))`
                            }
                        };
                        jsCode += `.pipe( gulp.dest("./release/${lang}/${appfileName}/${app}-hash/") )`;
                        eval(jsCode);
                    };
                });
            })
        })
    } else {
        console.log(`Error: Can not find app: '${app}'. Please enter the correct app name.`)
        console.log(`list: ${appNames}.`)
    }
})