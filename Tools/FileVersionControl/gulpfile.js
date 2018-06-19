const gulp =require('gulp'),
useref = require('gulp-useref'),
uglify = require('gulp-uglify'),
cleancss = require('gulp-clean-css'),
rev = require('gulp-rev'),
revReplace = require('gulp-rev-replace'),
gulpif = require('gulp-if'),
replace = require('gulp-replace');

gulp.task('pack', function () {
return gulp.src(['./dist/*.*'])
        .pipe(useref())             //pack the file in index.html with build comment
        // .pipe(gulpif('*.js', uglify()))       // minify js
        .pipe(gulpif('*.js', rev()))          // append hash to the packed js file
        // .pipe(gulpif('*.css', cleancss()))    // minify css
        .pipe(gulpif('*.css', rev()))         // append hash to the packed js file
        // substitute the useref filename with the hash filename in index.html
        .pipe(revReplace())
        .pipe(gulp.dest('app'))
        // 生成 对应关系
        .pipe(rev.manifest())
        // 输出json 文件
        .pipe(gulp.dest('./'))
});   
gulp.task('replaceManifestMatchup',function(){
    setTimeout( function(){
        const json = require('./rev-manifest.json');
        let jsCode = 'gulp.src("./app/index*.js")'
        for( let key in json ) {
            if( key.indexOf('index') === -1 ){
                jsCode += `.pipe(replace(/${key.split('.')[0]}*/,"${json[key].split('.')[0]}"))`
            }
        }
        jsCode += '.pipe( gulp.dest("./app/") )'
        eval(jsCode)
    } , 1000 )
})



gulp.task('default', ['pack','replaceManifestMatchup']);