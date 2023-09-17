import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import browserSync from 'browser-sync';

const bs = browserSync.create();

esbuild.build({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    sourcemap: true,
    outdir: 'dist',
    loader: { '.svg': 'text' },
    plugins: [
        sassPlugin(),
        // sassPlugin({
        //     type: 'css-text',
        // }),
    ],
});

const ctx = await esbuild.context({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    sourcemap: true,
    outdir: 'dist',
    loader: { '.svg': 'text' },
    plugins: [
        sassPlugin(),
        // sassPlugin({
        //     type: 'css-text',
        // }),
    ],
});

bs.watch(['./dist/**/*.html', './dist/**/*.json']).on('change', bs.reload);

bs.watch(['./src/js/**/*.js']).on('change', () => {
    ctx.rebuild()
        .then(() => bs.reload())
        .catch((error) => console.log(error));
});

bs.watch(['./src/scss/**/*.scss']).on('change', () => {
    ctx.rebuild()
        .then(() => {
            bs.reload(['./dist/scss/style.css']);
        })
        .catch((error) => console.log(error));
});

bs.init({
    server: './dist',
    notify: false,
});
