import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

esbuild.build({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'docs',
    loader: { '.svg': 'text' },
    plugins: [sassPlugin()],
});
