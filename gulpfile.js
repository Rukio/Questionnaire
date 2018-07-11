var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    bsync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

	gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin()) // Cache Images
		.pipe(gulp.dest('dist/img')); 
	});
	
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(bsync.stream())
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/navigation.js',
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('cssCompress', function() {
    return gulp.src([
        'src/css/*.css'
])
    .pipe(cssnano())
	.pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(gulp.dest('dist/css'));
})

gulp.task('bs', function() {
    bsync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});
 
gulp.task('autoprefixer', () =>
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
);

gulp.task('watch', ['bs', 'autoprefixer'], function() {
    gulp.watch('src/**/*.+(sass|scss)', ['sass']);
    gulp.watch('src/*.html', bsync.reload);
    gulp.watch('src/js/**/*.js', bsync.reload);
});

gulp.task('build', ['imagemin', 'sass', 'scripts', 'cssCompress'], function() {

	var buildFiles = gulp.src([
		'src/*.html',
		'src/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'src/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'src/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'src/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});