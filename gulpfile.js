var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-bower');

elixir.extend('copy_views', function () {
    this.registerWatcher('copy_views', 'resources/app/**/*.html');

    gulp.task('copy_views', function () {
        var onError = function (err) {

            notify.onError({
                title: "Laravel Elixir",
                subtitle: "View Files Html Copy Failed!",
                message: "Error: <%= error.message %>",
                icon: __dirname + '/../icons/fail.png'
            })(err);

            this.emit('end');
        };

        return gulp.src(['resources/app/**/*.html'])
            .on('error', onError)
            .pipe(gulp.dest('public'));
    });


    return this.queueTask("copy_views");
});


elixir(function (mix) {
    mix.less(['app.less'], 'resources/css');

    mix.bower();

    mix.appjs();

    mix.styles([
        'vendor.css', 'app.css'
    ], 'public/css', 'resources/css');

    mix.scripts(['vendor.js', 'app.js'], 'public/js', 'resources/js');

    mix.copy_views();
});
