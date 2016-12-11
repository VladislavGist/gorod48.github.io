var gulp 				= require("gulp"),
    sass 				= require("gulp-sass"),
    browserSync	= require("browser-sync"),
    concat 		 	= require("gulp-concat"),
    uglify 		 	= require("gulp-uglifyjs"),
    cssnano 	 	= require("gulp-cssnano"),
    rename 		 	= require("gulp-rename"),
    del 			 	= require("del"),
    imagemin 	 	= require("gulp-imagemin"),
    pngquant 	 	= require("imagemin-pngquant"),
    cache 			= require("gulp-cache"),
    autoprefix 	= require("gulp-autoprefixer"),
    pug					= require("gulp-pug"),
    babel				= require("gulp-babel");

gulp.task("sass", function() {
  return gulp.src("app/sass/**/*.sass")
    .pipe(sass())
    .pipe(autoprefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], {cascade: true}))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task("pug", function() {
	return gulp.src("app/pug/**/*.pug")
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest("app"))
});

gulp.task("jsx-script", function () {
  return gulp.src(["!app/js/vendors.min.js", "!app/js/common.js", "!app/js/jquery.min.js", "app/js/**/*.+(js|jsx)"])
    .pipe(babel())
    .pipe(concat("common.js"))
    .pipe(gulp.dest("app/js"));
});

gulp.task("scripts", function(){
	return gulp.src([
		//"app/libs/jquery/dist/jquery.min.js",
		"app/libs/bootstrap/dist/js/bootstrap.min.js",
		"app/libs/jquery.maskedinput/dist/jquery.maskedinput.min.js",
		"app/libs/jquery-validation/dist/jquery.validate.min.js",
		"app/libs/slick-carousel/slick/slick.min.js",
		"app/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js",
		"app/libs/bootstrap-datepicker/locales/bootstrap-datepicker.ru.min.js",		
		"app/libs/jQuery.dotdotdot-master/src/jquery.dotdotdot.min.js",
		"app/libs/jquery-mousewheel/jquery.mousewheel.js",
		"app/libs/simplr-smoothscroll-master/lib/jquery.simplr.smoothscroll.min.js",
		"app/libs/materialize/js/materialbox.js",
		"app/libs/materialize/js/velocity.min.js"
		//"app/libs/bootstrap-select/dist/js/bootstrap-select.min.js",
		//"app/libs/react/react.min.js",
		//"app/libs/react/react-dom.min.js",
		])
		.pipe(concat("vendors.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("app/js/"));
});
gulp.task("css-libs", ["sass"], function(){
	return gulp.src("app/css/vendors/vendors.css")
		.pipe(cssnano())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest("app/css/"));
});

gulp.task("browser-sync", function(){
	browserSync({
		server : {
			baseDir: "app"
		},
		notify: false
	});
})

gulp.task("clean", function(){
	return del.sync("dist");
});

gulp.task("clear", function(){
	return cache.clearAll();
});

gulp.task("img", function(){
	return gulp.src("app/img/**/*")
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest("dist/img"));
});
gulp.task("img-upload", function(){
	return gulp.src("app/upload/**/*")
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest("dist/upload"));
});

gulp.task("watch", ["browser-sync", "css-libs", "jsx-script", "pug", "scripts"],  function(){
	gulp.watch("app/sass/**/*.sass", ["sass"]);
	gulp.watch("app/pug/**/*.pug", ["pug"]);
	gulp.watch("app/js/**/*.+(js|jsx)", ["jsx-script"]);
	gulp.watch("app/**/*.html", browserSync.reload);
	gulp.watch("app/js/**/*.js", browserSync.reload);
});

gulp.task("build", ["clean", "pug", "img", "img-upload", "jsx-script", "sass", "scripts"], function(){

	var buildCss = gulp.src([
			"app/css/style.css",
			"app/css/vendors.min.css",
		])
		.pipe(gulp.dest("dist/css"));

	var buildFonts = gulp.src("app/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"));

	var favicons = gulp.src("app/favicons/**/*")
		.pipe(gulp.dest("dist/favicons"));

	var favicon = gulp.src("app/favicons/**/favicon.ico")
		.pipe(gulp.dest("dist"));

	var buildJs = gulp.src(["app/js/common.js", "app/js/vendors.min.js", "app/js/jquery.min.js"])
		.pipe(gulp.dest("dist/js/"));

	var buildHtml = gulp.src("app/*.html")
		.pipe(gulp.dest("dist"));

})